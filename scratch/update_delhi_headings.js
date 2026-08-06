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

if (!MONGODB_URI) {
    console.error("MONGODB_URI missing");
    process.exit(1);
}

const SurgeonSchema = new mongoose.Schema({
    title: String,
    slug: String,
    spotlightTitle: String,
    general: mongoose.Schema.Types.Mixed,
    seo: mongoose.Schema.Types.Mixed,
    hero: mongoose.Schema.Types.Mixed,
    whySkill: mongoose.Schema.Types.Mixed,
    benefits: mongoose.Schema.Types.Mixed,
    whyClinic: mongoose.Schema.Types.Mixed,
    surgeonRole: mongoose.Schema.Types.Mixed,
    comparison: mongoose.Schema.Types.Mixed,
    leadSurgeon: mongoose.Schema.Types.Mixed,
    bookingChecklist: mongoose.Schema.Types.Mixed,
    procedures: mongoose.Schema.Types.Mixed,
    consultationCTA: mongoose.Schema.Types.Mixed,
    ctaSection: mongoose.Schema.Types.Mixed,
    faq: mongoose.Schema.Types.Mixed,
    experienceSpecialization: mongoose.Schema.Types.Mixed,
    skillEvaluation: mongoose.Schema.Types.Mixed,
    hairlineArtistry: mongoose.Schema.Types.Mixed,
    revisionRepair: mongoose.Schema.Types.Mixed,
    costConsultation: mongoose.Schema.Types.Mixed,
    visitSurgeon: mongoose.Schema.Types.Mixed,
    settings: mongoose.Schema.Types.Mixed,
}, { timestamps: true, strict: false });

const SurgeonPage = mongoose.models.SurgeonPage || mongoose.model("SurgeonPage", SurgeonSchema, "surgeons");

async function updateHeadings() {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const slug = "hair-transplant-surgeon-in-delhi";

    const updateObj = {
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

    const doc = await SurgeonPage.findOneAndUpdate(
        { slug },
        { $set: updateObj },
        { upsert: true, new: true }
    );

    console.log("Successfully updated MongoDB document for:", doc.slug);
    await mongoose.disconnect();
}

updateHeadings().catch(err => {
    console.error("Update error:", err);
    process.exit(1);
});
