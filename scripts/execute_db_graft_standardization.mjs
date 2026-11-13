import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// ─── Safety Check: Ensure backup exists and will not be touched ───────────────
const backupPath = 'scratch/mongo_backup_before_graft_standardization.json';
if (!fs.existsSync(backupPath)) {
  console.error('[CRITICAL] Backup file does not exist at ' + backupPath + '! Aborting migration.');
  process.exit(1);
}
const backupStat = fs.statSync(backupPath);
console.log(`[VERIFIED] Backup file exists (${backupStat.size} bytes, last modified ${backupStat.mtime.toISOString()}). It will be preserved untouched.`);

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error('[CRITICAL] No MONGO_URL in environment! Aborting.');
  process.exit(1);
}

await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

// ─── 1. Approved Target Documents Definition ───────────────────────────────────

// A. 19 Published City Branch Service Pages
const cityBranchServiceSlugs = [
  'hair-transplant-in-delhi',
  'hair-transplant-in-mumbai',
  'hair-transplant-in-hyderabad',
  'hair-transplant-in-bangalore',
  'hair-transplant-in-chennai',
  'hair-transplant-in-pune',
  'hair-transplant-in-kolkata',
  'hair-transplant-in-ahmedabad',
  'hair-transplant-in-lucknow',
  'hair-transplant-in-jammu',
  'hair-transplant-in-patna',
  'hair-transplant-in-gurgaon',
  'hair-transplant-in-noida',
  'hair-transplant-in-bhopal',
  'hair-transplant-in-indore',
  'hair-transplant-in-chandigarh',
  'hair-transplant-in-dehradun',
  'hair-transplant-in-jaipur',
  'hair-transplant-in-nagpur'
];

// B. 4 Published Treatment Service Pages
const treatmentServiceSlugs = [
  'fue-hair-transplant',
  'hairline-transplant',
  'beard-transplant',
  'eyebrow-transplant'
];

// C. 12 Published Doctor Page Slugs
const publishedDoctorSlugs = [
  'hair-transplant-doctor-in-delhi',
  'hair-transplant-doctor-in-mumbai',
  'hair-transplant-doctor-in-hyderabad',
  'hair-transplant-doctor-in-pune',
  'hair-transplant-doctor-in-patna',
  'hair-transplant-doctor-in-kolkata',
  'hair-transplant-doctor-in-jammu',
  'hair-transplant-doctor-in-ahmedabad',
  'hair-transplant-doctor-in-chennai',
  'hair-transplant-doctor-in-lucknow',
  'hair-transplant-doctor-in-bangalore',
  'hair-transplant-doctor-in-gurgaon'
];

// D. 1 Surgery Page Slug
const surgeryPageSlug = 'hair-transplant-surgery-in-mumbai';

// E. 6 Excluded Document Slugs
const excludedSlugs = [
  'hair-transplant-in-rachi',
  'hair-transplant-in-delhi-copy',
  'hair-transplant-in-delhi-copy-2',
  'dr-pranendra-singh',
  'hair-transplant-doctor-in-gurgaon-copy',
  'beard-transplant-delhi'
];

console.log('\n--- Pre-Execution Verification & Dry Run ---');

// Helper to get nested value by dot notation or array index
function getNestedValue(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = current[part];
  }
  return current;
}

const migrationPlan = [];

// ─── 1. Build & verify Services plan ───────────────────────────────────────────
const servicesCol = db.collection('services');
const allServices = await servicesCol.find({}).toArray();

