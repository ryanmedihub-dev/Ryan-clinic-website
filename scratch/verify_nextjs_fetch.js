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
const SurgeonPage = mongoose.models.SurgeonPage || mongoose.model("SurgeonPage", SurgeonSchema, "surgeonpages");

async function verifyFetch() {
    await mongoose.connect(MONGODB_URI);
    const slug = "hair-transplant-surgeon-in-delhi";
    const pageData = await SurgeonPage.findOne({
        slug,
        "settings.isDeleted": { $ne: true },
    }).lean();

    if (!pageData) {
        console.error("No document found in surgeonpages collection!");
        process.exit(1);
    }

    const rawCityName = pageData?.general?.city || pageData?.city || "Delhi";
    const cityName = rawCityName.charAt(0).toUpperCase() + rawCityName.slice(1).toLowerCase();

    const renderedHeadings = {
        H1: pageData?.leadSurgeon?.heading || pageData?.hero?.title || pageData?.title || `Best Hair Transplant Surgeon in ${cityName}`,
        "H2 #1": pageData?.whySkill?.heading || `Why a skilled hair transplant surgeon in ${cityName} matters more than anything else`,
        "H2 #2": pageData?.benefits?.heading || `What makes the best hair transplant surgeon in ${cityName}`,
        "H2 #3": pageData?.surgeonRole?.heading || `The hair transplant surgeon's role at every step in ${cityName}`,
        "H2 #4": pageData?.comparison?.heading || `Hair transplant surgeon vs technician in ${cityName}: the difference that defines your result`,
        "H2 #5": pageData?.experienceSpecialization?.heading || `Experience and specialization to look for in a hair transplant surgeon in ${cityName}`,
        "H2 #6": pageData?.skillEvaluation?.heading || `How to judge a hair transplant surgeon's skill in ${cityName} before booking`,
        "H2 #7": pageData?.spotlightTitle || `Meet the hair transplant surgeon at Ryan Clinic, ${cityName}`,
        "H2 #8": pageData?.hairlineArtistry?.heading || `The artistry of hairline design: what surgical skill looks like in ${cityName}`,
        "H2 #9": pageData?.revisionRepair?.heading || `Revision and repair work by a hair transplant surgeon in ${cityName}`,
        "H2 #10": pageData?.costConsultation?.heading || `Cost of consulting a hair transplant surgeon in ${cityName}`,
        "H2 #11": pageData?.bookingChecklist?.questionsHeading || `Questions to ask a hair transplant surgeon in ${cityName} before booking`,
        "H2 #12": pageData?.bookingChecklist?.redFlagsHeading || `Red flags when choosing a hair transplant surgeon in ${cityName}`,
        "H2 #13": pageData?.procedures?.heading || `Procedures performed by our hair transplant surgeon in ${cityName}`,
        "H2 #14": pageData?.visitSurgeon?.heading || `Visiting our hair transplant surgeon in ${cityName}`,
        "H2 #15": pageData?.ctaSection?.heading || `Book a consultation with a hair transplant surgeon in ${cityName}`,
        "H2 #16": pageData?.faq?.heading || `Hair transplant surgeon in ${cityName} — frequently asked questions`,
    };

    const targetHeadings = {
        H1: "Best Hair Transplant Surgeon in Delhi",
        "H2 #1": "Why a skilled hair transplant surgeon in Delhi matters more than anything else",
        "H2 #2": "What makes the best hair transplant surgeon in Delhi",
        "H2 #3": "The hair transplant surgeon's role at every step in Delhi",
        "H2 #4": "Hair transplant surgeon vs technician in Delhi: the difference that defines your result",
        "H2 #5": "Experience and specialization to look for in a hair transplant surgeon in Delhi",
        "H2 #6": "How to judge a hair transplant surgeon's skill in Delhi before booking",
        "H2 #7": "Meet the hair transplant surgeon at Ryan Clinic, Delhi",
        "H2 #8": "The artistry of hairline design: what surgical skill looks like in Delhi",
        "H2 #9": "Revision and repair work by a hair transplant surgeon in Delhi",
        "H2 #10": "Cost of consulting a hair transplant surgeon in Delhi",
        "H2 #11": "Questions to ask a hair transplant surgeon in Delhi before booking",
        "H2 #12": "Red flags when choosing a hair transplant surgeon in Delhi",
        "H2 #13": "Procedures performed by our hair transplant surgeon in Delhi",
        "H2 #14": "Visiting our hair transplant surgeon in Delhi",
        "H2 #15": "Book a consultation with a hair transplant surgeon in Delhi",
        "H2 #16": "Hair transplant surgeon in Delhi — frequently asked questions",
    };

    console.log("\n=================== LITERAL VERIFICATION REPORT ===================");
    let allMatched = true;

    for (const key of Object.keys(targetHeadings)) {
        const expected = targetHeadings[key];
        const actual = renderedHeadings[key];
        const match = expected === actual;
        if (!match) allMatched = false;
        console.log(`${key}:`);
        console.log(`  EXPECTED: "${expected}"`);
        console.log(`  ACTUAL:   "${actual}"`);
        console.log(`  EXACT MATCH = ${match ? "YES" : "NO"}\n`);
    }

    console.log("-------------------------------------------------------------------");
    console.log(`ALL 17 HEADINGS MATCH EXACTLY: ${allMatched ? "YES" : "NO"}`);
    console.log("===================================================================\n");

    await mongoose.disconnect();
}

verifyFetch().catch(console.error);
