import http from 'http';

const DOCTOR_ROUTES = [
  {
    slug: 'hair-transplant-doctor-in-delhi',
    expectedCity: 'Delhi',
    forbiddenCity: 'Patna',
    doctorName: 'Dr. Pranendra Singh',
  },
  {
    slug: 'dr-himanshu-jawla',
    expectedCity: 'Delhi',
    forbiddenCity: 'Patna',
    doctorName: 'Dr. Himanshu Jawla',
  },
  {
    slug: 'hair-transplant-doctor-in-mumbai',
    expectedCity: 'Mumbai',
    forbiddenCity: 'Delhi',
    doctorName: 'Dr. Aman Singh Gosain',
  },
  {
    slug: 'hair-transplant-doctor-in-hyderabad',
    expectedCity: 'Hyderabad',
    forbiddenCity: 'Delhi',
    doctorName: 'Dr. Himanshu Jawla',
  },
  {
    slug: 'hair-transplant-doctor-in-patna',
    expectedCity: 'Patna',
    forbiddenCity: 'Delhi',
    doctorName: 'Dr. Pranendra Singh (Copy)',
  },
];

function fetchHTML(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, html: data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('=== VERIFYING DOCTOR CITY ISOLATION ===\n');
  let allPassed = true;

  for (const doc of DOCTOR_ROUTES) {
    const path = `/doctors/${doc.slug}`;
    try {
      const res = await fetchHTML(path);
      if (res.status !== 200) {
        console.error(`❌ [FAIL] ${path} returned status ${res.status}`);
        allPassed = false;
        continue;
      }

      const html = res.html;
      
      // Check that expected city appears in key locations
      const hasExpectedCity = html.includes(doc.expectedCity);
      
      // Check city-specific section headings for forbidden city leaks
      // Headings that should have the doctor's city
      const credentialMatch = html.includes(`Credentials to look for in a hair transplant doctor in ${doc.expectedCity}`)
        || html.includes(`Credentials to look for in a hair transplant doctor`);
      
      const comparisonMatch = html.includes(`Doctor-led vs technician-led surgery in ${doc.expectedCity}`)
        || html.includes(`Doctor-led vs technician-led surgery`);
        
      const questionsMatch = html.includes(`Questions to ask your hair transplant doctor in ${doc.expectedCity}`)
        || html.includes(`Questions to ask your hair transplant doctor`);

      const proceduresMatch = html.includes(`Procedures our hair transplant doctors in ${doc.expectedCity} perform`)
        || html.includes(`Procedures our hair transplant doctors perform`);

      const pricingMatch = html.includes(`Cost of consulting a hair transplant doctor in ${doc.expectedCity}`)
        || html.includes(`Hair Transplant Cost in ${doc.expectedCity}`);

      // Check if forbidden city leaked into city-specific section headings
      const forbiddenCredentialLeak = html.includes(`Credentials to look for in a hair transplant doctor in ${doc.forbiddenCity}`);
      const forbiddenComparisonLeak = html.includes(`Doctor-led vs technician-led surgery in ${doc.forbiddenCity}`);
      const forbiddenQuestionsLeak = html.includes(`Questions to ask your hair transplant doctor in ${doc.forbiddenCity}`);
      const forbiddenProceduresLeak = html.includes(`Procedures our hair transplant doctors in ${doc.forbiddenCity} perform`);
      const forbiddenCostLeak = html.includes(`Cost of consulting a hair transplant doctor in ${doc.forbiddenCity}`);
      const forbiddenFaqLeak = html.includes(`hair transplant doctors in ${doc.forbiddenCity}`);

      const hasLeak = forbiddenCredentialLeak || forbiddenComparisonLeak || forbiddenQuestionsLeak || forbiddenProceduresLeak || forbiddenCostLeak || forbiddenFaqLeak;

      if (!hasLeak && hasExpectedCity) {
        console.log(`✅ [PASS] ${path}`);
        console.log(`   - Expected City: "${doc.expectedCity}" verified`);
        console.log(`   - Zero "${doc.forbiddenCity}" leakage in template headings`);
      } else {
        console.error(`❌ [FAIL] ${path}`);
        if (hasLeak) {
          console.error(`   - Leaked forbidden city "${doc.forbiddenCity}" in section headings!`);
        }
        if (!hasExpectedCity) {
          console.error(`   - Missing expected city "${doc.expectedCity}"!`);
        }
        allPassed = false;
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${path}: ${err.message}`);
      allPassed = false;
    }
  }

  console.log('\n=======================================');
  if (allPassed) {
    console.log('🎉 ALL DOCTOR CITY ISOLATION TESTS PASSED!');
    process.exit(0);
  } else {
    console.error('💥 SOME TESTS FAILED');
    process.exit(1);
  }
}

run();
