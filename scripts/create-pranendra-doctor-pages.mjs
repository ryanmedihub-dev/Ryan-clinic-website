import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
let MONGO_URL = process.env.MONGO_URL;
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGO_URL=["']?([^"'\r\n]+)["']?/);
    if (match) MONGO_URL = match[1];
  }
} catch (e) {}

if (!MONGO_URL) {
  MONGO_URL = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';
}

const isDryRun = process.argv.includes('--dry-run');

const BRANCHES = {
  Delhi: {
    address: 'CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Pitampura+Delhi',
    phone: '+91-9911111247',
    hours: 'Mon – Sun: 9:00 AM – 7:00 PM',
    metro: 'Kohat Enclave / Pitampura Metro Station',
    areas: [
      'Pitampura', 'Rohini', 'Shalimar Bagh', 'Model Town', 'Karol Bagh',
      'Connaught Place', 'Dwarka', 'Janakpuri', 'Rajouri Garden', 'Saket',
      'South Delhi', 'West Delhi', 'Noida', 'Gurgaon', 'Ghaziabad',
      'Faridabad', 'Greater Noida', 'Indirapuram', 'Vasundhara', 'Vaishali',
    ],
  },
  Mumbai: {
    address: 'MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Andheri+Mumbai',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Andheri Metro Station',
    areas: [
      'Andheri', 'Bandra', 'Juhu', 'Vile Parle', 'Santacruz',
      'Goregaon', 'Malad', 'Borivali', 'Kandivali', 'Thane',
      'Navi Mumbai', 'Pune', 'Nashik', 'Vasai', 'Virar',
    ],
  },
  Hyderabad: {
    address: '2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Banjara+Hills+Hyderabad',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Jubilee Hills / Banjara Hills',
    areas: [
      'Banjara Hills', 'Jubilee Hills', 'Kondapur', 'Gachibowli', 'Hitech City',
      'Madhapur', 'Kukatpally', 'Begumpet', 'Secunderabad', 'LB Nagar',
      'Dilsukhnagar', 'Warangal',
    ],
  },
  Pune: {
    address: 'Baner, Pune – 411045',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Baner+Pune',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Baner / Balewadi',
    areas: [
      'Baner', 'Balewadi', 'Wakad', 'Hinjewadi', 'Kothrud',
      'Koregaon Park', 'Kalyani Nagar', 'Viman Nagar', 'Hadapsar', 'Kharadi',
      'Pimpri', 'Chinchwad',
    ],
  },
  Patna: {
    address: 'Boring Road, Patna – 800001',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Boring+Road+Patna',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Boring Road / Bailey Road',
    areas: [
      'Boring Road', 'Bailey Road', 'Patna Sahib', 'Kankarbagh', 'Rajendra Nagar',
      'Ashok Rajpath', 'Frazer Road', 'Exhibition Road', 'Bankipur', 'Danapur',
      'Digha', 'Hajipur',
    ],
  },
  Kolkata: {
    address: 'Salt Lake, Kolkata – 700091',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Salt+Lake+Kolkata',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Salt Lake / Karunamoyee Metro Station',
    areas: [
      'Salt Lake', 'New Town', 'Rajarhat', 'Park Street', 'Ballygunge',
      'Gariahat', 'Behala', 'Howrah', 'Dum Dum', 'Barrackpore',
      'Barasat', 'Durgapur',
    ],
  },
  Jammu: {
    address: 'Hall 207 2A, South Block, Bahu Plaza, Jammu – 180012',
    mapUrl: 'https://maps.google.com/?q=Emphoria+Skin+Hair+Clinic+Bahu+Plaza+Jammu',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
    metro: 'Bahu Plaza / Residency Road',
    areas: [
      'Bahu Plaza', 'Gandhi Nagar', 'Residency Road', 'Trikuta Nagar', 'Bakshi Nagar',
      'Channi Himmat', 'Udhampur', 'Kathua', 'Samba', 'Pathankot Road',
      'Akhnoor', 'Nagrota',
    ],
  },
  Ahmedabad: {
    address: 'SG Highway, Ahmedabad – 380054',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+SG+Highway+Ahmedabad',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Ahmedabad BRTS / SG Highway',
    areas: [
      'SG Highway', 'Navrangpura', 'Satellite', 'Vastrapur', 'Bodakdev',
      'Thaltej', 'Prahlad Nagar', 'Anand Nagar', 'Maninagar', 'Naroda',
      'Chandkheda', 'Gandhinagar',
    ],
  },
  Chennai: {
    address: 'No.1, 3rd Floor, SS Avenue 43, Rajiv Gandhi Salai, Padur, Chennai – 603103',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Padur+Chennai',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Padur / Old Mahabalipuram Road',
    areas: [
      'Padur', 'Sholinganallur', 'Perungudi', 'Velachery', 'Anna Nagar',
      'T Nagar', 'Adyar', 'Chromepet', 'Tambaram', 'Porur',
      'Ambattur', 'Avadi',
    ],
  },
  Lucknow: {
    address: 'Gomti Nagar, Lucknow – 226010',
    mapUrl: 'https://maps.google.com/?q=Ryan+Clinic+Gomti+Nagar+Lucknow',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'Gomti Nagar / Hazratganj',
    areas: [
      'Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Rajajipuram',
      'Alambagh', 'Mahanagar', 'Vibhuti Khand', 'Chinhat', 'Faizabad Road',
      'Kanpur Road', 'Sultanpur Road',
    ],
  },
  Bangalore: {
    address: 'Contour Cosmetic Clinic, 2nd Floor, Lakshmidevi Complex, 80 Ft Road, BTM Layout, Bengaluru – 560076',
    mapUrl: 'https://maps.google.com/?q=Contour+Cosmetic+Clinic+BTM+Layout+Bangalore',
    phone: '+91-9911111247',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    metro: 'BTM Layout / Silk Board',
    areas: [
      'BTM Layout', 'Koramangala', 'Jayanagar', 'JP Nagar', 'Marathahalli',
      'Whitefield', 'Electronic City', 'HSR Layout', 'Indiranagar', 'MG Road',
      'Yelahanka', 'Bannerghatta Road',
    ],
  },
};

