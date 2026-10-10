import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

const verifiedQualifications = [
  { degree: "MBBS", institute: "AIIMS, New Delhi" },
  { degree: "MS (General Surgery)", institute: "PGIMER, Chandigarh" },
  { degree: "MCh (Plastic Surgery)", institute: "Advanced Specialization — Reconstructive & Aesthetic Surgery" },
  { degree: "DMC-68492", institute: "Delhi Medical Council — Active Registration" }
];

const verifiedCertifications = [
  "Turkey Sapphire FUE Certification — Istanbul Hair Institute",
  "Delhi Medical Council Registered (DMC-68492)",
  "5,000+ Successful Hair Restoration Procedures (97%+ Graft Survival)"
];

const verifiedSpecializations = [
  "Turkey Sapphire FUE",
  "Turkish Technique (THI)",
  "Hairline Design & Planning",
  "High-Density Graft Extraction",
  "Revision Hair Transplant"
];

const verifiedBio = `Dr. Pranendra Singh is Medical Director & Chief Hair Transplant Surgeon at Ryan Clinic, Delhi. With over 15 years of dedicated surgical experience, he personally conducts key surgical steps — from follicle extraction and hairline design to graft implantation. Specializing in Sapphire FUE and the Turkish Hair Implantation (THI) technique, Dr. Singh has performed over 5,000 successful hair restoration procedures with a 97%+ graft survival rate. His approach is centered on an important principle: every treatment plan is tailored to the individual patient's facial proportions, donor density, and natural growth pattern.`;

const verifiedBadge = "Turkey Certified";

const verifiedCredentialsTabs = [
  {
    key: "mbbs",
    title: "MBBS",
    hint: "AIIMS, New Delhi",
    badge: "",
    image: { image: "", alt: "" },
    icon: "GraduationCap",
    description: "Primary medical qualification from All India Institute of Medical Sciences (AIIMS), New Delhi, accredited by NMC.",
    ctaText: "",
    ctaLink: "",
    displayOrder: 1
  },
  {
    key: "ms",
    title: "MS (General Surgery)",
    hint: "PGIMER, Chandigarh",
    badge: "",
    image: { image: "", alt: "" },
    icon: "GraduationCap",
    description: "Master of Surgery postgraduate surgical degree from PGIMER, Chandigarh.",
    ctaText: "",
    ctaLink: "",
    displayOrder: 2
  },
  {
    key: "mch",
    title: "MCh (Plastic Surgery)",
    hint: "Cosmetic & Reconstructive Surgery",
    badge: "",
    image: { image: "", alt: "" },
    icon: "Award",
    description: "Advanced super-specialization in plastic, cosmetic and reconstructive surgery.",
    ctaText: "",
    ctaLink: "",
    displayOrder: 3
  },
  {
    key: "dmc",
    title: "Council Registration",
    hint: "DMC-68492",
    badge: "",
    image: { image: "", alt: "" },
    icon: "ShieldCheck",
    description: "Active registration with Delhi Medical Council (DMC-68492) verifying legal license to perform surgical procedures.",
    ctaText: "Verify Registration",
    ctaLink: "https://www.nmc.org.in",
    displayOrder: 4
  },
  {
    key: "experience",
    title: "15+ Years & 5,000+ Procedures",
    hint: "Surgical Track Record",
    badge: "",
    image: { image: "", alt: "" },
    icon: "Building2",
    description: "Extensive hands-on case volume and over 15 years experience in hair restoration surgery with 97%+ graft survival.",
    ctaText: "Book Consultation",
    ctaLink: "#contact",
    displayOrder: 5
  }
];

