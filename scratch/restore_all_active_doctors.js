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

async function run() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    await db.collection("doctors").updateMany({}, { $set: { deletedAt: null, status: "published" } });

    const docs = await db.collection("doctors").find({}).toArray();
    console.log("\n=== Active Doctors in Database (" + docs.length + ") ===");
    docs.forEach(d => console.log(`_id: ${d._id} | slug: "${d.slug}" | pageName: "${d.pageName}" | deletedAt: ${d.deletedAt}`));

    await mongoose.disconnect();
}

run().catch(console.error);
