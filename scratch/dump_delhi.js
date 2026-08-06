const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (t && !t.startsWith('#') && t.includes('=')) {
      const idx = t.indexOf('=');
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const doc = await db.collection('surgeons').findOne({ slug: 'hair-transplant-surgeon-in-delhi' });
  if (!doc) { console.log('No Delhi doc'); process.exit(1); }
  // Pretty print the full document (remove _id noise)
  const clean = JSON.parse(JSON.stringify(doc));
  delete clean._id;
  delete clean.__v;
  fs.writeFileSync(path.join(__dirname, 'delhi_surgeon_full.json'), JSON.stringify(clean, null, 2), 'utf8');
  console.log('Saved delhi_surgeon_full.json');
  console.log('FAQ count:', clean.faq ? clean.faq.length : 0);
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
