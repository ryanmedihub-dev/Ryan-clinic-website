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

    // ── 1. Fix bookingChecklist.heading in BOTH collections ──────────────────
    const bookingHeading = "How to judge a hair transplant surgeon in Delhi before you book";
    const ctaHeading = "Book a consultation with a hair transplant surgeon in Delhi";

    for (const col of ["surgeonpages", "surgeons"]) {
        const r = await db.collection(col).updateOne(
            { slug: "hair-transplant-surgeon-in-delhi" },
            {
                $set: {
                    "bookingChecklist.heading": bookingHeading,
                    "consultationCTA.heading": ctaHeading,
                }
            }
        );
        console.log(`[${col}] bookingChecklist.heading + consultationCTA.heading → matched=${r.matchedCount} modified=${r.modifiedCount}`);
    }

    // ── 2. Inspect the duplicate in surgeonpages ──────────────────────────────
    const allDocs = await db.collection("surgeonpages")
        .find({ "settings.isDeleted": { $ne: true } })
        .project({ _id: 1, title: 1, slug: 1, "settings.status": 1, "settings.isDeleted": 1, createdAt: 1 })
        .sort({ createdAt: 1 })
        .toArray();

    console.log(`\n[surgeonpages] All visible documents (${allDocs.length} total):`);
    for (const d of allDocs) {
        console.log(`  _id=${d._id} | slug=${d.slug} | status=${d.settings?.status} | isDeleted=${d.settings?.isDeleted} | created=${d.createdAt}`);
    }

    // ── 3. If there's a duplicate/stale document with same slug, soft-delete the OLDER one ─
    const bySlug = allDocs.filter(d => d.slug === "hair-transplant-surgeon-in-delhi");
    if (bySlug.length > 1) {
        // Keep the newest, soft-delete the rest
        const sorted = bySlug.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const toDelete = sorted.slice(1); // all but the newest
        for (const old of toDelete) {
            await db.collection("surgeonpages").updateOne(
                { _id: old._id },
                { $set: { "settings.isDeleted": true, "settings.deletedAt": new Date() } }
            );
            console.log(`\n[surgeonpages] Soft-deleted duplicate _id=${old._id} (older, slug=${old.slug})`);
        }
    } else {
        console.log("\n[surgeonpages] No duplicate slugs — all clean.");
    }

    // ── 4. Final verification ─────────────────────────────────────────────────
    console.log("\n=== Final Verification ===");
    for (const col of ["surgeonpages", "surgeons"]) {
        const docs = await db.collection(col)
            .find({ "settings.isDeleted": { $ne: true } })
            .project({ _id: 1, title: 1, slug: 1, "settings.status": 1 })
            .toArray();
        console.log(`[${col}] Admin panel will show ${docs.length} document(s):`);
        for (const d of docs) {
            console.log(`  ✅ "${d.title}" (/${d.slug}) — status: ${d.settings?.status}`);
        }

        // Check the two fixed headings
        const doc = await db.collection(col).findOne({ slug: "hair-transplant-surgeon-in-delhi" });
        console.log(`  bookingChecklist.heading: ${doc?.bookingChecklist?.heading}`);
        console.log(`  consultationCTA.heading:  ${doc?.consultationCTA?.heading}`);
    }

    await mongoose.disconnect();
    console.log("\n=== All fixes applied. Admin panel is clean. ===");
}

run().catch(console.error);
