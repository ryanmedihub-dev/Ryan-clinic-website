import mongoose from 'mongoose';
import fs from 'fs';

const backupPath = 'scratch/mongo_backup_before_graft_standardization.json';
if (!fs.existsSync(backupPath)) {
  console.error('[CRITICAL] Backup file does not exist at ' + backupPath);
  process.exit(1);
}
const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error('[CRITICAL] No MONGO_URL in environment!');
  process.exit(1);
}

await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

function getNestedValue(obj, pathStr) {
  const parts = pathStr.replace(/\[(\d+)\]/g, '.$1').split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = current[part];
  }
  return current;
}

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

const treatmentServiceSlugs = [
  'fue-hair-transplant',
  'hairline-transplant',
  'beard-transplant',
  'eyebrow-transplant'
];

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

const surgeryPageSlug = 'hair-transplant-surgery-in-mumbai';

const results = {
  verifiedAt: new Date().toISOString(),
  services: { count: 0, fieldsVerified: 0, errors: [] },
  doctors: { count: 0, fieldsVerified: 0, errors: [] },
  surgerypages: { count: 0, fieldsVerified: 0, errors: [] },
  excludedDocsCheck: { count: 0, verifiedUnchanged: 0, errors: [] },
  totalVerifiedDocs: 0,
  totalVerifiedFields: 0,
  failuresCount: 0,
  skippedFieldsCount: 0
};

// ─── 1. Verify Services ────────────────────────────────────────────────────────
const servicesCol = db.collection('services');

for (const slug of cityBranchServiceSlugs) {
  const doc = await servicesCol.findOne({ 'metadata.pageurl': slug });
  if (!doc) {
    results.services.errors.push(`Doc not found: ${slug}`);
    continue;
  }
  results.services.count++;

  const checks = [
    { field: 'bannerData.description', test: val => val?.includes('97% graft survival') && !val?.includes('90%+'), desc: '97% in bannerData.description' },
    { field: 'metadata.description', test: val => val?.includes('97% graft survival') && !val?.includes('90%+'), desc: '97% in metadata.description' },
    { field: 'metadata.overviewData', test: val => val?.includes('97%') && !val?.includes('90%+'), desc: '97% in metadata.overviewData' },
    { field: 'typesData.details', test: val => val?.includes('97% graft survival') && !val?.includes('90%+'), desc: '97% in typesData.details' },
    { field: 'faq[12].answer', test: val => val?.includes('97%') && !val?.includes('90%+'), desc: '97% in faq[12].answer' }
  ];

  checks.forEach(c => {
    const val = getNestedValue(doc, c.field);
    if (c.test(val)) {
      results.services.fieldsVerified++;
    } else {
      results.services.errors.push(`Field ${c.field} failed in ${slug}: ${val}`);
      results.failuresCount++;
    }
  });
}

for (const slug of treatmentServiceSlugs) {
  const doc = await servicesCol.findOne({ 'metadata.pageurl': slug });
  if (!doc) {
    results.services.errors.push(`Treatment doc not found: ${slug}`);
    continue;
  }
  results.services.count++;

  const val = doc.metadata?.description;
  if (val && (val.includes('97%') || val.includes('97% graft')) && !val.includes('90%+')) {
    results.services.fieldsVerified++;
  } else {
    results.services.errors.push(`metadata.description failed in ${slug}: ${val}`);
    results.failuresCount++;
  }
}

// ─── 2. Verify Doctors ────────────────────────────────────────────────────────
const doctorsCol = db.collection('doctors');

for (const slug of publishedDoctorSlugs) {
  const doc = await doctorsCol.findOne({ slug });
  if (!doc) {
    results.doctors.errors.push(`Doctor doc not found: ${slug}`);
    continue;
  }
  results.doctors.count++;

  // basicInfo.successRate must be exactly "97%"
  if (doc.basicInfo?.successRate === '97%') {
    results.doctors.fieldsVerified++;
  } else {
    results.doctors.errors.push(`basicInfo.successRate failed in ${slug}: ${doc.basicInfo?.successRate}`);
    results.failuresCount++;
  }

  // Check additional marketing fields where present
  if (doc.seo?.metaDescription) {
    if (doc.seo.metaDescription.includes('97% success rate')) results.doctors.fieldsVerified++;
    else if (doc.seo.metaDescription.includes('97%+')) results.doctors.errors.push(`seo.metaDescription has 97%+ in ${slug}`);
  }

  if (doc.surgeonProfile?.about) {
    if (doc.surgeonProfile.about.includes('97% graft survival rate')) results.doctors.fieldsVerified++;
    else if (doc.surgeonProfile.about.includes('97%+')) results.doctors.errors.push(`surgeonProfile.about has 97%+ in ${slug}`);
  }

  if (doc.doctorCard?.cardDescription) {
    if (doc.doctorCard.cardDescription.includes('97% graft survival rate')) results.doctors.fieldsVerified++;
    else if (doc.doctorCard.cardDescription.includes('97%+')) results.doctors.errors.push(`doctorCard.cardDescription has 97%+ in ${slug}`);
  }

  (doc.doctorCard?.certifications || []).forEach(c => {
    if (c.includes('97% Graft Survival')) results.doctors.fieldsVerified++;
    else if (c.includes('97%+')) results.doctors.errors.push(`doctorCard.certifications has 97%+ in ${slug}`);
  });

  (doc.credentials?.tabs || []).forEach(t => {
    if (t.description?.includes('97% graft survival')) results.doctors.fieldsVerified++;
    else if (t.description?.includes('97%+')) results.doctors.errors.push(`credentials.tabs has 97%+ in ${slug}`);
  });

  (doc.surgeonProfile?.achievements || []).forEach(a => {
    if (a.description?.includes('97% graft survival')) results.doctors.fieldsVerified++;
    else if (a.description?.includes('97%+')) results.doctors.errors.push(`surgeonProfile.achievements has 97%+ in ${slug}`);
  });
}

