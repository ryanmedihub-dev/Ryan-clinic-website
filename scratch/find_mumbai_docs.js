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
  
  // Find ALL documents that have Mumbai in title or slug
  const docs = await db.collection('surgeons').find({
    $or: [
      { slug: { $regex: 'mumbai', $options: 'i' } },
      { title: { $regex: 'mumbai', $options: 'i' } },
      { 'general.city': { $regex: 'mumbai', $options: 'i' } },
    ]
  }).toArray();
  
  console.log('Total Mumbai-related docs found:', docs.length);
  for (const doc of docs) {
    console.log('---');
    console.log('ID:', doc._id.toString());
    console.log('slug:', doc.slug);
    console.log('title:', doc.title);
    console.log('city:', doc.general?.city || doc.city);
    if (doc.whySkill) console.log('whySkill.heading:', doc.whySkill?.heading);
    if (doc.benefits) console.log('benefits.heading:', doc.benefits?.heading);
    if (doc.hero) console.log('hero.title:', doc.hero?.title);
    if (doc.faq) console.log('faq count:', doc.faq?.faqs?.length || doc.faq?.items?.length || 0);
  }
  
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
