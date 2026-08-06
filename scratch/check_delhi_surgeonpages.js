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
  
  // Check surgeonpages for Delhi
  const delhiDoc = await db.collection('surgeonpages').findOne({ slug: 'hair-transplant-surgeon-in-delhi' });
  console.log('Delhi in surgeonpages:', delhiDoc ? 'YES' : 'NO');
  if (delhiDoc) {
    console.log('  ID:', delhiDoc._id.toString());
    console.log('  whySkill.heading:', delhiDoc.whySkill?.heading);
    console.log('  benefits.heading:', delhiDoc.benefits?.heading);
    console.log('  faq count:', delhiDoc.faq?.faqs?.length || 0);
  }
  
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
