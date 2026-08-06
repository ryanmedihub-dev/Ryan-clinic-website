/**
 * fix_mumbai_cost_record.js
 * Safe one-off script — targets ONLY slug: 'hair-transplant-cost-in-mumbai'.
 * Run: node scripts/fix_mumbai_cost_record.js
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env.local manually
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const idx = t.indexOf("=");
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const TARGET_SLUG = "hair-transplant-cost-in-mumbai";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const col = mongoose.connection.db.collection("costpages");
  const doc = await col.findOne({ slug: TARGET_SLUG });

  if (!doc) {
    console.error("❌ No document found with slug:", TARGET_SLUG);
    process.exit(1);
  }

  console.log("📄 Found document:", doc.title);
  const updates = {};

  /* ERROR 1 — intro.summaryRows city leakage */
  if (doc.intro && doc.intro.summaryRows && doc.intro.summaryRows.length > 0) {
    const fixedRows = doc.intro.summaryRows.map((row) => {
      if (row.value && (row.value.includes("Pitampura") || row.value.includes("North Delhi") || row.value.includes("Mumbai NCR") || row.value.includes("NCR"))) {
        console.log('  Fixing summaryRow "' + row.label + '": "' + row.value + '"');
        return Object.assign({}, row, { value: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053" });
      }
      return row;
    });
    updates["intro.summaryRows"] = fixedRows;
  }

  /* ERROR 2 — FAQ heading/badge/description Delhi → Mumbai */
  if (doc.faq) {
    if (doc.faq.heading && doc.faq.heading.includes("Delhi")) {
      console.log('  Fixing faq.heading');
      updates["faq.heading"] = doc.faq.heading.replace(/Delhi/g, "Mumbai");
    }
    if (doc.faq.badge && doc.faq.badge.includes("Delhi")) {
      updates["faq.badge"] = doc.faq.badge.replace(/Delhi/g, "Mumbai");
    }
    if (doc.faq.description && doc.faq.description.includes("Delhi")) {
      updates["faq.description"] = doc.faq.description.replace(/Delhi/g, "Mumbai");
    }

    /* ERROR 3/4/5 — Delhi-specific FAQs, NCR, Gurgaon percentage */
    const faqKey = doc.faq.items ? "faq.items" : "faq.faqs";
    const faqs = doc.faq.items || doc.faq.faqs || [];
    if (faqs.length > 0) {
      const fixed = faqs.map((faq) => {
        let q = faq.question || "";
        let a = faq.answer || "";
        a = a.replace(/Mumbai NCR/gi, "Mumbai").replace(/\bNCR\b/g, "").replace(/Pitampura/g, "").replace(/Rohini/g, "").replace(/Gurgaon/g, "");
        a = a.replace(/South Mumbai and Gurgaon clinics typically charge \d+[–\-]\d+% more than[^.]+\./gi,
          "Clinic location affects pricing — central and premium-area clinics often charge more. Confirm exact costs at your consultation.");
        if (q.includes("Pitampura") || q.includes("Rohini") || (q.includes("Delhi") && !q.includes("Mumbai"))) {
          console.log('  ⚠️  Delhi-specific FAQ flagged: "' + q.substring(0, 60) + '..."');
          a = "[REVIEW NEEDED — Delhi-specific content. Please update for Mumbai.]\n\n" + a;
        }
        return Object.assign({}, faq, { question: q, answer: a });
      });
      updates[faqKey] = fixed;
      console.log("  Fixed " + faqs.length + " FAQ items");
    }
  }

  /* consultation.description city leakage */
  if (doc.consultation && doc.consultation.description && doc.consultation.description.includes("Delhi")) {
    updates["consultation.description"] = doc.consultation.description.replace(/Delhi/g, "Mumbai");
  }

  if (Object.keys(updates).length === 0) {
    console.log("ℹ️  No city-leakage fields found. Document may already be correct.");
    process.exit(0);
  }

  const result = await col.updateOne({ slug: TARGET_SLUG }, { $set: updates });
  console.log("✅ Updated " + result.modifiedCount + " document(s)");
  console.log("Updated fields:", Object.keys(updates));

  await mongoose.disconnect();
  console.log("✅ Done — Mumbai city-content fix applied.");
}

run().catch((err) => { console.error("❌ Script failed:", err); process.exit(1); });
