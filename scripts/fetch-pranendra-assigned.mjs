// fetch-pranendra-assigned.mjs — audits the ASSIGNED Pranendra doctor record
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let MONGO_URL = process.env.MONGO_URL;
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGO_URL=[\"']?([^\"'\r\n]+)[\"']?/);
    if (match) MONGO_URL = match[1];
  }
} catch (e) {}

if (!MONGO_URL) { console.error('No MONGO_URL found'); process.exit(1); }

await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

// Fetch ALL Pranendra doctor records to see all of them
const all = await db.collection('doctors').find({ 'basicInfo.doctorName': /pranendra/i }).toArray();
console.log(`Found ${all.length} Pranendra doctor records:`);
all.forEach((d, i) => {
  console.log(`\n[${i+1}] _id: ${d._id} | slug: ${d.slug} | status: ${d.status} | isActive: ${d.isActive} | deletedAt: ${d.deletedAt}`);
});

// The one assigned to hair-transplant-in-delhi service
const service = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi' });
if (!service) { console.log('\nService not found!'); }
else {
  const assignedId = service.assignedDoctor;
  console.log('\n=== ASSIGNED DOCTOR ID from service ===');
  console.log('assignedDoctor:', assignedId?.toString());

  const doc = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(assignedId) });
  if (!doc) {
    console.log('ASSIGNED DOCTOR NOT FOUND IN DB!');
  } else {
    console.log('\n=== ASSIGNED DOCTOR FULL DATA ===');
    console.log('_id:', doc._id.toString());
    console.log('status:', doc.status);
    console.log('isActive:', doc.isActive);
    console.log('deletedAt:', doc.deletedAt);
    console.log('slug:', doc.slug);
    console.log('\n--- basicInfo ---');
    console.log(JSON.stringify(doc.basicInfo, null, 2));
    console.log('\n--- doctorCard ---');
    console.log(JSON.stringify(doc.doctorCard, null, 2));
    console.log('\n--- credentials.tabs (titles & hints) ---');
    if (doc.credentials?.tabs) {
      doc.credentials.tabs.forEach((t, i) => console.log(`  [${i}] "${t.title}" / "${t.hint}"`));
    } else {
      console.log(JSON.stringify(doc.credentials, null, 2));
    }
    console.log('\n--- surgeonProfile.about ---');
    console.log(doc.surgeonProfile?.about);
    console.log('\n--- surgeonProfile.achievements ---');
    console.log(JSON.stringify(doc.surgeonProfile?.achievements, null, 2));
    console.log('\n--- keyFacts ---');
    console.log(JSON.stringify(doc.keyFacts, null, 2));
    console.log('\n--- hero.heroImage ---');
    console.log(JSON.stringify(doc.hero?.heroImage, null, 2));
    console.log('\n--- basicInfo.profileImage ---');
    console.log(JSON.stringify(doc.basicInfo?.profileImage, null, 2));
    console.log('\n--- badge (direct) ---', doc.badge);
    console.log('--- stats (direct) ---', JSON.stringify(doc.stats));
    console.log('--- qualifications (direct) ---', JSON.stringify(doc.qualifications));
    console.log('--- certifications (direct) ---', JSON.stringify(doc.certifications));
    console.log('--- specializations (direct) ---', JSON.stringify(doc.specializations));
    console.log('--- bioLines (direct) ---', JSON.stringify(doc.bioLines));
    console.log('--- medicalReviewer.isVerified ---', doc.medicalReviewer?.isVerified);
    console.log('--- comparison.leftCard.badge ---', doc.comparison?.leftCard?.badge);
  }
}

await mongoose.disconnect();
