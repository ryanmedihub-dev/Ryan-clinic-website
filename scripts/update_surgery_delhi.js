const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const idx = t.indexOf("=");
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function updateDelhiSurgery() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  const SurgeryPage = mongoose.connection.collection("surgerypages");

  const slug = "hair-transplant-surgery-in-delhi";

  const updateFields = {
    "pageName": "Best Hair Transplant Surgery in Delhi",
    "city": "Delhi",
    "seo.metaTitle": "Hair Transplant Surgery in Delhi | Doctor-Led Sapphire FUE",
    "seo.metaDescription": "Hair transplant surgery in Delhi, doctor-led at every step. Sapphire FUE & THI in a sterile OT, local anaesthesia, same-day discharge. Free scalp analysis.",
    "seo.canonicalUrl": "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi",
    "seo.keywords": "hair transplant surgery in Delhi, best hair transplant surgery in Delhi, fue hair transplant delhi, dhi hair transplant delhi",

    // Hero Section
    "hero.title": "Hair Transplant Surgery in Delhi — Doctor-Led Sapphire FUE & THI",
    "hero.description": "Micro-FUE and Direct Hair Implantation (THI) performed by senior plastic surgeons in a sterile operating theatre. Outpatient local anaesthesia, natural hairline design, and same-day discharge.",

    // Introduction Section
    "introduction.smallHeading": "Diagnosis-First Hair Surgery in Delhi",
    "introduction.title": "What is hair transplant surgery?",
    "introduction.description": "Hair transplant surgery is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — ensuring no general anaesthesia risks and no hospital stay. A surgeon relocates your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently.",
    "introduction.highlightBoxText": "<strong>Our Surgical Commitment:</strong> Every surgery is doctor-led with graft tracking, single-use sterile micro-punches, and 12-month post-op monitoring.",
    "introduction.honestPoints": [
      "Doctor-Led Extraction & Implantation",
      "Custom hairline design matched to your facial bone structure",
      "Maximum density with micro-incisions (0.7mm - 0.8mm)",
      "Same-day procedure with zero hospital stay required",
      "Transparent pricing with no hidden charges"
    ],

    // Procedure Day Timeline Steps (Audit Fix)
    "procedureTimeline.heading": "During the hair transplant surgery in Delhi: step by step",
    "procedureTimeline.description": "From morning arrival to evening discharge, your surgery follows a structured, sterile protocol.",
    "procedureTimeline.timelineSteps": [
      {
        stepNumber: "01",
        badge: "08:30 AM",
        title: "Preparation & Local Anaesthesia",
        description: "The donor and recipient areas are prepared and numbed with local anaesthetic. You stay awake and comfortable throughout — there is no general anaesthesia or heavy sedation involved.",
        stepImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "Preparation & Local Anaesthesia at Ryan Clinic Delhi" }
      },
      {
        stepNumber: "02",
        badge: "09:30 AM",
        title: "Graft Extraction",
        description: "Using a micro-punch typically under 1 mm, the surgeon removes follicular units one at a time from the donor zone at the back and sides of the scalp. Each unit contains one to four hairs and is taken with its surrounding tissue intact, so the follicle survives the move. Extraction is spread evenly across the donor area rather than concentrated in one patch, which keeps donor density looking natural once the hair grows back. Extracted grafts are placed immediately into chilled preservation solution to limit time outside the body.",
        stepImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "Graft Extraction procedure" }
      },
      {
        stepNumber: "03",
        badge: "01:30 PM",
        title: "Implantation",
        description: "For Sapphire FUE, the surgeon first creates recipient channels with sapphire-tipped blades, setting the angle, depth and direction of each site before the grafts are placed. For THI, a Choi implanter pen creates the site and places the graft in a single motion. Either way, the front hairline is built with single-hair grafts for a soft, irregular edge, and denser multi-hair units are placed behind it to build coverage. This stage takes the longest, and it is where surgical judgement most affects how natural the result looks.",
        stepImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Graft Implantation stage" }
      },
      {
        stepNumber: "04",
        badge: "05:00 PM",
        title: "Same-Day Discharge",
        description: "Once implantation is complete, the donor area is dressed and you are given post-operative instructions, a saline spray kit, a cap and your medications. Your vitals are checked and you go home the same day — there is no hospital admission for a standard case. Most patients are driven home rather than driving themselves, because the local anaesthetic can leave the scalp tender for the first few hours. Your first follow-up is scheduled before you leave.",
        stepImage: { image: "/uploads/1752734248947-Hair Transplant 1.jpg", imageAlt: "Same-Day Discharge after surgery" }
      }
    ],

    // Before Surgery Timeline Steps (Audit Fix - Step 4 Blood Tests & Medical Clearance)
    "beforeSurgeryTimeline.heading": "Before your hair transplant surgery in Delhi",
    "beforeSurgeryTimeline.description": "A smooth surgical outcome begins with proper preparation.",
    "beforeSurgeryTimeline.timelineItems": [
      {
        stepNumber: "01",
        badge: "2 Weeks Before",
        title: "Consultation + Free Scalp Analysis",
        description: "Surgeon scalp audit, Norwood grade classification, density check, and candidate evaluation.",
        icon: "Stethoscope"
      },
      {
        stepNumber: "02",
        badge: "7 Days Before",
        title: "Hairline Design & Graft Estimation",
        description: "Custom hairline design, conservative donor planning, and written all-inclusive quote.",
        icon: "Scissors"
      },
      {
        stepNumber: "03",
        badge: "3 Days Before",
        title: "Pre-Op Instructions Checklist",
        description: "Discontinue Minoxidil, Aspirin, Vitamin E, alcohol, and smoking per medical instructions.",
        icon: "CheckCircle2"
      },
      {
        stepNumber: "04",
        badge: "1 Day Before",
        title: "Blood Tests & Medical Clearance",
        description: "A short pre-operative blood panel confirms you are fit for the procedure and rules out anything that would affect healing or clotting. If you take blood thinners or manage a condition like diabetes or hypertension, your surgeon coordinates timing with your treating doctor before we schedule the date.",
        icon: "Activity"
      }
    ],

    // Suitability Section
    "candidateSuitability.heading": "Who needs hair transplant surgery in Delhi — and who doesn't?",

    // Recovery Timeline Section
    "recoveryTimeline.heading": "Hair transplant recovery in Delhi: what to expect week by week",

    // Surgical Risks & Prevention
    "surgicalRisks.heading": "Surgical risks, and how a good Delhi clinic minimises them",
    "surgicalRisks.description": "Every responsible surgical clinic discusses risks transparently. A doctor-led approach, sterile OT, single-use instruments, careful graft handling, and clear aftercare keep risks low.",
    "surgicalRisks.risks": [
      { riskTitle: "Temporary Swelling & Redness", riskDescription: "Resolves within 3–5 days with prescribed post-op care.", severity: "Temporary" },
      { riskTitle: "Shock Shedding", riskDescription: "Transplanted hairs shed at 3–6 weeks before permanent regrowth — a normal biological phase.", severity: "Temporary" },
      { riskTitle: "Minor Folliculitis", riskDescription: "Small pustules that clear quickly with prescribed topical aftercare.", severity: "Low" },
      { riskTitle: "Infection Risk", riskDescription: "Minimised via sterile OT protocols and single-use instruments.", severity: "Low" }
    ],
    "surgicalRisks.preventionPoints": [
      { title: "Sterile OT & Single-Use Instruments", description: "HEPA-filtered air, single-use surgical kits, sterilised surfaces for every procedure." },
      { title: "Doctor-Led Extraction & Implantation", description: "Qualified plastic surgeons perform extraction, channel creation, and placement." },
      { title: "Careful Graft Handling", description: "Minimising time outside the body with chilled preservation solution to protect graft survival." },
      { title: "Structured Aftercare & Follow-Up", description: "Written aftercare, saline spray kit, medication, and in-clinic check-ins through 12 months." }
    ],

    // Pricing Section
    "pricing.heading": "Hair transplant cost in Delhi",
    "pricing.description": "Transparent pricing calculated based on your graft requirement, technique choice, and surgeon involvement.",
    "pricing.pricingFactors": [
      "Graft count: Confirmed during in-clinic scalp analysis based on Norwood grade and donor density.",
      "Technique: Sapphire FUE and THI use specialized single-use micro-blades and implanters.",
      "Surgeon involvement: Doctor-led surgical procedures performed by qualified plastic surgeons.",
      "Donor area used: Scalp vs beard/body donor grafts.",
      "Staged vs single session: Extensive Norwood 6–7 cases may be planned across two sessions.",
      "Inclusions: All consultations, post-op medications, saline spray kit, cap, and 12-month follow-ups included."
    ],

    // FAQ Section (Audit Fix — 8 required topics)
    "faq.heading": "Frequently asked questions about hair transplant surgery in Delhi",
    "faq.description": "Common questions regarding hair transplant surgery, costs, recovery, and techniques in Delhi.",
    "faq.faqs": [
      {
        question: "How many grafts will I need?",
        answer: "Graft count depends on your Norwood grade of hair loss, donor density, and hairline goals. Typically, Norwood 2–3 requires 1,000–2,000 grafts, Norwood 4–5 requires 2,500–3,500 grafts, and advanced Norwood 6–7 may require 3,500+ grafts across one or two sessions.",
        active: true
      },
      {
        question: "How much does a 2,000-graft hair transplant cost in Delhi?",
        answer: "The cost for a 2,000-graft procedure in Delhi varies based on the technique selected (Sapphire FUE vs THI Choi Implanter) and surgeon involvement. Contact our clinic for a written, all-inclusive scalp quote during your consultation.",
        active: true
      },
      {
        question: "Which is better, FUE or DHI/THI?",
        answer: "FUE is ideal for larger sessions requiring high graft numbers. THI (Direct Hair Implantation with Choi Pen) offers precise depth and direction control without pre-cut channels, making it excellent for dense packing and hairline work. Your surgeon will recommend the best approach during your scalp analysis.",
        active: true
      },
      {
        question: "Should I get my hair transplant in Delhi or travel to Turkey?",
        answer: "While Turkey is famous for hair restoration, getting your surgery in Delhi with a qualified plastic surgeon eliminates travel fatigue, language barriers, and international follow-up challenges while receiving doctor-led care close to home.",
        active: true
      },
      {
        question: "When can I return to work after hair transplant surgery in Delhi?",
        answer: "Most desk-job patients return to work within 5 to 7 days post-surgery once initial scab formation and mild swelling subside. Heavy exercise and strenuous physical work should be avoided for 2 weeks.",
        active: true
      },
      {
        question: "Do I need PRP after a hair transplant?",
        answer: "PRP (Platelet-Rich Plasma) therapy is often recommended 1 to 3 months post-surgery to nourish growing grafts, stimulate blood circulation, and strengthen non-transplanted native hair.",
        active: true
      },
      {
        question: "What happens if the grafts don't grow?",
        answer: "Graft survival depends on proper surgical handling and post-operative care compliance. We monitor your growth at 3, 6, 9, and 12 months. If growth is sub-optimal despite full aftercare compliance, your surgeon evaluates donor capacity for a touch-up.",
        active: true
      },
      {
        question: "Is hair transplant surgery covered by insurance in India?",
        answer: "Hair transplant surgery is classified as an elective cosmetic procedure and is generally not covered by standard health insurance policies in India. However, 0% EMI financing plans are available.",
        active: true
      }
    ],

    // Consultation Section
    "consultation.leftSide.heading": "Book your free consultation",

    "status": "published"
  };

  const res = await SurgeryPage.updateOne(
    { slug },
    { $set: updateFields }
  );

  console.log("✅ Updated Delhi Surgery Document:", res);
  process.exit(0);
}

updateDelhiSurgery().catch((err) => {
  console.error("❌ Error updating surgery document:", err);
  process.exit(1);
});
