/**
 * scripts/fix-ratings.mjs
 *
 * SCOPE: Rating-only updates (4.9 → 4.7) across:
 *   - 12 active, published Doctor records  (basicInfo.rating)
 *   - 1 SurgeryPage  (hair-transplant-surgery-in-mumbai)   introduction.bottomStats.2.value
 *   - 1 HairFallPage (hair-fall-loss-treatment-in-delhi)   hero.stats.2.value + consultation.statsRow.3.value
 *   - 1 SurgeonPage  (hair-transplant-surgeon-in-mumbai)   hero.stats.3.value + leadSurgeon.stats.3.value
 *
 * EXCLUDES:
 *   - services.assignedDoctor update (see fix-gurgaon-service.mjs)
 *   - Mumbai doctorCard.cardDescription (pending human verification)
 *   - Soft-deleted / inactive doctors (dr-pranendra-singh, hair-transplant-doctor-in-gurgaon-copy)
 *
 * Usage:
 *   node scripts/fix-ratings.mjs            # Dry-run (read-only preview)
 *   node scripts/fix-ratings.mjs --apply    # Execute inside a MongoDB transaction
 *   node scripts/fix-ratings.mjs --rollback # Revert applied changes inside a transaction
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXPECTED_DB_NAME = "test";
const EXPECTED_SET_NAME = "atlas-qjr3jz-shard-0";

function loadMongoUrl() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error("Missing .env.local; cannot verify intended database target.");
  }
  let envMongoUrl = null;
  const content = fs.readFileSync(envPath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx < 0) continue;
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "MONGO_URL" && val) {
      envMongoUrl = val;
      break;
    }
  }
  if (!envMongoUrl) {
    throw new Error("MONGO_URL not found in .env.local.");
  }
  if (process.env.MONGODB_URI) {
    throw new Error("Refusing to run while unexpected MONGODB_URI environment variable is set.");
  }
  if (process.env.MONGO_URL && process.env.MONGO_URL !== envMongoUrl) {
    throw new Error("Refusing to run: exported MONGO_URL differs from .env.local MONGO_URL.");
  }
  return envMongoUrl;
}

function getByPath(obj, dotPath) {
  return dotPath.split(".").reduce((acc, part) => {
    if (acc == null) return undefined;
    if (Array.isArray(acc)) {
      if (!/^\d+$/.test(part)) return undefined;
      return acc[Number(part)];
    }
    return acc[part];
  }, obj);
}

function isEqualValue(a, b) {
  return Object.is(a, b);
}

function formatValue(v) {
  return JSON.stringify(v);
}

// 12 active published doctors — soft-deleted/inactive records intentionally excluded
const ACTIVE_DOCTORS = [
  { id: "6a71a2b929d7e7beb5f7f813", slug: "hair-transplant-doctor-in-delhi" },
  { id: "6a8e969f322f85061ac1aa0d", slug: "hair-transplant-doctor-in-mumbai" },
  { id: "6a8e969f322f85061ac1aa0e", slug: "hair-transplant-doctor-in-hyderabad" },
  { id: "6a8e969f322f85061ac1aa0f", slug: "hair-transplant-doctor-in-pune" },
  { id: "6a8e969f322f85061ac1aa10", slug: "hair-transplant-doctor-in-patna" },
  { id: "6a8e969f322f85061ac1aa11", slug: "hair-transplant-doctor-in-kolkata" },
  { id: "6a8e969f322f85061ac1aa12", slug: "hair-transplant-doctor-in-jammu" },
  { id: "6a8e969f322f85061ac1aa13", slug: "hair-transplant-doctor-in-ahmedabad" },
  { id: "6a8e969f322f85061ac1aa14", slug: "hair-transplant-doctor-in-chennai" },
  { id: "6a8e969f322f85061ac1aa15", slug: "hair-transplant-doctor-in-lucknow" },
  { id: "6a8e96a0322f85061ac1aa16", slug: "hair-transplant-doctor-in-bangalore" },
  { id: "6aa0fda669bae9798c18c074", slug: "hair-transplant-doctor-in-gurgaon" },
];

const OPERATIONS = [
  ...ACTIVE_DOCTORS.map((doc) => ({
    collection: "doctors",
    id: doc.id,
    slugField: "slug",
    expectedSlug: doc.slug,
    description: `Doctor rating (active published)`,
    extraGuards: { status: "published", isActive: true, deletedAt: null },
    changes: [{ path: "basicInfo.rating", before: 4.9, after: 4.7 }],
  })),
  {
    collection: "surgerypages",
    id: "6a7566162aca9fd3ecaf4927",
    slugField: "slug",
    expectedSlug: "hair-transplant-surgery-in-mumbai",
    description: "SurgeryPage rating (Mumbai)",
    extraGuards: { "introduction.bottomStats.2.label": "Patient Rating in Mumbai" },
    changes: [{ path: "introduction.bottomStats.2.value", before: "4.9/5", after: "4.7/5" }],
  },
  {
    collection: "hairfallpages",
    id: "6a686fbf9cdb9e4a11663db9",
    slugField: "slug",
    expectedSlug: "hair-fall-loss-treatment-in-delhi",
    description: "HairFallPage rating (Delhi)",
    extraGuards: {
      "hero.stats.2.label": "Google Rating",
      "consultation.statsRow.3.label": "Reviews",
    },
    changes: [
      { path: "hero.stats.2.value", before: "4.9★", after: "4.7★" },
      { path: "consultation.statsRow.3.value", before: "4.9 ★", after: "4.7 ★" },
    ],
  },
  {
    collection: "surgeonpages",
    id: "6a68a1fe3ef2080fa131f396",
    slugField: "slug",
    expectedSlug: "hair-transplant-surgeon-in-mumbai",
    description: "SurgeonPage rating (Mumbai)",
    extraGuards: {
      "hero.stats.3.label": "Google Rating",
      "leadSurgeon.stats.3.label": "Google Rating",
    },
    changes: [
      { path: "hero.stats.3.value", before: "4.9★", after: "4.7★" },
      { path: "leadSurgeon.stats.3.value", before: "4.9★", after: "4.7★" },
    ],
  },
];

async function verifyTransactionSupport(db) {
  if (db.databaseName !== EXPECTED_DB_NAME) {
    throw new Error(`Unexpected databaseName="${db.databaseName}" (expected "${EXPECTED_DB_NAME}"). Aborting.`);
  }
  const hello = await db.command({ hello: 1 });
  if (hello.setName !== EXPECTED_SET_NAME) {
    throw new Error(`Unexpected replicaSet setName="${hello.setName}" (expected "${EXPECTED_SET_NAME}"). Aborting.`);
  }
  if (!hello.setName || !hello.isWritablePrimary || !hello.logicalSessionTimeoutMinutes) {
    throw new Error(
      `MongoDB deployment does not support transactions (setName=${hello.setName}, primary=${hello.isWritablePrimary}, sessionTimeout=${hello.logicalSessionTimeoutMinutes}).`
    );
  }
  return { databaseName: db.databaseName, setName: hello.setName, nodes: (hello.hosts || []).length, maxWireVersion: hello.maxWireVersion };
}

async function inspectAndPlan(db, isRollback, session) {
  const plan = [];
  const errors = [];

  for (const op of OPERATIONS) {
    const oid = new mongoose.Types.ObjectId(op.id);
    const doc = await db.collection(op.collection).findOne({ _id: oid }, session ? { session } : {});

    if (!doc) {
      errors.push(`[MISSING] ${op.collection} _id=${op.id} (${op.expectedSlug})`);
      continue;
    }
    const actualSlug = getByPath(doc, op.slugField);
    if (actualSlug !== op.expectedSlug) {
      errors.push(`[SLUG_MISMATCH] ${op.collection} _id=${op.id}: expected ${op.slugField}=${formatValue(op.expectedSlug)}, got ${formatValue(actualSlug)}`);
      continue;
    }
    for (const [gp, gv] of Object.entries(op.extraGuards)) {
      const ag = getByPath(doc, gp);
      if (!isEqualValue(ag, gv)) {
        errors.push(`[GUARD_MISMATCH] ${op.collection} _id=${op.id} (${op.expectedSlug}) ${gp}: expected ${formatValue(gv)}, got ${formatValue(ag)}`);
      }
    }

    const setFields = {};
    const filter = { _id: oid, [op.slugField]: op.expectedSlug, ...op.extraGuards };
    const fieldLogs = [];

    for (const ch of op.changes) {
      const src = isRollback ? ch.after : ch.before;
      const tgt = isRollback ? ch.before : ch.after;
      const cur = getByPath(doc, ch.path);
      if (isEqualValue(cur, tgt)) {
        fieldLogs.push({ path: ch.path, status: "ALREADY_AT_TARGET", current: cur, target: tgt });
      } else if (isEqualValue(cur, src)) {
        setFields[ch.path] = tgt;
        filter[ch.path] = src;
        fieldLogs.push({ path: ch.path, status: "PENDING_UPDATE", current: cur, target: tgt });
      } else {
        errors.push(`[VALUE_MISMATCH] ${op.collection} _id=${op.id} (${op.expectedSlug}) ${ch.path}: expected ${formatValue(src)} or ${formatValue(tgt)}, got ${formatValue(cur)}`);
      }
    }
    plan.push({ collection: op.collection, id: op.id, slug: op.expectedSlug, description: op.description, filter, setFields, fieldLogs });
  }
  return { plan, errors };
}

function printPlan(plan, label, txInfo) {
  console.log(`\n=== ${label} ===`);
  console.log(`Cluster: db=${txInfo.databaseName}, replicaSet=${txInfo.setName}, nodes=${txInfo.nodes}, wireVersion=${txInfo.maxWireVersion}`);
  let pending = 0, done = 0;
  for (const item of plan) {
    const hasPending = Object.keys(item.setFields).length > 0;
    if (hasPending) pending++; else done++;
    console.log(`\n[${item.collection}] _id=${item.id} | ${item.slug} (${item.description})`);
    for (const f of item.fieldLogs) {
      console.log(`  - ${f.path} [${f.status}]`);
      console.log(`      CURRENT : ${formatValue(f.current)}`);
      console.log(`      TARGET  : ${formatValue(f.target)}`);
    }
  }
  console.log(`\nSummary: ${pending} document(s) to update, ${done} already at target.`);
  console.log("NOTE: Mumbai doctorCard.cardDescription is NOT modified — pending human verification.");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const isApply = args.has("--apply");
  const isRollback = args.has("--rollback");
  if (isApply && isRollback) { console.error("Cannot pass both --apply and --rollback."); process.exit(1); }

  const label = isRollback ? "ROLLBACK (TRANSACTIONAL WRITE)" : isApply ? "APPLY (TRANSACTIONAL WRITE)" : "DRY-RUN (READ-ONLY)";
  const mongoUrl = loadMongoUrl();
  if (!mongoUrl) { console.error("MONGO_URL / MONGODB_URI not found."); process.exit(1); }

  await mongoose.connect(mongoUrl);
  const db = mongoose.connection.db;
  try {
    const txInfo = await verifyTransactionSupport(db);
    const preview = await inspectAndPlan(db, isRollback, null);
    if (preview.errors.length > 0) {
      console.error("\nABORTED — Precondition failures:\n" + preview.errors.map((e) => "  " + e).join("\n"));
      process.exitCode = 1; return;
    }
    printPlan(preview.plan, label, txInfo);

    if (!isApply && !isRollback) { console.log("\nDry-run complete. No writes performed."); return; }
    const toUpdate = preview.plan.filter((p) => Object.keys(p.setFields).length > 0);
    if (toUpdate.length === 0) { console.log("\nAll records already at target (no-op)."); return; }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const txCheck = await inspectAndPlan(db, isRollback, session);
        if (txCheck.errors.length > 0) throw new Error("TX precondition:\n" + txCheck.errors.join("\n"));
        const now = new Date();
        for (const item of txCheck.plan) {
          if (Object.keys(item.setFields).length === 0) continue;
          const res = await db.collection(item.collection).updateOne(item.filter, { $set: { ...item.setFields, updatedAt: now } }, { session });
          if (res.matchedCount !== 1 || res.modifiedCount !== 1) {
            throw new Error(`Optimistic fail: ${item.collection} _id=${item.id} matched=${res.matchedCount} modified=${res.modifiedCount}`);
          }
        }
      });
    } finally { await session.endSession(); }
    console.log(`\n${isRollback ? "Rollback" : "Update"} committed.`);
  } finally { await mongoose.disconnect(); }
}

main().catch((err) => { console.error("\nFATAL (no changes committed):", err); process.exit(1); });
