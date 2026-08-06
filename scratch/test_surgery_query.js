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

async function testQuery() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const page = await db.collection("surgerypages").findOne({ slug: "hair-transplant-surgery-in-delhi" });
    console.log("Surgery page found:", !!page);
    if (page) {
        console.log("ID:", page._id);
        console.log("Status:", page.status);
        console.log("DeletedAt:", page.deletedAt);
        console.log("IsDeleted:", page.isDeleted);
    }

    await mongoose.disconnect();
}

testQuery().catch(console.error);
