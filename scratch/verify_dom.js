const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.replace(/^"|"$/g, '');
      }
      process.env[key] = value.trim();
    }
  });
}

async function run() {
  const MONGODB_URI = process.env.MONGO_URL || process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGO_URL / MONGODB_URI not found");
    return;
  }

  await mongoose.connect(MONGODB_URI);
  const mod = require('../src/models/surgeryPage');
  const SurgeryPageModel = mod.default || mod;

  const slugs = [
    { slug: 'hair-transplant-surgery-in-delhi', city: 'Delhi' },
    { slug: 'hair-transplant-surgery-in-mumbai', city: 'Mumbai' },
    { slug: 'hair-transplant-surgery-in-hyderabad', city: 'Hyderabad' }
  ];

  for (const item of slugs) {
    console.log(`\n========================================`);
    console.log(`CHECKING MONGO DB FOR: ${item.slug} (${item.city})`);
    console.log(`========================================`);

    const doc = await SurgeryPageModel.findOne({ slug: item.slug }).lean();
    if (doc) {
      console.log(`✅ Document found! Page Name: "${doc.pageName}", City: "${doc.city}", Status: "${doc.status}"`);
      console.log(`   Nearby Locations count: ${doc.visitClinic?.nearbyLocations?.length || 0}`);
      console.log(`   Information Cards count: ${doc.visitClinic?.informationCards?.length || 0}`);
      console.log(`   Services Dropdown count: ${doc.consultation?.consultationFormConfig?.servicesDropdown?.length || 0}`);
      console.log(`   Turkey Comparison points: ${doc.turkeyComparison?.comparisonPoints?.length || 0}`);
    } else {
      console.log(`ℹ️ No document in MongoDB for "${item.slug}" — component will use approved city-dynamic fallback for ${item.city}.`);
    }
  }

  await mongoose.disconnect();
}

run().catch(console.error);
