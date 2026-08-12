const fs = require('fs');
const path = require('path');

// Read SurgeryPageClient.js text to inspect headings and city references directly in JSX
const clientFilePath = path.join(__dirname, '..', 'src', 'components', 'surgery', 'SurgeryPageClient.js');
const fileContent = fs.readFileSync(clientFilePath, 'utf8');

console.log("========================================");
console.log("SURGERY PAGE CLIENT DOM & HEADING AUDIT");
console.log("========================================");

// 1. Audit H1 tags
const h1Matches = fileContent.match(/<h1[\s\S]*?<\/h1>/gi) || [];
console.log(`\n1. H1 Count in JSX: ${h1Matches.length}`);
h1Matches.forEach((h1, i) => console.log(`   H1 #${i+1}: ${h1.replace(/\s+/g, ' ')}`));

// 2. Audit H2 tags
const h2Matches = fileContent.match(/<h2[\s\S]*?<\/h2>/gi) || [];
console.log(`\n2. H2 Count in JSX: ${h2Matches.length}`);
h2Matches.forEach((h2, i) => {
  const clean = h2.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`   H2 #${i+1}: ${clean}`);
});

// 3. Audit H3 tags
const h3Matches = fileContent.match(/<h3[\s\S]*?<\/h3>/gi) || [];
console.log(`\n3. H3 Count in JSX: ${h3Matches.length}`);
h3Matches.forEach((h3, i) => {
  const clean = h3.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  console.log(`   H3 #${i+1}: ${clean}`);
});

// Check demoted items
console.log("\n4. Demotion Checks:");
console.log(`   - 'Suitable Candidates' in H3: ${fileContent.includes('<h3 className="font-extrabold text-base sm:text-lg text-emerald-600">Suitable Candidates</h3>') ? '🔴 FAIL' : '✅ PASS (Demoted to span)'}`);
console.log(`   - 'Not Suitable If...' in H3: ${fileContent.includes('<h3 className="font-extrabold text-base sm:text-lg text-[#D32F2F]">Not Suitable If...</h3>') ? '🔴 FAIL' : '✅ PASS (Demoted to span)'}`);
console.log(`   - Form Title in H3: ${fileContent.includes('<h3 className="text-2xl font-black text-gray-900 mb-6 font-outfit">{formTitle}</h3>') ? '🔴 FAIL' : '✅ PASS (Demoted to p)'}`);
console.log(`   - Recovery H3 'Results at 6, 12 and 24 months': ${fileContent.includes('Results at 6, 12 and 24 months') ? '✅ PASS' : '🔴 FAIL'}`);

// Check exact marketing fallback headings
console.log("\n5. Exact Fallback Headings Verification:");
console.log(`   - Recovery H2 Fallback: ${fileContent.includes('Hair transplant recovery in ${cityName}: what to expect week by week') ? '✅ PASS' : '🔴 FAIL'}`);
console.log(`   - Results H2 Fallback: ${fileContent.includes('Hair transplant before and after results — ${cityName} patients') ? '✅ PASS' : '🔴 FAIL'}`);
console.log(`   - Consult H2 Fallback: ${fileContent.includes('Book your hair transplant surgery consultation in ${cityName}') ? '✅ PASS' : '🔴 FAIL'}`);
console.log(`   - Cost Page Link: ${fileContent.includes('href={`/cost/hair-transplant-cost-in-${cityName.toLowerCase()}`}') ? '✅ PASS' : '🔴 FAIL'}`);
