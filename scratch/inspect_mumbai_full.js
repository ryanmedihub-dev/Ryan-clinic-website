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

async function inspectDoc() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const doc = await db.collection('surgeonpages').findOne({ slug: 'hair-transplant-surgeon-in-mumbai' });
  console.log(JSON.stringify(doc, null, 2));
  await mongoose.disconnect();
}

inspectDoc().catch(console.error);
