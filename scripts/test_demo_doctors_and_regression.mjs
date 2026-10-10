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

async function testBranch(slug, expectedDoctor, options = {}) {
  const res = await fetch(`http://localhost:3000/${slug}`);
  const html = await res.text();
  const section = extractSurgeonSection(html);

  const results = {
    slug,
    httpStatus: res.status,
    hasSection: section !== null,
    hasDoctor: section ? section.includes(expectedDoctor) : false,
  };

  if (options.isDemo) {
    results.hasPendingDesignation = section ? section.includes('Doctor Profile Pending') : false;
    results.noBoardCertified = section ? !section.includes('Board Certified') : true;
    results.noTurkeyCertified = section ? !section.includes('Turkey Certified') : true;
    results.noFakeQualifications = section ? !section.includes('Education &amp; Qualifications') && !section.includes('Education & Qualifications') : true;
    results.noFakeCertifications = section ? !section.includes('Certifications &amp; Awards') && !section.includes('Certifications & Awards') : true;
    results.noFakeSpecializations = section ? !section.includes('Specializations') : true;
    results.noWhatsAppCTA = section ? !section.includes('api.whatsapp.com') : true;
    results.noDrPranendra = section ? !section.includes('Dr. Pranendra Singh') : true;
  }

  if (options.isDelhi) {
    results.hasTurkeyBadge = section ? section.includes('Turkey Certified') : false;
    results.noBoardCertified = section ? !section.includes('Board Certified') : true;
    results.hasAIIMS = section ? section.includes('AIIMS') : false;
    results.hasDMC = section ? section.includes('DMC-68492') : false;
    results.hasWhatsAppCTA = section ? section.includes('api.whatsapp.com') : false;
  }

  if (options.shouldBeDisabled) {
    results.sectionCorrectlyHidden = section === null;
  }

  return { results, section };
}

async function main() {
  console.log('=====================================================');
  console.log('COMPREHENSIVE DEMO DOCTOR & BRANCH VERIFICATION SUITE');
  console.log('=====================================================\n');

  let allPassed = true;

  // 1. Delhi Regression Test
  console.log('--- 1. Delhi Regression Test (/hair-transplant-in-delhi) ---');
  const delhi = await testBranch('hair-transplant-in-delhi', 'Dr. Pranendra Singh', { isDelhi: true });
  for (const [k, v] of Object.entries(delhi.results)) {
    if (k === 'slug') continue;
    const pass = (k === 'httpStatus') ? (v === 200) : (v === true);
    if (!pass) allPassed = false;
    console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
  }

  // 2. Demo Branches Public Test
  const demoBranches = [
    { slug: 'hair-transplant-in-mumbai', name: 'Demo Doctor — Mumbai' },
    { slug: 'hair-transplant-in-hyderabad', name: 'Demo Doctor — Hyderabad' },
    { slug: 'hair-transplant-in-bangalore', name: 'Demo Doctor — Bangalore' },
    { slug: 'hair-transplant-in-gurgaon', name: 'Demo Doctor — Gurgaon' },
    { slug: 'hair-transplant-in-chennai', name: 'Demo Doctor — Chennai' },
    { slug: 'hair-transplant-in-pune', name: 'Demo Doctor — Pune' },
    { slug: 'hair-transplant-in-kolkata', name: 'Demo Doctor — Kolkata' },
    { slug: 'hair-transplant-in-noida', name: 'Demo Doctor — Noida' },
  ];

  console.log('\n--- 2. Demo Doctor Branch Tests ---');
  for (const b of demoBranches) {
    const res = await testBranch(b.slug, b.name, { isDemo: true });
    console.log(`\nTesting /${b.slug}:`);
    for (const [k, v] of Object.entries(res.results)) {
      if (k === 'slug') continue;
      const pass = (k === 'httpStatus') ? (v === 200) : (v === true);
      if (!pass) allPassed = false;
      console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
    }
  }

  // 3. Duplicate Delhi branches (must remain disabled)
  console.log('\n--- 3. Duplicate Delhi Branches (Must be disabled) ---');
  const copies = [
    'hair-transplant-in-delhi-copy',
    'hair-transplant-in-delhi-copy-2'
  ];
  for (const c of copies) {
    const res = await testBranch(c, 'NONE', { shouldBeDisabled: true });
    console.log(`\nTesting /${c}:`);
    for (const [k, v] of Object.entries(res.results)) {
      if (k === 'slug' || k === 'hasDoctor' || k === 'hasSection') continue;
      const pass = (k === 'httpStatus') ? (v === 200) : (v === true);
      if (!pass) allPassed = false;
      console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${k}: ${v}`);
    }
  }

  // 4. Single-Source-Of-Truth Live Update Test
  console.log('\n--- 4. Single-Source-of-Truth Live Update Test ---');
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const mumbaiDoc = await db.collection('doctors').findOne({ slug: 'demo-doctor-mumbai' });
  if (!mumbaiDoc) {
    console.error('❌ Could not find demo-doctor-mumbai in DB!');
    allPassed = false;
  } else {
    const originalBio = mumbaiDoc.doctorCard?.cardDescription || '';
    const testBio = 'TEST PROFILE — MUMBAI';

    console.log(`Original bio: "${originalBio}"`);
    console.log(`Updating Mumbai doctor bio to: "${testBio}"...`);
    await db.collection('doctors').updateOne(
      { _id: mumbaiDoc._id },
      { $set: { 'doctorCard.cardDescription': testBio, updatedAt: new Date() } }
    );

    // Fetch Mumbai page
    const updatedRes = await fetch('http://localhost:3000/hair-transplant-in-mumbai');
    const updatedHtml = await updatedRes.text();
    const updatedSection = extractSurgeonSection(updatedHtml);
    const hasTestBio = updatedSection?.includes(testBio) ?? false;

    console.log(`  [${hasTestBio ? 'PASS' : 'FAIL'}] Branch updated with live CMS bio: ${hasTestBio}`);
    if (!hasTestBio) allPassed = false;

    // Restore original bio
    console.log(`Restoring original bio...`);
    await db.collection('doctors').updateOne(
      { _id: mumbaiDoc._id },
      { $set: { 'doctorCard.cardDescription': originalBio, updatedAt: new Date() } }
    );

    const restoredRes = await fetch('http://localhost:3000/hair-transplant-in-mumbai');
    const restoredHtml = await restoredRes.text();
    const restoredSection = extractSurgeonSection(restoredHtml);
    const hasRestoredBio = restoredSection?.includes(originalBio) ?? false;

    console.log(`  [${hasRestoredBio ? 'PASS' : 'FAIL'}] Branch reverted to original bio: ${hasRestoredBio}`);
    if (!hasRestoredBio) allPassed = false;
  }

  console.log('\n=====================================================');
  console.log(`OVERALL TEST RESULT: ${allPassed ? 'ALL TESTS PASSED ✅' : 'FAILURES DETECTED ❌'}`);
  console.log('=====================================================');

  process.exit(allPassed ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
