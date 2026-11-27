/**
 * scripts/fix-gurgaon-service.mjs
 *
 * SCOPE: Single targeted update — Gurgaon branch service assignedDoctor pointer:
 *   services _id=6aa0f1a894bf6cf81ca1c722 (hair-transplant-in-gurgaon)
 *   assignedDoctor: ObjectId("6abf79b13572e74794c59ce4")  [demo-doctor-gurgaon]
 *                → ObjectId("6aa0fda669bae9798c18c074")  [hair-transplant-doctor-in-gurgaon]
 *
 * EXCLUDES: All rating field updates (see fix-ratings.mjs)
 *
 * Pre-flight checks:
 *   - Target doctor exists, slug matches, status=published, isActive=true, deletedAt=null
 *   - Current assignedDoctor on the service IS still the demo ObjectId
 *   - meetYourSurgeon.enabled is still true
 *
 * Usage:
 *   node scripts/fix-gurgaon-service.mjs            # Dry-run
 *   node scripts/fix-gurgaon-service.mjs --apply    # Execute inside a MongoDB transaction
 *   node scripts/fix-gurgaon-service.mjs --rollback # Revert
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

function isObjectIdLike(v) {
  return v instanceof mongoose.Types.ObjectId || /^objectid$/i.test(String(v?._bsontype || ""));
}

function oidStr(v) { return String(v); }

const SERVICE_ID   = new mongoose.Types.ObjectId("6aa0f1a894bf6cf81ca1c722");
const SERVICE_SLUG = "hair-transplant-in-gurgaon";
const DEMO_DOCTOR  = new mongoose.Types.ObjectId("6abf79b13572e74794c59ce4");  // demo-doctor-gurgaon
const REAL_DOCTOR  = new mongoose.Types.ObjectId("6aa0fda669bae9798c18c074");  // hair-transplant-doctor-in-gurgaon

async function verifyTransactionSupport(db) {
  if (db.databaseName !== EXPECTED_DB_NAME) {
    throw new Error(`Unexpected databaseName="${db.databaseName}" (expected "${EXPECTED_DB_NAME}"). Aborting.`);
  }
  const hello = await db.command({ hello: 1 });
  if (hello.setName !== EXPECTED_SET_NAME) {
    throw new Error(`Unexpected replicaSet setName="${hello.setName}" (expected "${EXPECTED_SET_NAME}"). Aborting.`);
  }
  if (!hello.setName || !hello.isWritablePrimary || !hello.logicalSessionTimeoutMinutes) {
    throw new Error(`MongoDB does not support transactions here (setName=${hello.setName}).`);
  }
  return { databaseName: db.databaseName, setName: hello.setName, nodes: (hello.hosts || []).length, maxWireVersion: hello.maxWireVersion };
}

async function verifyRealDoctor(db, session) {
  const opts = session ? { session } : {};
  const [doc, demoDoc] = await Promise.all([
    db.collection("doctors").findOne({ _id: REAL_DOCTOR }, opts),
    db.collection("doctors").findOne({ _id: DEMO_DOCTOR }, opts),
  ]);
  if (!doc) throw new Error(`Precondition: target doctor ${REAL_DOCTOR} not found.`);
  if (doc.slug !== "hair-transplant-doctor-in-gurgaon") throw new Error(`Precondition: target doctor slug mismatch (${doc.slug}).`);
  if (doc.status !== "published" || doc.deletedAt !== null || doc.isActive !== true) {
    throw new Error(`Precondition: target doctor not active/published (status=${doc.status}, deletedAt=${doc.deletedAt}, isActive=${doc.isActive}).`);
  }
  if (!demoDoc || demoDoc.slug !== "demo-doctor-gurgaon") {
    throw new Error(`Precondition: demo doctor ${DEMO_DOCTOR} missing or slug mismatch (${demoDoc?.slug}).`);
  }
  return doc;
}

async function inspectAndPlan(db, isRollback, session) {
  const opts = session ? { session } : {};
  const errors = [];

  await verifyRealDoctor(db, session);

  const svc = await db.collection("services").findOne({ _id: SERVICE_ID }, opts);
  if (!svc) { errors.push(`[MISSING] services _id=${SERVICE_ID}`); return { plan: null, errors }; }

  const actualSlug = svc.metadata?.pageurl;
  if (actualSlug !== SERVICE_SLUG) {
    errors.push(`[SLUG_MISMATCH] services metadata.pageurl: expected "${SERVICE_SLUG}", got "${actualSlug}"`);
  }
  if (svc.meetYourSurgeon?.enabled !== true) {
    errors.push(`[GUARD_MISMATCH] services meetYourSurgeon.enabled: expected true, got ${svc.meetYourSurgeon?.enabled}`);
  }

  const currentDoctor = svc.assignedDoctor;
  if (!isObjectIdLike(currentDoctor)) {
    errors.push(`[TYPE_ERROR] services.assignedDoctor is not an ObjectId: type=${typeof currentDoctor}, value=${JSON.stringify(currentDoctor)}`);
    return { plan: null, errors };
  }

  const srcId = isRollback ? REAL_DOCTOR : DEMO_DOCTOR;
  const tgtId = isRollback ? DEMO_DOCTOR : REAL_DOCTOR;
  const curStr = oidStr(currentDoctor);

  let status;
  let setFields = null;
  if (curStr === oidStr(tgtId)) {
    status = "ALREADY_AT_TARGET";
  } else if (curStr === oidStr(srcId)) {
    status = "PENDING_UPDATE";
    setFields = { assignedDoctor: tgtId };
  } else {
    errors.push(`[VALUE_MISMATCH] services.assignedDoctor: expected ObjectId("${oidStr(srcId)}") or already ObjectId("${oidStr(tgtId)}"), got ObjectId("${curStr}")`);
  }

  const plan = {
    collection: "services",
    id: String(SERVICE_ID),
    slug: SERVICE_SLUG,
    description: "Gurgaon branch service — assignedDoctor",
    filter: {
      _id: SERVICE_ID,
      "metadata.pageurl": SERVICE_SLUG,
      assignedDoctor: srcId,
      "meetYourSurgeon.enabled": true,
    },
    setFields,
    fieldLog: { path: "assignedDoctor", status, current: `ObjectId("${curStr}")`, target: `ObjectId("${oidStr(tgtId)}")` },
  };
  return { plan, errors };
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
    const { plan } = preview;

    console.log(`\n=== ${label} ===`);
    console.log(`Cluster: db=${txInfo.databaseName}, replicaSet=${txInfo.setName}, nodes=${txInfo.nodes}, wireVersion=${txInfo.maxWireVersion}`);
    console.log(`\n[services] _id=${plan.id} | ${plan.slug} (${plan.description})`);
    console.log(`  - ${plan.fieldLog.path} [${plan.fieldLog.status}]`);
    console.log(`      CURRENT : ${plan.fieldLog.current}`);
    console.log(`      TARGET  : ${plan.fieldLog.target}`);
    console.log(`\nTarget doctor (${oidStr(REAL_DOCTOR)}): slug=hair-transplant-doctor-in-gurgaon, status=published, isActive=true, deletedAt=null`);

    if (!isApply && !isRollback) { console.log("\nDry-run complete. No writes performed."); return; }
    if (!plan.setFields) { console.log("\nAlready at target — no-op."); return; }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const txCheck = await inspectAndPlan(db, isRollback, session);
        if (txCheck.errors.length > 0) throw new Error("TX precondition:\n" + txCheck.errors.join("\n"));
        if (!txCheck.plan.setFields) return; // idempotent
        const now = new Date();
        const res = await db.collection("services").updateOne(
          txCheck.plan.filter,
          { $set: { ...txCheck.plan.setFields, updatedAt: now } },
          { session }
        );
        if (res.matchedCount !== 1 || res.modifiedCount !== 1) {
          throw new Error(`Optimistic fail: matched=${res.matchedCount} modified=${res.modifiedCount}`);
        }
      });
    } finally { await session.endSession(); }
    console.log(`\n${isRollback ? "Rollback" : "Update"} committed.`);
  } finally { await mongoose.disconnect(); }
}

main().catch((err) => { console.error("\nFATAL (no changes committed):", err); process.exit(1); });
