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

const updatedSteps = [
  {
    stepNumber: 1,
    num: "01",
    title: "Consultation & Hairline Design",
    description: "The surgeon assesses donor density, facial symmetry, and future loss patterns. A soft, micro-irregular hairline is drafted to frame your face naturally for life.",
    body: "The surgeon assesses donor density, facial symmetry, and future loss patterns. A soft, micro-irregular hairline is drafted to frame your face naturally for life."
  },
  {
    stepNumber: 2,
    num: "02",
    title: "Graft Extraction (FUE)",
    description: "The surgeon extracts individual follicular units from the donor area using fine micro-punches, carefully controlling spacing, depth, and direction to protect graft quality and preserve the appearance of the donor zone.",
    body: "The surgeon extracts individual follicular units from the donor area using fine micro-punches, carefully controlling spacing, depth, and direction to protect graft quality and preserve the appearance of the donor zone."
  },
  {
    stepNumber: 3,
    num: "03",
    title: "Recipient-Site Creation (Sapphire)",
    description: "The surgeon creates each recipient site with precise control over angle, direction, depth, and distribution. This stage determines how naturally the transplanted hair will grow and how effectively the available grafts create visual density.",
    body: "The surgeon creates each recipient site with precise control over angle, direction, depth, and distribution. This stage determines how naturally the transplanted hair will grow and how effectively the available grafts create visual density."
  },
  {
    stepNumber: 4,
    num: "04",
    title: "Direct Implantation (Turkish Technique)",
    description: "The surgeon places the prepared grafts according to the planned hairline, growth direction, and density pattern, handling each follicular unit carefully to protect graft viability and achieve a natural-looking result.",
    body: "The surgeon places the prepared grafts according to the planned hairline, growth direction, and density pattern, handling each follicular unit carefully to protect graft viability and achieve a natural-looking result."
  },
  {
    stepNumber: 5,
    num: "05",
    title: "18-Month Growth & Follow-Up",
    description: "The surgeon monitors healing and hair-growth progress during follow-up, reviews the development of the transplanted area, and provides post-operative guidance as the final result gradually develops.",
    body: "The surgeon monitors healing and hair-growth progress during follow-up, reviews the development of the transplanted area, and provides post-operative guidance as the final result gradually develops."
  }
];

async function updateMumbaiSteps() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  
  const res = await db.collection('surgeonpages').updateOne(
    { slug: 'hair-transplant-surgeon-in-mumbai' },
    { 
      $set: { 
        'surgeonRole.steps': updatedSteps,
        updatedAt: new Date().toISOString()
      } 
    }
  );
  
  console.log('Update result:', res);
  
  // Verify
  const doc = await db.collection('surgeonpages').findOne({ slug: 'hair-transplant-surgeon-in-mumbai' });
  console.log('\nVERIFIED MUMBAI STEPS IN DB:');
  console.log(JSON.stringify(doc.surgeonRole.steps, null, 2));

  await mongoose.disconnect();
}

updateMumbaiSteps().catch(console.error);
