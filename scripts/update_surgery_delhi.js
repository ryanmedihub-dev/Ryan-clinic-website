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
    "seo.metaTitle": "Hair Transplant Surgery in Delhi | Doctor-Led Sapphire FUE",
    "seo.metaDescription": "Hair transplant surgery in Delhi, doctor-led at every step. Sapphire FUE & THI in a sterile OT, local anaesthesia, same-day discharge. Free scalp analysis.",
    "seo.canonicalUrl": "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi",
    
    // Procedure Day Timeline Steps (Audit Fix)
    "procedureTimeline.timelineSteps": [
      {
        stepNumber: "01",
        badge: "08:30 AM",
        title: "Preparation & Local Anaesthesia",
        description: "The donor and recipient areas are prepared and numbed with local anaesthetic. You stay awake and comfortable throughout — there is no general anaesthesia or heavy sedation involved.",
        stepImage: { image: "/uploads/1752667815707-fue-banner_ro9ae6.webp", imageAlt: "Preparation & Local Anaesthesia" }
      },
      {
        stepNumber: "02",
        badge: "09:30 AM",
        title: "Graft Extraction",
        description: "Using a micro-punch typically under 1 mm, the surgeon removes follicular units one at a time from the donor zone at the back and sides of the scalp. Each unit contains one to four hairs and is taken with its surrounding tissue intact, so the follicle survives the move. Extraction is spread evenly across the donor area rather than concentrated in one patch, which keeps donor density looking natural once the hair grows back. Extracted grafts are placed immediately into chilled HypoThermosol preservation solution to limit time outside the body.",
        stepImage: { image: "/uploads/1752731223556-FUE 1.jpg", imageAlt: "Graft Extraction" }
      },
      {
        stepNumber: "03",
        badge: "01:30 PM",
        title: "Implantation",
        description: "For Sapphire FUE, the surgeon first creates recipient channels with sapphire-tipped blades, setting the angle, depth and direction of each site before the grafts are placed. For THI, a Choi implanter pen creates the site and places the graft in a single motion. Either way, the front hairline is built with single-hair grafts for a soft, irregular edge, and denser multi-hair units are placed behind it to build coverage. This stage takes the longest, and it is where surgical judgement most affects how natural the result looks.",
        stepImage: { image: "/uploads/turkey-doctor.jpg", imageAlt: "Implantation" }
      },
      {
        stepNumber: "04",
        badge: "05:00 PM",
        title: "Same-Day Discharge",
        description: "Once implantation is complete, the donor area is dressed and you are given post-operative instructions, a saline spray kit, a cap and your medications. Your vitals are checked and you go home the same day — there is no hospital admission for a standard case. Most patients are driven home rather than driving themselves, because the local anaesthetic can leave the scalp tender for the first few hours. Your first follow-up is scheduled before you leave.",
        stepImage: { image: "/uploads/1752734248947-Hair Transplant 1.jpg", imageAlt: "Same-Day Discharge" }
      }
    ],

    // Before Surgery Timeline Steps (Audit Fix - Step 4 Blood Tests & Medical Clearance)
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

    // Pricing Factors (Audit Fix - Remove duplicates)
    "pricing.pricingFactors": [
      "Graft count: Set by your Norwood grade and donor density, confirmed at scalp analysis — not estimated over the phone.",
      "Technique: Sapphire FUE and THI use imported single-use consumables and take longer in theatre than basic FUE.",
      "Who operates: 100% doctor-led surgery performed by registered plastic surgeons.",
      "Donor area used: Beard or body-hair grafts take longer to extract than scalp grafts and are priced accordingly.",
      "Staged vs single session: Extensive Norwood 6–7 cases are often planned across two sessions.",
      "Inclusions: All pre-op consultations, post-op medications, saline spray kit, cap, and 12-month follow-ups included."
    ],

    // FAQ Heading
    "faq.heading": "Frequently asked questions about hair transplant surgery in Delhi",

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
