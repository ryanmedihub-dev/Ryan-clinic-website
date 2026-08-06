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
  
  // Find ALL surgeon documents with slug containing 'mumbai'
  const all = await db.collection('surgeons').find({ slug: { $regex: 'mumbai', $options: 'i' } }).toArray();
  console.log('Total Mumbai slug docs:', all.length);
  for (const doc of all) {
    console.log('\nID:', doc._id.toString());
    console.log('slug:', doc.slug);
    console.log('title:', doc.title);
    console.log('hero.title:', doc.hero?.title);
    console.log('whySkill:', doc.whySkill ? 'YES' : 'NO');
    console.log('isDeleted:', doc.settings?.isDeleted);
    
    // Dump whySkill heading if exists
    if (doc.whySkill?.heading) console.log('whySkill.heading:', doc.whySkill.heading);
    if (doc.benefits?.heading) console.log('benefits.heading:', doc.benefits.heading);
  }
  
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
