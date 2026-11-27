/**
 * scripts/backup-16-docs.mjs
 * ------------------------------------------------------------------
 * READ-ONLY: Exports the exact 16 target documents as EJSON to a
 * timestamped file in the brain backups directory (outside the Git repo).
 *
 * Usage:
 *   node scripts/backup-16-docs.mjs
 *
 * Output:
 *   C:\Users\patwa\.gemini\antigravity\brain\ce36b5e9-b464-410f-87d2-82a2e5196eb1\backups\backup-16-docs-<timestamp>.ejson.json
 *
 * No --apply or --rollback flags. This script never writes to MongoDB.
 * ------------------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { pathToFileURL } from "url";

// ── 1. Load mongoose from project node_modules ───────────────────
const mongoosePath = path.resolve(process.cwd(), "node_modules/mongoose/index.js");
const { default: mongoose } = await import(pathToFileURL(mongoosePath).href);

// ── 2. Load MONGO_URL from .env.local (never printed) ────────────
function loadMongoUrl() {
  const envFile = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envFile)) throw new Error(".env.local not found — run from project root");
  const lines = fs.readFileSync(envFile, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^MONGO_URL\s*=\s*(.+)$/);
    if (m) return m[1].trim();
  }
  throw new Error("MONGO_URL not found in .env.local");
}

// ── 3. EJSON serialiser (preserves ObjectId → $oid, Date → $date) ─
function getEJSON() {
  // Mongoose 8.x exposes BSON via mongoose.mongo.BSON
  if (mongoose.mongo?.BSON?.EJSON) return mongoose.mongo.BSON.EJSON;
  // Fallback: manual replacer (covers older Mongoose builds)
  return null;
}

function manualEJSONReplacer(_key, value) {
  // After JSON.stringify calls this, Dates are already strings — we need
  // to handle them before stringification via a pre-pass.
  return value;
}

function serializeToEJSON(docs, EJSON) {
  if (EJSON) {
    return EJSON.stringify(docs, { relaxed: false });
  }
  // Fallback: walk the object tree manually
  function transform(obj) {
    if (obj === null || obj === undefined) return obj;
    if (obj instanceof mongoose.mongo.ObjectId || (typeof obj === "object" && obj._bsontype === "ObjectId")) {
      return { $oid: obj.toString() };
    }
    if (obj instanceof Date) {
      return { $date: { $numberLong: String(obj.getTime()) } };
    }
    if (Array.isArray(obj)) return obj.map(transform);
    if (typeof obj === "object") {
      const out = {};
      for (const [k, v] of Object.entries(obj)) out[k] = transform(v);
      return out;
    }
    return obj;
  }
  return JSON.stringify(transform(docs), null, 2);
}

// ── 4. Target documents ──────────────────────────────────────────
const TARGET_DOCS = {
  doctors: [
    "6a71a2b929d7e7beb5f7f813",
    "6a8e969f322f85061ac1aa0d",
    "6a8e969f322f85061ac1aa0e",
    "6a8e969f322f85061ac1aa0f",
    "6a8e969f322f85061ac1aa10",
    "6a8e969f322f85061ac1aa11",
    "6a8e969f322f85061ac1aa12",
    "6a8e969f322f85061ac1aa13",
    "6a8e969f322f85061ac1aa14",
    "6a8e969f322f85061ac1aa15",
    "6a8e96a0322f85061ac1aa16",
    "6aa0fda669bae9798c18c074",
  ],
  surgerypages: ["6a7566162aca9fd3ecaf4927"],
  hairfallpages: ["6a686fbf9cdb9e4a11663db9"],
  surgeonpages:  ["6a68a1fe3ef2080fa131f396"],
  services:      ["6aa0f1a894bf6cf81ca1c722"],
};

const EXPECTED_TOTAL = Object.values(TARGET_DOCS).flat().length; // 16

// ── 5. Output directory (outside Git repo) ───────────────────────
const BACKUP_DIR = path.join(
  "C:\\Users\\patwa\\.gemini\\antigravity\\brain",
  "ce36b5e9-b464-410f-87d2-82a2e5196eb1",
  "backups"
);

// ── 6. Main ───────────────────────────────────────────────────────
async function main() {
  console.log("=== BACKUP-16-DOCS (read-only) ===\n");

  const mongoUrl = loadMongoUrl();
  await mongoose.connect(mongoUrl);
  console.log("Connected to database.");

  // Resolve EJSON serialiser
  const EJSON = getEJSON();
  if (EJSON) {
    console.log("EJSON: using mongoose.mongo.BSON.EJSON (native, relaxed:false)");
  } else {
    console.log("EJSON: using manual fallback serialiser");
  }

  const backup = {
    exportedAt: new Date().toISOString(),
    expectedTotal: EXPECTED_TOTAL,
    collections: {},
  };

  let totalFetched = 0;
  const errors = [];

  for (const [collName, ids] of Object.entries(TARGET_DOCS)) {
    const coll = mongoose.connection.db.collection(collName);
    const oids = ids.map((id) => new mongoose.mongo.ObjectId(id));
    const docs = await coll.find({ _id: { $in: oids } }).toArray();

    // Verify all expected IDs were found
    const foundIds = new Set(docs.map((d) => d._id.toString()));
    for (const id of ids) {
      if (!foundIds.has(id)) {
        errors.push(`MISSING: ${collName}/${id}`);
      }
    }

    backup.collections[collName] = docs;
    totalFetched += docs.length;
    console.log(`  ${collName}: ${docs.length}/${ids.length} documents fetched`);
  }

  if (errors.length > 0) {
    console.error("\n❌ MISSING DOCUMENTS:");
    errors.forEach((e) => console.error("  ", e));
    await mongoose.disconnect();
    process.exit(1);
  }

  if (totalFetched !== EXPECTED_TOTAL) {
    console.error(`\n❌ Count mismatch: expected ${EXPECTED_TOTAL}, got ${totalFetched}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  // ── 7. Serialise ─────────────────────────────────────────────
  const ejsonStr = serializeToEJSON(backup, EJSON);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19);
  const filename = `backup-16-docs-${timestamp}.ejson.json`;

  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const outPath = path.join(BACKUP_DIR, filename);
  fs.writeFileSync(outPath, ejsonStr, "utf8");

  // ── 8. SHA-256 hash ───────────────────────────────────────────
  const hash = crypto.createHash("sha256").update(ejsonStr, "utf8").digest("hex");

  console.log(`\n✅ BACKUP COMPLETE`);
  console.log(`   Documents : ${totalFetched} (expected ${EXPECTED_TOTAL})`);
  console.log(`   File      : ${outPath}`);
  console.log(`   SHA-256   : ${hash}`);
  console.log(`\nVerify count: (Get-Content "${outPath}" | ConvertFrom-Json).expectedTotal`);
  console.log(`Verify hash : (Get-FileHash "${outPath}" -Algorithm SHA256).Hash`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
