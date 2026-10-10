// fetch-pranendra-full.mjs — audits ALL fields OurDoctorSection uses for Pranendra
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

if (!MONGO_URL) {
  console.error('No MONGO_URL found');
  process.exit(1);
}

await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

const doc = await db.collection('doctors').findOne({ 'basicInfo.doctorName': /pranendra/i });
if (!doc) {
  console.log('Doctor not found!');
  process.exit(1);
}

console.log('=== PRANENDRA FULL CMS AUDIT ===');
console.log('_id:', doc._id.toString());
console.log('status:', doc.status);
console.log('isActive:', doc.isActive);
console.log('deletedAt:', doc.deletedAt);
console.log('slug:', doc.slug);
console.log('');
console.log('--- basicInfo ---');
console.log(JSON.stringify(doc.basicInfo, null, 2));
console.log('');
console.log('--- doctorCard ---');
console.log(JSON.stringify(doc.doctorCard, null, 2));
console.log('');
console.log('--- credentials ---');
console.log(JSON.stringify(doc.credentials, null, 2));
console.log('');
console.log('--- surgeonProfile ---');
console.log(JSON.stringify(doc.surgeonProfile, null, 2));
console.log('');
console.log('--- keyFacts ---');
console.log(JSON.stringify(doc.keyFacts, null, 2));
console.log('');
console.log('--- hero ---');
console.log(JSON.stringify(doc.hero, null, 2));
console.log('');
console.log('--- stats (direct) ---');
console.log(JSON.stringify(doc.stats, null, 2));
console.log('');
console.log('--- qualifications (direct) ---');
console.log(JSON.stringify(doc.qualifications, null, 2));
console.log('');
console.log('--- certifications (direct) ---');
console.log(JSON.stringify(doc.certifications, null, 2));
console.log('');
console.log('--- specializations (direct) ---');
console.log(JSON.stringify(doc.specializations, null, 2));
console.log('');
console.log('--- bioLines (direct) ---');
console.log(JSON.stringify(doc.bioLines, null, 2));
console.log('');
console.log('--- badge (direct) ---');
console.log(JSON.stringify(doc.badge, null, 2));
console.log('');
console.log('--- medicalReviewer ---');
console.log(JSON.stringify(doc.medicalReviewer, null, 2));
console.log('');
console.log('--- comparison ---');
console.log(JSON.stringify(doc.comparison, null, 2));

await mongoose.disconnect();
