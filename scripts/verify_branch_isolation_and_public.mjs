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

async function main() {
  console.log('=== VERIFYING BRANCH PUBLIC PAGES & DOCTOR ISOLATION ===\n');

  // 1. Verify Delhi Page
  console.log('--- 1. Testing Delhi Branch (/hair-transplant-in-delhi) ---');
  const resDelhi = await fetch('http://localhost:3000/hair-transplant-in-delhi');
  const htmlDelhi = await resDelhi.text();
  const delhiSurgeon = extractSurgeonSection(htmlDelhi);

  const delhiChecks = {
    http200: resDelhi.status === 200,
    hasSurgeonSection: delhiSurgeon !== null,
    hasDoctorName: delhiSurgeon?.includes('Dr. Pranendra Singh') ?? false,
    hasDoctorImage: delhiSurgeon?.includes('/uploads/turkey-doctor.jpg') ?? false,
    hasEyebrow: delhiSurgeon?.includes('YOUR SURGEON IN DELHI') ?? false,
    hasBadgeTurkey: delhiSurgeon?.includes('Turkey Certified') ?? false,
    noBoardCertified: !delhiSurgeon?.includes('Board Certified'),
    hasAIIMS: delhiSurgeon?.includes('AIIMS') ?? false,
    hasPGIMER: delhiSurgeon?.includes('PGIMER') ?? false,
    hasMCh: /mch.*plastic\s*surgery/i.test(delhiSurgeon || ''),
    hasDMC: delhiSurgeon?.includes('DMC-68492') ?? false,
    hasTurkishTechnique: delhiSurgeon?.includes('Turkish Technique (THI)') ?? false,
    hasProfileLink: delhiSurgeon?.includes('/doctors/hair-transplant-doctor-in-delhi') ?? false,
    hasWhatsAppCTA: (delhiSurgeon?.includes('api.whatsapp.com') && delhiSurgeon?.includes('Book Consultation')) ?? false,
    noPlaceholderDegree: !delhiSurgeon?.includes('Primary Medical Degree'),
    noPlaceholderLicense: !delhiSurgeon?.includes('Statutory Medical License'),
    noOralMaxillofacial: !delhiSurgeon?.includes('Oral &amp; Maxillofacial') && !delhiSurgeon?.includes('Maxillofacial')
  };

  for (const [k, v] of Object.entries(delhiChecks)) {
    console.log(`  [${v ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
  }

  // 2. Verify Mumbai Page (Isolation check: no doctor assigned -> section MUST NOT render)
  console.log('\n--- 2. Testing Mumbai Branch (/hair-transplant-in-mumbai) ---');
  const resMumbai = await fetch('http://localhost:3000/hair-transplant-in-mumbai');
  const htmlMumbai = await resMumbai.text();
  const mumbaiSurgeon = extractSurgeonSection(htmlMumbai);

  const mumbaiChecks = {
    http200: resMumbai.status === 200,
    noSurgeonSection: mumbaiSurgeon === null
  };

  for (const [k, v] of Object.entries(mumbaiChecks)) {
    console.log(`  [${v ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
  }

  // 3. Verify Gurgaon Page (Isolation check: no doctor assigned -> section MUST NOT render)
  console.log('\n--- 3. Testing Gurgaon Branch (/hair-transplant-in-gurgaon) ---');
  const resGurgaon = await fetch('http://localhost:3000/hair-transplant-in-gurgaon');
  const htmlGurgaon = await resGurgaon.text();
  const gurgaonSurgeon = extractSurgeonSection(htmlGurgaon);

  const gurgaonChecks = {
    http200: resGurgaon.status === 200,
    noSurgeonSection: gurgaonSurgeon === null
  };

  for (const [k, v] of Object.entries(gurgaonChecks)) {
    console.log(`  [${v ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
  }

  // 4. Verify Bangalore Page (Isolation check: no doctor assigned -> section MUST NOT render)
  console.log('\n--- 4. Testing Bangalore Branch (/hair-transplant-in-bangalore) ---');
  const resBlr = await fetch('http://localhost:3000/hair-transplant-in-bangalore');
  const htmlBlr = await resBlr.text();
  const blrSurgeon = extractSurgeonSection(htmlBlr);

  const blrChecks = {
    http200: resBlr.status === 200,
    noSurgeonSection: blrSurgeon === null
  };

  for (const [k, v] of Object.entries(blrChecks)) {
    console.log(`  [${v ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
  }

  // 5. Admin API Verification: check in DB
  console.log('\n--- 5. Testing DB State for Admin Services ---');
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const delhiDoc = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi' });
  const mumbaiDoc = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-mumbai' });
  const gurgaonDoc = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-gurgaon' });

  console.log('Delhi in DB: assignedDoctor =', String(delhiDoc.assignedDoctor), '| meetYourSurgeon.enabled =', delhiDoc.meetYourSurgeon?.enabled);
  console.log('Mumbai in DB: assignedDoctor =', mumbaiDoc.assignedDoctor, '| meetYourSurgeon.enabled =', mumbaiDoc.meetYourSurgeon?.enabled);
  console.log('Gurgaon in DB: assignedDoctor =', gurgaonDoc.assignedDoctor, '| meetYourSurgeon.enabled =', gurgaonDoc.meetYourSurgeon?.enabled);

  const allPassed = Object.values(delhiChecks).every(Boolean) &&
                    Object.values(mumbaiChecks).every(Boolean) &&
                    Object.values(gurgaonChecks).every(Boolean) &&
                    Object.values(blrChecks).every(Boolean) &&
                    delhiDoc.meetYourSurgeon?.enabled === true &&
                    mumbaiDoc.meetYourSurgeon?.enabled === false &&
                    gurgaonDoc.meetYourSurgeon?.enabled === false;

  console.log('\n=======================================');
  console.log(`OVERALL ISOLATION & VERIFICATION RESULT: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILED ❌'}`);
  console.log('=======================================');

  process.exit(allPassed ? 0 : 1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
