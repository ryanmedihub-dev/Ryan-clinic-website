const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    for (const line of envConfig.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const [key, ...vals] = trimmed.split("=");
            const val = vals.join("=").replace(/^["']|["']$/g, "");
            process.env[key.trim()] = val.trim();
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function fixAllCollections() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const updateFields = {
        title: "Best Hair Transplant Surgeon in Delhi",
        spotlightTitle: "Meet the hair transplant surgeon at Ryan Clinic, Delhi",
        "hero.title": "Best Hair Transplant Surgeon in Delhi",
        "leadSurgeon.heading": "Best Hair Transplant Surgeon in Delhi",
        "whySkill.heading": "Why a skilled hair transplant surgeon in Delhi matters more than anything else",
        "benefits.heading": "What makes the best hair transplant surgeon in Delhi",
        "surgeonRole.heading": "The hair transplant surgeon's role at every step in Delhi",
        "comparison.heading": "Hair transplant surgeon vs technician in Delhi: the difference that defines your result",
        "experienceSpecialization.heading": "Experience and specialization to look for in a hair transplant surgeon in Delhi",
        "skillEvaluation.heading": "How to judge a hair transplant surgeon's skill in Delhi before booking",
        "hairlineArtistry.heading": "The artistry of hairline design: what surgical skill looks like in Delhi",
        "revisionRepair.heading": "Revision and repair work by a hair transplant surgeon in Delhi",
        "costConsultation.heading": "Cost of consulting a hair transplant surgeon in Delhi",
        "bookingChecklist.questionsHeading": "Questions to ask a hair transplant surgeon in Delhi before booking",
        "bookingChecklist.redFlagsHeading": "Red flags when choosing a hair transplant surgeon in Delhi",
        "procedures.heading": "Procedures performed by our hair transplant surgeon in Delhi",
        "visitSurgeon.heading": "Visiting our hair transplant surgeon in Delhi",
        "ctaSection.heading": "Book a consultation with a hair transplant surgeon in Delhi",
        "faq.heading": "Hair transplant surgeon in Delhi — frequently asked questions",
    };

    console.log("Updating 'surgeonpages' collection...");
    const res1 = await db.collection("surgeonpages").updateMany(
        { slug: "hair-transplant-surgeon-in-delhi" },
        { $set: updateFields }
    );
    console.log(`Updated surgeonpages: matched ${res1.matchedCount}, modified ${res1.modifiedCount}`);

    console.log("Updating 'surgeons' collection...");
    const res2 = await db.collection("surgeons").updateMany(
        { slug: "hair-transplant-surgeon-in-delhi" },
        { $set: updateFields }
    );
    console.log(`Updated surgeons: matched ${res2.matchedCount}, modified ${res2.modifiedCount}`);

    // Verify what is in surgeonpages
    const doc1 = await db.collection("surgeonpages").findOne({ slug: "hair-transplant-surgeon-in-delhi" });
    console.log("\n--- VERIFICATION OF 'surgeonpages' COLLECTION ---");
    console.log("H1 (title):", doc1?.title || doc1?.hero?.title || doc1?.leadSurgeon?.heading);
    console.log("H2 #1 (whySkill):", doc1?.whySkill?.heading);
    console.log("H2 #2 (benefits):", doc1?.benefits?.heading);
    console.log("H2 #3 (surgeonRole):", doc1?.surgeonRole?.heading);
    console.log("H2 #4 (comparison):", doc1?.comparison?.heading);
    console.log("H2 #5 (experienceSpecialization):", doc1?.experienceSpecialization?.heading);
    console.log("H2 #6 (skillEvaluation):", doc1?.skillEvaluation?.heading);
    console.log("H2 #7 (spotlightTitle):", doc1?.spotlightTitle);
    console.log("H2 #8 (hairlineArtistry):", doc1?.hairlineArtistry?.heading);
    console.log("H2 #9 (revisionRepair):", doc1?.revisionRepair?.heading);
    console.log("H2 #10 (costConsultation):", doc1?.costConsultation?.heading);
    console.log("H2 #11 (questionsHeading):", doc1?.bookingChecklist?.questionsHeading);
    console.log("H2 #12 (redFlagsHeading):", doc1?.bookingChecklist?.redFlagsHeading);
    console.log("H2 #13 (procedures):", doc1?.procedures?.heading);
    console.log("H2 #14 (visitSurgeon):", doc1?.visitSurgeon?.heading);
    console.log("H2 #15 (ctaSection):", doc1?.ctaSection?.heading);
    console.log("H2 #16 (faq):", doc1?.faq?.heading);

    await mongoose.disconnect();
}

fixAllCollections().catch(console.error);