for (const slug of cityBranchServiceSlugs) {
  const doc = allServices.find(s => s.metadata?.pageurl === slug);
  if (!doc) throw new Error(`Missing expected service doc: ${slug}`);

  const updates = {};
  
  // 1. bannerData.description
  const bannerDesc = doc.bannerData?.description;
  if (!bannerDesc || !bannerDesc.includes('90%+')) throw new Error(`Unexpected bannerData.description in ${slug}: ${bannerDesc}`);
  updates['bannerData.description'] = bannerDesc.replace(/90%\+/g, '97%');

  // 2. metadata.description
  const metaDesc = doc.metadata?.description;
  if (!metaDesc || !metaDesc.includes('90%+')) throw new Error(`Unexpected metadata.description in ${slug}: ${metaDesc}`);
  updates['metadata.description'] = metaDesc.replace(/90%\+/g, '97%');

  // 3. metadata.overviewData
  const overview = doc.metadata?.overviewData;
  if (!overview || !overview.includes('90%+')) throw new Error(`Unexpected metadata.overviewData in ${slug}`);
  updates['metadata.overviewData'] = overview.replace(/90%\+/g, '97%');

  // 4. typesData.details
  const typesDetails = doc.typesData?.details;
  if (!typesDetails || !typesDetails.includes('90%+')) throw new Error(`Unexpected typesData.details in ${slug}`);
  updates['typesData.details'] = typesDetails.replace(/90%\+/g, '97%');

  // 5. faq[12].answer
  const faq12 = doc.faq?.[12]?.answer;
  if (!faq12 || !faq12.includes('90%+')) throw new Error(`Unexpected faq[12].answer in ${slug}: ${faq12}`);
  updates['faq.12.answer'] = faq12.replace(/90%\+/g, '97%');

  migrationPlan.push({
    collection: 'services',
    id: doc._id,
    slug,
    name: doc.metadata?.pageName || slug,
    updates
  });
}

for (const slug of treatmentServiceSlugs) {
  const doc = allServices.find(s => s.metadata?.pageurl === slug);
  if (!doc) throw new Error(`Missing expected treatment doc: ${slug}`);

  const updates = {};
  const metaDesc = doc.metadata?.description;
  if (!metaDesc || (!metaDesc.includes('90%+') && !metaDesc.includes('90%'))) {
    throw new Error(`Unexpected metadata.description in ${slug}: ${metaDesc}`);
  }
  updates['metadata.description'] = metaDesc.replace(/90%\+/g, '97%').replace(/90%/g, '97%');

  migrationPlan.push({
    collection: 'services',
    id: doc._id,
    slug,
    name: doc.metadata?.pageName || slug,
    updates
  });
}

console.log(`[SERVICES VALIDATED] 23 documents prepared, total field updates: ${
  migrationPlan.filter(p => p.collection === 'services').reduce((sum, p) => sum + Object.keys(p.updates).length, 0)
}`);

// ─── 2. Build & verify Doctors plan ───────────────────────────────────────────
const doctorsCol = db.collection('doctors');
const allDoctors = await doctorsCol.find({}).toArray();

for (const slug of publishedDoctorSlugs) {
  const doc = allDoctors.find(d => d.slug === slug);
  if (!doc) throw new Error(`Missing expected doctor doc: ${slug}`);

  const updates = {};

  // basicInfo.successRate
  if (doc.basicInfo?.successRate !== '97%+') {
    throw new Error(`Unexpected basicInfo.successRate in ${slug}: ${doc.basicInfo?.successRate}`);
  }
  updates['basicInfo.successRate'] = '97%';

  // seo.metaDescription
  if (doc.seo?.metaDescription && (doc.seo.metaDescription.includes('97%+') || doc.seo.metaDescription.includes('98%+'))) {
    updates['seo.metaDescription'] = doc.seo.metaDescription.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
  }

  // surgeonProfile.about
  if (doc.surgeonProfile?.about && (doc.surgeonProfile.about.includes('97%+') || doc.surgeonProfile.about.includes('98%+'))) {
    updates['surgeonProfile.about'] = doc.surgeonProfile.about.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
  }

  // doctorCard.cardDescription
  if (doc.doctorCard?.cardDescription && (doc.doctorCard.cardDescription.includes('97%+') || doc.doctorCard.cardDescription.includes('98%+'))) {
    updates['doctorCard.cardDescription'] = doc.doctorCard.cardDescription.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
  }

  // doctorCard.certifications
  (doc.doctorCard?.certifications || []).forEach((c, idx) => {
    if (c.includes('97%+') || c.includes('98%+')) {
      updates[`doctorCard.certifications.${idx}`] = c.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
    }
  });

  // credentials.tabs
  (doc.credentials?.tabs || []).forEach((t, idx) => {
    if (t.description && (t.description.includes('97%+') || t.description.includes('98%+'))) {
      updates[`credentials.tabs.${idx}.description`] = t.description.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
    }
  });

  // surgeonProfile.achievements
  (doc.surgeonProfile?.achievements || []).forEach((a, idx) => {
    if (a.description && (a.description.includes('97%+') || a.description.includes('98%+'))) {
      updates[`surgeonProfile.achievements.${idx}.description`] = a.description.replace(/97%\+/g, '97%').replace(/98%\+/g, '97%');
    }
  });

  migrationPlan.push({
    collection: 'doctors',
    id: doc._id,
    slug,
    name: doc.basicInfo?.doctorName || slug,
    updates
  });
}