const TARGET_CITIES = [
  { city: 'Mumbai', slug: 'dr-pranendra-singh-mumbai' },
  { city: 'Hyderabad', slug: 'dr-pranendra-singh-hyderabad' },
  { city: 'Pune', slug: 'dr-pranendra-singh-pune' },
  { city: 'Patna', slug: 'dr-pranendra-singh-patna' },
  { city: 'Kolkata', slug: 'dr-pranendra-singh-kolkata' },
  { city: 'Jammu', slug: 'dr-pranendra-singh-jammu' },
  { city: 'Ahmedabad', slug: 'dr-pranendra-singh-ahmedabad' },
  { city: 'Chennai', slug: 'dr-pranendra-singh-chennai' },
  { city: 'Lucknow', slug: 'dr-pranendra-singh-lucknow' },
  { city: 'Bangalore', slug: 'dr-pranendra-singh-bangalore' },
];

function replaceCityInText(text, targetCity) {
  if (!text || typeof text !== 'string') return text;
  
  // Replace "in Delhi" or "in New Delhi" or "in New-Delhi"
  let res = text
    .replace(/\bin\s+(New\s+Delhi|Delhi|New-Delhi)\b/gi, `in ${targetCity}`)
    .replace(/\bat\s+Ryan\s+Clinic,\s*(New\s+Delhi|Delhi|New-Delhi)\b/gi, `at Ryan Clinic, ${targetCity}`)
    .replace(/\bRyan\s+Clinic\s*—\s*(Pitampura,\s*New\s+Delhi|New\s+Delhi|Delhi)\b/gi, `Ryan Clinic — ${targetCity}`)
    .replace(/\b(Delhi)\s+centre\b/gi, `${targetCity} centre`);

  return res;
}