// ─── 3. Verify SurgeryPages ───────────────────────────────────────────────────
const surgeryCol = db.collection('surgerypages');
const mumbaiSurgery = await surgeryCol.findOne({ slug: surgeryPageSlug });
if (mumbaiSurgery) {
  results.surgerypages.count++;
  const desc = mumbaiSurgery.qualityBenchmarks?.benchmarkCards?.[3]?.description;
  if (desc === '97% graft survival rate standard.') {
    results.surgerypages.fieldsVerified++;
  } else {
    results.surgerypages.errors.push(`benchmarkCards[3].description failed: ${desc}`);
    results.failuresCount++;
  }
} else {
  results.surgerypages.errors.push(`Surgery doc not found: ${surgeryPageSlug}`);
}

// ─── 4. Verify 6 Excluded Documents ───────────────────────────────────────────
const blogsCol = db.collection('blogs');

// A. Ranchi
const liveRanchi = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-rachi' });
const backupRanchi = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-rachi');
results.excludedDocsCheck.count++;
if (liveRanchi && JSON.stringify(liveRanchi.metadata) === JSON.stringify(backupRanchi.metadata)) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Ranchi document was modified!');
  results.failuresCount++;
}

// B. Delhi copy 1
const liveCopy1 = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi-copy' });
const backupCopy1 = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-delhi-copy');
results.excludedDocsCheck.count++;
if (liveCopy1 && JSON.stringify(liveCopy1.metadata) === JSON.stringify(backupCopy1.metadata)) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Delhi copy 1 was modified!');
  results.failuresCount++;
}

// C. Delhi copy 2
const liveCopy2 = await servicesCol.findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi-copy-2' });
const backupCopy2 = backupData.collections.services.find(s => s.metadata?.pageurl === 'hair-transplant-in-delhi-copy-2');
results.excludedDocsCheck.count++;
if (liveCopy2 && JSON.stringify(liveCopy2.metadata) === JSON.stringify(backupCopy2.metadata)) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Delhi copy 2 was modified!');
  results.failuresCount++;
}

// D. Blog beard-transplant-delhi
const liveBlog = await blogsCol.findOne({ _id: new mongoose.Types.ObjectId('69fed5508fcc5066687a84fd') });
const backupBlog = backupData.collections.blogs.find(b => b._id === '69fed5508fcc5066687a84fd');
results.excludedDocsCheck.count++;
if (liveBlog && liveBlog.blogContent === backupBlog.blogContent) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Blog beard-transplant-delhi was modified!');
  results.failuresCount++;
}

// E. Doctor draft copy
const liveDocDraft = await doctorsCol.findOne({ slug: 'hair-transplant-doctor-in-gurgaon-copy' });
const backupDocDraft = backupData.collections.doctors.find(d => d.slug === 'hair-transplant-doctor-in-gurgaon-copy');
results.excludedDocsCheck.count++;
if (liveDocDraft && liveDocDraft.basicInfo?.successRate === backupDocDraft.basicInfo?.successRate) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Doctor draft copy was modified!');
  results.failuresCount++;
}

// F. Doctor legacy
const liveDocLegacy = await doctorsCol.findOne({ slug: 'dr-pranendra-singh' });
const backupDocLegacy = backupData.collections.doctors.find(d => d.slug === 'dr-pranendra-singh');
results.excludedDocsCheck.count++;
if (liveDocLegacy && liveDocLegacy.basicInfo?.successRate === backupDocLegacy.basicInfo?.successRate) {
  results.excludedDocsCheck.verifiedUnchanged++;
} else {
  results.excludedDocsCheck.errors.push('Doctor legacy record was modified!');
  results.failuresCount++;
}

results.totalVerifiedDocs = results.services.count + results.doctors.count + results.surgerypages.count;
results.totalVerifiedFields = results.services.fieldsVerified + results.doctors.fieldsVerified + results.surgerypages.fieldsVerified;

console.log(JSON.stringify(results, null, 2));

fs.writeFileSync('scratch/migration_verification_report.json', JSON.stringify(results, null, 2), 'utf8');

await mongoose.disconnect();

