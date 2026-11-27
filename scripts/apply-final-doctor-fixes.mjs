/**
 * scripts/apply-final-doctor-fixes.mjs
 * ------------------------------------------------------------------
 * Guarded, transactional database update script for:
 *   1. Mumbai Doctor (`doctors._id = 6a8e969f322f85061ac1aa0d`):
 *      Keep Dr. Harshada Vijay Rakh, MDS (Surgeon) AND add Sayali Sanjay Kote (MBBS)
 *      across all Mumbai doctor identity fields + remove stale Dr. Pranendra Singh data.
 *   2. Hyderabad Doctor (`doctors._id = 6a8e969f322f85061ac1aa0e`) + Service (`services._id = 6a27d2f49c4a8d181f4eeffe`):
 *      Replace Dr. Ede Akhila (and unverified MDS claims) with Dr. Subba Redy,
 *      and reassign Hyderabad service from demo-doctor-hyderabad to 6a8e969f322f85061ac1aa0e.
 *   3. Gurgaon Doctor (`doctors._id = 6aa0fda669bae9798c18c074`):
 *      Replace Dr. Pranendra Singh (and his MCh/MS/AIIMS/PGIMER/DMC-68492/Pitampura fields)
 *      with Dr. Bobby Garg (MDS); preserve existing Gurgaon service assignment (6aa0f1a894bf6cf81ca1c722).
 *   4. Noida Doctor (create `slug: "hair-transplant-doctor-in-noida"`) + Service (`services._id = 6ab651e33d119a522a6edb67`):
 *      Create published multi-doctor profile for Dr. Rahul Ranjan (BDS Doctor) &
 *      Dr. Tanmay Kaushik (MBBS Doctors), and reassign Noida service from demo-doctor-noida.
 *
 * Safeguards:
 *   - Enforces db.databaseName === "test" and hello.setName === "atlas-qjr3jz-shard-0"
 *   - Rejects unexpected MONGODB_URI or mismatched MONGO_URL vs .env.local
 *   - Writes a fresh EJSON snapshot (preserving existing backups) before applying
 *   - Executes inside session.withTransaction() with exact CAS precondition checks
 *   - Supports --dry-run (default), --apply, and --rollback
 * ------------------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { ObjectId } = mongoose.Types;

const EXPECTED_DB_NAME = "test";
const EXPECTED_SET_NAME = "atlas-qjr3jz-shard-0";

const BACKUP_DIR =
  "C:\\Users\\patwa\\.gemini\\antigravity\\brain\\ce36b5e9-b464-410f-87d2-82a2e5196eb1\\backups";

const IDS = {
  MUMBAI_DOCTOR: "6a8e969f322f85061ac1aa0d",
  HYDERABAD_DOCTOR: "6a8e969f322f85061ac1aa0e",
  GURGAON_DOCTOR: "6aa0fda669bae9798c18c074",
  HYDERABAD_SERVICE: "6a27d2f49c4a8d181f4eeffe",
  HYDERABAD_DEMO_DOCTOR: "6abf79b03572e74794c59cdb",
  NOIDA_SERVICE: "6ab651e33d119a522a6edb67",
  NOIDA_DEMO_DOCTOR: "6abf79b13572e74794c59ce5",
  GURGAON_SERVICE: "6aa0f1a894bf6cf81ca1c722",
};

function loadMongoUrl() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error("Missing .env.local; cannot verify intended database target.");
  }
  let envMongoUrl = null;
  const content = fs.readFileSync(envPath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx < 0) continue;
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "MONGO_URL" && val) {
      envMongoUrl = val;
      break;
    }
  }
  if (!envMongoUrl) throw new Error("MONGO_URL not found in .env.local.");
  if (process.env.MONGODB_URI) {
    throw new Error("Refusing to run while unexpected MONGODB_URI environment variable is set.");
  }
  if (process.env.MONGO_URL && process.env.MONGO_URL !== envMongoUrl) {
    throw new Error("Refusing to run: exported MONGO_URL differs from .env.local MONGO_URL.");
  }
  return envMongoUrl;
}

function buildUpdatePayload() {
  const mumbaiAfter = {
    pageName:
      "Hair Transplant Doctors in Mumbai — Dr. Harshada Vijay Rakh, MDS (Surgeon) & Sayali Sanjay Kote (MBBS)",
    "basicInfo.doctorName": "Dr. Harshada Vijay Rakh & Sayali Sanjay Kote",
    "basicInfo.designation": "Hair Transplant Doctors in Mumbai",
    "basicInfo.profileImage.alt":
      "Dr. Harshada Vijay Rakh & Sayali Sanjay Kote — Hair Transplant Doctors in Mumbai",
    "seo.metaTitle":
      "Hair Transplant Doctors in Mumbai — Dr. Harshada Vijay Rakh & Sayali Sanjay Kote | Ryan Clinic",
    "seo.metaDescription":
      "Consult Dr. Harshada Vijay Rakh, MDS (Surgeon) and Sayali Sanjay Kote (MBBS) at Ryan Clinic, Mumbai for doctor-led Sapphire FUE & THI hair transplant consultation.",
    "seo.keywords":
      "hair transplant doctor in Mumbai, Dr. Harshada Vijay Rakh Mumbai, Sayali Sanjay Kote MBBS Mumbai, best hair transplant doctor Mumbai, Ryan Clinic Mumbai",
    "seo.openGraphImage.alt":
      "Dr. Harshada Vijay Rakh & Sayali Sanjay Kote — Hair Transplant Doctors in Mumbai",
    "hero.title":
      "Hair Transplant Doctors in Mumbai — Dr. Harshada Vijay Rakh, MDS (Surgeon) & Sayali Sanjay Kote (MBBS)",
    "hero.description":
      "Consult Dr. Harshada Vijay Rakh, MDS (Surgeon) and Sayali Sanjay Kote (MBBS) at Ryan Clinic in Mumbai for doctor-led Sapphire FUE and THI hair restoration.",
    "hero.heroImage.alt":
      "Hair Transplant Doctors in Mumbai — Dr. Harshada Vijay Rakh, MDS (Surgeon) & Sayali Sanjay Kote (MBBS)",
    "hero.breadcrumbs.2.url": "/doctors/hair-transplant-doctor-in-mumbai",
    "keyFacts.qualifications": "MDS (Surgeon) · MBBS",
    "whyItMatters.floatingStats": [
      { key: "", value: "Doctor-led", suffix: "", label: "Every surgical step", displayOrder: 0 },
    ],
    "credentials.cardHeading":
      "Credentials & Professional Qualifications — Dr. Harshada Vijay Rakh, MDS (Surgeon) & Sayali Sanjay Kote (MBBS)",
    "credentials.tabs": [
      {
        key: "mds",
        title: "MDS (Surgeon)",
        hint: "Dr. Harshada Vijay Rakh",
        badge: "",
        image: { image: "", alt: "" },
        icon: "GraduationCap",
        description: "Postgraduate dental & maxillofacial surgical qualification — Dr. Harshada Vijay Rakh.",
        ctaText: "",
        ctaLink: "",
        displayOrder: 1,
      },
      {
        key: "mbbs",
        title: "MBBS",
        hint: "Sayali Sanjay Kote",
        badge: "",
        image: { image: "", alt: "" },
        icon: "GraduationCap",
        description: "Primary medical degree (MBBS) — Sayali Sanjay Kote.",
        ctaText: "",
        ctaLink: "",
        displayOrder: 2,
      },
    ],
    "credentials.bottomCTA.description":
      "Call us — our team will answer your questions about our Mumbai doctors' qualifications before you commit to a consultation.",
    "comparison.rows.0.doctorValue": "Dr. Harshada Vijay Rakh & Sayali Sanjay Kote",
    "surgeonProfile.heading":
      "Meet Dr. Harshada Vijay Rakh, MDS (Surgeon) & Sayali Sanjay Kote (MBBS) — Mumbai",
    "surgeonProfile.about":
      "Dr. Harshada Vijay Rakh, MDS (Surgeon) and Sayali Sanjay Kote (MBBS) consult at Ryan Clinic in Andheri West, Mumbai, providing patient-first hair loss assessment, hairline design, and doctor-led Sapphire FUE and THI hair restoration.",
    "surgeonProfile.achievements": [],
    "surgeryTimeline.steps.0.description":
      "Dr. Harshada Vijay Rakh and Sayali Sanjay Kote examine your donor density and hair loss pattern, discuss your goals and history, and give an honest plan — technique, graft count, and transparent cost.",
    "surgeryTimeline.steps.2.description":
      "Your Mumbai doctors — Dr. Harshada Vijay Rakh and Sayali Sanjay Kote — oversee extraction, channel creation, and implantation under local anaesthesia in a sterile operating theatre — no technician hands on your grafts.",
    "surgeryTimeline.steps.3.description":
      "The doctors monitor your healing and growth through your full growth cycle, with scheduled review visits and direct access to the clinical team.",
    "greatDoctorQualities.cards.3.description":
      "Performs the surgery personally rather than delegating it — every extraction, channel, and implantation.",
    "warningSigns.image.alt": "Red flags in hair transplant clinics Mumbai",
    "questionsToAsk.questions.0.ryanStandard":
      "Doctor-led at every stage: Dr. Harshada Vijay Rakh and Sayali Sanjay Kote oversee consultation, hairline design, and surgical execution.",
    "pricing.packages.0.features.0":
      "Donor density & pattern analysis by Dr. Harshada Vijay Rakh & Sayali Sanjay Kote",
    "faq.faqs.0.answer":
      "Verify that qualified clinic doctors (such as MDS Surgeon and MBBS physicians) conduct assessment and key surgical steps, check medical council registration, review real patient results, and confirm transparent per-graft pricing.",
    "faq.faqs.1.answer":
      "Look for recognized medical and surgical qualifications such as MBBS and MDS (Surgeon), active council registration, and specialized training in Sapphire FUE and direct implantation techniques.",
    "faq.faqs.2.answer":
      "At Ryan Clinic Mumbai, Dr. Harshada Vijay Rakh and Sayali Sanjay Kote oversee hairline design, donor graft assessment, and doctor-led surgical protocols for every patient.",
    "faq.faqs.3.answer":
      "Consultation at Ryan Clinic Mumbai includes a free scalp analysis — Dr. Harshada Vijay Rakh and Sayali Sanjay Kote assess your donor density, calculate graft requirements, and provide a transparent written cost estimate.",
    "faq.faqs.4.answer":
      "Dr. Harshada Vijay Rakh and Sayali Sanjay Kote consult at Ryan Clinic located at MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053.",
    "doctorCard.shortQualification": "MDS (Surgeon) · MBBS",
    "doctorCard.cardDescription":
      "Consult Dr. Harshada Vijay Rakh, MDS (Surgeon) and Sayali Sanjay Kote (MBBS) at Ryan Clinic in Andheri West, Mumbai for personalized scalp evaluation and doctor-led Sapphire FUE and THI hair restoration.",
    "doctorCard.qualifications": [
      { degree: "Dr. Harshada Vijay Rakh", institute: "MDS (Surgeon)" },
      { degree: "Sayali Sanjay Kote", institute: "MBBS" },
    ],
    "doctorCard.certifications": [],
    teamDoctors: [
      {
        doctorName: "Dr. Harshada Vijay Rakh",
        qualification: "MDS Surgeon",
        designation: "Hair Transplant Doctor — Mumbai",
        about: "",
        profileImage: {},
      },
      {
        doctorName: "Sayali Sanjay Kote",
        qualification: "MBBS",
        designation: "Hair Transplant Doctor — Mumbai",
        about: "",
        profileImage: {},
      },
    ],
  };

  const hyderabadAfter = {
    pageName: "Hair Transplant Doctor in Hyderabad — Dr. Subba Redy",
    "basicInfo.doctorName": "Dr. Subba Redy",
    "basicInfo.designation": "Hair Transplant Doctor in Hyderabad",
    "basicInfo.yearsExperience": 0,
    "basicInfo.proceduresCount": 0,
    "basicInfo.successRate": "",
    "basicInfo.profileImage.alt": "Dr. Subba Redy — Hair Transplant Doctor in Hyderabad",
    "seo.metaTitle": "Dr. Subba Redy — Hair Transplant Doctor in Hyderabad | Ryan Clinic",
    "seo.metaDescription":
      "Consult Dr. Subba Redy at Ryan Clinic in Banjara Hills, Hyderabad for scalp evaluation and doctor-led Sapphire FUE & THI hair restoration.",
    "seo.keywords":
      "hair transplant doctor in Hyderabad, Dr. Subba Redy Hyderabad, best hair transplant doctor Hyderabad, Ryan Clinic Hyderabad",
    "seo.openGraphImage.alt": "Dr. Subba Redy — Hair Transplant Doctor in Hyderabad",
    "hero.title": "Hair Transplant Doctor in Hyderabad — Dr. Subba Redy",
    "hero.description":
      "Consult Dr. Subba Redy at Ryan Clinic, Banjara Hills, Hyderabad for doctor-led hair loss evaluation and Sapphire FUE / THI planning.",
    "hero.heroImage.alt": "Hair Transplant Doctor in Hyderabad — Dr. Subba Redy",
    "hero.breadcrumbs.2.url": "/doctors/hair-transplant-doctor-in-hyderabad",
    "keyFacts.qualifications": "",
    "keyFacts.experience": "",
    "keyFacts.procedures": "",
    "keyFacts.registration": "",
    "keyFacts.memberships": "",
    "whyItMatters.floatingStats": [
      { key: "", value: "Doctor-led", suffix: "", label: "Every surgical step", displayOrder: 0 },
    ],
    "doctorStandards.cards.0.description":
      "Verifiable credentials — recognized medical qualifications and relevant hair-restoration training, with a medical-council registration number you can check.",
    "credentials.cardHeading": "Credentials & Professional Qualifications — Dr. Subba Redy",
    "credentials.tabs": [],
    "credentials.bottomCTA.description":
      "Call us — our team will answer your questions about doctor qualifications and clinic protocols before you commit to a consultation.",
    "comparison.rows.0.doctorValue": "Dr. Subba Redy",
    "surgeonProfile.heading": "Meet Dr. Subba Redy — Hair Transplant Doctor in Hyderabad",
    "surgeonProfile.about":
      "Dr. Subba Redy consults at Ryan Clinic in Banjara Hills, Hyderabad, offering personalized scalp assessment and doctor-led hair restoration planning.",
    "surgeonProfile.achievements": [],
    "surgeryTimeline.steps.0.description":
      "Dr. Subba Redy examines your donor density and hair loss pattern, discusses your goals and history, and gives an honest plan — technique, graft count, and transparent cost.",
    "surgeryTimeline.steps.2.description":
      "Dr. Subba Redy oversees extraction, channel creation, and implantation under local anaesthesia in a sterile operating theatre — no technician hands on your grafts.",
    "surgeryTimeline.steps.3.description":
      "The doctor monitors your healing and growth through your full growth cycle, with scheduled review visits and direct access to the clinical team.",
    "greatDoctorQualities.cards.3.description":
      "Performs the surgery personally rather than delegating it — every extraction, channel, and implantation.",
    "warningSigns.image.alt": "Red flags in hair transplant clinics Hyderabad",
    "questionsToAsk.questions.0.ryanStandard":
      "Doctor-led consultation and surgical care with Dr. Subba Redy and the Ryan Clinic team.",
    "pricing.packages.0.features.0": "Donor density & pattern analysis by Dr. Subba Redy",
    "faq.faqs.0.answer":
      "Verify that a qualified doctor personally conducts key surgical steps, check their medical council registration, review real patient results, and ensure transparent written per-graft pricing.",
    "faq.faqs.1.answer":
      "Look for recognized medical and surgical qualifications, active state medical council registration, and specialized training in Sapphire FUE and direct implantation techniques.",
    "faq.faqs.2.answer":
      "At Ryan Clinic Hyderabad, Dr. Subba Redy oversees hairline design, donor graft evaluation, and doctor-led surgical protocols for every patient.",
    "faq.faqs.3.answer":
      "Consultation at Ryan Clinic includes a free scalp analysis — Dr. Subba Redy assesses your donor density, calculates graft requirements, and provides a transparent per-graft written cost estimate.",
    "faq.faqs.4.answer":
      "Dr. Subba Redy consults at Ryan Clinic located at 2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034.",
    doctorCard: {
      shortQualification: "",
      cardDescription:
        "Dr. Subba Redy consults at Ryan Clinic in Banjara Hills, Hyderabad for scalp evaluation and doctor-led hair restoration.",
      qualifications: [],
      certifications: [],
      specializations: ["Sapphire FUE", "Turkish Technique (THI)", "Hairline Design & Planning"],
    },
    teamDoctors: [],
  };

  const gurgaonAfter = {
    pageName: "Hair Transplant Doctor in Gurgaon — Dr. Bobby Garg (MDS)",
    badge: "",
    "basicInfo.doctorName": "Dr. Bobby Garg",
    "basicInfo.designation": "Hair Transplant Doctor in Gurgaon",
    "basicInfo.yearsExperience": 0,
    "basicInfo.proceduresCount": 0,
    "basicInfo.successRate": "",
    "basicInfo.profileImage.alt": "Dr. Bobby Garg (MDS) — Hair Transplant Doctor in Gurgaon",
    "seo.metaTitle": "Dr. Bobby Garg (MDS) — Hair Transplant Doctor in Gurgaon | Ryan Clinic",
    "seo.metaDescription":
      "Consult Dr. Bobby Garg (MDS), hair transplant doctor at Ryan Clinic in Sector 46, Gurgaon. Book a free scalp assessment and transparent hair restoration consultation.",
    "seo.keywords":
      "hair transplant doctor in Gurgaon, Dr. Bobby Garg MDS, Dr. Bobby Garg Gurgaon, hair transplant surgeon Gurgaon, Ryan Clinic Gurgaon",
    "seo.openGraphImage.alt": "Dr. Bobby Garg (MDS) — Hair Transplant Doctor in Gurgaon",
    "hero.title": "Hair Transplant Doctor in Gurgaon — Dr. Bobby Garg (MDS)",
    "hero.description":
      "Consult Dr. Bobby Garg (MDS) at Ryan Clinic, Sector 46, Gurgaon for doctor-led scalp assessment and hair restoration planning.",
    "hero.heroImage.alt": "Hair Transplant Doctor in Gurgaon — Dr. Bobby Garg (MDS)",
    "hero.breadcrumbs.2.url": "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-gurgaon",
    "whyItMatters.image.alt": "Doctor-led hair transplant at Ryan Clinic, Gurgaon",
    "whyItMatters.floatingStats": [
      { key: "", value: "Doctor-led", suffix: "", label: "Every surgical step", displayOrder: 0 },
    ],
    "doctorStandards.cards.0.description":
      "Verifiable credentials — recognized medical or dental degree (such as MDS / MBBS) and relevant hair-restoration training, with a registration number you can check.",
    "credentials.cardHeading": "Credentials & Professional Qualifications — Dr. Bobby Garg (MDS)",
    "credentials.tabs": [
      {
        key: "mds",
        title: "MDS",
        hint: "Postgraduate Degree",
        badge: "",
        image: { image: "", alt: "" },
        icon: "GraduationCap",
        description: "Postgraduate degree — MDS.",
        ctaText: "",
        ctaLink: "",
        displayOrder: 1,
      },
    ],
    "credentials.bottomCTA.description":
      "Call us — our team will answer your questions about qualifications and clinic protocols before you commit to a consultation.",
    "verification.heading": "How to verify a hair transplant doctor's credentials in Gurgaon",
    "comparison.rows.0.doctorValue": "Dr. Bobby Garg",
    "surgeonProfile.heading": "Meet Dr. Bobby Garg (MDS) — Hair Transplant Doctor in Gurgaon",
    "surgeonProfile.about":
      "Dr. Bobby Garg (MDS) consults at Ryan Clinic in Sector 46, Gurgaon, providing personalized scalp assessment and doctor-led hair restoration consultation.",
    "surgeonProfile.achievements": [],
    "surgeryTimeline.steps.0.description":
      "Dr. Bobby Garg examines your donor density and hair loss pattern, discusses your goals and history, and gives an honest plan — technique, graft count, and transparent cost.",
    "surgeryTimeline.steps.2.description":
      "Dr. Bobby Garg oversees extraction, channel creation, and implantation under local anaesthesia in a sterile operating theatre — no technician hands on your grafts.",
    "surgeryTimeline.steps.3.description":
      "The doctor monitors your healing and growth through your full growth cycle, with scheduled review visits and direct access to the clinical team.",
    "consultation.contactCards.2": {
      key: "",
      icon: "location",
      title: "Visit the Clinic",
      value: "HOUSE NO- 53, MAIN, Market Rd, Residency Green, Jal Vihar Colony, Sector 46, Gurugram, Haryana 122001",
      link: "https://www.google.com/maps/place/Ryan+Clinic+%E2%80%93+Turkey+Hair+Transplant+Experts+Gurgaon/@28.4389059,77.0546474,17z/data=!3m1!4b1!4m6!3m5!1s0x390d19d605d89bcd:0x8eb67acb58dcca35!8m2!3d28.4389059!4d77.0546474!16s%2Fg%2F11zylm66mr?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDkwNi4wIKXMDSoASAFQAw%3D%3D",
      displayOrder: 0,
    },
    "questionsToAsk.questions.0.ryanStandard":
      "Doctor-led consultation and surgical care with Dr. Bobby Garg (MDS) and the Ryan Clinic team.",
    "questionsToAsk.questions.2.question":
      "Can I verify your medical / dental council registration number?",
    "questionsToAsk.questions.2.ryanStandard":
      "Registration details provided for verification upon consultation.",
    "keyFacts.qualifications": "MDS",
    "keyFacts.registration": "",
    "keyFacts.memberships": "",
    "keyFacts.experience": "",
    "keyFacts.procedures": "",
    "pricing.packages.0.features.0": "Donor density & pattern analysis by Dr. Bobby Garg",
    "warningSigns.image.alt": "Red flags in hair transplant clinics Gurgaon",
    "faq.faqs.0.answer":
      "Verify that a qualified doctor (such as MDS / MBBS) personally conducts key consultation and surgical steps, check council registration, review patient results, and confirm transparent per-graft pricing.",
    "faq.faqs.1.answer":
      "Look for recognized medical or surgical qualifications (such as MDS or MBBS), active council registration, and specialized training in Sapphire FUE and direct implantation techniques.",
    "faq.faqs.2.answer":
      "At Ryan Clinic Gurgaon, Dr. Bobby Garg (MDS) oversees hairline design, donor graft evaluation, and doctor-led surgical protocols for every patient.",
    "faq.faqs.3.answer":
      "Consultation at Ryan Clinic includes a free scalp analysis — Dr. Bobby Garg assesses your donor density, calculates graft requirements, and provides a transparent per-graft written cost estimate.",
    "faq.faqs.4.answer":
      "Dr. Bobby Garg consults at Ryan Clinic located at HOUSE NO- 53, MAIN, Market Rd, Residency Green, Jal Vihar Colony, Sector 46, Gurugram, Haryana 122001.",
    doctorCard: {
      shortQualification: "MDS",
      cardDescription:
        "Dr. Bobby Garg (MDS) consults at Ryan Clinic in Sector 46, Gurgaon for scalp assessment and doctor-led hair restoration.",
      qualifications: [{ degree: "MDS", institute: "" }],
      certifications: [],
      specializations: ["Sapphire FUE", "Turkish Technique (THI)", "Hairline Design & Planning"],
    },
    teamDoctors: [],
  };

  const now = new Date();
  const noidaDoc = {
    slug: "hair-transplant-doctor-in-noida",
    pageName:
      "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan (BDS Doctor) & Dr. Tanmay Kaushik (MBBS Doctors)",
    status: "published",
    isActive: true,
    deletedAt: null,
    schemaVersion: 1,
    displayOrder: 1,
    featured: true,
    badge: "",
    basicInfo: {
      doctorName: "Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
      designation: "Hair Transplant Doctors in Noida",
      city: "Noida",
      yearsExperience: 0,
      proceduresCount: 0,
      successRate: "",
      rating: 4.7,
      phoneNumber: "+91-9911111247",
      whatsappNumber: "+91-9217958539",
      email: "info@clinicryan.com",
      clinicName: "Ryan Skin & Hair Transplant Clinic",
      clinicAddress: "Noida, Uttar Pradesh",
      languages: ["English", "Hindi"],
      profileImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
      },
    },
    teamDoctors: [
      {
        doctorName: "Dr. Rahul Ranjan",
        qualification: "BDS Doctor",
        designation: "Hair Transplant Doctor — Noida",
        about: "",
        profileImage: {},
      },
      {
        doctorName: "Dr. Tanmay Kaushik",
        qualification: "MBBS Doctors",
        designation: "Hair Transplant Doctor — Noida",
        about: "",
        profileImage: {},
      },
    ],
    seo: {
      metaTitle:
        "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan & Dr. Tanmay Kaushik | Ryan Clinic",
      metaDescription:
        "Consult Dr. Rahul Ranjan (BDS Doctor) and Dr. Tanmay Kaushik (MBBS Doctors) at Ryan Clinic in Noida for scalp assessment and doctor-led hair restoration.",
      keywords:
        "hair transplant doctor in Noida, hair transplant doctors Noida, Dr. Rahul Ranjan Noida, Dr. Tanmay Kaushik Noida, Ryan Clinic Noida",
      canonicalUrl: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-noida",
      robots: "index, follow",
      openGraphImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
      },
      useGlobalSEO: false,
      customJsonLd: "",
    },
    hero: {
      title:
        "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan (BDS Doctor) & Dr. Tanmay Kaushik (MBBS Doctors)",
      description:
        "Consult Dr. Rahul Ranjan (BDS Doctor) and Dr. Tanmay Kaushik (MBBS Doctors) at Ryan Clinic in Noida for doctor-led Sapphire FUE and THI hair restoration.",
      heroImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: "Hair Transplant Doctors in Noida — Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
      },
      breadcrumbs: [
        { key: "", title: "", url: "/" },
        { key: "", title: "", url: "/doctors" },
        { key: "", title: "", url: "/doctors/hair-transplant-doctor-in-noida" },
      ],
      whatsappCTA: { text: "WhatsApp Us", url: "", link: "" },
      callCTA: { text: "Call Now", url: "", link: "" },
      stats: [],
    },
    keyFacts: {
      heading: "DOCTOR & CLINIC KEY FACTS",
      qualifications: "BDS Doctor · MBBS Doctors",
      registration: "",
      specialisation: "Sapphire FUE & Direct Implantation Hair Restoration",
      experience: "",
      procedures: "",
      memberships: "",
      location: "Noida, Uttar Pradesh",
      consultation: "Free Scalp Analysis & Custom Hairline Design",
    },
    doctorCard: {
      shortQualification: "BDS Doctor · MBBS Doctors",
      cardDescription:
        "Consult Dr. Rahul Ranjan (BDS Doctor) and Dr. Tanmay Kaushik (MBBS Doctors) at Ryan Clinic in Noida for scalp evaluation and doctor-led hair restoration.",
      qualifications: [
        { degree: "Dr. Rahul Ranjan", institute: "BDS Doctor" },
        { degree: "Dr. Tanmay Kaushik", institute: "MBBS Doctors" },
      ],
      certifications: [],
      specializations: ["Sapphire FUE", "Turkish Technique (THI)", "Hairline Design & Planning"],
    },
    credentials: {
      sectionLabel: "Credentials to Look For",
      heading: "Credentials to look for in a hair transplant doctor in Noida",
      cardHeading: "Noida Branch Doctors — Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
      description:
        "A qualified hair transplant team in Noida provides transparent medical qualifications and doctor-led consultation.",
      bottomNote: "",
      tabs: [
        {
          key: "bds",
          title: "Dr. Rahul Ranjan — BDS Doctor",
          hint: "Noida Branch",
          badge: "",
          image: { image: "", alt: "" },
          icon: "GraduationCap",
          description: "Dr. Rahul Ranjan (BDS Doctor) consults at Ryan Clinic Noida.",
          ctaText: "",
          ctaLink: "",
          displayOrder: 1,
        },
        {
          key: "mbbs",
          title: "Dr. Tanmay Kaushik — MBBS Doctors",
          hint: "Noida Branch",
          badge: "",
          image: { image: "", alt: "" },
          icon: "GraduationCap",
          description: "Dr. Tanmay Kaushik (MBBS Doctors) consults at Ryan Clinic Noida.",
          ctaText: "",
          ctaLink: "",
          displayOrder: 2,
        },
      ],
      bottomCTA: {
        badge: "",
        heading: "Not sure what to verify?",
        description:
          "Call us — our team will answer your questions about our Noida doctors' qualifications before you commit to a consultation.",
        buttonText: "",
        buttonLink: "",
      },
    },
    surgeonProfile: {
      sectionLabel: "YOUR NOIDA DOCTORS",
      heading:
        "Meet Our Hair Transplant Doctors in Noida — Dr. Rahul Ranjan (BDS Doctor) & Dr. Tanmay Kaushik (MBBS Doctors)",
      achievementsHeading: "",
      philosophyHeading: "Is Hair Transplant Right for You?",
      about:
        "Dr. Rahul Ranjan (BDS Doctor) and Dr. Tanmay Kaushik (MBBS Doctors) consult at Ryan Clinic in Noida, providing patient-first scalp assessment, hairline planning, and doctor-led Sapphire FUE and THI hair restoration.",
      philosophy:
        "Hair restoration combines careful clinical assessment, artistic hairline design, and transparent patient guidance.",
      whyChooseDoctor: [],
      achievements: [],
      consultationHeading: "What Your Consultation Includes",
      consultationIncludes: [
        { key: "", title: "Free scalp analysis & hair density assessment", description: "", displayOrder: 0 },
        { key: "", title: "Exact graft count with personalized hairline design", description: "", displayOrder: 0 },
        { key: "", title: "Transparent per-graft pricing — no hidden charges", description: "", displayOrder: 0 },
        { key: "", title: "Full treatment roadmap & post-op protocol", description: "", displayOrder: 0 },
      ],
      primaryCTA: { text: "", url: "", link: "" },
      secondaryCTA: { text: "", url: "", link: "" },
    },
    comparison: {
      sectionLabel: "The Critical Difference",
      heading: "Doctor-led vs technician-led surgery in Noida: the difference that defines your result",
      description:
        "Verify who performs every step of your procedure at any clinic in Noida. At Ryan Clinic, consultations and surgical planning are doctor-led.",
      leftCard: { title: "Doctor-Led (Ryan Clinic)", subtitle: "", badge: "", disclaimer: "", image: { image: "", alt: "" } },
      rightCard: { title: "Technician-Led 'Graft Mill'", subtitle: "", badge: "", disclaimer: "", image: { image: "", alt: "" } },
      rows: [
        { key: "", parameter: "Consultation & Scalp Analysis", doctorValue: "Dr. Rahul Ranjan & Dr. Tanmay Kaushik", technicianValue: "Often a salesperson / counsellor", displayOrder: 0 },
        { key: "", parameter: "Hairline Design & Planning", doctorValue: "Doctor — personalised to your face", technicianValue: "Variable / generic template", displayOrder: 0 },
        { key: "", parameter: "Local Anaesthesia Administration", doctorValue: "Doctor", technicianValue: "Assistant / Technician", displayOrder: 0 },
        { key: "", parameter: "Graft Extraction (FUE / Sapphire)", doctorValue: "Doctor", technicianValue: "Often technicians", displayOrder: 0 },
        { key: "", parameter: "Recipient Site Creation", doctorValue: "Doctor", technicianValue: "Often technicians", displayOrder: 0 },
        { key: "", parameter: "Graft Implantation", doctorValue: "Doctor", technicianValue: "Often technicians", displayOrder: 0 },
        { key: "", parameter: "Post-Op Inspection & Care Plan", doctorValue: "Doctor — structured 12-18 month follow-up", technicianValue: "Often ends at discharge", displayOrder: 0 },
      ],
    },
    whyItMatters: {
      sectionLabel: "Why Your Doctor Matters",
      heading: "Why your hair transplant doctor in Noida matters more than anything else",
      description:
        "A hair transplant is a permanent redistribution of a limited donor supply. Careful planning by qualified clinic doctors protects your donor zone and produces natural density.",
      secondaryDescription:
        "Choosing the right doctors in Noida ensures honest candidacy judgement, customized hairline design, and consistent clinical follow-up.",
      highlightBox: "Doctor-led planning and careful clinical execution protect your donor area and long-term result.",
      image: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", alt: "Doctor-led hair transplant at Ryan Clinic, Noida" },
      floatingStats: [{ key: "", value: "Doctor-led", suffix: "", label: "Every surgical step", displayOrder: 0 }],
      bottomCard: { key: "", number: 0, icon: "", title: "", hint: "", description: "", url: "", displayOrder: 0 },
      primaryCTA: { text: "Book Free Consultation", url: "tel:+919217958539", link: "" },
      secondaryCTA: { text: "WhatsApp Us", url: "https://wa.me/919217958539", link: "" },
    },
    pricing: {
      sectionLabel: "Transparent Pricing",
      heading: "Cost of consulting a hair transplant doctor in Noida",
      description:
        "Consultation at Ryan Clinic Noida includes a free scalp analysis — our doctors assess your case and provide an exact graft count and transparent cost estimate.",
      packageSectionHeading: "Noida",
      packageSectionDescription: "",
      packages: [
        {
          key: "consultation",
          title: "Free Consultation",
          subtitle: "Scalp analysis & honest assessment",
          price: "₹0",
          features: [
            "Donor density & pattern analysis by Dr. Rahul Ranjan & Dr. Tanmay Kaushik",
            "Exact graft count recommendation",
            "Technique suitability assessment",
            "Transparent per-graft cost breakdown",
          ],
          buttonText: "Book Free Consult",
          buttonLink: "",
          displayOrder: 1,
          isFeatured: false,
          priceNote: "No charge",
        },
        {
          key: "sapphire-fue",
          title: "Sapphire FUE",
          subtitle: "Natural, doctor-led result",
          price: "Estimate",
          features: [
            "Doctor-led consultation & surgical steps",
            "Sapphire micro-blade channel creation",
            "Custom hairline design",
            "Sterile OT suite",
            "Structured follow-up care",
          ],
          buttonText: "Get Exact Quote",
          buttonLink: "",
          displayOrder: 2,
          isFeatured: true,
          priceNote: "per graft rate confirmed in consult",
        },
        {
          key: "thi-technique",
          title: "THI Technique",
          subtitle: "Choi Pen implantation",
          price: "Estimate",
          features: [
            "Original Turkish Choi Pen technique",
            "No-shave option available",
            "Dense packing protocol",
            "Doctor-led clinical care",
            "Structured aftercare included",
          ],
          buttonText: "Get Exact Quote",
          buttonLink: "",
          displayOrder: 3,
          isFeatured: false,
          priceNote: "per graft rate confirmed in consult",
        },
      ],
      disclaimer:
        "Prices are determined per-graft. Your exact cost depends on graft count determined at consultation.",
    },
    visitClinic: {
      sectionLabel: "Find Us",
      heading: "Visiting Ryan Clinic in Noida",
      description: "Our Noida clinic serves patients across Noida, Greater Noida, and NCR.",
      clinicImage: { image: "", alt: "" },
      gallery: [],
      address: {
        clinicName: "Ryan Skin & Hair Transplant Clinic",
        address: "Noida, Uttar Pradesh",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "",
      },
      timings: [
        { key: "", day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
        { key: "", day: "Sunday", time: "By appointment only" },
      ],
      mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Noida",
      contact: { phone: "+91-9217958539", whatsapp: "+91-9217958539", email: "info@clinicryan.com" },
      nearbyLocations: [
        "Sector 18",
        "Sector 62",
        "Sector 15",
        "Sector 50",
        "Sector 137",
        "Greater Noida",
        "Indirapuram",
        "Vaishali",
      ],
      informationCards: [],
    },
    faq: {
      sectionLabel: "FAQ",
      heading: "Frequently asked questions about hair transplant doctors in Noida",
      description:
        "Everything you need to know about consulting a hair transplant doctor at Ryan Clinic in Noida.",
      faqs: [
        {
          key: "",
          question: "Who are the hair transplant doctors at Ryan Clinic Noida?",
          answer:
            "Ryan Clinic Noida lists Dr. Rahul Ranjan (BDS Doctor) and Dr. Tanmay Kaushik (MBBS Doctors) for scalp evaluation, treatment planning, and consultation.",
          displayOrder: 0,
        },
        {
          key: "",
          question: "How do I book a hair transplant consultation in Noida?",
          answer:
            "You can book a free scalp analysis with Dr. Rahul Ranjan and Dr. Tanmay Kaushik at Ryan Clinic Noida via phone (+91-9911111247) or WhatsApp (+91-9217958539).",
          displayOrder: 0,
        },
        {
          key: "",
          question: "How is the cost of hair transplant determined in Noida?",
          answer:
            "Your estimate depends on graft count and technique determined during your scalp assessment at Ryan Clinic Noida, with transparent per-graft pricing provided upfront.",
          displayOrder: 0,
        },
      ],
    },
    medicalReviewer: { isVerified: false, reviewerName: "", qualifications: "", registration: "" },
    createdAt: now,
    updatedAt: now,
  };

  return { mumbaiAfter, hyderabadAfter, gurgaonAfter, noidaDoc };
}

async function run() {
  const mode = process.argv.includes("--apply")
    ? "apply"
    : process.argv.includes("--rollback")
    ? "rollback"
    : "dry-run";

  const mongoUrl = loadMongoUrl();
  await mongoose.connect(mongoUrl);

  const db = mongoose.connection.db;
  const hello = await db.command({ hello: 1 });
  if (db.databaseName !== EXPECTED_DB_NAME) {
    throw new Error(`Unsafe DB name: expected "${EXPECTED_DB_NAME}", got "${db.databaseName}"`);
  }
  if (hello.setName !== EXPECTED_SET_NAME) {
    throw new Error(`Unsafe replica set: expected "${EXPECTED_SET_NAME}", got "${hello.setName}"`);
  }
  console.log(`[VERIFIED] db="${db.databaseName}", setName="${hello.setName}", mode="${mode}"`);

  const doctorsCol = db.collection("doctors");
  const servicesCol = db.collection("services");
  const EJSON = mongoose.mongo.BSON.EJSON;

  const { mumbaiAfter, hyderabadAfter, gurgaonAfter, noidaDoc } = buildUpdatePayload();

  if (mode === "dry-run") {
    const m = await doctorsCol.findOne({ _id: new ObjectId(IDS.MUMBAI_DOCTOR) });
    const h = await doctorsCol.findOne({ _id: new ObjectId(IDS.HYDERABAD_DOCTOR) });
    const g = await doctorsCol.findOne({ _id: new ObjectId(IDS.GURGAON_DOCTOR) });
    const nExisting = await doctorsCol.findOne({ slug: "hair-transplant-doctor-in-noida" });
    const hs = await servicesCol.findOne({ _id: new ObjectId(IDS.HYDERABAD_SERVICE) });
    const ns = await servicesCol.findOne({ _id: new ObjectId(IDS.NOIDA_SERVICE) });
    const gs = await servicesCol.findOne({ _id: new ObjectId(IDS.GURGAON_SERVICE) });

    console.log("DRY-RUN CHECK:");
    console.log("  Mumbai doctor:", m?.slug, "current name=", m?.basicInfo?.doctorName, "->", mumbaiAfter["basicInfo.doctorName"]);
    console.log("  Hyderabad doctor:", h?.slug, "current name=", h?.basicInfo?.doctorName, "->", hyderabadAfter["basicInfo.doctorName"]);
    console.log("  Gurgaon doctor:", g?.slug, "current name=", g?.basicInfo?.doctorName, "->", gurgaonAfter["basicInfo.doctorName"]);
    console.log("  Noida doctor exists?", Boolean(nExisting), nExisting?._id || "(will insert)");
    console.log("  Hyderabad service assignedDoctor:", hs?.assignedDoctor?.toString(), "->", IDS.HYDERABAD_DOCTOR);
    console.log("  Noida service assignedDoctor:", ns?.assignedDoctor?.toString(), "-> <new Noida doc>");
    console.log("  Gurgaon service assignedDoctor (preserved):", gs?.assignedDoctor?.toString());
    await mongoose.disconnect();
    return;
  }

  if (mode === "apply") {
    // 1. Export pre-write EJSON backup BEFORE starting transaction
    const existingDocs = {
      doctors: [
        await doctorsCol.findOne({ _id: new ObjectId(IDS.MUMBAI_DOCTOR) }),
        await doctorsCol.findOne({ _id: new ObjectId(IDS.HYDERABAD_DOCTOR) }),
        await doctorsCol.findOne({ _id: new ObjectId(IDS.GURGAON_DOCTOR) }),
      ].filter(Boolean),
      services: [
        await servicesCol.findOne({ _id: new ObjectId(IDS.HYDERABAD_SERVICE) }),
        await servicesCol.findOne({ _id: new ObjectId(IDS.NOIDA_SERVICE) }),
        await servicesCol.findOne({ _id: new ObjectId(IDS.GURGAON_SERVICE) }),
      ].filter(Boolean),
    };

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const preWriteBackupPath = path.join(BACKUP_DIR, `backup-pre-final-doctor-fixes-${stamp}.ejson.json`);
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const serialized = EJSON.stringify({ exportedAt: new Date().toISOString(), collections: existingDocs }, { relaxed: false });
    fs.writeFileSync(preWriteBackupPath, serialized, "utf8");
    const sha256 = crypto.createHash("sha256").update(serialized).digest("hex").toUpperCase();
    console.log(`[BACKUP] Wrote ${preWriteBackupPath} (SHA-256: ${sha256})`);

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        // Guard: Noida slug must not already exist
        const dupNoida = await doctorsCol.findOne({ slug: "hair-transplant-doctor-in-noida" }, { session });
        if (dupNoida) {
          throw new Error(`Noida doctor already exists (_id=${dupNoida._id}); aborting insert.`);
        }

        // 1. Update Mumbai (CAS on current slug + Harshada name)
        const mRes = await doctorsCol.updateOne(
          {
            _id: new ObjectId(IDS.MUMBAI_DOCTOR),
            slug: "hair-transplant-doctor-in-mumbai",
            "basicInfo.doctorName": "Dr. Harshada Vijay Rakh",
          },
          { $set: { ...mumbaiAfter, updatedAt: new Date() } },
          { session }
        );
        if (mRes.matchedCount !== 1 || mRes.modifiedCount !== 1) {
          throw new Error(`Mumbai doctor CAS mismatch: ${JSON.stringify(mRes)}`);
        }

        // 2. Update Hyderabad (CAS on current slug + Ede Akhila)
        const hRes = await doctorsCol.updateOne(
          {
            _id: new ObjectId(IDS.HYDERABAD_DOCTOR),
            slug: "hair-transplant-doctor-in-hyderabad",
            "basicInfo.doctorName": "Dr. Ede Akhila",
          },
          { $set: { ...hyderabadAfter, updatedAt: new Date() } },
          { session }
        );
        if (hRes.matchedCount !== 1 || hRes.modifiedCount !== 1) {
          throw new Error(`Hyderabad doctor CAS mismatch: ${JSON.stringify(hRes)}`);
        }

        // 3. Reassign Hyderabad service after verifying target doctor is active, published, non-deleted
        const hTarget = await doctorsCol.findOne(
          {
            _id: new ObjectId(IDS.HYDERABAD_DOCTOR),
            slug: "hair-transplant-doctor-in-hyderabad",
            status: "published",
            isActive: true,
            deletedAt: null,
          },
          { session }
        );
        if (!hTarget) throw new Error("Hyderabad target doctor failed publish/active verification.");
        const hsRes = await servicesCol.updateOne(
          {
            _id: new ObjectId(IDS.HYDERABAD_SERVICE),
            assignedDoctor: new ObjectId(IDS.HYDERABAD_DEMO_DOCTOR),
          },
          { $set: { assignedDoctor: new ObjectId(IDS.HYDERABAD_DOCTOR), updatedAt: new Date() } },
          { session }
        );
        if (hsRes.matchedCount !== 1 || hsRes.modifiedCount !== 1) {
          throw new Error(`Hyderabad service CAS mismatch: ${JSON.stringify(hsRes)}`);
        }

        // 4. Update Gurgaon (CAS on current slug + Dr. Pranendra Singh)
        const gRes = await doctorsCol.updateOne(
          {
            _id: new ObjectId(IDS.GURGAON_DOCTOR),
            slug: "hair-transplant-doctor-in-gurgaon",
            "basicInfo.doctorName": "Dr. Pranendra Singh",
          },
          { $set: { ...gurgaonAfter, updatedAt: new Date() } },
          { session }
        );
        if (gRes.matchedCount !== 1 || gRes.modifiedCount !== 1) {
          throw new Error(`Gurgaon doctor CAS mismatch: ${JSON.stringify(gRes)}`);
        }

        // Verify Gurgaon service remains linked to 6aa0fda669bae9798c18c074
        const gsTarget = await servicesCol.findOne(
          {
            _id: new ObjectId(IDS.GURGAON_SERVICE),
            assignedDoctor: new ObjectId(IDS.GURGAON_DOCTOR),
          },
          { session }
        );
        if (!gsTarget) throw new Error("Gurgaon service assignment integrity check failed.");

        // 5. Insert Noida doctor and verify status/slug before reassigning Noida service
        const nInsert = await doctorsCol.insertOne(noidaDoc, { session });
        const newNoidaId = nInsert.insertedId;
        const nVerified = await doctorsCol.findOne(
          {
            _id: newNoidaId,
            slug: "hair-transplant-doctor-in-noida",
            status: "published",
            isActive: true,
            deletedAt: null,
          },
          { session }
        );
        if (!nVerified) throw new Error("Inserted Noida doctor failed publish/active verification.");

        const nsRes = await servicesCol.updateOne(
          {
            _id: new ObjectId(IDS.NOIDA_SERVICE),
            assignedDoctor: new ObjectId(IDS.NOIDA_DEMO_DOCTOR),
          },
          { $set: { assignedDoctor: newNoidaId, updatedAt: new Date() } },
          { session }
        );
        if (nsRes.matchedCount !== 1 || nsRes.modifiedCount !== 1) {
          throw new Error(`Noida service CAS mismatch: ${JSON.stringify(nsRes)}`);
        }

        console.log("[APPLIED]", JSON.stringify({
          mumbaiModified: mRes.modifiedCount,
          hyderabadModified: hRes.modifiedCount,
          hyderabadServiceModified: hsRes.modifiedCount,
          gurgaonModified: gRes.modifiedCount,
          noidaInsertedId: newNoidaId.toString(),
          noidaServiceModified: nsRes.modifiedCount,
        }));
      });
    } finally {
      await session.endSession();
    }

    await mongoose.disconnect();
    return;
  }

  if (mode === "rollback") {
    const backupArgIdx = process.argv.indexOf("--backup");
    if (backupArgIdx < 0 || !process.argv[backupArgIdx + 1]) {
      throw new Error("Usage: node scripts/apply-final-doctor-fixes.mjs --rollback --backup <path-to-pre-write-backup.ejson.json>");
    }
    const raw = fs.readFileSync(process.argv[backupArgIdx + 1], "utf8");
    const parsed = EJSON.parse(raw);
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        for (const doc of parsed.collections.doctors || []) {
          await doctorsCol.replaceOne({ _id: doc._id }, doc, { session });
        }
        for (const doc of parsed.collections.services || []) {
          await servicesCol.replaceOne({ _id: doc._id }, doc, { session });
        }
        await doctorsCol.deleteOne({ slug: "hair-transplant-doctor-in-noida" }, { session });
        console.log("[ROLLED BACK] Restored backed-up docs and removed inserted Noida doc.");
      });
    } finally {
      await session.endSession();
    }
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("[ABORTED]", err.message);
  process.exit(1);
});
