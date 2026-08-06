/**
 * fix_mumbai_cost_record.mjs
 *
 * Safe one-off script — targets ONLY slug: 'hair-transplant-cost-in-mumbai'.
 * Fixes city-content errors identified in the marketing brief review.
 *
 * Run: node scripts/fix_mumbai_cost_record.mjs
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const TARGET_SLUG = "hair-transplant-cost-in-mumbai";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const db = mongoose.connection.db;
  const col = db.collection("costpages");

  const doc = await col.findOne({ slug: TARGET_SLUG });
  if (!doc) {
    console.error(`❌ No document found with slug: ${TARGET_SLUG}`);
    process.exit(1);
  }

  console.log(`📄 Found document: ${doc.title}`);

  const updates = {};

  /* ERROR 1 — Quick summary / intro city leakage
   * Change "Pitampura, North Delhi (serving all Mumbai NCR)"  → Mumbai-appropriate address
   * Fix is applied only to intro.summaryRows if any row contains Delhi/Pitampura city text
   */
  if (doc.intro?.summaryRows?.length > 0) {
    const fixedRows = doc.intro.summaryRows.map((row) => {
      if (
        row.value &&
        (row.value.includes("Pitampura") ||
          row.value.includes("North Delhi") ||
          row.value.includes("Mumbai NCR") ||
          row.value.includes("NCR"))
      ) {
        console.log(`  Fixing summaryRow: "${row.label}" value: "${row.value}"`);
        return {
          ...row,
          value: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053",
        };
      }
      return row;
    });
    updates["intro.summaryRows"] = fixedRows;
  }

  /* ERROR 2 — FAQ intro text "Delhi" → "Mumbai"
   * Only if the faq heading/badge contains "Delhi"
   */
  if (doc.faq?.heading && doc.faq.heading.includes("Delhi")) {
    console.log(`  Fixing faq.heading: "${doc.faq.heading}"`);
    updates["faq.heading"] = doc.faq.heading.replace(/Delhi/g, "Mumbai");
  }
  if (doc.faq?.badge && doc.faq.badge.includes("Delhi")) {
    console.log(`  Fixing faq.badge: "${doc.faq.badge}"`);
    updates["faq.badge"] = doc.faq.badge.replace(/Delhi/g, "Mumbai");
  }
  if (doc.faq?.description && doc.faq.description.includes("Delhi")) {
    console.log(`  Fixing faq.description`);
    updates["faq.description"] = doc.faq.description.replace(/Delhi/g, "Mumbai");
  }

  /* ERROR 3 — Remove/replace Delhi-specific FAQ questions (Pitampura, Rohini)
   * ERROR 4 — Remove "NCR" terminology in FAQ answers
   * ERROR 5 — Remove the "Gurgaon" + percentage mixing in FAQ answers
   */
  if (doc.faq?.items?.length > 0 || doc.faq?.faqs?.length > 0) {
    const faqKey = doc.faq.items ? "faq.items" : "faq.faqs";
    const faqs = doc.faq.items || doc.faq.faqs || [];
    const fixed = faqs.map((faq) => {
      let q = faq.question || "";
      let a = faq.answer || "";

      // Remove Delhi-local geo references in answers
      a = a
        .replace(/Mumbai NCR/gi, "Mumbai")
        .replace(/\bNCR\b/g, "")
        .replace(/Pitampura/g, "")
        .replace(/Rohini/g, "")
        .replace(/Gurgaon/g, "");

      // Remove unverified percentage claim about South Mumbai and Gurgaon
      a = a.replace(
        /South Mumbai and Gurgaon clinics typically charge \d+[–-]\d+% more than[^.]+\./gi,
        "Clinic location affects pricing \u2014 central and premium-area clinics often charge more. Confirm exact costs at your consultation."
      );

      // Flag Delhi-specific questions that should be reviewed
      if (
        q.includes("Pitampura") ||
        q.includes("Rohini") ||
        (q.includes("Delhi") && !q.includes("Mumbai"))
      ) {
        console.log(`  ⚠️  Delhi-specific FAQ question found (will be soft-flagged): "${q.substring(0, 60)}..."`);
        // Prepend a marker so clinic staff can identify + edit it from Admin
        a = `[REVIEW NEEDED — Delhi-specific content migrated from Delhi page. Please update for Mumbai.]\n\n${a}`;
      }

      return { ...faq, question: q, answer: a };
    });
    updates[faqKey] = fixed;
    console.log(`  Fixed ${faqs.length} FAQ items for city leakage`);
  }

  /* Apply the consultation description if it contains Delhi-leakage */
  if (doc.consultation?.description?.includes("Delhi")) {
    console.log(`  Fixing consultation.description Delhi → Mumbai`);
    updates["consultation.description"] = doc.consultation.description.replace(/Delhi/g, "Mumbai");
  }

  if (Object.keys(updates).length === 0) {
    console.log("ℹ️  No city-leakage fields found that need fixing. Document may already be correct.");
    process.exit(0);
  }

  const result = await col.updateOne(
    { slug: TARGET_SLUG },
    { $set: updates }
  );

  console.log(`✅ Updated ${result.modifiedCount} document(s)`);
  console.log("Updated fields:", Object.keys(updates));

  await mongoose.disconnect();
  console.log("✅ Done — Mumbai city-content fix applied.");
}

run().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
