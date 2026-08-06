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

async function testDBConnection() {
    const { DBConnection } = require("../src/lib/db");
    const SurgeryPageModel = require("../src/models/surgeryPage").default;

    try {
        await DBConnection();
        const page = await SurgeryPageModel.findOne({ slug: "hair-transplant-surgery-in-delhi" }).lean();
        console.log("DBConnection success! Page title:", page ? page.title || page.pageName : "NULL");
    } catch (err) {
        console.error("DBConnection error:", err);
    }
}

testDBConnection();
