// scripts/apply-surgeon-localization-fix.mjs
// TARGETED UPDATE — Approved 2026-09-25
// Changes: whyClinic.description, faq.faqs[12].answer, general.city (Gurgaon only)
// NO global replacement. Each updateOne targets exact _id + verifies current value first.

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
  } catch (e) { console.error("Could not load .env.local:", e.message); }
}

loadEnv();
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI ||
                  process.env.DATABASE_URL || process.env.MONGO_URL;
if (!MONGO_URI) { console.error("No MONGO_URI/MONGO_URL found"); process.exit(1); }

// ─── Approved targets ─────────────────────────────────────────────────────────
// Each entry: { id, city, slug, status, expectedWhyClinic, expectedFaqAnswer, fixCity }
const TARGETS = [
  {
    id: "6aa3a0de39957fab4d21fb82", city: "Gurgaon", slug: "hair-transplant-surgeon-in-gurgaon",
    status: "published", fixCity: true,
    expectedWhyClinic: /located in pitampura,?\s*new\s+gurgaon/i,
    expectedFaqAnswer: /New\s+Gurgaon\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef4", city: "Ahmedabad", slug: "hair-transplant-surgeon-in-ahmedabad",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+ahmedabad/i,
    expectedFaqAnswer: /New\s+Ahmedabad\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61899578dfa14222fbf00", city: "Amritsar", slug: "hair-transplant-surgeon-in-amritsar",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+amritsar/i,
    expectedFaqAnswer: /New\s+Amritsar\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61897578dfa14222fbef0", city: "Bangalore", slug: "hair-transplant-surgeon-in-banglore",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+ban(g)?l(o|a)re/i,
    expectedFaqAnswer: /New\s+Ban(g)?l(o|a)re\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61899578dfa14222fbefd", city: "Bhopal", slug: "hair-transplant-surgeon-in-bhopal",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+bhopal/i,
    expectedFaqAnswer: /New\s+Bhopal\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef6", city: "Chandigarh", slug: "hair-transplant-surgeon-in-chandigarh",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+chandigarh/i,
    expectedFaqAnswer: /New\s+Chandigarh\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61897578dfa14222fbef1", city: "Chennai", slug: "hair-transplant-surgeon-in-chennai",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+chennai/i,
    expectedFaqAnswer: /New\s+Chennai\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef9", city: "Faridabad", slug: "hair-transplant-surgeon-in-faridabad",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+faridabad/i,
    expectedFaqAnswer: /New\s+Faridabad\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61897578dfa14222fbeef", city: "Hyderabad", slug: "hair-transplant-surgeon-in-hyderabad",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+hyderabad/i,
    expectedFaqAnswer: /New\s+Hyderabad\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61899578dfa14222fbefe", city: "Indore", slug: "hair-transplant-surgeon-indore",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+indore/i,
    expectedFaqAnswer: /New\s+Indore\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef5", city: "Jaipur", slug: "hair-transplant-surgeon-in-jaipur",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+jaipur/i,
    expectedFaqAnswer: /New\s+Jaipur\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef2", city: "Kolkata", slug: "hair-transplant-surgeon-in-kolkata",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+kolkata/i,
    expectedFaqAnswer: /New\s+Kolkata\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef7", city: "Lucknow", slug: "hair-transplant-surgeon-in-lucknow",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+lucknow/i,
    expectedFaqAnswer: /New\s+Lucknow\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61899578dfa14222fbefc", city: "Nagpur", slug: "hair-transplant-surgeon-in-nagpur",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+nagpur/i,
    expectedFaqAnswer: /New\s+Nagpur\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef8", city: "Noida", slug: "hair-transplant-surgeon-in-noida",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+noida/i,
    expectedFaqAnswer: /New\s+Noida\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61899578dfa14222fbeff", city: "Patna", slug: "hair-transplant-surgeon-in-patna",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+patna/i,
    expectedFaqAnswer: /New\s+Patna\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbef3", city: "Pune", slug: "hair-transplant-surgeon-in-pune",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+pune/i,
    expectedFaqAnswer: /New\s+Pune\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbefa", city: "Ranchi", slug: "hair-transplant-surgeon-in-rachi",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+ranchi/i,
    expectedFaqAnswer: /New\s+Ranchi\s*[–\-]\s*110034/i,
  },
  {
    id: "6ab61898578dfa14222fbefb", city: "Surat", slug: "hair-transplant-surgeon-in-surat",
    status: "draft",
    expectedWhyClinic: /located in pitampura,?\s*new\s+surat/i,
    expectedFaqAnswer: /New\s+Surat\s*[–\-]\s*110034/i,
  },
];

