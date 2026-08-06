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

const SurgeonSchema = new mongoose.Schema({}, { strict: false });
const SurgeonPage = mongoose.models.SurgeonPage || mongoose.model("SurgeonPage", SurgeonSchema, "surgeons");

async function verify() {
    await mongoose.connect(MONGODB_URI);
    const doc = await SurgeonPage.findOne({ slug: "hair-transplant-surgeon-in-delhi" }).lean();
    if (!doc) {
        console.error("Document not found!");
        process.exit(1);
    }

    const expectedHeadings = {
        H1: {
            expected: "Best Hair Transplant Surgeon in Delhi",
            actual: doc.hero?.title || doc.leadSurgeon?.heading || doc.title,
        },
        "H2 #1": {
            expected: "Why a skilled hair transplant surgeon in Delhi matters more than anything else",
            actual: doc.whySkill?.heading,
        },
        "H2 #2": {
            expected: "What makes the best hair transplant surgeon in Delhi",
            actual: doc.benefits?.heading,
        },
        "H2 #3": {
            expected: "The hair transplant surgeon's role at every step in Delhi",
            actual: doc.surgeonRole?.heading,
        },
        "H2 #4": {
            expected: "Hair transplant surgeon vs technician in Delhi: the difference that defines your result",
            actual: doc.comparison?.heading,
        },
        "H2 #5": {
            expected: "Experience and specialization to look for in a hair transplant surgeon in Delhi",
            actual: doc.experienceSpecialization?.heading,
        },
        "H2 #6": {
            expected: "How to judge a hair transplant surgeon's skill in Delhi before booking",
            actual: doc.skillEvaluation?.heading,
        },
        "H2 #7": {
            expected: "Meet the hair transplant surgeon at Ryan Clinic, Delhi",
            actual: doc.spotlightTitle,
        },
        "H2 #8": {
            expected: "The artistry of hairline design: what surgical skill looks like in Delhi",
            actual: doc.hairlineArtistry?.heading,
        },
        "H2 #9": {
            expected: "Revision and repair work by a hair transplant surgeon in Delhi",
            actual: doc.revisionRepair?.heading,
        },
        "H2 #10": {
            expected: "Cost of consulting a hair transplant surgeon in Delhi",
            actual: doc.costConsultation?.heading,
        },
        "H2 #11": {
            expected: "Questions to ask a hair transplant surgeon in Delhi before booking",
            actual: doc.bookingChecklist?.questionsHeading,
        },
        "H2 #12": {
            expected: "Red flags when choosing a hair transplant surgeon in Delhi",
            actual: doc.bookingChecklist?.redFlagsHeading,
        },
        "H2 #13": {
            expected: "Procedures performed by our hair transplant surgeon in Delhi",
            actual: doc.procedures?.heading,
        },
        "H2 #14": {
            expected: "Visiting our hair transplant surgeon in Delhi",
            actual: doc.visitSurgeon?.heading,
        },
        "H2 #15": {
            expected: "Book a consultation with a hair transplant surgeon in Delhi",
            actual: doc.ctaSection?.heading,
        },
        "H2 #16": {
            expected: "Hair transplant surgeon in Delhi — frequently asked questions",
            actual: doc.faq?.heading,
        },
    };

    console.log("\n=================== LITERAL VERIFICATION REPORT ===================");
    let allMatched = true;

    for (const [key, val] of Object.entries(expectedHeadings)) {
        const match = val.expected === val.actual;
        if (!match) allMatched = false;
        console.log(`${key}:`);
        console.log(`  EXPECTED: "${val.expected}"`);
        console.log(`  ACTUAL:   "${val.actual}"`);
        console.log(`  EXACT MATCH = ${match ? "YES" : "NO"}\n`);
    }

    console.log("-------------------------------------------------------------------");
    console.log(`ALL HEADINGS MATCH EXACTLY: ${allMatched ? "YES" : "NO"}`);
    console.log("===================================================================\n");

    await mongoose.disconnect();
}

verify().catch(console.error);
