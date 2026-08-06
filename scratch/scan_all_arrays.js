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

    // Find every array that contains objects (not just strings)
    function scanAllArrays(obj, path = "") {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) {
            const hasObjects = obj.some(item => item && typeof item === "object" && !Array.isArray(item));
            if (hasObjects && obj.length > 0) {
                const sample = obj[0];
                const keys = sample ? Object.keys(sample) : [];
                console.log(`OBJECT ARRAY AT: ${path} (${obj.length} items, keys: [${keys.join(", ")}])`);
            }
            obj.forEach((item, idx) => scanAllArrays(item, `${path}[${idx}]`));
        } else {
            for (const k of Object.keys(obj)) {
                scanAllArrays(obj[k], path ? `${path}.${k}` : k);
            }
        }
    }
    
    console.log("=== ALL ARRAYS CONTAINING OBJECTS IN DOCTOR DOC ===\n");
    scanAllArrays(doc);

    await mongoose.disconnect();
}

check().catch(console.error);
