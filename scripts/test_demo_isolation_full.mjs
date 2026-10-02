import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

function extractSurgeonSection(html) {
  const marker = 'data-debug-section="meet-your-surgeon"';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  const sectionStart = html.lastIndexOf('<section', start);
  const sectionEnd = html.indexOf('</section>', start);
  if (sectionEnd === -1) return html.substring(sectionStart);
  return html.substring(sectionStart, sectionEnd + '</section>'.length);
}

let allPassed = true;

function check(label, actual, expected, note = '') {
  const pass = actual === expected;
  if (!pass) allPassed = false;
  const icon = pass ? 'PASS' : 'FAIL';
  const detail = note ? ` (${note})` : '';
  console.log(`  [${icon}] ${label}: ${actual}${detail}`);
  return pass;
}

async function main() {
  console.log('==========================================================');
  console.log('FULL ISOLATION TEST SUITE: DEMO DOCTOR EXPOSURE FIX');
  console.log('==========================================================\n');

  // === A. Public: Demo Doctor Standalone Pages Must 404 ===
  console.log('--- A. Public Standalone Demo Doctor Pages (Must Be HTTP 404) ---');
  const demoSlugs = ['demo-doctor-mumbai', 'demo-doctor-hyderabad', 'demo-doctor-bangalore', 'demo-doctor-gurgaon'];
  for (const slug of demoSlugs) {
    const res = await fetch(`http://localhost:3000/doctors/${slug}`);
    check(`/doctors/${slug}`, res.status, 404, 'should 404');
  }

  // === A2. Real doctor pages must still be 200 ===
  console.log('\n--- A2. Real Doctor Standalone Pages (Must Be HTTP 200) ---');
  const realRes = await fetch('http://localhost:3000/doctors/hair-transplant-doctor-in-delhi');
  check('/doctors/hair-transplant-doctor-in-delhi', realRes.status, 200, 'real doctor must remain accessible');

  // === B. Public Doctor Directory: Must not contain demo doctors ===
  console.log('\n--- B. Public Doctor Directory /doctors (Must Have Zero Demo Cards) ---');
  const dirRes = await fetch('http://localhost:3000/doctors');
  const dirHtml = await dirRes.text();
  check('/doctors status', dirRes.status, 200);
  check('No Demo Doctor cards in /doctors', dirHtml.includes('Demo Doctor'), false, 'Demo Doctor string must not appear');

  // === C. Public API: /api/doctors/list ===
  console.log('\n--- C. Public API /api/doctors/list (Demo Doctors Must Be Excluded) ---');
  const listRes = await fetch('http://localhost:3000/api/doctors/list?status=published&limit=100');
  const listData = await listRes.json();
  const demoInList = listData.doctors?.filter(d => d.basicInfo?.doctorName?.startsWith('Demo Doctor')) || [];
  check('API is accessible', listRes.status, 200);
  check('Demo doctors returned in public list', demoInList.length, 0, `should be 0, got ${demoInList.length}`);

  // === D. Public API: /api/doctors/get ===
  console.log('\n--- D. Public API /api/doctors/get (Demo Doctor Must Return 404) ---');
  const getRes = await fetch('http://localhost:3000/api/doctors/get?slug=demo-doctor-mumbai');
  check('/api/doctors/get?slug=demo-doctor-mumbai', getRes.status, 404, 'should 404 for demo slugs');

  // === E. Admin API: /api/doctors/admin-list ===
  console.log('\n--- E. Admin API /api/doctors/admin-list (Unauthenticated: Must Return 401) ---');
  const adminListRes = await fetch('http://localhost:3000/api/doctors/admin-list?status=published&limit=100');
  check('/api/doctors/admin-list without auth', adminListRes.status, 401, 'must be blocked without admin session');

  // === F. Branch Pages: Demo doctors must still render ===
  console.log('\n--- F. Branch Pages (Demo Doctors Must Render via assignedDoctor) ---');
  const branchPages = [
    { slug: 'hair-transplant-in-mumbai', expectedDoctor: 'Demo Doctor — Mumbai' },
    { slug: 'hair-transplant-in-hyderabad', expectedDoctor: 'Demo Doctor — Hyderabad' },
    { slug: 'hair-transplant-in-bangalore', expectedDoctor: 'Demo Doctor — Bangalore' },
    { slug: 'hair-transplant-in-gurgaon', expectedDoctor: 'Demo Doctor — Gurgaon' },
  ];
  for (const b of branchPages) {
    const res = await fetch(`http://localhost:3000/${b.slug}`);
    const html = await res.text();
    const section = extractSurgeonSection(html);
    check(`/${b.slug} HTTP 200`, res.status, 200);
    check(`/${b.slug} section visible`, section !== null, true);
    check(`/${b.slug} correct doctor name`, section ? section.includes(b.expectedDoctor) : false, true, b.expectedDoctor);
    check(`/${b.slug} no WhatsApp CTA`, section ? !section.includes('api.whatsapp.com') : true, true);
    check(`/${b.slug} no fake badge`, section ? !section.includes('Board Certified') : true, true);
  }

  // === G. Delhi Regression ===
  console.log('\n--- G. Delhi Regression Test ---');
  const delhiRes = await fetch('http://localhost:3000/hair-transplant-in-delhi');
  const delhiHtml = await delhiRes.text();
  const delhiSection = extractSurgeonSection(delhiHtml);
  check('/hair-transplant-in-delhi HTTP 200', delhiRes.status, 200);
  check('Delhi section visible', delhiSection !== null, true);
  check('Delhi has Dr. Pranendra Singh', delhiSection ? delhiSection.includes('Dr. Pranendra Singh') : false, true);
  check('Delhi has Turkey Certified badge', delhiSection ? delhiSection.includes('Turkey Certified') : false, true);
  check('Delhi has WhatsApp CTA', delhiSection ? delhiSection.includes('api.whatsapp.com') : false, true);
  check('Delhi has no Demo Doctor text', delhiHtml.includes('Demo Doctor'), false);

  // === H. No Fallback Contamination on Demo Standalone Pages ===
  // (Already covered by 404 — demo pages never render any content)
  console.log('\n--- H. Fallback Contamination on Demo Standalone Pages (Moot due to 404) ---');
  for (const slug of ['demo-doctor-mumbai', 'demo-doctor-gurgaon']) {
    const res = await fetch(`http://localhost:3000/doctors/${slug}`);
    const html = await res.text();
    check(`/doctors/${slug} has no 5.0 rating fallback`, res.status === 404 || !html.includes('5.0'), true);
    check(`/doctors/${slug} has no turkey-doctor.jpg`, res.status === 404 || !html.includes('turkey-doctor.jpg'), true);
    check(`/doctors/${slug} has no Sapphire FUE fallback`, res.status === 404 || !html.includes('Sapphire FUE'), true);
  }

  // === I. SEO robots for demo records ===
  console.log('\n--- I. SEO robots for Demo Doctor Records (noindex, nofollow) ---');
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const demos = await db.collection('doctors').find({ slug: /^demo-doctor-/i }).project({ slug: 1, 'seo.robots': 1 }).toArray();
  const allNoindex = demos.every(d => d.seo?.robots === 'noindex, nofollow');
  check('All 19 demo records have seo.robots = "noindex, nofollow"', allNoindex, true, `${demos.length} records checked`);
  const wrongRobots = demos.filter(d => d.seo?.robots !== 'noindex, nofollow');
  if (wrongRobots.length > 0) {
    console.log(`  ⚠️  Problem records: ${wrongRobots.map(d => d.slug).join(', ')}`);
  }

  console.log('\n==========================================================');
  console.log(`OVERALL: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
  console.log('==========================================================');

  process.exit(allPassed ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
