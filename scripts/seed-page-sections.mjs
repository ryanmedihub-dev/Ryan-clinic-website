/**
 * Seed pageSections for existing services
 * Run: node --env-file=.env.local scripts/seed-page-sections.mjs
 *
 * ── Modes ─────────────────────────────────────────────────────────────────────
 *
 *   (default)            Seed branch pages in MongoDB with default pageSections
 *   --from-file          Read branches-data.txt and upsert every document back
 *                        into MongoDB (full document restore / bulk update)
 *   --from-file <path>   Same but with a custom txt path
 *
 * ── Flags (default mode) ──────────────────────────────────────────────────────
 *   --force   Overwrite pageSections even if already set
 *   --all     Also seed non-branch pages
 *
 * ── Flags (--from-file mode) ──────────────────────────────────────────────────
 *   --dry-run  Print what would be written without touching the DB
 *
 * ── Typical workflow ──────────────────────────────────────────────────────────
 *   1. npm run branch:export          → dumps branches-data.txt
 *   2. Edit branches-data.txt         → change pageSections.data, content, etc.
 *   3. npm run branch:import          → pushes edits back to MongoDB
 */

import mongoose from "mongoose";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CLI flags ──────────────────────────────────────────────────────────────────
const FORCE     = process.argv.includes("--force");
const ALL       = process.argv.includes("--all");
const DRY_RUN   = process.argv.includes("--dry-run");
const FROM_FILE = process.argv.includes("--from-file");

const fileArgIdx = process.argv.indexOf("--from-file");
const FILE_PATH  = FROM_FILE
  ? (
    fileArgIdx !== -1 && process.argv[fileArgIdx + 1] && !process.argv[fileArgIdx + 1].startsWith("--")
      ? resolve(process.argv[fileArgIdx + 1])
      : resolve(__dirname, "branches-data.txt")
  )
  : null;

// ── Section definitions (default mode) ────────────────────────────────────────
const SECTION_KEYS = [
  "overview",
  "ourResults",
  "typesSection",
  "whyChooseUs",
  "costSection",
  "ourDoctor",
  "differencesSection",
  "pleoFeatures",
  "whyDoctorMatters",
  "recoveryTimeline",
  "extraFields",
  "areasWeServe",
  "testimonials",
  "faq",
];

const BRANCH_ONLY = new Set([
  "costSection",
  "ourDoctor",
  "differencesSection",
  "whyDoctorMatters",
  "areasWeServe",
]);

function buildSections(isBranch) {
  return SECTION_KEYS.map((key, order) => ({
    key,
    enabled:
      key === "recoveryTimeline"
        ? false
        : isBranch
          ? true
          : !BRANCH_ONLY.has(key),
    order,
    data: {},
  }));
}

// ── Mongoose schema ────────────────────────────────────────────────────────────
const serviceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Service =
  mongoose.models.Services || mongoose.model("Services", serviceSchema);

// ── Mode: restore / bulk-update from exported txt file ────────────────────────
async function fromFile() {
  if (!existsSync(FILE_PATH)) {
    console.error(`❌  File not found: ${FILE_PATH}`);
    console.error("    Run  npm run branch:export  first to generate it.");
    process.exit(1);
  }

  console.log(`\n📂  Reading: ${FILE_PATH}`);
  let docs;
  try {
    docs = JSON.parse(readFileSync(FILE_PATH, "utf8"));
  } catch (err) {
    console.error(`❌  Invalid JSON in file: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(docs)) {
    console.error("❌  Expected a JSON array at the root of the file.");
    process.exit(1);
  }

  console.log(`📋  Loaded ${docs.length} document(s)\n`);

  if (DRY_RUN) {
    console.log("⚠️   DRY RUN — no changes will be written to MongoDB\n");
  }

  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    console.error("❌  MONGO_URL not found. Pass it via --env-file=.env.local");
    process.exit(1);
  }

  if (!DRY_RUN) {
    console.log("🔗  Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL, { bufferCommands: false });
    console.log("✅  Connected\n");
  }

  let updated = 0;
  let failed  = 0;

  for (const doc of docs) {
    const id    = doc._id;
    const label = `${doc.metadata?.pageName || doc.metadata?.pageurl || id} [${doc.metadata?.pageType}]`;

    if (!id) {
      console.warn(`  ⚠️   Skipping document with no _id`);
      failed++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`  🔍  Would update: ${label}`);
      updated++;
      continue;
    }

    try {
      // Remove _id and version key before upserting to avoid conflicts
      const { _id, __v, createdAt, ...payload } = doc;
      await Service.updateOne(
        { _id: id },
        { $set: payload },
        { upsert: false } // only update — never create from import
      );
      console.log(`  ✅  ${label}`);
      updated++;
    } catch (err) {
      console.error(`  ❌  ${label} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊  Summary: ${updated} updated, ${failed} failed\n`);

  if (!DRY_RUN) {
    await mongoose.disconnect();
    console.log("🔌  DB disconnected\n");
  }

  console.log("🎉  Done.\n");
}

// ── Mode: seed default pageSections ───────────────────────────────────────────
async function seedDefaults() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    console.error("❌  MONGO_URL not found. Pass it via --env-file=.env.local");
    process.exit(1);
  }

  console.log("\n🔗  Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL, { bufferCommands: false });
  console.log("✅  Connected\n");

  const typeFilter  = ALL ? {} : { "metadata.pageType": "branch" };
  const existsFilter = FORCE ? {} : { pageSections: { $in: [null, [], undefined] } };
  const query        = { ...typeFilter, ...existsFilter };

  const services = await Service.find(query).lean();
  console.log(`📋  Found ${services.length} service(s) to update`);
  if (services.length === 0) {
    console.log("    (use --force to overwrite existing pageSections)\n");
  }

  let updated = 0;
  let failed  = 0;

  for (const svc of services) {
    const isBranch = svc.metadata?.pageType === "branch";
    const sections  = buildSections(isBranch);
    const label     = `${svc.metadata?.pageName || svc.metadata?.pageurl || svc._id} [${svc.metadata?.pageType}]`;

    try {
      await Service.updateOne(
        { _id: svc._id },
        { $set: { pageSections: sections } }
      );
      console.log(`  ✅  ${label}`);
      updated++;
    } catch (err) {
      console.error(`  ❌  ${label} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊  Summary: ${updated} updated, ${failed} failed\n`);

  await mongoose.disconnect();
  console.log("🔌  DB disconnected\n");
  console.log("🎉  Done. pageSections are now stored in MongoDB.");
  console.log(
    "    Pages without pageSections still fall back to defaults automatically.\n"
  );
}

// ── Entry point ───────────────────────────────────────────────────────────────
if (FROM_FILE) {
  fromFile().catch((err) => {
    console.error("❌  Error:", err.message);
    process.exit(1);
  });
} else {
  seedDefaults().catch((err) => {
    console.error("❌  Error:", err.message);
    process.exit(1);
  });
}
