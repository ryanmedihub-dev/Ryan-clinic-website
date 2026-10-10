/**
 * test_mumbai_regression.mjs
 *
 * Regression test suite for the Mumbai branch doctor reassignment.
 * Tests:
 *   A. Mumbai branch renders real doctor (no longer Demo Doctor)
 *   B. Delhi branch untouched
 *   C. Other demo branches still showing their demo doctors
 *   D. Mumbai standalone doctor page accessible at /doctors/hair-transplant-doctor-in-mumbai
 *   E. Demo Doctor Mumbai standalone page still 404
 *   F. API isolation still holds
 *   G. Single-source-of-truth: rendered data matches MongoDB Doctor record
 */
import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';
const BASE = 'http://localhost:3000';

let allPassed = true;
function check(label, actual, expected, note = '') {
  const pass = actual === expected;
  if (!pass) allPassed = false;
  const icon = pass ? 'PASS' : 'FAIL';
  const detail = note ? ` (${note})` : '';
  console.log(`  [${icon}] ${label}: ${actual}${detail}`);
  return pass;
}

async function getHtml(path) {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, html: await res.text() };
}

async function main() {
  console.log('==========================================================');
  console.log('REGRESSION TEST — Mumbai Branch Doctor Reassignment');
  console.log('==========================================================\n');

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // --- A. Mumbai Branch: must show real doctor, not Demo Doctor ---
  console.log('--- A. Mumbai Branch Page ---');
  const { status: mStatus, html: mHtml } = await getHtml('/hair-transplant-in-mumbai');
  check('/hair-transplant-in-mumbai HTTP 200', mStatus, 200);
  check('No "Demo Doctor — Mumbai" text', mHtml.includes('Demo Doctor — Mumbai'), false);
  check('No "Doctor profile information will be added"', mHtml.includes('Doctor profile information will be added'), false);
  check('Has Dr. Harshada Vijay Rakh', mHtml.includes('Dr. Harshada Vijay Rakh'), true);
  check('Has Meet Your Hair Transplant Surgeon heading', mHtml.includes('Meet Your Hair Transplant Surgeon'), true);
  check('Has YOUR SURGEON IN MUMBAI eyebrow', mHtml.includes('YOUR SURGEON IN MUMBAI'), true);

  // --- B. Delhi Branch: must remain unchanged ---
  console.log('\n--- B. Delhi Branch Regression ---');
  const { status: dStatus, html: dHtml } = await getHtml('/hair-transplant-in-delhi');
  check('/hair-transplant-in-delhi HTTP 200', dStatus, 200);
  check('Delhi has Dr. Pranendra Singh', dHtml.includes('Dr. Pranendra Singh'), true);
  check('Delhi has no Demo Doctor text', dHtml.includes('Demo Doctor'), false);
  check('Delhi has no Dr. Harshada', dHtml.includes('Dr. Harshada'), false);

  // --- C. Other demo branches still show their demo doctors ---
  console.log('\n--- C. Other Demo Branch Regression ---');
  for (const city of ['hyderabad', 'bangalore', 'gurgaon', 'chennai']) {
    const { status, html } = await getHtml(`/hair-transplant-in-${city}`);
    const cityCapital = city.charAt(0).toUpperCase() + city.slice(1);
    check(`/hair-transplant-in-${city} HTTP 200`, status, 200);
    check(`/hair-transplant-in-${city} has Demo Doctor — ${cityCapital}`, html.includes(`Demo Doctor \u2014 ${cityCapital}`), true);
    check(`/hair-transplant-in-${city} no Dr. Harshada`, html.includes('Dr. Harshada'), false);
  }

  // --- D. Real Mumbai Doctor standalone page ---
  console.log('\n--- D. Real Mumbai Doctor Standalone Page ---');
  const { status: rStatus, html: rHtml } = await getHtml('/doctors/hair-transplant-doctor-in-mumbai');
  check('/doctors/hair-transplant-doctor-in-mumbai HTTP 200', rStatus, 200);
  check('Page has Dr. Harshada Vijay Rakh', rHtml.includes('Dr. Harshada Vijay Rakh'), true);

  // --- E. Demo Doctor Mumbai standalone page still 404 ---
  console.log('\n--- E. Demo Doctor Mumbai Standalone Page (Must Remain 404) ---');
  const { status: demoStatus } = await getHtml('/doctors/demo-doctor-mumbai');
  check('/doctors/demo-doctor-mumbai still 404', demoStatus, 404);

  // --- F. API isolation still holds ---
  console.log('\n--- F. Public API Isolation ---');
  const listRes = await fetch(`${BASE}/api/doctors/list?status=published&limit=100`);
  const listData = await listRes.json();
  const demoInList = listData.doctors?.filter(d => d.basicInfo?.doctorName?.startsWith('Demo Doctor')) || [];
  const mumbaiInList = listData.doctors?.filter(d => d.slug === 'hair-transplant-doctor-in-mumbai') || [];
  check('Public /api/doctors/list: 0 demo doctors', demoInList.length, 0);
  check('Public /api/doctors/list: real Mumbai doctor present', mumbaiInList.length > 0, true);

  // --- G. Single-source-of-truth: DB assignedDoctor matches rendered doctor ---
  console.log('\n--- G. Single-Source-of-Truth Verification ---');
  const service = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-mumbai' });
  const assignedId = service?.assignedDoctor?.toString();
  const doctor = assignedId
    ? await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(assignedId) })
    : null;

  check('DB: Mumbai assignedDoctor points to real doctor', assignedId, '6a8e969f322f85061ac1aa0d');
  check('DB: Assigned doctor name is Dr. Harshada Vijay Rakh', doctor?.basicInfo?.doctorName, 'Dr. Harshada Vijay Rakh');
  check('HTML: Real doctor name appears on page', mHtml.includes(doctor?.basicInfo?.doctorName || 'X'), true,
    'DB record matches rendered page');
  check('DB: Demo Doctor Mumbai is NOT assigned to Mumbai branch', assignedId !== '6abf79b03572e74794c59cda', true);

  // --- Summary ---
  console.log('\n==========================================================');
  console.log(`OVERALL: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
  console.log('==========================================================');

  process.exit(allPassed ? 0 : 1);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
