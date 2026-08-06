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

async function checkDoctors() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const docs = await db.collection("doctors").find({}).toArray();
    console.log("Doctors docs count:", docs.length);
    docs.forEach(d => console.log(d._id, d.slug, "status:", d.status, "deletedAt:", d.deletedAt, "isDeleted:", d.isDeleted));

    // Test query: deletedAt: null, status: "published"
    const q1 = await db.collection("doctors").find({ deletedAt: null, status: "published" }).toArray();
    console.log("Query { deletedAt: null, status: 'published' } returns:", q1.length);

    await mongoose.disconnect();
}

checkDoctors().catch(console.error);