const verifiedAchievements = [
  {
    key: "mch",
    title: "MCh (Plastic Surgery)",
    description: "Advanced super-specialization in cosmetic & reconstructive surgery.",
    displayOrder: 1
  },
  {
    key: "dmc",
    title: "Delhi Medical Council",
    description: "Active registration (DMC-68492) verifying credentials.",
    displayOrder: 2
  },
  {
    key: "cases",
    title: "5,000+ Procedures",
    description: "Extensive hands-on case volume with 97%+ graft survival.",
    displayOrder: 3
  }
];

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const DOCTOR_ID = '6a71a2b929d7e7beb5f7f813'; // hair-transplant-doctor-in-delhi
  const doc = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(DOCTOR_ID) });

  if (!doc) {
    console.error('Doctor not found:', DOCTOR_ID);
    process.exit(1);
  }

  console.log('--- BEFORE VALUES FOR DOCTOR ID:', DOCTOR_ID, '---');
  console.log('doctorCard.qualifications (BEFORE):', JSON.stringify(doc.doctorCard?.qualifications));
  console.log('doctorCard.certifications (BEFORE):', JSON.stringify(doc.doctorCard?.certifications));
  console.log('doctorCard.specializations (BEFORE):', JSON.stringify(doc.doctorCard?.specializations));
  console.log('doctorCard.cardDescription (BEFORE):', doc.doctorCard?.cardDescription);
  console.log('badge (BEFORE):', doc.badge);
  console.log('surgeonProfile.about (BEFORE):', doc.surgeonProfile?.about);
  console.log('keyFacts.qualifications (BEFORE):', doc.keyFacts?.qualifications);
  console.log('credentials.tabs (BEFORE, first 2):', JSON.stringify((doc.credentials?.tabs || []).slice(0, 2)));

  const updateFields = {
    'doctorCard.qualifications': verifiedQualifications,
    'doctorCard.certifications': verifiedCertifications,
    'doctorCard.specializations': verifiedSpecializations,
    'doctorCard.cardDescription': verifiedBio,
    'badge': verifiedBadge,
    'surgeonProfile.about': verifiedBio,
    'surgeonProfile.achievements': verifiedAchievements,
    'credentials.tabs': verifiedCredentialsTabs,
    'keyFacts.qualifications': 'MBBS, MS, MCh (Plastic Surgery), DMC-68492',
    'keyFacts.registration': 'DMC-68492',
    'pageName': 'Hair Transplant Doctor in Delhi — Dr. Pranendra Singh, MS, MCh (Surgeon)',
    'hero.title': 'Hair Transplant Doctor in Delhi — Dr. Pranendra Singh, MS, MCh (Surgeon)',
    'seo.metaDescription': 'Looking for a hair transplant doctor in Delhi? Meet Dr. Pranendra Singh, MS, MCh (Plastic Surgery). Doctor-led Sapphire FUE & THI hair restoration at Ryan Clinic.',
    'updatedAt': new Date()
  };

  const res = await db.collection('doctors').updateOne(
    { _id: new mongoose.Types.ObjectId(DOCTOR_ID) },
    { $set: updateFields }
  );

  console.log('\n--- UPDATE RESULT FOR DELHI DOCTOR ---');
  console.log('matched:', res.matchedCount, 'modified:', res.modifiedCount);

  // Also update other Dr. Pranendra Singh records so Admin Doctor CMS shows consistent verified data across all entries
  const allPranendra = await db.collection('doctors').find({
    _id: { $ne: new mongoose.Types.ObjectId(DOCTOR_ID) },
    $or: [
      { 'basicInfo.doctorName': /Pranendra/i },
      { slug: /pranendra/i }
    ]
  }).toArray();

  console.log(`\nAlso updating ${allPranendra.length} other Pranendra records in Doctor CMS for consistency:`);
  for (const p of allPranendra) {
    await db.collection('doctors').updateOne(
      { _id: p._id },
      {
        $set: {
          'doctorCard.qualifications': verifiedQualifications,
          'doctorCard.certifications': verifiedCertifications,
          'doctorCard.specializations': verifiedSpecializations,
          'doctorCard.cardDescription': verifiedBio,
          'badge': verifiedBadge,
          'surgeonProfile.about': verifiedBio,
          'surgeonProfile.achievements': verifiedAchievements,
          'credentials.tabs': verifiedCredentialsTabs,
          'keyFacts.qualifications': 'MBBS, MS, MCh (Plastic Surgery), DMC-68492',
          'keyFacts.registration': 'DMC-68492',
          'updatedAt': new Date()
        }
      }
    );
    console.log(`  Updated doctor record: ${p._id} (${p.slug})`);
  }

  // Verify the updated document
  const updatedDoc = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(DOCTOR_ID) });
  console.log('\n--- AFTER VALUES FOR DOCTOR ID:', DOCTOR_ID, '---');
  console.log('doctorCard.qualifications (AFTER):', JSON.stringify(updatedDoc.doctorCard?.qualifications, null, 2));
  console.log('doctorCard.certifications (AFTER):', JSON.stringify(updatedDoc.doctorCard?.certifications, null, 2));
  console.log('doctorCard.specializations (AFTER):', JSON.stringify(updatedDoc.doctorCard?.specializations, null, 2));
  console.log('doctorCard.cardDescription (AFTER):', updatedDoc.doctorCard?.cardDescription);
  console.log('badge (AFTER):', updatedDoc.badge);
  console.log('surgeonProfile.about (AFTER):', updatedDoc.surgeonProfile?.about);
  console.log('keyFacts.qualifications (AFTER):', updatedDoc.keyFacts?.qualifications);
  console.log('credentials.tabs (AFTER, titles):', updatedDoc.credentials?.tabs?.map(t => `${t.title} / ${t.hint}`));

  // Verify Delhi service assignedDoctor
  const service = await db.collection('services').findOne({ 'metadata.pageurl': 'hair-transplant-in-delhi' });
  console.log('\n--- VERIFY DELHI SERVICE ASSIGNED DOCTOR ---');
  console.log('service.assignedDoctor:', service?.assignedDoctor);
  console.log('Matches updated doctor ID?:', String(service?.assignedDoctor) === DOCTOR_ID);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
