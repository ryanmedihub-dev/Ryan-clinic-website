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

async function debug() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const doc = await db.collection("surgeons").findOne({ slug: "hair-transplant-surgeon-in-delhi" });
    console.log("whySkill:", doc.whySkill);
    console.log("benefits:", doc.benefits);
    console.log("whyClinic:", doc.whyClinic);
    console.log("surgeonRole:", doc.surgeonRole);
    console.log("comparison:", doc.comparison);
    console.log("skillEvaluation:", doc.skillEvaluation);
    console.log("procedures:", doc.procedures);
    console.log("faq:", doc.faq);
    await mongoose.disconnect();
}

debug().catch(console.error);
