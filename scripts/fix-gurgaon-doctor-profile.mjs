/**
 * scripts/fix-gurgaon-doctor-profile.mjs
 * ------------------------------------------------------------------
 * SCOPE: Separate guarded cleanup for 5 verified-wrong fields on the
 * Gurgaon doctor document ONLY:
 *   doctors _id=6aa0fda669bae9798c18c074 (hair-transplant-doctor-in-gurgaon)
 *
 * Fields corrected (verified against src/data/branchLocationData.js + seo.canonicalUrl):
 *   1. visitClinic.address.city       : "Pitampura, New Delhi" → "Gurgaon"
 *   2. visitClinic.address.state      : ""                     → "Haryana"
 *   3. visitClinic.address.pincode    : "110034"               → "122001"
 *   4. visitClinic.address.clinicName : ""                     → "Ryan Skin & Hair Transplant Clinic"
 *   5. hero.breadcrumbs.2.url         : "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi"
 *                                     → "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-gurgaon"
 *
 * EXCLUDES (unchanged until clinic confirms authoritative credentials / bio):
 *   - keyFacts.qualifications, keyFacts.registration, keyFacts.memberships
 *   - doctorCard.qualifications, doctorCard.certifications, doctorCard.shortQualification
 *   - credentials.tabs, surgeonProfile.about, doctorCard.cardDescription
 *   - basicInfo.rating (handled separately by scripts/fix-ratings.mjs)
 *
 * Safeguards:
 *   - Replica-set transaction support verification (hello command)
 *   - Re-inspection inside session.withTransaction()
 *   - Optimistic CAS filter matching exact BEFORE values on --apply
 *     and exact AFTER values on --rollback (cannot overwrite subsequent edits)
 *
 * Usage:
 *   node scripts/fix-gurgaon-doctor-profile.mjs            # Dry-run (read-only)
 *   node scripts/fix-gurgaon-doctor-profile.mjs --apply    # Execute inside transaction
 *   node scripts/fix-gurgaon-doctor-profile.mjs --rollback # Revert inside transaction
 * ------------------------------------------------------------------
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

const TARGET_OP = {
  collection: "doctors",
  id: "6aa0fda669bae9798c18c074",
  slugField: "slug",
  expectedSlug: "hair-transplant-doctor-in-gurgaon",
  description: "Gurgaon doctor profile cleanup (visitClinic.address & hero.breadcrumbs[2].url)",
  extraGuards: {
    status: "published",
    isActive: true,
    deletedAt: null,
    "visitClinic.address.address": "Jal Vihar Colony, Sector 46, Gurugram, Haryana 122001",
    "hero.breadcrumbs.0.url": "/",
    "hero.breadcrumbs.1.url": "/doctors",
  },
  changes: [
    {
      path: "visitClinic.address.city",
      before: "Pitampura, New Delhi",
      after: "Gurgaon",
    },
    {
      path: "visitClinic.address.state",
      before: "",
      after: "Haryana",
    },
    {
      path: "visitClinic.address.pincode",
      before: "110034",
      after: "122001",
    },
    {
      path: "visitClinic.address.clinicName",
      before: "",
      after: "Ryan Skin & Hair Transplant Clinic",
    },
    {
      path: "hero.breadcrumbs.2.url",
      before: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
      after: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-gurgaon",
    },
  ],
};

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
  return {
    databaseName: db.databaseName,
    setName: hello.setName,
    nodes: (hello.hosts || []).length,
    maxWireVersion: hello.maxWireVersion,
  };
}

async function inspectAndPlan(db, isRollback, session) {
  const errors = [];
  const oid = new mongoose.Types.ObjectId(TARGET_OP.id);
  const doc = await db.collection(TARGET_OP.collection).findOne(
    { _id: oid },
    session ? { session } : {}
  );

  if (!doc) {
    errors.push(`[MISSING] ${TARGET_OP.collection} _id=${TARGET_OP.id} (${TARGET_OP.expectedSlug})`);
    return { plan: null, errors };
  }

  const actualSlug = getByPath(doc, TARGET_OP.slugField);
  if (actualSlug !== TARGET_OP.expectedSlug) {
    errors.push(
      `[SLUG_MISMATCH] ${TARGET_OP.collection} _id=${TARGET_OP.id}: expected ${TARGET_OP.slugField}=${formatValue(TARGET_OP.expectedSlug)}, got ${formatValue(actualSlug)}`
    );
    return { plan: null, errors };
  }

  for (const [gp, gv] of Object.entries(TARGET_OP.extraGuards)) {
    const ag = getByPath(doc, gp);
    if (!isEqualValue(ag, gv)) {
      errors.push(
        `[GUARD_MISMATCH] ${TARGET_OP.collection} _id=${TARGET_OP.id} (${TARGET_OP.expectedSlug}) ${gp}: expected ${formatValue(gv)}, got ${formatValue(ag)}`
      );
    }
  }

  const setFields = {};
  const filter = {
    _id: oid,
    [TARGET_OP.slugField]: TARGET_OP.expectedSlug,
    ...TARGET_OP.extraGuards,
  };
  const fieldLogs = [];

  for (const ch of TARGET_OP.changes) {
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
      errors.push(
        `[VALUE_MISMATCH] ${TARGET_OP.collection} _id=${TARGET_OP.id} (${TARGET_OP.expectedSlug}) ${ch.path}: expected ${formatValue(src)} or ${formatValue(tgt)}, got ${formatValue(cur)}`
      );
    }
  }

  return {
    plan: {
      collection: TARGET_OP.collection,
      id: TARGET_OP.id,
      slug: TARGET_OP.expectedSlug,
      description: TARGET_OP.description,
      filter,
      setFields,
      fieldLogs,
    },
    errors,
  };
}

function printPlan(plan, label, txInfo) {
  console.log(`\n=== ${label} ===`);
  console.log(`Cluster: db=${txInfo.databaseName}, replicaSet=${txInfo.setName}, nodes=${txInfo.nodes}, wireVersion=${txInfo.maxWireVersion}`);
  const pendingCount = Object.keys(plan.setFields).length;
  console.log(`\n[${plan.collection}] _id=${plan.id} | ${plan.slug} (${plan.description})`);
  for (const f of plan.fieldLogs) {
    console.log(`  - ${f.path} [${f.status}]`);
    console.log(`      CURRENT : ${formatValue(f.current)}`);
    console.log(`      TARGET  : ${formatValue(f.target)}`);
  }
  console.log(`\nSummary: ${pendingCount} field(s) to update on 1 document (${plan.fieldLogs.length - pendingCount} already at target).`);
  console.log("NOTE: Qualification, registration, and bio fields are NOT modified.");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const isApply = args.has("--apply");
  const isRollback = args.has("--rollback");
  if (isApply && isRollback) {
    console.error("Cannot pass both --apply and --rollback.");
    process.exit(1);
  }

  const label = isRollback
    ? "ROLLBACK (TRANSACTIONAL WRITE)"
    : isApply
      ? "APPLY (TRANSACTIONAL WRITE)"
      : "DRY-RUN (READ-ONLY)";

  const mongoUrl = loadMongoUrl();
  if (!mongoUrl) {
    console.error("MONGO_URL / MONGODB_URI not found.");
    process.exit(1);
  }

  await mongoose.connect(mongoUrl);
  const db = mongoose.connection.db;
  try {
    const txInfo = await verifyTransactionSupport(db);
    const preview = await inspectAndPlan(db, isRollback, null);
    if (preview.errors.length > 0) {
      console.error("\nABORTED — Precondition failures:\n" + preview.errors.map((e) => "  " + e).join("\n"));
      process.exitCode = 1;
      return;
    }

    printPlan(preview.plan, label, txInfo);

    if (!isApply && !isRollback) {
      console.log("\nDry-run complete. No writes performed.");
      return;
    }

    if (Object.keys(preview.plan.setFields).length === 0) {
      console.log("\nAll target fields already at target (no-op).");
      return;
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const txCheck = await inspectAndPlan(db, isRollback, session);
        if (txCheck.errors.length > 0) {
          throw new Error("TX precondition:\n" + txCheck.errors.join("\n"));
        }
        if (Object.keys(txCheck.plan.setFields).length === 0) return;

        const now = new Date();
        const res = await db.collection(txCheck.plan.collection).updateOne(
          txCheck.plan.filter,
          { $set: { ...txCheck.plan.setFields, updatedAt: now } },
          { session }
        );
        if (res.matchedCount !== 1 || res.modifiedCount !== 1) {
          throw new Error(
            `Optimistic fail: ${txCheck.plan.collection} _id=${txCheck.plan.id} matched=${res.matchedCount} modified=${res.modifiedCount}`
          );
        }
      });
    } finally {
      await session.endSession();
    }

    console.log(`\n${isRollback ? "Rollback" : "Update"} committed.`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error("\nFATAL (no changes committed):", err);
  process.exit(1);
});
