import { DBConnection } from "../src/lib/db.js";
import SurgeryPageModel from "../src/models/surgeryPage.js";

async function updateSurgeryHeadings() {
  try {
    await DBConnection();
    console.log("Connected to MongoDB for Surgery Page Headings update...");

    // 1. Delhi Document
    const delhiSlug = "hair-transplant-surgery-in-delhi";
    let delhiDoc = await SurgeryPageModel.findOne({ slug: delhiSlug });

    if (!delhiDoc) {
      console.log(`Creating new SurgeryPage document for '${delhiSlug}'...`);
      delhiDoc = new SurgeryPageModel({ slug: delhiSlug });
    }

    delhiDoc.pageName = "Best Hair Transplant Surgery in Delhi";
    delhiDoc.city = "Delhi";

    if (!delhiDoc.hero) delhiDoc.hero = {};
    delhiDoc.hero.title = "Best Hair Transplant Surgery in Delhi";

    if (!delhiDoc.introduction) delhiDoc.introduction = {};
    delhiDoc.introduction.title = "What is hair transplant surgery?";
    delhiDoc.introduction.smallHeading = "About Surgery";

    if (!delhiDoc.safetyInfo) delhiDoc.safetyInfo = {};
    delhiDoc.safetyInfo.heading = "Is hair transplant surgery in Delhi safe?";
    delhiDoc.safetyInfo.badge = "Safety Protocols";

    if (!delhiDoc.procedureScience) delhiDoc.procedureScience = {};
    delhiDoc.procedureScience.mainHeading = "Types of hair transplant surgery in Delhi";

    if (!delhiDoc.qualityBenchmarks) delhiDoc.qualityBenchmarks = {};
    delhiDoc.qualityBenchmarks.heading = "What makes the best hair transplant surgery in Delhi?";

    if (!delhiDoc.candidateSuitability) delhiDoc.candidateSuitability = {};
    delhiDoc.candidateSuitability.heading = "Who needs hair transplant surgery in Delhi — and who doesn't?";

    if (!delhiDoc.beforeSurgeryTimeline) delhiDoc.beforeSurgeryTimeline = {};
    delhiDoc.beforeSurgeryTimeline.heading = "Before your hair transplant surgery in Delhi";

    if (!delhiDoc.procedureTimeline) delhiDoc.procedureTimeline = {};
    delhiDoc.procedureTimeline.heading = "During the hair transplant surgery in Delhi: step by step";

    if (!delhiDoc.recoveryTimeline) delhiDoc.recoveryTimeline = {};
    delhiDoc.recoveryTimeline.heading = "After your surgery in Delhi: recovery and results";

    if (!delhiDoc.surgicalRisks) delhiDoc.surgicalRisks = {};
    delhiDoc.surgicalRisks.heading = "Surgical risks, and how a good Delhi clinic minimises them";

    if (!delhiDoc.pricing) delhiDoc.pricing = {};
    delhiDoc.pricing.heading = "Cost of hair transplant surgery in Delhi";

    if (!delhiDoc.whyChooseUs) delhiDoc.whyChooseUs = {};
    delhiDoc.whyChooseUs.heading = "Why choose Ryan Clinic for hair transplant surgery in Delhi";

    if (!delhiDoc.doctors) delhiDoc.doctors = {};
    delhiDoc.doctors.heading = "Our Delhi surgeons and credentials";

    if (!delhiDoc.patientResults) delhiDoc.patientResults = {};
    delhiDoc.patientResults.heading = "Real surgical results in Delhi";

    if (!delhiDoc.visitClinic) delhiDoc.visitClinic = {};
    delhiDoc.visitClinic.heading = "Visiting Ryan Clinic in Delhi";

    if (!delhiDoc.consultation) delhiDoc.consultation = {};
    if (!delhiDoc.consultation.leftSide) delhiDoc.consultation.leftSide = {};
    delhiDoc.consultation.leftSide.heading = "Book your hair transplant surgery consultation in Delhi";

    if (!delhiDoc.faq) delhiDoc.faq = {};
    delhiDoc.faq.heading = "Frequently asked questions – Hair Transplant Surgery in Delhi";

    delhiDoc.status = "published";

    delhiDoc.markModified("hero");
    delhiDoc.markModified("introduction");
    delhiDoc.markModified("safetyInfo");
    delhiDoc.markModified("procedureScience");
    delhiDoc.markModified("qualityBenchmarks");
    delhiDoc.markModified("candidateSuitability");
    delhiDoc.markModified("beforeSurgeryTimeline");
    delhiDoc.markModified("procedureTimeline");
    delhiDoc.markModified("recoveryTimeline");
    delhiDoc.markModified("surgicalRisks");
    delhiDoc.markModified("pricing");
    delhiDoc.markModified("whyChooseUs");
    delhiDoc.markModified("doctors");
    delhiDoc.markModified("patientResults");
    delhiDoc.markModified("visitClinic");
    delhiDoc.markModified("consultation");
    delhiDoc.markModified("faq");

    await delhiDoc.save();
    console.log(`Delhi Surgery Document updated successfully! ID: ${delhiDoc._id}`);

    // 2. Update Mumbai Document using raw collection query to handle legacy format gracefully
    const collection = SurgeryPageModel.collection;
    await collection.updateOne(
      { slug: "hair-transplant-surgery-in-mumbai" },
      {
        $set: {
          pageName: "Best Hair Transplant Surgery in Mumbai",
          city: "Mumbai",
          "hero.title": "Best Hair Transplant Surgery in Mumbai",
          "introduction.title": "What is hair transplant surgery?",
          "safetyInfo.heading": "Is hair transplant surgery in Mumbai safe?",
          "procedureScience.mainHeading": "Types of hair transplant surgery in Mumbai",
          "qualityBenchmarks.heading": "What makes the best hair transplant surgery in Mumbai?",
          "candidateSuitability.heading": "Who needs hair transplant surgery in Mumbai — and who doesn't?",
          "beforeSurgeryTimeline.heading": "Before your hair transplant surgery in Mumbai",
          "procedureTimeline.heading": "During the hair transplant surgery in Mumbai: step by step",
          "recoveryTimeline.heading": "After your surgery in Mumbai: recovery and results",
          "surgicalRisks.heading": "Surgical risks, and how a good Mumbai clinic minimises them",
          "pricing.heading": "Cost of hair transplant surgery in Mumbai",
          "whyChooseUs.heading": "Why choose Ryan Clinic for hair transplant surgery in Mumbai",
          "doctors.heading": "Our Mumbai surgeons and credentials",
          "patientResults.heading": "Real surgical results in Mumbai",
          "visitClinic.heading": "Visiting Ryan Clinic in Mumbai",
          "consultation.leftSide.heading": "Book your hair transplant surgery consultation in Mumbai",
          "faq.heading": "Frequently asked questions – Hair Transplant Surgery in Mumbai",
          status: "published"
        }
      }
    );
    console.log("Mumbai Surgery Document updated successfully via raw collection query!");

    process.exit(0);
  } catch (err) {
    console.error("Error updating surgery headings:", err);
    process.exit(1);
  }
}

updateSurgeryHeadings();
