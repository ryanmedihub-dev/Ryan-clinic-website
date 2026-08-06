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

async function fixConflict() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    // 1. Remove or rename the old soft-deleted document with slug "dr-pranendra-singh"
    const oldDoc = await db.collection("doctors").findOne({ _id: new mongoose.Types.ObjectId("6a609927431bf19d0b2765e4") });
    if (oldDoc && oldDoc.slug === "dr-pranendra-singh") {
        await db.collection("doctors").deleteOne({ _id: oldDoc._id });
        console.log("✅ Deleted stale soft-deleted doctor document with slug 'dr-pranendra-singh'");
    }

    // 2. Now update Document 4 ("Hair Transplant Doctor in Delhi") to slug "dr-pranendra-singh"
    const res = await db.collection("doctors").updateOne(
        { _id: new mongoose.Types.ObjectId("6a702830c6b139a1819338e5") },
        { $set: { slug: "dr-pranendra-singh" } }
    );
    console.log("✅ Updated active document slug to 'dr-pranendra-singh': matched=", res.matchedCount, "modified=", res.modifiedCount);

    // 3. Inspect final doctors list
    const docs = await db.collection("doctors").find({}).toArray();
    console.log("\n=== Final Doctors Collection ===");
    docs.forEach(d => console.log(`_id: ${d._id} | slug: "${d.slug}" | pageName: "${d.pageName}" | deletedAt: ${d.deletedAt}`));

    await mongoose.disconnect();
}

fixConflict().catch(console.error);
