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

async function testUpdate() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const doc = await db.collection("doctors").findOne({ slug: "dr-pranendra-singh" });
    console.log("Found doctor document for update test:", !!doc, "ID:", doc?._id);

    if (doc) {
        // Test query by _id
        const byId = await db.collection("doctors").findOne({ _id: doc._id });
        console.log("Lookup by _id succeeded:", !!byId);
    }

    await mongoose.disconnect();
}

testUpdate().catch(console.error);
