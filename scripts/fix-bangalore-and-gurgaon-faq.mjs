// scripts/fix-bangalore-and-gurgaon-faq.mjs
// Handle the 2 skipped items from the main fix script
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "../.env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) { console.error("env load error:", e.message); }
}

loadEnv();
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI ||
                  process.env.DATABASE_URL || process.env.MONGO_URL;

// Approved final values
const NEW_WHY_CLINIC_DESC =
  "Located in New Delhi (Pitampura), our clinic features sterile HEPA-filtered operating theaters.";
const NEW_FAQ_ANSWER =
  "At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, New Delhi \u2013 110034), Mon\u2013Sat, 9 AM\u20137 PM. Accessible via Pitampura Metro Station (Red Line).";

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const col = db.collection("surgeonpages");

  // ─── 1. BANGALORE — regex was "banglore" but DB has "Bangalore" ──────────────
  const bangOid = new mongoose.Types.ObjectId("6ab61897578dfa14222fbef0");
  const bangDoc = await col.findOne({ _id: bangOid });

  console.log("=".repeat(60));
  console.log("BANGALORE CHECK");
  console.log("=".repeat(60));
  console.log("slug:", bangDoc?.slug);
  console.log("status:", bangDoc?.settings?.status);
  console.log("whyClinic.description:", bangDoc?.whyClinic?.description);
  console.log("faq.faqs[12].answer:", bangDoc?.faq?.faqs?.[12]?.answer);

  const bangWhyClinic = bangDoc?.whyClinic?.description;
  const bangFaq12 = bangDoc?.faq?.faqs?.[12]?.answer;

  const bangUpdates = {};

  // Check whyClinic — "New Bangalore" (capital B)
  if (typeof bangWhyClinic === "string" && /located in pitampura,?\s*new\s+bangal?o?re/i.test(bangWhyClinic)) {
    bangUpdates["whyClinic.description"] = NEW_WHY_CLINIC_DESC;
    console.log("\n[WILL UPDATE] whyClinic.description");
    console.log("  FROM:", bangWhyClinic);
    console.log("  TO:  ", NEW_WHY_CLINIC_DESC);
  } else {
    console.log("\n[SKIP] whyClinic.description — current value:", bangWhyClinic);
  }

  // Check faq[12].answer — "New Bangalore" (capital B)
  if (typeof bangFaq12 === "string" && /New\s+Bangal?o?re\s*[–\-]\s*110034/i.test(bangFaq12)) {
    const newFaqs = bangDoc.faq.faqs.map((f, i) => {
      if (i !== 12) return f;
      return { ...f, answer: NEW_FAQ_ANSWER };
    });
    bangUpdates["faq.faqs"] = newFaqs;
    console.log("\n[WILL UPDATE] faq.faqs[12].answer");
    console.log("  FROM:", bangFaq12);
    console.log("  TO:  ", NEW_FAQ_ANSWER);
  } else {
    console.log("\n[SKIP] faq.faqs[12].answer — current value:", bangFaq12);
  }

  if (Object.keys(bangUpdates).length > 0) {
    const r = await col.updateOne(
      { _id: bangOid },
      { $set: { ...bangUpdates, updatedAt: new Date() } }
    );
    console.log(`\nBangalore update result: modifiedCount=${r.modifiedCount}`);
  } else {
    console.log("\nBangalore: nothing to update");
  }

  // ─── 2. GURGAON — read current faq[12] value to understand it ────────────────
  const gurgOid = new mongoose.Types.ObjectId("6aa3a0de39957fab4d21fb82");
  const gurgDoc = await col.findOne({ _id: gurgOid });

  console.log("\n" + "=".repeat(60));
  console.log("GURGAON FAQ[12] CHECK");
  console.log("=".repeat(60));
  const gurgFaq12 = gurgDoc?.faq?.faqs?.[12];
  console.log("faq[12].question:", gurgFaq12?.question);
  console.log("faq[12].answer FULL:", gurgFaq12?.answer);
  console.log("general.city:", gurgDoc?.general?.city);
  console.log("settings.status:", gurgDoc?.settings?.status);

  // The Gurgaon FAQ[12] contains a REAL Gurgaon address:
  // "HOUSE NO- 53, MAIN, Market Rd, Residency Green, Jal Vihar Colony, Sector 46, Gurugram, Haryana"
  // This is a legitimate Gurgaon-specific address — NOT a Delhi artifact.
  // Per instructions: DO NOT invent or overwrite verified city-specific addresses.
  // DECISION: PRESERVE Gurgaon FAQ[12] as-is.
  console.log("\n[DECISION] Gurgaon faq[12].answer contains a real Gurgaon address.");
  console.log("  Per instructions: DO NOT overwrite verified city-specific address with Delhi address.");
  console.log("  Gurgaon faq[12].answer will be PRESERVED AS-IS.");

  // ─── POST-CHECK: verify Bangalore and Gurgaon ────────────────────────────────
  console.log("\n" + "=".repeat(60));
  console.log("POST-UPDATE VERIFICATION");
  console.log("=".repeat(60));

  const bangPost = await col.findOne({ _id: bangOid });
  const bangWcOk = bangPost?.whyClinic?.description === NEW_WHY_CLINIC_DESC;
  const bangFaqOk = bangPost?.faq?.faqs?.[12]?.answer === NEW_FAQ_ANSWER;
  const bangStatusOk = bangPost?.settings?.status === "draft";
  const bangSlugOk = bangPost?.slug === "hair-transplant-surgeon-in-banglore";
  const bangHeroOk = bangPost?.hero?.description?.includes("Pitampura");
  console.log(`Bangalore whyClinic: ${bangWcOk ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Bangalore faq[12]:   ${bangFaqOk ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Bangalore status:    ${bangStatusOk ? "✓ draft" : "✗ CHANGED"}`);
  console.log(`Bangalore slug:      ${bangSlugOk ? "✓ unchanged" : "✗ CHANGED"}`);
  console.log(`Bangalore hero desc: ${bangHeroOk ? "✓ still has Pitampura" : "✗ CHANGED"}`);

  const gurgPost = await col.findOne({ _id: gurgOid });
  const gurgCityOk = gurgPost?.general?.city === "Gurgaon";
  const gurgWcOk = gurgPost?.whyClinic?.description === NEW_WHY_CLINIC_DESC;
  const gurgStatusOk = gurgPost?.settings?.status === "published";
  console.log(`\nGurgaon general.city: ${gurgCityOk ? "✓ Gurgaon" : "✗ FAIL"}`);
  console.log(`Gurgaon whyClinic:    ${gurgWcOk ? "✓ PASS" : "✗ FAIL"}`);
  console.log(`Gurgaon status:       ${gurgStatusOk ? "✓ published" : "✗ CHANGED"}`);
  console.log(`Gurgaon faq[12]:      PRESERVED (real Gurgaon address)`);

  await mongoose.disconnect();
  console.log("\nDone.");
}

main().catch(e => { console.error(e); process.exit(1); });