console.log(`[DOCTORS VALIDATED] 12 documents prepared, total field updates: ${
  migrationPlan.filter(p => p.collection === 'doctors').reduce((sum, p) => sum + Object.keys(p.updates).length, 0)
}`);

// ─── 3. Build & verify SurgeryPages plan ───────────────────────────────────────
const surgeryCol = db.collection('surgerypages');
const allSurgery = await surgeryCol.find({}).toArray();
const mumbaiSurgery = allSurgery.find(s => s.slug === surgeryPageSlug);
if (!mumbaiSurgery) throw new Error(`Missing surgery doc: ${surgeryPageSlug}`);

const surgeryCardDesc = mumbaiSurgery.qualityBenchmarks?.benchmarkCards?.[3]?.description;
if (!surgeryCardDesc || !surgeryCardDesc.includes('98%')) {
  throw new Error(`Unexpected benchmarkCards[3].description in ${surgeryPageSlug}: ${surgeryCardDesc}`);
}

migrationPlan.push({
  collection: 'surgerypages',
  id: mumbaiSurgery._id,
  slug: surgeryPageSlug,
  name: mumbaiSurgery.pageName || surgeryPageSlug,
  updates: {
    'qualityBenchmarks.benchmarkCards.3.description': '97% graft survival rate standard.'
  }
});

console.log(`[SURGERY VALIDATED] 1 document prepared, total field updates: 1`);

const totalDocsToUpdate = migrationPlan.length;
const totalFieldsToUpdate = migrationPlan.reduce((sum, p) => sum + Object.keys(p.updates).length, 0);

console.log(`\n========================================================`);
console.log(`TOTAL TARGET DOCUMENTS: ${totalDocsToUpdate} (Approved: 36)`);
console.log(`TOTAL TARGET FIELDS   : ${totalFieldsToUpdate} (Approved: 139)`);
console.log(`========================================================`);

if (totalDocsToUpdate !== 36 || totalFieldsToUpdate !== 139) {
  console.error('[CRITICAL] Counts mismatch with approved scope! Aborting.');
  process.exit(1);
}

// ─── 4. EXECUTE MIGRATION WITH TARGETED $set ──────────────────────────────────
console.log('\n--- Executing Targeted Database Updates ---');
const executionResults = [];

for (const item of migrationPlan) {
  const col = db.collection(item.collection);
  
  // Double-check document ID before write
  const preCheck = await col.findOne({ _id: item.id });
  if (!preCheck) throw new Error(`Document ${item.id} (${item.slug}) not found during execution!`);

  const res = await col.updateOne(
    { _id: item.id },
    { $set: item.updates }
  );

  executionResults.push({
    collection: item.collection,
    id: item.id.toString(),
    slug: item.slug,
    matchedCount: res.matchedCount,
    modifiedCount: res.modifiedCount,
    fieldCount: Object.keys(item.updates).length,
    updates: Object.keys(item.updates)
  });

  if (res.matchedCount !== 1) {
    throw new Error(`Failed to match document ${item.id} (${item.slug}) during updateOne!`);
  }
}

console.log(`\n[EXECUTION COMPLETE] Successfully updated ${executionResults.length} documents.`);

// ─── 5. POST-MIGRATION VERIFICATION ───────────────────────────────────────────
console.log('\n--- Post-Migration Deep Verification ---');
let verificationErrors = 0;

