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
  const doc = await db.collection('surgeons').findOne({ slug: 'hair-transplant-surgeon-in-mumbai' });
  if (!doc) {
    console.log('NO MUMBAI DOCUMENT FOUND — need to create one');
  } else {
    console.log('FOUND Mumbai doc. ID:', doc._id.toString());
    console.log('title:', doc.title);
    console.log('city:', doc.city);
    console.log('slug:', doc.slug);
    // print first level keys
    console.log('Keys:', Object.keys(doc).filter(k => k !== '_id' && k !== '__v').join(', '));
    // faq count
    console.log('FAQ count:', doc.faq ? doc.faq.length : 0);
    // whySkill heading
    if (doc.whySkill) console.log('whySkill.heading:', doc.whySkill.heading);
    if (doc.benefits) console.log('benefits.heading:', doc.benefits.heading);
    if (doc.surgeonRole) console.log('surgeonRole.heading:', doc.surgeonRole.heading);
    if (doc.comparison) console.log('comparison.heading:', doc.comparison.heading);
    if (doc.procedures) console.log('procedures.heading:', doc.procedures.heading);
    if (doc.visitSurgeon) console.log('visitSurgeon.address:', doc.visitSurgeon.address);
    if (doc.seo) console.log('seo.title:', doc.seo.title);
  }
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
