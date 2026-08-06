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
    const doc = await db.collection("doctors").findOne({ slug: "hair-transplant-doctor-in-delhi" });
    
    // Find where displayOrder exists inside doc
    function findKey(obj, path = "") {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) {
            obj.forEach((item, idx) => findKey(item, `${path}[${idx}]`));
            return;
        }
        if (obj.displayOrder !== undefined && obj.key !== undefined) {
            console.log(`FOUND MATCH AT: ${path} =>`, obj);
        }
        for (const k of Object.keys(obj)) {
            findKey(obj[k], path ? `${path}.${k}` : k);
        }
    }

    findKey(doc);
    await mongoose.disconnect();
}

check().catch(console.error);