// ─── Approved final values ────────────────────────────────────────────────────
const NEW_WHY_CLINIC_DESC =
  "Located in New Delhi (Pitampura), our clinic features sterile HEPA-filtered operating theaters.";

// FAQ answer: only the city/pincode portion changes; "centre" is preserved
// Full approved answer:
const NEW_FAQ_ANSWER =
  "At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, New Delhi \u2013 110034), Mon\u2013Sat, 9 AM\u20137 PM. Accessible via Pitampura Metro Station (Red Line).";

// ─── Counters ─────────────────────────────────────────────────────────────────
let attempted = 0;
let succeeded = 0;
let skipped = 0;
const mismatches = [];
const results = [];

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const col = db.collection("surgeonpages");

  console.log("=".repeat(70));
  console.log("SURGEON LOCALIZATION FIX — PHASE 1: PRE-FLIGHT VERIFICATION");
  console.log("=".repeat(70));

  for (const target of TARGETS) {
    const oid = new mongoose.Types.ObjectId(target.id);
    const doc = await col.findOne({ _id: oid });

    if (!doc) {
      console.log(`\n[SKIP] ${target.city} (${target.id}) — document NOT FOUND in DB`);
      skipped++;
      mismatches.push({ city: target.city, id: target.id, reason: "Document not found" });
      continue;
    }

    // Verify status hasn't changed unexpectedly
    const actualStatus = doc.settings?.status;
    if (actualStatus !== target.status) {
      console.log(`\n[MISMATCH] ${target.city}: expected status="${target.status}", got "${actualStatus}". SKIPPING.`);
      skipped++;
      mismatches.push({ city: target.city, id: target.id, reason: `Status mismatch: expected ${target.status}, got ${actualStatus}` });
      continue;
    }

    // Verify slug
    if (doc.slug !== target.slug) {
      console.log(`\n[MISMATCH] ${target.city}: expected slug="${target.slug}", got "${doc.slug}". SKIPPING.`);
      skipped++;
      mismatches.push({ city: target.city, id: target.id, reason: `Slug mismatch: expected ${target.slug}, got ${doc.slug}` });
      continue;
    }

    // ── Check whyClinic.description ──────────────────────────────────────────
    const currentWhyClinic = doc.whyClinic?.description;
    const whyClinicMatches = typeof currentWhyClinic === "string" &&
                             target.expectedWhyClinic.test(currentWhyClinic);

    // ── Check faq.faqs[12].answer ────────────────────────────────────────────
    const faqs = doc.faq?.faqs;
    const faq12 = Array.isArray(faqs) && faqs.length > 12 ? faqs[12] : null;
    const currentFaq12 = faq12?.answer;
    const faqMatches = typeof currentFaq12 === "string" &&
                       target.expectedFaqAnswer.test(currentFaq12);

    // ── Build update set ─────────────────────────────────────────────────────
    const updateSet = {};
    const docResult = {
      city: target.city, id: target.id, slug: target.slug, status: actualStatus,
      fields: []
    };

    if (whyClinicMatches) {
      updateSet["whyClinic.description"] = NEW_WHY_CLINIC_DESC;
      docResult.fields.push({
        field: "whyClinic.description",
        from: currentWhyClinic,
        to: NEW_WHY_CLINIC_DESC,
        action: "UPDATE"
      });
    } else {
      const reason = currentWhyClinic === undefined
        ? "field does not exist"
        : `value "${String(currentWhyClinic).substring(0,120)}" did not match expected pattern`;
      console.log(`\n[SKIP whyClinic] ${target.city}: ${reason}`);
      mismatches.push({ city: target.city, id: target.id, field: "whyClinic.description", reason });
      docResult.fields.push({ field: "whyClinic.description", action: "SKIPPED", reason });
    }

    if (faqMatches) {
      // Build the new FAQ array with only index 12 changed
      const newFaqs = faqs.map((f, i) => {
        if (i !== 12) return f;
        return { ...f, answer: NEW_FAQ_ANSWER };
      });
      updateSet["faq.faqs"] = newFaqs;
      docResult.fields.push({
        field: "faq.faqs[12].answer",
        from: currentFaq12,
        to: NEW_FAQ_ANSWER,
        action: "UPDATE"
      });
    } else {
      const reason = currentFaq12 === undefined
        ? "faq.faqs[12] does not exist"
        : `value "${String(currentFaq12).substring(0,120)}" did not match expected pattern`;
      console.log(`\n[SKIP faq[12]] ${target.city}: ${reason}`);
      mismatches.push({ city: target.city, id: target.id, field: "faq.faqs[12].answer", reason });
      docResult.fields.push({ field: "faq.faqs[12].answer", action: "SKIPPED", reason });
    }

    // ── Gurgaon: fix general.city ────────────────────────────────────────────
    if (target.fixCity) {
      const currentCity = doc.general?.city;
      if (currentCity === null || currentCity === undefined || currentCity === "") {
        updateSet["general.city"] = "Gurgaon";
        docResult.fields.push({
          field: "general.city", from: currentCity, to: "Gurgaon", action: "UPDATE"
        });
      } else if (currentCity === "Gurgaon") {
        console.log(`[INFO] Gurgaon general.city already = "Gurgaon", no change needed`);
        docResult.fields.push({ field: "general.city", action: "ALREADY_CORRECT", value: currentCity });
      } else {
        console.log(`[MISMATCH] Gurgaon general.city = "${currentCity}" — expected null/empty. SKIPPING city fix.`);
        mismatches.push({ city: "Gurgaon", id: target.id, field: "general.city", reason: `Unexpected value: "${currentCity}"` });
        docResult.fields.push({ field: "general.city", action: "SKIPPED", reason: `Unexpected value: "${currentCity}"` });
      }
    }

    // ── Execute update if anything to update ─────────────────────────────────
    if (Object.keys(updateSet).length > 0) {
      attempted++;
      console.log(`\n[UPDATE] ${target.city} (${actualStatus}) — fields: ${Object.keys(updateSet).join(", ")}`);
      const updateResult = await col.updateOne(
        { _id: oid },
        { $set: { ...updateSet, updatedAt: new Date() } }
      );
      if (updateResult.modifiedCount === 1) {
        succeeded++;
        docResult.outcome = "SUCCESS";
        console.log(`  ✓ Updated successfully`);
      } else {
        docResult.outcome = "FAILED (modifiedCount=0)";
        mismatches.push({ city: target.city, id: target.id, reason: "updateOne returned modifiedCount=0" });
        console.log(`  ✗ Update returned modifiedCount=0`);
      }
    } else {
      skipped++;
      docResult.outcome = "SKIPPED (nothing to update)";
      console.log(`\n[SKIP] ${target.city} — no fields matched expected patterns, nothing updated`);
    }

    results.push(docResult);
  }

  // ─── Summary ────────────────────────────────────────────────────────────────
  console.log("\n" + "=".repeat(70));
  console.log("PHASE 1 COMPLETE — UPDATE SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total targets:  ${TARGETS.length}`);
  console.log(`Attempted:      ${attempted}`);
  console.log(`Succeeded:      ${succeeded}`);
  console.log(`Skipped:        ${skipped}`);
  if (mismatches.length > 0) {
    console.log(`\nMISMATCHES / SKIPS:`);
    mismatches.forEach(m => console.log(`  - ${m.city} [${m.field || "doc"}]: ${m.reason}`));
  } else {
    console.log(`\nNo mismatches.`);
  }

  // ─── PHASE 2: POST-UPDATE VERIFICATION ──────────────────────────────────────
  console.log("\n" + "=".repeat(70));
  console.log("PHASE 2: POST-UPDATE VERIFICATION");
  console.log("=".repeat(70));

  let verifyPass = 0;
  let verifyFail = 0;

  for (const target of TARGETS) {
    const oid = new mongoose.Types.ObjectId(target.id);
    const doc = await col.findOne({ _id: oid });
    if (!doc) {
      console.log(`[VERIFY FAIL] ${target.city}: document not found`);
      verifyFail++;
      continue;
    }

    let pass = true;
    const issues = [];

    // Check whyClinic.description
    const wc = doc.whyClinic?.description;
    if (wc === NEW_WHY_CLINIC_DESC) {
      // good
    } else {
      // Only fail if this was supposed to be updated
      const wasAttempted = results.find(r => r.id === target.id)
        ?.fields.find(f => f.field === "whyClinic.description" && f.action === "UPDATE");
      if (wasAttempted) {
        issues.push(`whyClinic.description not updated: "${String(wc).substring(0,80)}"`);
        pass = false;
      }
    }

    // Check faq.faqs[12].answer
    const fa = doc.faq?.faqs?.[12]?.answer;
    if (fa === NEW_FAQ_ANSWER) {
      // good
    } else {
      const wasAttempted = results.find(r => r.id === target.id)
        ?.fields.find(f => f.field === "faq.faqs[12].answer" && f.action === "UPDATE");
      if (wasAttempted) {
        issues.push(`faq.faqs[12].answer not updated: "${String(fa).substring(0,80)}"`);
        pass = false;
      }
    }

    // Check status unchanged
    if (doc.settings?.status !== target.status) {
      issues.push(`status changed! expected ${target.status}, got ${doc.settings?.status}`);
      pass = false;
    }

    // Check slug unchanged
    if (doc.slug !== target.slug) {
      issues.push(`slug changed! expected ${target.slug}, got ${doc.slug}`);
      pass = false;
    }

    // Check showInSitemap / allowIndexing unchanged (draft pages)
    if (target.status === "draft") {
      if (doc.settings?.showInSitemap !== false) {
        issues.push(`showInSitemap changed from false to ${doc.settings?.showInSitemap}`);
        pass = false;
      }
      if (doc.settings?.allowIndexing !== false) {
        issues.push(`allowIndexing changed from false to ${doc.settings?.allowIndexing}`);
        pass = false;
      }
    }

    // Check general.city for Gurgaon
    if (target.fixCity && doc.general?.city !== "Gurgaon") {
      issues.push(`general.city not set to Gurgaon: "${doc.general?.city}"`);
      pass = false;
    }

    // Check hero.description NOT changed (must still contain "Pitampura")
    if (!doc.hero?.description?.includes("Pitampura")) {
      issues.push(`hero.description lost "Pitampura" reference — was modified unexpectedly`);
      pass = false;
    }

    if (pass) {
      verifyPass++;
      console.log(`  ✓ ${target.city} (${target.status}) — all fields verified`);
    } else {
      verifyFail++;
      console.log(`  ✗ ${target.city} — ISSUES:`);
      issues.forEach(i => console.log(`      - ${i}`));
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log(`VERIFICATION: ${verifyPass} PASS / ${verifyFail} FAIL`);
  console.log("=".repeat(70));

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
