import mongoose from 'mongoose';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let MONGO_URL = process.env.MONGO_URL;
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGO_URL=["']?([^"'\r\n]+)["']?/);
    if (match) MONGO_URL = match[1];
  }
} catch (e) {}

if (!MONGO_URL) {
  MONGO_URL = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';
}

const ALL_11_ROUTES = [
  { slug: 'dr-pranendra-singh', city: 'Delhi', expectedStatus: 'published' },
  { slug: 'dr-pranendra-singh-mumbai', city: 'Mumbai', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-hyderabad', city: 'Hyderabad', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-pune', city: 'Pune', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-patna', city: 'Patna', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-kolkata', city: 'Kolkata', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-jammu', city: 'Jammu', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-ahmedabad', city: 'Ahmedabad', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-chennai', city: 'Chennai', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-lucknow', city: 'Lucknow', expectedStatus: 'draft' },
  { slug: 'dr-pranendra-singh-bangalore', city: 'Bangalore', expectedStatus: 'draft' },
];

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: 'GET',
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, html: data });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('====================================================');
  console.log('RYAN CLINIC — VERIFY ALL 11 DR. PRANENDRA SINGH PAGES');
  console.log('====================================================\n');

  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db;
  const collection = db.collection('doctors');

  let dbPass = true;
  let httpPass = true;

  console.log('--- 1. DATABASE RECORD & INTEGRITY VERIFICATION ---');
  for (const item of ALL_11_ROUTES) {
    const doc = await collection.findOne({ slug: item.slug });

    if (!doc) {
      console.error(`❌ [FAIL] Missing document for slug: "${item.slug}"`);
      dbPass = false;
      continue;
    }

    const errors = [];
    if (doc.deletedAt !== null) errors.push(`deletedAt is not null (${doc.deletedAt})`);
    if (doc.basicInfo?.doctorName !== 'Dr. Pranendra Singh') errors.push(`doctorName mismatch: "${doc.basicInfo?.doctorName}"`);
    if (doc.basicInfo?.city !== item.city) errors.push(`city mismatch: expected "${item.city}", got "${doc.basicInfo?.city}"`);
    if (doc.status !== item.expectedStatus) errors.push(`status mismatch: expected "${item.expectedStatus}", got "${doc.status}"`);
    if (!doc.seo?.canonicalUrl?.includes(item.slug)) errors.push(`canonical URL mismatch: "${doc.seo?.canonicalUrl}"`);

    if (errors.length === 0) {
      console.log(`✅ [DB PASS] ${item.city.padEnd(10)} | slug: ${item.slug.padEnd(30)} | status: ${doc.status}`);
    } else {
      console.error(`❌ [DB FAIL] ${item.city.padEnd(10)} | slug: ${item.slug.padEnd(30)}:`);
      errors.forEach(e => console.error(`     - ${e}`));
      dbPass = false;
    }
  }

  console.log('\n--- 2. PUBLIC HTTP & CITY ISOLATION VERIFICATION ---');
  for (const item of ALL_11_ROUTES) {
    const url = `/doctors/${item.slug}`;
    try {
      const res = await fetchRoute(url);
      if (res.status === 200) {
        // Check city isolation in headings
        const html = res.html;
        const hasCity = html.includes(item.city);
        
        let hasLeak = false;
        if (item.city !== 'Delhi') {
          if (html.includes(`Credentials to look for in a hair transplant doctor in Delhi`) ||
              html.includes(`Doctor-led vs technician-led surgery in Delhi`) ||
              html.includes(`Questions to ask your hair transplant doctor in Delhi`)) {
            hasLeak = true;
          }
        }

        if (hasCity && !hasLeak) {
          console.log(`✅ [HTTP 200] ${url.padEnd(38)} | City: ${item.city.padEnd(10)} | Zero Leakage`);
        } else {
          console.error(`⚠️  [HTTP 200] ${url.padEnd(38)} | City Leakage Detected!`);
          httpPass = false;
        }
      } else {
        console.error(`❌ [HTTP ${res.status}] ${url}`);
        httpPass = false;
      }
    } catch (err) {
      console.error(`❌ [HTTP ERR] ${url}: ${err.message}`);
      httpPass = false;
    }
  }

  console.log('\n====================================================');
  if (dbPass && httpPass) {
    console.log('🎉 ALL 11 DR. PRANENDRA SINGH DOCTOR PAGES VERIFIED!');
    await mongoose.disconnect();
    process.exit(0);
  } else {
    console.error('💥 SOME VERIFICATIONS FAILED.');
    await mongoose.disconnect();
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
