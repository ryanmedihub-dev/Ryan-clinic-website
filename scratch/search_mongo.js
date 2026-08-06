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

async function searchMongo() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log("Searching MongoDB collections...");
    for (const col of collections) {
        const docs = await db.collection(col.name).find({}).toArray();
        const jsonStr = JSON.stringify(docs);
        if (jsonStr.includes("Choice of Surgeon") || jsonStr.includes("4 Pillars") || jsonStr.includes("Surgeon-Led vs")) {
            console.log(`FOUND IN COLLECTION: ${col.name}`);
            for (const doc of docs) {
                const docStr = JSON.stringify(doc);
                if (docStr.includes("Choice of Surgeon") || docStr.includes("4 Pillars") || docStr.includes("Surgeon-Led vs")) {
                    console.log(`  Document slug: ${doc.slug || doc.pageName || doc._id}`);
                }
            }
        }
    }
    await mongoose.disconnect();
}

searchMongo().catch(console.error);
