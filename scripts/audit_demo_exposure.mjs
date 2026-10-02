import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function audit() {
  console.log('========================================================');
  console.log('AUDIT: PUBLIC ACCESSIBILITY & INDEXABILITY OF DEMO DOCTORS');
  console.log('========================================================\n');

  // Check 1: Direct route /doctors/[demo-slug]
  console.log('--- 1. Testing Direct Route: /doctors/demo-doctor-mumbai ---');
  const resDemoPage = await fetch('http://localhost:3000/doctors/demo-doctor-mumbai');
  const htmlDemoPage = await resDemoPage.text();
  console.log('HTTP Status:', resDemoPage.status);
  console.log('Page Title:', htmlDemoPage.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('Robots Meta:', htmlDemoPage.match(/<meta[^>]*robots[^>]*>/i)?.[0]);
  console.log('Contains "Doctor Profile Pending":', htmlDemoPage.includes('Doctor Profile Pending'));
  console.log('Contains "Demo Doctor — Mumbai":', htmlDemoPage.includes('Demo Doctor — Mumbai'));
  console.log('Contains "5.0" rating fallback:', htmlDemoPage.includes('5.0') || htmlDemoPage.includes('★'));
  console.log('Contains fallback image /uploads/turkey-doctor.jpg:', htmlDemoPage.includes('/uploads/turkey-doctor.jpg'));

  // Check 2: Public Doctor Directory /doctors
  console.log('\n--- 2. Testing Public Doctor Directory: /doctors ---');
  const resDirectory = await fetch('http://localhost:3000/doctors');
  const htmlDirectory = await resDirectory.text();
  const demoInDirectory = htmlDirectory.includes('Demo Doctor');
  console.log('Does /doctors directory include Demo Doctors?', demoInDirectory);
  if (demoInDirectory) {
    const demoMatches = [...new Set(htmlDirectory.match(/Demo Doctor — [a-zA-Z]+/g))];
    console.log(`Found ${demoMatches.length} demo doctors in /doctors:`, demoMatches.slice(0, 5));
  }

  // Check 3: Public Doctor API /api/doctors/list
  console.log('\n--- 3. Testing Public Doctor API: /api/doctors/list ---');
  const resApi = await fetch('http://localhost:3000/api/doctors/list?status=published&limit=100');
  const dataApi = await resApi.json();
  const demoInApi = dataApi.doctors?.filter(d => d.basicInfo?.doctorName?.startsWith('Demo Doctor'));
  console.log('API accessible without auth:', resApi.status === 200);
  console.log(`Demo doctors returned in public API: ${demoInApi?.length} of ${dataApi.doctors?.length}`);

  // Check 4: Public Doctor API /api/doctors/get
  console.log('\n--- 4. Testing Public Doctor API: /api/doctors/get?slug=demo-doctor-mumbai ---');
  const resGetApi = await fetch('http://localhost:3000/api/doctors/get?slug=demo-doctor-mumbai');
  const dataGetApi = await resGetApi.json();
  console.log('/api/doctors/get accessible without auth:', resGetApi.status === 200);
  console.log('Doctor returned:', dataGetApi.doctor?.basicInfo?.doctorName);

  // Check 5: Is status="published" required for branch OurDoctorSection?
  console.log('\n--- 5. Checking Requirement of status="published" for Branch Rendering ---');
  // Check src/app/(root)/[slug]/page.js:
  // lines 188-198:
  // const isDoctorPublished = doctor?.status ? String(doctor.status).toLowerCase() === "published" : true;
  console.log('Checking [slug]/page.js code requirement:');
  console.log('`isDoctorPublished = doctor?.status ? String(doctor.status).toLowerCase() === "published" : true;`');
  console.log('`if (!isEligible) return null;`');

  process.exit(0);
}

audit().catch(err => {
  console.error(err);
  process.exit(1);
});