function cloneAndLocalize(sourceDoc, target) {
  const { city, slug } = target;
  const branch = BRANCHES[city] || {};
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');

  // Deep clone
  const clone = JSON.parse(JSON.stringify(sourceDoc));

  // Reset internal and identity fields
  delete clone._id;
  delete clone.__v;
  delete clone.createdAt;
  delete clone.updatedAt;
  delete clone.createdBy;
  delete clone.updatedBy;
  clone.deletedAt = null;

  // Set Slug and Status
  clone.slug = slug;
  clone.status = 'draft';
  clone.isActive = true;

  // Page Name
  clone.pageName = `Hair Transplant Doctor in ${city} — Dr. Pranendra Singh, MCh (Plastic Surgery)`;

  // 1. Basic Info
  if (clone.basicInfo) {
    clone.basicInfo.city = city;
    if (branch.address) {
      clone.basicInfo.clinicAddress = branch.address;
    }
    if (clone.basicInfo.profileImage) {
      clone.basicInfo.profileImage.alt = `Dr. Pranendra Singh — Hair Transplant Doctor in ${city}`;
    }
  }

  // 2. SEO
  if (clone.seo) {
    clone.seo.metaTitle = `Best Hair Transplant Doctor in ${city} | Ryan Clinic`;
    clone.seo.metaDescription = `Consult Dr. Pranendra Singh (MCh Plastic Surgery), leading hair transplant doctor in ${city}. 15+ years experience, 5,000+ surgeries & 97%+ success rate at Ryan Clinic.`;
    clone.seo.keywords = `hair transplant doctor in ${city}, best hair transplant doctor ${city}, hair restoration surgeon ${city}, Dr Pranendra Singh ${city}, Ryan Clinic ${city}`;
    clone.seo.canonicalUrl = `https://www.clinicryan.com/doctors/${slug}`;
    if (clone.seo.openGraphImage) {
      clone.seo.openGraphImage.alt = `Dr. Pranendra Singh — Hair Transplant Doctor in ${city}`;
    }
  }

  // 3. Hero
  if (clone.hero) {
    clone.hero.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Doctors', url: '/doctors' },
      { label: `Dr. Pranendra Singh (${city})`, url: `/doctors/${slug}` },
    ];
  }

  // 4. Why It Matters
  if (clone.whyItMatters) {
    clone.whyItMatters.heading = `Why your hair transplant doctor in ${city} matters more than anything else`;
    clone.whyItMatters.description = replaceCityInText(clone.whyItMatters.description, city);
    clone.whyItMatters.secondaryDescription = replaceCityInText(clone.whyItMatters.secondaryDescription, city);
    if (clone.whyItMatters.image) {
      clone.whyItMatters.image.alt = `Doctor-led hair transplant at Ryan Clinic, ${city}`;
    }
  }

  // 5. Doctor Standards
  if (clone.doctorStandards) {
    clone.doctorStandards.heading = `What makes a good hair transplant doctor in ${city}?`;
    clone.doctorStandards.description = replaceCityInText(clone.doctorStandards.description, city);
  }

  // 6. Credentials
  if (clone.credentials) {
    clone.credentials.heading = `Credentials to look for in a hair transplant doctor in ${city}`;
    clone.credentials.description = replaceCityInText(clone.credentials.description, city);
  }

  // 7. Verification
  if (clone.verification) {
    clone.verification.heading = `How to verify a hair transplant doctor's credentials in ${city}`;
  }

  // 8. Comparison
  if (clone.comparison) {
    clone.comparison.heading = `Doctor-led vs technician-led surgery in ${city}: the difference that defines your result`;
  }

  // 9. Surgeon Profile
  if (clone.surgeonProfile) {
    clone.surgeonProfile.heading = `Meet Dr. Pranendra Singh — Hair Restoration Surgeon in ${city}`;
    clone.surgeonProfile.about = replaceCityInText(clone.surgeonProfile.about, city);
  }

  // 10. Questions to Ask
  if (clone.questionsToAsk) {
    clone.questionsToAsk.heading = `Questions to ask your hair transplant doctor in ${city} before booking`;
    if (Array.isArray(clone.questionsToAsk.questions)) {
      clone.questionsToAsk.questions = clone.questionsToAsk.questions.map(q => ({
        ...q,
        question: replaceCityInText(q.question, city),
        answer: replaceCityInText(q.answer, city),
      }));
    }
  }

  // 11. Great Doctor Qualities
  if (clone.greatDoctorQualities) {
    clone.greatDoctorQualities.heading = `What a great hair transplant doctor in ${city} does differently`;
    clone.greatDoctorQualities.description = replaceCityInText(clone.greatDoctorQualities.description, city);
  }

  // 12. Warning Signs
  if (clone.warningSigns) {
    clone.warningSigns.heading = `Red flags when choosing a hair transplant doctor in ${city}`;
    clone.warningSigns.description = replaceCityInText(clone.warningSigns.description, city);
  }

  // 13. Procedures Performed
  if (clone.proceduresPerformed) {
    clone.proceduresPerformed.heading = `Procedures our hair transplant doctors in ${city} perform`;
    if (Array.isArray(clone.proceduresPerformed.cards)) {
      clone.proceduresPerformed.cards = clone.proceduresPerformed.cards.map(c => {
        let url = c.url || '';
        if (url.includes('delhi')) {
          url = url.replace('delhi', citySlug);
        }
        return {
          ...c,
          url,
        };
      });
    }
  }

  // 14. Surgical Process
  if (clone.surgicalProcess) {
    clone.surgicalProcess.heading = `What your hair transplant doctor in ${city} does at every stage`;
  }

  // 15. Pricing
  if (clone.pricing) {
    clone.pricing.heading = `Cost of consulting a hair transplant doctor in ${city}`;
  }

  // 16. Visit Clinic
  if (clone.visitClinic) {
    clone.visitClinic.heading = `Visiting Ryan Clinic in ${city}`;
    clone.visitClinic.description = `Our ${city} centre is convenient from across the city.`;
    clone.visitClinic.address = {
      clinicName: 'Ryan Skin & Hair Transplant Clinic',
      address: branch.address || '',
      city: city,
      state: city,
      pincode: branch.address?.match(/\d{6}/)?.[0] || '',
    };
    clone.visitClinic.mapUrl = branch.mapUrl || `https://maps.google.com/?q=Ryan+Clinic+${encodeURIComponent(city)}`;
    clone.visitClinic.nearbyLocations = branch.areas || [];
  }

  // 17. FAQ
  if (clone.faq) {
    clone.faq.heading = `Frequently asked questions about hair transplant doctors in ${city}`;
    clone.faq.description = `Everything you need to know about choosing, verifying and consulting a hair transplant doctor in ${city}.`;
    if (Array.isArray(clone.faq.faqs)) {
      clone.faq.faqs = clone.faq.faqs.map(f => {
        let q = replaceCityInText(f.question || f.q || '', city);
        let a = replaceCityInText(f.answer || f.a || '', city);
        if (q.toLowerCase().includes('where can i meet the doctor')) {
          a = `Dr. Pranendra Singh consults at Ryan Clinic located at ${branch.address || city}.`;
        }
        return {
          ...f,
          question: q,
          answer: a,
        };
      });
    }
  }

  // 18. Key Facts
  if (clone.keyFacts) {
    clone.keyFacts.heading = `Verified Doctor & Clinic Key Facts`;
    clone.keyFacts.location = branch.address || `${city}`;
  }

  return clone;
}

