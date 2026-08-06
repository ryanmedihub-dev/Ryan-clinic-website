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
            process.env[key.trim()] = vals.join("=").replace(/^["']|["']$/g, "").trim();
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function restoreDoctors() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    // Restore all doctor docs to published and deletedAt: null
    const res = await db.collection("doctors").updateMany(
        {},
        { $set: { deletedAt: null, status: "published" } }
    );
    console.log("Doctors restored: matched=", res.matchedCount, "modified=", res.modifiedCount);

    const doctors = await db.collection("doctors").find({}).toArray();
    console.log("\nAll active doctors in database:");
    doctors.forEach(d => console.log(` - ${d._id} | slug: "${d.slug}" | title: "${d.title || d.doctorName}"`));

    await mongoose.disconnect();
}

restoreDoctors().catch(console.error);
