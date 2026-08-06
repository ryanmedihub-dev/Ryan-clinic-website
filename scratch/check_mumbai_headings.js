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

async function checkHeadings() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const doc = await db.collection('surgeonpages').findOne({ slug: 'hair-transplant-surgeon-in-mumbai' });
  
  console.log('Document ID:', doc._id);
  console.log('Title:', doc.title);
  console.log('whySkill.heading:', doc.whySkill?.heading);
  console.log('benefits.heading:', doc.benefits?.heading);
  console.log('surgeonRole.heading:', doc.surgeonRole?.heading);
  console.log('comparison.heading:', doc.comparison?.heading);
  console.log('experienceSpecialization.heading:', doc.experienceSpecialization?.heading);
  console.log('skillEvaluation.heading:', doc.skillEvaluation?.heading);
  console.log('leadSurgeon.heading:', doc.leadSurgeon?.heading);
  console.log('hairlineArtistry.heading:', doc.hairlineArtistry?.heading);
  console.log('revisionRepair.heading:', doc.revisionRepair?.heading);
  console.log('bookingChecklist.heading:', doc.bookingChecklist?.heading);
  console.log('warningSigns.heading:', doc.warningSigns?.heading);
  console.log('procedures.heading:', doc.procedures?.heading);
  console.log('costConsultation.heading:', doc.costConsultation?.heading);
  console.log('visitSurgeon.heading:', doc.visitSurgeon?.heading);
  console.log('consultationCTA.heading:', doc.consultationCTA?.heading);
  console.log('faq.heading:', doc.faq?.heading);

  await mongoose.disconnect();
}

checkHeadings().catch(console.error);
