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

async function searchMongo() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  
  for (const col of collections) {
    const name = col.name;
    const docs = await db.collection(name).find({}).toArray();
    for (const doc of docs) {
      const str = JSON.stringify(doc);
      if (str.includes("What Makes Us the Best") || str.includes("Why Mumbai Patients Choose") || str.includes("What Your Surgeon Does")) {
        console.log(`FOUND MATCH in collection: ${name}, _id: ${doc._id}, slug: ${doc.slug || doc.url || doc.title}`);
        if (doc.whySkill) console.log("  whySkill:", doc.whySkill.heading);
        if (doc.whyChooseUs) console.log("  whyChooseUs:", doc.whyChooseUs.heading);
        if (doc.benefits) console.log("  benefits:", doc.benefits.heading);
      }
    }
  }
  
  await mongoose.disconnect();
}

searchMongo().catch(console.error);
