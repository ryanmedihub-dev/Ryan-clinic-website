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

async function check() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    // Check surgeons collection
    const surgeonDoc = await db.collection("surgeons").findOne({ slug: "hair-transplant-doctor-in-delhi" });
    console.log("Surgeons collection doc:", surgeonDoc ? surgeonDoc._id : "NOT FOUND");

    // Check doctors collection
    const doctorDoc = await db.collection("doctors").findOne({ slug: "hair-transplant-doctor-in-delhi" });
    console.log("Doctors collection doc:", doctorDoc ? doctorDoc._id : "NOT FOUND");

    if (surgeonDoc) {
        console.log("\nSurgeon doc benefits:", JSON.stringify(surgeonDoc.benefits, null, 2));
    }
    if (doctorDoc) {
        console.log("\nDoctor doc benefits:", JSON.stringify(doctorDoc.benefits, null, 2));
    }

    await mongoose.disconnect();
}

check().catch(console.error);
