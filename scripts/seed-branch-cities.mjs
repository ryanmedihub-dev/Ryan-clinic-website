/**
 * Seed branch city pages from the Delhi template
 *
 * What it does:
 *   1. Deletes every branch page EXCEPT hair-transplant-in-delhi
 *   2. Clones the Delhi page 10 times, replacing "Delhi"/"delhi"/"Delhi NCR"
 *      and city-specific area references with each target city
 *
 * Run:
 *   node --env-file=.env.local scripts/seed-branch-cities.mjs
 *
 * Flags:
 *   --dry-run   Preview what would be deleted / created without touching MongoDB
 */

import mongoose from "mongoose";

const DRY_RUN = process.argv.includes("--dry-run");

// ── City configurations ────────────────────────────────────────────────────────
// name        : Title-case city name used to replace "Delhi"
// slug        : lowercase slug used to replace "delhi" in URLs and text
// localArea   : replaces "Pitampura, North Delhi (Serving Delhi NCR)" in the table
// faq2Area    : replaces "South Delhi and Gurgaon" in FAQ Q2
const CITIES = [
  {
    name: "Mumbai",
    slug: "mumbai",
    localArea: "Andheri West, Mumbai (Serving Navi Mumbai Also)",
    faq2Area: "Andheri West, Mumbai and Navi Mumbai",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    localArea: "Banjara Hills, Hyderabad",
    faq2Area: "Banjara Hills, Hyderabad, and nearby cities",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    localArea: "Koramangala, Bangalore",
    faq2Area: "Koramangala and Indiranagar, Bangalore",
  },
  {
    name: "Chennai",
    slug: "chennai",
    localArea: "Anna Nagar, Chennai",
    faq2Area: "Anna Nagar and Adyar, Chennai",
  },
  {
    name: "Pune",
    slug: "pune",
    localArea: "Baner, Pune",
    faq2Area: "Baner and Koregaon Park, Pune",
  },
  {
    name: "Kolkata",
    slug: "kolkata",
    localArea: "Salt Lake, Kolkata",
    faq2Area: "Salt Lake and New Town, Kolkata",
  },
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
    localArea: "SG Highway, Ahmedabad",
    faq2Area: "SG Highway and Navrangpura, Ahmedabad",
  },
  {
    name: "Lucknow",
    slug: "lucknow",
    localArea: "Gomti Nagar, Lucknow",
    faq2Area: "Gomti Nagar and Hazratganj, Lucknow",
  },
  {
    name: "Jammu",
    slug: "jammu",
    localArea: "Bahu Plaza, Jammu",
    faq2Area: "Gandhi Nagar and Residency Road, Jammu",
  },
  {
    name: "Patna",
    slug: "patna",
    localArea: "Boring Road, Patna",
    faq2Area: "Boring Road and Bailey Road, Patna",
  },
];

// ── Mongoose model ─────────────────────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Service =
  mongoose.models.Services || mongoose.model("Services", serviceSchema);

// ── Text replacement helpers ───────────────────────────────────────────────────
function replaceInString(text, city) {
  if (typeof text !== "string") return text;

  let s = text;

  // Most-specific replacements first to avoid double-substitution
  s = s.replace(
    /Pitampura, North Delhi \(Serving Delhi NCR\)/g,
    city.localArea
  );
  s = s.replace(/South Delhi and Gurgaon/g, city.faq2Area);

  // "Delhi NCR" → city name (before plain "Delhi")
  s = s.replace(/Delhi NCR/g, city.name);

  // "Delhi" (title case) → city name
  s = s.replace(/Delhi/g, city.name);

  // "delhi" (lowercase) → city slug
  s = s.replace(/delhi/g, city.slug);

  return s;
}

function deepReplace(value, city) {
  if (typeof value === "string") return replaceInString(value, city);
  if (Array.isArray(value)) return value.map((v) => deepReplace(v, city));
  if (value !== null && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      // Strip Mongoose / MongoDB internal keys — let DB assign new ones
      if (k === "_id" || k === "__v" || k === "createdAt" || k === "updatedAt") {
        continue;
      }
      out[k] = deepReplace(v, city);
    }
    return out;
  }
  return value;
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    console.error("❌  MONGO_URL not found. Pass it via --env-file=.env.local");
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log("⚠️   DRY RUN — no changes will be written to MongoDB\n");
  }

  if (!DRY_RUN) {
    console.log("🔗  Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL, { bufferCommands: false });
    console.log("✅  Connected\n");
  }

  // ── Step 1: Fetch the Delhi template ────────────────────────────────────────
  console.log('🔍  Looking up hair-transplant-in-delhi...');
  let delhiPage = null;

  if (!DRY_RUN) {
    delhiPage = await Service.findOne({
      "metadata.pageurl": "hair-transplant-in-delhi",
    }).lean();

    if (!delhiPage) {
      console.error("❌  hair-transplant-in-delhi not found in database. Aborting.");
      process.exit(1);
    }
    console.log(`✅  Found: ${delhiPage._id}\n`);
  } else {
    console.log("  🔍  Would fetch hair-transplant-in-delhi as template\n");
  }

  // ── Step 2: Delete all other branch pages ───────────────────────────────────
  console.log('🗑️   Deleting all branch pages except hair-transplant-in-delhi...');

  if (!DRY_RUN) {
    const del = await Service.deleteMany({
      "metadata.pageType": "branch",
      "metadata.pageurl": { $ne: "hair-transplant-in-delhi" },
    });
    console.log(`✅  Deleted ${del.deletedCount} branch page(s)\n`);
  } else {
    console.log(
      "  🔍  Would delete all branch pages where pageurl != hair-transplant-in-delhi\n"
    );
  }

  // ── Step 3: Create 10 city pages ────────────────────────────────────────────
  console.log('🏙️   Creating 10 city branch pages...\n');
  let created = 0;
  let failed = 0;

  for (const city of CITIES) {
    const pageurl = `hair-transplant-in-${city.slug}`;
    const label = `Hair Transplant in ${city.name} [${pageurl}]`;

    if (DRY_RUN) {
      console.log(`  🔍  Would create: ${label}`);
      created++;
      continue;
    }

    try {
      // Strip Mongo metadata, deep-replace all city text
      const { _id, __v, createdAt, updatedAt, ...delhiData } = delhiPage;
      const cityData = deepReplace(delhiData, city);

      // Guarantee the correct pageurl (deepReplace already handles it via "delhi" → slug,
      // but setting explicitly makes the intent unambiguous)
      cityData.metadata.pageurl = pageurl;

      await Service.create(cityData);
      console.log(`  ✅  ${label}`);
      created++;
    } catch (err) {
      console.error(`  ❌  ${label} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊  Summary: ${created} created, ${failed} failed\n`);

  if (!DRY_RUN) {
    await mongoose.disconnect();
    console.log("🔌  DB disconnected\n");
  }

  console.log("🎉  Done.\n");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