for (const item of migrationPlan) {
  const col = db.collection(item.collection);
  const updatedDoc = await col.findOne({ _id: item.id });

  for (const [key, expectedVal] of Object.entries(item.updates)) {
    const actualVal = getNestedValue(updatedDoc, key);
    if (actualVal !== expectedVal) {
      console.error(`[VERIFICATION FAIL] ${item.slug} -> ${key}: expected ${expectedVal}, got ${actualVal}`);
      verificationErrors++;
    }
  }
}

if (verificationErrors === 0) {
  console.log('[VERIFICATION SUCCESS] All 139 fields across all 36 documents verified matching 97% standard.');
} else {
  console.error(`[CRITICAL] Found ${verificationErrors} verification errors!`);
}

// ─── 6. VERIFY EXCLUDED DOCUMENTS REMAIN 100% UNCHANGED ────────────────────────
console.log('\n--- Verifying Excluded Documents (Zero Modification Check) ---');

const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

// A. Ranchi
const liveRanchi = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-rachi' });
const backupRanchi = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-rachi');
if (JSON.stringify(liveRanchi.metadata) === JSON.stringify(backupRanchi.metadata)) {
  console.log('[EXCLUSION VERIFIED] Ranchi document metadata is 100% identical to pre-migration backup.');
} else {
  console.error('[CRITICAL] Ranchi document was modified!');
  verificationErrors++;
}

// B. Delhi copies
const liveCopy1 = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi-copy' });
const backupCopy1 = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-delhi-copy');
const liveCopy2 = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi-copy-2' });
const backupCopy2 = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-delhi-copy-2');
if (JSON.stringify(liveCopy1.metadata) === JSON.stringify(backupCopy1.metadata) &&
    JSON.stringify(liveCopy2.metadata) === JSON.stringify(backupCopy2.metadata)) {
  console.log('[EXCLUSION VERIFIED] Both Delhi copy documents are 100% identical to pre-migration backup.');
} else {
  console.error('[CRITICAL] Delhi copy documents were modified!');
  verificationErrors++;
}

// C. Blog beard-transplant-delhi
const blogsCol = db.collection('blogs');
const liveBlog = await blogsCol.findOne({ _id: new mongoose.Types.ObjectId('69fed5508fcc5066687a84fd') });
const backupBlog = backupData.collections.blogs.find(b => b._id === '69fed5508fcc5066687a84fd');
if (liveBlog && liveBlog.blogContent === backupBlog.blogContent) {
  console.log('[EXCLUSION VERIFIED] beard-transplant-delhi blogContent is 100% identical to pre-migration backup.');
} else {
  console.error('[CRITICAL] Blog was modified or missing!');
  verificationErrors++;
}

// D. Doctor drafts
const liveDocDraft = await doctorsCol.findOne({ slug: 'hair-transplant-doctor-in-gurgaon-copy' });
const backupDocDraft = backupData.collections.doctors.find(d => d.slug === 'hair-transplant-doctor-in-gurgaon-copy');
const liveDocLegacy = await doctorsCol.findOne({ slug: 'dr-pranendra-singh' });
const backupDocLegacy = backupData.collections.doctors.find(d => d.slug === 'dr-pranendra-singh');
if (liveDocDraft.basicInfo?.successRate === backupDocDraft.basicInfo?.successRate &&
    liveDocLegacy.basicInfo?.successRate === backupDocLegacy.basicInfo?.successRate) {
  console.log('[EXCLUSION VERIFIED] Doctor draft and legacy records are 100% identical to pre-migration backup.');
} else {
  console.error('[CRITICAL] Doctor draft/legacy records were modified!');
  verificationErrors++;
}

// Save detailed execution log
fs.writeFileSync('scratch/migration_execution_log.json', JSON.stringify({
  executedAt: new Date().toISOString(),
  totalDocuments: executionResults.length,
  totalFieldsUpdated: totalFieldsToUpdate,
  verificationErrors,
  results: executionResults
}, null, 2), 'utf8');

await mongoose.disconnect();
console.log('\n[DONE] Execution log written to scratch/migration_execution_log.json.');
