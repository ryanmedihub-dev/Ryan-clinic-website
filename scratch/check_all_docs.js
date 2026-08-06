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

async function checkAll() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const docs = await db.collection("surgeons").find({ slug: "hair-transplant-surgeon-in-delhi" }).toArray();
    console.log("Found", docs.length, "documents with slug 'hair-transplant-surgeon-in-delhi':\n");
    docs.forEach((doc, idx) => {
        console.log(`Doc ${idx + 1}: ID=${doc._id}, Title="${doc.title}", leadSurgeonHeading="${doc.leadSurgeon?.heading}", whySkillHeading="${doc.whySkill?.heading}"`);
    });
    await mongoose.disconnect();
}

checkAll().catch(console.error);