async function run() {
  console.log('====================================================');
  console.log(`RYAN CLINIC — BULK CREATE DR. PRANENDRA SINGH PAGES`);
  console.log(`MODE: ${isDryRun ? '🔍 DRY RUN (No writes)' : '🚀 LIVE EXECUTION'}`);
  console.log('====================================================\n');

  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db;
  const collection = db.collection('doctors');

  // 1. Fetch the master document
  let masterDoc = await collection.findOne({
    slug: 'hair-transplant-doctor-in-delhi',
  });

  if (!masterDoc) {
    masterDoc = await collection.findOne({
      slug: 'dr-pranendra-singh',
    });
  }

  if (!masterDoc) {
    console.error('❌ Master document for Dr. Pranendra Singh could not be found in MongoDB.');
    process.exit(1);
  }

  console.log(`MASTER FOUND:`);
  console.log(`  _id: ${masterDoc._id}`);
  console.log(`  slug: "${masterDoc.slug}"`);
  console.log(`  doctorName: "${masterDoc.basicInfo?.doctorName}"`);
  console.log(`  city: "${masterDoc.basicInfo?.city}"\n`);

  // Ensure master slug `dr-pranendra-singh` exists & is active
  const existingMasterSlug = await collection.findOne({ slug: 'dr-pranendra-singh' });
  if (existingMasterSlug && existingMasterSlug.deletedAt != null) {
    console.log(`ℹ️ Master slug "dr-pranendra-singh" has deletedAt set.`);
    if (!isDryRun) {
      // Sync master data and un-delete without modifying immutable _id
      const updateData = JSON.parse(JSON.stringify(masterDoc));
      delete updateData._id;
      delete updateData.__v;
      updateData.slug = 'dr-pranendra-singh';
      updateData.pageName = 'Hair Transplant Doctor in Delhi — Dr. Pranendra Singh, MCh (Plastic Surgery)';
      updateData.status = 'published';
      updateData.deletedAt = null;
      if (updateData.seo) {
        updateData.seo.canonicalUrl = 'https://www.clinicryan.com/doctors/dr-pranendra-singh';
      }
      updateData.updatedAt = new Date();

      await collection.updateOne(
        { _id: existingMasterSlug._id },
        { 
          $set: updateData
        }
      );
      console.log(`✅ Activated master route: /doctors/dr-pranendra-singh`);
    } else {
      console.log(`[DRY RUN] Would activate master route: /doctors/dr-pranendra-singh`);
    }
  } else if (!existingMasterSlug) {
    console.log(`ℹ️ Master slug "dr-pranendra-singh" not present. Creating master record...`);
    if (!isDryRun) {
      const masterCopy = JSON.parse(JSON.stringify(masterDoc));
      delete masterCopy._id;
      masterCopy.slug = 'dr-pranendra-singh';
      masterCopy.status = 'published';
      masterCopy.deletedAt = null;
      masterCopy.createdAt = new Date();
      masterCopy.updatedAt = new Date();
      await collection.insertOne(masterCopy);
      console.log(`✅ Created master route: /doctors/dr-pranendra-singh`);
    }
  } else {
    console.log(`✅ Master route /doctors/dr-pranendra-singh is active (status: ${existingMasterSlug.status}).`);
  }

  console.log('\n----------------------------------------------------');
  console.log('TARGET PAGES TO GENERATE (10 CITIES):');
  console.log('----------------------------------------------------\n');

  let createdCount = 0;
  let skippedCount = 0;

  for (const target of TARGET_CITIES) {
    const existing = await collection.findOne({ slug: target.slug });

    if (existing) {
      console.log(`⚠️  ${target.city.padEnd(10)} | slug: ${target.slug.padEnd(30)} | ACTION: SKIP (Already exists: id=${existing._id}, deletedAt=${existing.deletedAt})`);
      skippedCount++;
      continue;
    }

    const newDoc = cloneAndLocalize(masterDoc, target);

    if (isDryRun) {
      console.log(`✓  ${target.city.padEnd(10)} | slug: ${target.slug.padEnd(30)} | ACTION: [DRY RUN] Would insert document (status: draft)`);
      createdCount++;
    } else {
      newDoc.createdAt = new Date();
      newDoc.updatedAt = new Date();
      const result = await collection.insertOne(newDoc);
      console.log(`✅ ${target.city.padEnd(10)} | slug: ${target.slug.padEnd(30)} | ACTION: INSERTED (id=${result.insertedId}, status=draft)`);
      createdCount++;
    }
  }

  console.log('\n====================================================');
  console.log(`SUMMARY: ${createdCount} to create, ${skippedCount} skipped.`);
  console.log('====================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
