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

const SurgeonSchema = new mongoose.Schema({}, { strict: false, collection: "surgeons" });
const SurgeonPage = mongoose.models.SurgeonPage || mongoose.model("SurgeonPage", SurgeonSchema);

async function check() {
    await mongoose.connect(MONGODB_URI);
    const page = await SurgeonPage.findOne({
        slug: "hair-transplant-surgeon-in-delhi",
        "settings.isDeleted": { $ne: true },
    }).lean();

    console.log("=== DB QUERY RESULT FROM SURGEONPAGE MODEL ===");
    console.log("Page ID:", page ? page._id : "NULL");
    console.log("Page Title:", page ? page.title : "NULL");
    console.log("Lead Surgeon:", page?.leadSurgeon);
    console.log("Why Skill:", page?.whySkill);
    console.log("Why Clinic:", page?.whyClinic);
    await mongoose.disconnect();
}

check().catch(console.error);
