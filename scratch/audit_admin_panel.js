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

async function run() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    console.log("=== Surgeon Admin Panel Pre-Deployment Audit ===\n");

    for (const col of ["surgeonpages", "surgeons"]) {
        const doc = await db.collection(col).findOne({ slug: "hair-transplant-surgeon-in-delhi" });
        if (!doc) {
            console.log(`[${col}] ❌ Document NOT FOUND`);
            continue;
        }
        console.log(`[${col}] ✅ Document found: _id=${doc._id}`);

        // Fix: ensure settings.isDeleted is explicitly false
        const needsFix = doc.settings?.isDeleted === undefined;
        if (needsFix) {
            await db.collection(col).updateOne(
                { slug: "hair-transplant-surgeon-in-delhi" },
                { $set: { "settings.isDeleted": false } }
            );
            console.log(`[${col}] ✅ Fixed: settings.isDeleted set to false`);
        } else {
            console.log(`[${col}] ✅ settings.isDeleted = ${doc.settings.isDeleted}`);
        }

        // Check all critical fields
        const checks = {
            "title": doc.title,
            "slug": doc.slug,
            "settings.status": doc.settings?.status,
            "settings.isDeleted": doc.settings?.isDeleted === undefined ? "(was undefined → now false)" : doc.settings?.isDeleted,
            "whySkill.heading": doc.whySkill?.heading,
            "whySkill.cards.length": doc.whySkill?.cards?.length,
            "benefits.heading": doc.benefits?.heading,
            "benefits.items.length": doc.benefits?.items?.length,
            "whyClinic.heading": doc.whyClinic?.heading,
            "surgeonRole.heading": doc.surgeonRole?.heading,
            "comparison.heading": doc.comparison?.heading,
            "leadSurgeon.heading": doc.leadSurgeon?.heading,
            "bookingChecklist.heading": doc.bookingChecklist?.heading,
            "procedures.heading": doc.procedures?.heading,
            "consultationCTA.heading": doc.consultationCTA?.heading,
            "faq.heading": doc.faq?.heading,
            "experienceSpecialization.heading": doc.experienceSpecialization?.heading,
            "skillEvaluation.heading": doc.skillEvaluation?.heading,
            "hairlineArtistry.heading": doc.hairlineArtistry?.heading,
            "revisionRepair.heading": doc.revisionRepair?.heading,
            "costConsultation.heading": doc.costConsultation?.heading,
            "visitSurgeon.heading": doc.visitSurgeon?.heading,
        };

        console.log("\n  Field audit:");
        for (const [field, val] of Object.entries(checks)) {
            const status = (val !== undefined && val !== null && val !== "") ? "✅" : "⚠️  EMPTY";
            console.log(`  ${status} ${field}: ${val}`);
        }
        console.log();
    }

    // Test the list query (simulates admin panel)
    const db2 = mongoose.connection.db;
    for (const col of ["surgeonpages", "surgeons"]) {
        const listResult = await db2.collection(col).find(
            { "settings.isDeleted": { $ne: true } }
        ).toArray();
        console.log(`[${col}] List query ($ne: true): ${listResult.length} document(s) returned`);
    }

    await mongoose.disconnect();
    console.log("\n=== Audit Complete ===");
}

run().catch(console.error);
