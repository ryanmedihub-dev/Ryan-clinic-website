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
  
  // List all collection names
  const colls = await db.listCollections().toArray();
  console.log('Collections in DB:', colls.map(c => c.name).join(', '));
  
  // Check surgeonpages collection
  const surgeonpages = db.collection('surgeonpages');
  const count = await surgeonpages.countDocuments();
  console.log('\nsurgeonpages count:', count);
  
  const docs = await surgeonpages.find({ slug: { $regex: 'mumbai', $options: 'i' } }).toArray();
  console.log('Mumbai docs in surgeonpages:', docs.length);
  for (const doc of docs) {
    console.log('  ID:', doc._id.toString(), '| slug:', doc.slug, '| title:', doc.title, '| isDeleted:', doc.settings?.isDeleted);
    console.log('  whySkill.heading:', doc.whySkill?.heading);
    console.log('  hero.title:', doc.hero?.title);
  }
  
  // Also check surgeons collection
  const surgeons = db.collection('surgeons');
  const surgeonCount = await surgeons.countDocuments();
  console.log('\nsurgeons count:', surgeonCount);
  const surgeonMumbai = await surgeons.find({ slug: { $regex: 'mumbai', $options: 'i' } }).toArray();
  console.log('Mumbai docs in surgeons:', surgeonMumbai.length);
  
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
