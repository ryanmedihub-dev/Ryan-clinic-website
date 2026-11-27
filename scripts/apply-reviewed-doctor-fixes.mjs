/**
 * scripts/apply-reviewed-doctor-fixes.mjs
 *
 * Scoped, transaction-safe, idempotent database update script for:
 *   1. Mumbai doctor (hair-transplant-doctor-in-mumbai) doctorCard.cardDescription:
 *      LEFT PENDING — existing record has keyFacts.registration="Verification pending",
 *      medicalReviewer.isVerified=false, and cloned Delhi template credentials/metrics
 *      in doctorCard. No bio mutation will be applied until verified/approved copy exists.
 *   2. Updating displayed Google/Patient rating values from 4.9 -> 4.7 across:
 *      - 12 active, published Doctor records (basicInfo.rating)
 *        (Excludes 2 soft-deleted/inactive doctor records: dr-pranendra-singh and
 *        hair-transplant-doctor-in-gurgaon-copy.)
 *      - 1 SurgeryPage record (hair-transplant-surgery-in-mumbai)
 *      - 1 HairFallPage record (hair-fall-loss-treatment-in-delhi)
 *      - 1 SurgeonPage record (hair-transplant-surgeon-in-mumbai)
 *      (0 CostPage records contain 4.9 ratings.)
 *   3. Updating Gurgaon branch service (hair-transplant-in-gurgaon) assignedDoctor
 *      (ObjectId ref -> Doctor) from demo-doctor-gurgaon (6abf79b13572e74794c59ce4)
 *      to hair-transplant-doctor-in-gurgaon (6aa0fda669bae9798c18c074).
 *
 * Usage:
 *   node scripts/apply-reviewed-doctor-fixes.mjs            # Dry-run (read-only preview)
 *   node scripts/apply-reviewed-doctor-fixes.mjs --apply    # Execute inside a MongoDB transaction
 *   node scripts/apply-reviewed-doctor-fixes.mjs --rollback # Revert applied changes inside a transaction
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadMongoUrl() {
  if (process.env.MONGODB_URI || process.env.MONGO_URL) {
    return process.env.MONGODB_URI || process.env.MONGO_URL;
  }
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) return null;
  const content = fs.readFileSync(envPath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx < 0) continue;
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "MONGODB_URI" || key === "MONGO_URL") {
      return val;
    }
  }
  return null;
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

function isObjectIdLike(v) {
  return (
    v instanceof mongoose.Types.ObjectId ||
    /^objectid$/i.test(String(v?._bsontype || ""))
  );
}

function isEqualValue(a, b) {
  if (isObjectIdLike(a) && isObjectIdLike(b)) {
    return String(a) === String(b);
  }
  return Object.is(a, b);
}

function formatValue(v) {
  if (isObjectIdLike(v)) {
    return `ObjectId("${String(v)}")`;
  }
  return JSON.stringify(v);
}

const DEMO_GURGAON_DOCTOR_ID = new mongoose.Types.ObjectId("6abf79b13572e74794c59ce4");
const REAL_GURGAON_DOCTOR_ID = new mongoose.Types.ObjectId("6aa0fda669bae9798c18c074");

// 12 active, published doctor records (soft-deleted/inactive records intentionally excluded)
const ACTIVE_DOCTORS_FOR_RATING = [
  { id: "6a71a2b929d7e7beb5f7f813", slug: "hair-transplant-doctor-in-delhi", note: "active published" },
  { id: "6a8e969f322f85061ac1aa0d", slug: "hair-transplant-doctor-in-mumbai", note: "active published (bio update pending verification)" },
  { id: "6a8e969f322f85061ac1aa0e", slug: "hair-transplant-doctor-in-hyderabad", note: "active published" },
  { id: "6a8e969f322f85061ac1aa0f", slug: "hair-transplant-doctor-in-pune", note: "active published" },
  { id: "6a8e969f322f85061ac1aa10", slug: "hair-transplant-doctor-in-patna", note: "active published" },
  { id: "6a8e969f322f85061ac1aa11", slug: "hair-transplant-doctor-in-kolkata", note: "active published" },
  { id: "6a8e969f322f85061ac1aa12", slug: "hair-transplant-doctor-in-jammu", note: "active published" },
  { id: "6a8e969f322f85061ac1aa13", slug: "hair-transplant-doctor-in-ahmedabad", note: "active published" },
  { id: "6a8e969f322f85061ac1aa14", slug: "hair-transplant-doctor-in-chennai", note: "active published" },
  { id: "6a8e969f322f85061ac1aa15", slug: "hair-transplant-doctor-in-lucknow", note: "active published" },
  { id: "6a8e96a0322f85061ac1aa16", slug: "hair-transplant-doctor-in-bangalore", note: "active published" },
  { id: "6aa0fda669bae9798c18c074", slug: "hair-transplant-doctor-in-gurgaon", note: "active published" },
];

const PENDING_MANUAL_ITEMS = [
  "doctors _id=6a8e969f322f85061ac1aa0d (hair-transplant-doctor-in-mumbai): doctorCard.cardDescription still holds Dr. Pranendra Singh's bio, but Mumbai bio update is intentionally left PENDING until Dr. Harshada Vijay Rakh's verified/approved bio and registration details are confirmed (currently keyFacts.registration='Verification pending', medicalReviewer.isVerified=false).",
];

const OPERATIONS = [
  // Fix 2: Active published doctors (rating 4.9 -> 4.7)
  // NOTE: Fix 1 (Mumbai doctorCard.cardDescription) is intentionally omitted/pending verification.
  ...ACTIVE_DOCTORS_FOR_RATING.map((doc) => ({
    collection: "doctors",
    id: doc.id,
    slugField: "slug",
    expectedSlug: doc.slug,
    description: `Doctor (${doc.note})`,
    extraGuards: {
      status: "published",
      isActive: true,
      deletedAt: null,
    },
    changes: [
      {
        path: "basicInfo.rating",
        before: 4.9,
        after: 4.7,
      },
    ],
  })),

  // Fix 2: SurgeryPage (Mumbai)
  {
    collection: "surgerypages",
    id: "6a7566162aca9fd3ecaf4927",
    slugField: "slug",
    expectedSlug: "hair-transplant-surgery-in-mumbai",
    description: "SurgeryPage (Mumbai)",
    extraGuards: {
      "introduction.bottomStats.2.label": "Patient Rating in Mumbai",
    },
    changes: [
      {
        path: "introduction.bottomStats.2.value",
        before: "4.9/5",
        after: "4.7/5",
      },
    ],
  },

  // Fix 2: HairFallPage (Delhi)
  {
    collection: "hairfallpages",
    id: "6a686fbf9cdb9e4a11663db9",
    slugField: "slug",
    expectedSlug: "hair-fall-loss-treatment-in-delhi",
    description: "HairFallPage (Delhi)",
    extraGuards: {
      "hero.stats.2.label": "Google Rating",
      "consultation.statsRow.3.label": "Reviews",
    },
    changes: [
      {
        path: "hero.stats.2.value",
        before: "4.9★",
        after: "4.7★",
      },
      {
        path: "consultation.statsRow.3.value",
        before: "4.9 ★",
        after: "4.7 ★",
      },
    ],
  },

  // Fix 2: SurgeonPage (Mumbai)
  {
    collection: "surgeonpages",
    id: "6a68a1fe3ef2080fa131f396",
    slugField: "slug",
    expectedSlug: "hair-transplant-surgeon-in-mumbai",
    description: "SurgeonPage (Mumbai)",
    extraGuards: {
      "hero.stats.3.label": "Google Rating",
      "leadSurgeon.stats.3.label": "Google Rating",
    },
    changes: [
      {
        path: "hero.stats.3.value",
        before: "4.9★",
        after: "4.7★",
      },
      {
        path: "leadSurgeon.stats.3.value",
        before: "4.9★",
        after: "4.7★",
      },
    ],
  },

  // Fix 3: Gurgaon Service assignedDoctor
  {
    collection: "services",
    id: "6aa0f1a894bf6cf81ca1c722",
    slugField: "metadata.pageurl",
    expectedSlug: "hair-transplant-in-gurgaon",
    description: "Branch Service (Gurgaon)",
    extraGuards: {
      "meetYourSurgeon.enabled": true,
    },
    changes: [
      {
        path: "assignedDoctor",
        before: DEMO_GURGAON_DOCTOR_ID,
        after: REAL_GURGAON_DOCTOR_ID,
      },
    ],
  },
];

async function verifyTransactionSupport(db) {
  const hello = await db.command({ hello: 1 });
  const hasReplicaSet = Boolean(hello.setName);
  const isPrimary = Boolean(hello.isWritablePrimary);
  const hasSessions = Number(hello.logicalSessionTimeoutMinutes) > 0;

  if (!hasReplicaSet || !isPrimary || !hasSessions) {
    throw new Error(
      `MongoDB deployment does not satisfy replica-set transaction requirements (setName=${hello.setName}, isWritablePrimary=${hello.isWritablePrimary}, logicalSessionTimeoutMinutes=${hello.logicalSessionTimeoutMinutes}).`
    );
  }

  return {
    setName: hello.setName,
    hostsCount: Array.isArray(hello.hosts) ? hello.hosts.length : 0,
    maxWireVersion: hello.maxWireVersion,
    logicalSessionTimeoutMinutes: hello.logicalSessionTimeoutMinutes,
  };
}

async function verifyGurgaonDoctorReferences(db, session = undefined) {
  const opts = session ? { session } : {};
  const [gurgaonDoc, demoDoc] = await Promise.all([
    db.collection("doctors").findOne({ _id: REAL_GURGAON_DOCTOR_ID }, opts),
    db.collection("doctors").findOne({ _id: DEMO_GURGAON_DOCTOR_ID }, opts),
  ]);

  if (!gurgaonDoc) {
    throw new Error(`Precondition failed: target Gurgaon doctor ${REAL_GURGAON_DOCTOR_ID} is missing.`);
  }
  if (gurgaonDoc.slug !== "hair-transplant-doctor-in-gurgaon") {
    throw new Error(
      `Precondition failed: target Gurgaon doctor slug mismatch (${gurgaonDoc.slug}).`
    );
  }
  if (gurgaonDoc.status !== "published" || gurgaonDoc.deletedAt !== null || gurgaonDoc.isActive !== true) {
    throw new Error(
      `Precondition failed: target Gurgaon doctor is not active/published (status=${gurgaonDoc.status}, deletedAt=${gurgaonDoc.deletedAt}, isActive=${gurgaonDoc.isActive}).`
    );
  }
  if (!demoDoc || demoDoc.slug !== "demo-doctor-gurgaon") {
    throw new Error(
      `Precondition failed: previous demo Gurgaon doctor ${DEMO_GURGAON_DOCTOR_ID} missing or slug mismatch (${demoDoc?.slug}).`
    );
  }
}

async function inspectAndPlan(db, isRollback, session = undefined) {
  await verifyGurgaonDoctorReferences(db, session);

  const plan = [];
  const errors = [];

  for (const op of OPERATIONS) {
    const objectId = new mongoose.Types.ObjectId(op.id);
    const doc = await db.collection(op.collection).findOne(
      { _id: objectId },
      session ? { session } : {}
    );

    if (!doc) {
      errors.push(`[MISSING] ${op.collection} _id=${op.id} (${op.expectedSlug}) not found.`);
      continue;
    }

    const actualSlug = getByPath(doc, op.slugField);
    if (actualSlug !== op.expectedSlug) {
      errors.push(
        `[SLUG_MISMATCH] ${op.collection} _id=${op.id}: expected ${op.slugField}=${formatValue(op.expectedSlug)}, got ${formatValue(actualSlug)}.`
      );
      continue;
    }

    for (const [guardPath, guardVal] of Object.entries(op.extraGuards)) {
      const actualGuard = getByPath(doc, guardPath);
      if (!isEqualValue(actualGuard, guardVal)) {
        errors.push(
          `[GUARD_MISMATCH] ${op.collection} _id=${op.id} (${op.expectedSlug}) ${guardPath}: expected ${formatValue(guardVal)}, got ${formatValue(actualGuard)}.`
        );
      }
    }

    const setFields = {};
    const expectedFilterFields = {
      _id: objectId,
      [op.slugField]: op.expectedSlug,
      ...op.extraGuards,
    };
    const fieldLogs = [];

    for (const ch of op.changes) {
      const sourceVal = isRollback ? ch.after : ch.before;
      const targetVal = isRollback ? ch.before : ch.after;
      const currentVal = getByPath(doc, ch.path);

      if (isObjectIdLike(targetVal) && !isObjectIdLike(currentVal)) {
        errors.push(
          `[TYPE_MISMATCH] ${op.collection} _id=${op.id} (${op.expectedSlug}) ${ch.path}: expected BSON ObjectId, got ${typeof currentVal} (${formatValue(currentVal)}).`
        );
        continue;
      }

      if (isEqualValue(currentVal, targetVal)) {
        fieldLogs.push({
          path: ch.path,
          status: "ALREADY_AT_TARGET",
          current: currentVal,
          target: targetVal,
        });
      } else if (isEqualValue(currentVal, sourceVal)) {
        setFields[ch.path] = targetVal;
        expectedFilterFields[ch.path] = sourceVal;
        fieldLogs.push({
          path: ch.path,
          status: "PENDING_UPDATE",
          current: currentVal,
          target: targetVal,
        });
      } else {
        errors.push(
          `[VALUE_MISMATCH] ${op.collection} _id=${op.id} (${op.expectedSlug}) ${ch.path}: expected ${formatValue(sourceVal)} (or already ${formatValue(targetVal)}), got ${formatValue(currentVal)}.`
        );
      }
    }

    plan.push({
      collection: op.collection,
      id: op.id,
      slug: op.expectedSlug,
      description: op.description,
      filter: expectedFilterFields,
      setFields,
      fieldLogs,
    });
  }

  return { plan, errors };
}

function printPlan(plan, modeLabel, txInfo) {
  console.log(`\n=== ${modeLabel} ===`);
  console.log(
    `MongoDB deployment: replicaSet=${txInfo.setName}, nodes=${txInfo.hostsCount}, maxWireVersion=${txInfo.maxWireVersion}, sessionTimeoutMin=${txInfo.logicalSessionTimeoutMinutes}`
  );

  let pendingDocs = 0;
  let alreadyDoneDocs = 0;

  for (const item of plan) {
    const hasPending = Object.keys(item.setFields).length > 0;
    if (hasPending) pendingDocs++;
    else alreadyDoneDocs++;

    console.log(`\n[${item.collection}] _id=${item.id} | ${item.slug} (${item.description})`);
    for (const f of item.fieldLogs) {
      console.log(`  - ${f.path} [${f.status}]`);
      console.log(`      CURRENT : ${formatValue(f.current)}`);
      console.log(`      TARGET  : ${formatValue(f.target)}`);
    }
  }

  console.log(`\nSummary: ${pendingDocs} document(s) to update, ${alreadyDoneDocs} document(s) already at target.`);
  if (PENDING_MANUAL_ITEMS.length > 0) {
    console.log("\nPending Manual Verification (NOT modified by this script):");
    for (const note of PENDING_MANUAL_ITEMS) {
      console.log(`  - ${note}`);
    }
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const isApply = args.has("--apply");
  const isRollback = args.has("--rollback");

  if (isApply && isRollback) {
    console.error("Cannot pass both --apply and --rollback.");
    process.exit(1);
  }

  const modeLabel = isRollback
    ? "ROLLBACK (TRANSACTIONAL WRITE)"
    : isApply
      ? "APPLY (TRANSACTIONAL WRITE)"
      : "DRY-RUN (READ-ONLY PREVIEW)";

  const mongoUrl = loadMongoUrl();
  if (!mongoUrl) {
    console.error("MONGODB_URI or MONGO_URL not found in environment or .env.local.");
    process.exit(1);
  }

  await mongoose.connect(mongoUrl);
  const db = mongoose.connection.db;

  try {
    const txInfo = await verifyTransactionSupport(db);
    const preview = await inspectAndPlan(db, isRollback);
    if (preview.errors.length > 0) {
      console.error("\nABORTED — Precondition checks failed:");
      for (const err of preview.errors) console.error("  " + err);
      process.exitCode = 1;
      return;
    }

    printPlan(preview.plan, modeLabel, txInfo);

    const toUpdate = preview.plan.filter((p) => Object.keys(p.setFields).length > 0);
    if (!isApply && !isRollback) {
      console.log("\nDry-run complete. No database writes were performed.");
      return;
    }

    if (toUpdate.length === 0) {
      console.log("\nAll target records are already at target state (idempotent no-op).");
      return;
    }

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const txCheck = await inspectAndPlan(db, isRollback, session);
        if (txCheck.errors.length > 0) {
          throw new Error("Transaction precondition failed:\n" + txCheck.errors.join("\n"));
        }

        const now = new Date();
        for (const item of txCheck.plan) {
          if (Object.keys(item.setFields).length === 0) continue;
          const res = await db.collection(item.collection).updateOne(
            item.filter,
            {
              $set: {
                ...item.setFields,
                updatedAt: now,
              },
            },
            { session }
          );
          if (res.matchedCount !== 1 || res.modifiedCount !== 1) {
            throw new Error(
              `Optimistic update failed for ${item.collection} _id=${item.id}: matched=${res.matchedCount}, modified=${res.modifiedCount}`
            );
          }
        }
      });
    } finally {
      await session.endSession();
    }

    console.log(`\n${isRollback ? "Rollback" : "Update"} transaction committed successfully.`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error("\nFATAL ERROR (no changes committed):", err);
  process.exit(1);
});
