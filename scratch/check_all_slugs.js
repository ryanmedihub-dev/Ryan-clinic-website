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

async function checkAll() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const collections = ["surgerypages", "surgeons", "surgeonpages", "doctors"];
    for (const c of collections) {
        try {
            const docs = await db.collection(c).find({}).project({ slug: 1, title: 1, pageName: 1, status: 1 }).toArray();
            console.log(`\nCollection [${c}] (${docs.length} docs):`);
            docs.forEach(d => console.log(`  - id: ${d._id}, slug: "${d.slug}", title: "${d.title || d.pageName}", status: "${d.status}"`));
        } catch (e) {
            console.log(`Collection [${c}] error:`, e.message);
        }
    }

    await mongoose.disconnect();
}

checkAll().catch(console.error);
