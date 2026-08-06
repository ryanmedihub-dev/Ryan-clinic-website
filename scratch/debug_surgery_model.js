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

async function testModel() {
    await mongoose.connect(MONGODB_URI);
    const SurgeryPageModel = require("../src/models/surgeryPage").default;

    const slug = "hair-transplant-surgery-in-delhi";
    const page = await SurgeryPageModel.findOne({ slug }).lean();
    console.log("SurgeryPageModel.findOne({ slug }) result:", !!page);
    if (!page) {
        console.log("All SurgeryPage documents count:", await SurgeryPageModel.countDocuments({}));
        const all = await SurgeryPageModel.find({}).select("slug status").lean();
        console.log("All docs in SurgeryPage:", all);
    } else {
        console.log("Found page title:", page.title || page.pageName);
    }

    await mongoose.disconnect();
}

testModel().catch(console.error);
