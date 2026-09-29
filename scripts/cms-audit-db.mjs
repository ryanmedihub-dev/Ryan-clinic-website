/**
 * scripts/cms-audit-db2.mjs
 * READ-ONLY database audit — no modifications.
 * Usage: node --env-file=.env.local scripts/cms-audit-db2.mjs
 */
import mongoose from "mongoose";

function safeIso(v) {
  if (!v) return "null";
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

async function auditCollection(db, name) {
  const coll = db.collection(name);
  const total = await coll.countDocuments();
  console.log(`\n=== ${name.toUpperCase()} (total: ${total}) ===`);
  if (total === 0) { console.log("  EMPTY — collection exists but has no documents"); return; }

  const pub1 = await coll.countDocuments({ "settings.status": "published" });
  const pub2 = await coll.countDocuments({ status: "published" });
  const draft1 = await coll.countDocuments({ "settings.status": "draft" });
  const draft2 = await coll.countDocuments({ status: "draft" });
  const del1 = await coll.countDocuments({ "settings.isDeleted": true });
  const del2 = await coll.countDocuments({ isActive: false });
  const del3 = await coll.countDocuments({ deletedAt: { $exists: true, $ne: null } });
  const noSlug = await coll.countDocuments({ $or: [{ slug: null }, { slug: "" }, { slug: { $exists: false } }] });

  const dupSlugs = await coll.aggregate([
    { $match: { slug: { $ne: null, $ne: "" } } },
    { $group: { _id: "$slug", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ]).toArray();

  console.log(`  Published (settings.status): ${pub1}`);
  console.log(`  Published (status field):    ${pub2}`);
  console.log(`  Draft (settings.status):     ${draft1}`);
  console.log(`  Draft (status field):        ${draft2}`);
  console.log(`  Soft-deleted (isDeleted):    ${del1}`);
  console.log(`  Soft-deleted (isActive:false): ${del2}`);
  console.log(`  Soft-deleted (deletedAt set):  ${del3}`);
  console.log(`  Missing slug:                ${noSlug}`);
  console.log(`  Duplicate slugs:`, dupSlugs.length > 0 ? JSON.stringify(dupSlugs) : "NONE");

  const [newest] = await coll.find({}).sort({ createdAt: -1 }).limit(1)
    .project({ slug: 1, title: 1, createdAt: 1 }).toArray();
  const [oldest] = await coll.find({}).sort({ createdAt: 1 }).limit(1)
    .project({ slug: 1, title: 1, createdAt: 1 }).toArray();

  console.log(`  Newest:  ${safeIso(newest?.createdAt)} | ${newest?.slug || newest?.title || "?"}`);
  console.log(`  Oldest:  ${safeIso(oldest?.createdAt)} | ${oldest?.slug || oldest?.title || "?"}`);

  // City distribution — try both schemas
  const byBasicCity = await coll.aggregate([
    { $group: { _id: "$basicInfo.city", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();
  const byGeneralCity = await coll.aggregate([
    { $group: { _id: "$general.city", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();

  const hasBasic = byBasicCity.some(c => c._id);
  const hasGeneral = byGeneralCity.some(c => c._id);
  if (hasBasic) console.log(`  Cities (basicInfo.city):`, byBasicCity.map(c => `${c._id}:${c.count}`).join(", "));
  if (hasGeneral) console.log(`  Cities (general.city):  `, byGeneralCity.map(c => `${c._id}:${c.count}`).join(", "));
}

async function sampleCollection(db, name) {
  const coll = db.collection(name);
  const total = await coll.countDocuments();
  if (total === 0) return;
  console.log(`\n--- SAMPLE: ${name} (latest 10) ---`);
  const docs = await coll.find({}).sort({ createdAt: -1 }).limit(10).project({
    _id: 1, slug: 1, title: 1, createdAt: 1,
    "basicInfo.doctorName": 1, "basicInfo.city": 1,
    "general.city": 1,
    "hero.doctorCard.doctorName": 1,
    status: 1, isActive: 1, deletedAt: 1,
    "settings.status": 1, "settings.isDeleted": 1,
  }).toArray();
  docs.forEach(d => {
    const name2 = d.basicInfo?.doctorName || d.hero?.doctorCard?.doctorName || "—";
    const city = d.basicInfo?.city || d.general?.city || "—";
    const status = d.settings?.status || d.status || "—";
    const deleted = d.settings?.isDeleted || (d.isActive === false) || !!(d.deletedAt);
    const date = safeIso(d.createdAt).split("T")[0];
    console.log(`  ${d._id} | ${String(d.slug || d.title).padEnd(50)} | ${name2.padEnd(25)} | city:${String(city).padEnd(15)} | ${status} | del:${deleted} | ${date}`);
  });
}

async function main() {
  const MONGO = process.env.MONGODB_URI || process.env.MONGO_URL || process.env.MONGODB_URL;
  if (!MONGO) { console.error("No MONGO env"); process.exit(1); }
  await mongoose.connect(MONGO);
  const db = mongoose.connection.db;

  const allColls = await db.listCollections().toArray();
  console.log("ALL COLLECTIONS:", allColls.map(c => c.name).join(", "));
  console.log("");

  // Audit target collections
  for (const name of ["doctors", "surgeons", "surgeonpages"]) {
    const exists = allColls.find(c => c.name === name);
    if (!exists) { console.log(`\n=== ${name.toUpperCase()} === DOES NOT EXIST IN DB`); continue; }
    await auditCollection(db, name);
  }

  // Sample data
  for (const name of ["doctors", "surgeonpages"]) {
    await sampleCollection(db, name);
  }

  // Cross-collection slug overlap
  console.log("\n--- CROSS-COLLECTION DUPLICATE DETECTION ---");
  const dSlugs = (await db.collection("doctors").find({}, { projection: { slug: 1 } }).toArray()).map(d => d.slug).filter(Boolean);
  const spSlugs = (await db.collection("surgeonpages").find({}, { projection: { slug: 1 } }).toArray()).map(d => d.slug).filter(Boolean);
  const overlap = dSlugs.filter(s => spSlugs.includes(s));
  console.log("Slugs in both doctors & surgeonpages:", overlap.length > 0 ? overlap.join(", ") : "NONE");

  // Check for same-city duplicates within doctors
  const docsByCity = await db.collection("doctors").aggregate([
    { $group: { _id: "$basicInfo.city", slugs: { $push: "$slug" }, count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]).toArray();
  console.log("\nDoctor duplicates by city (multiple docs same city):");
  if (docsByCity.length === 0) console.log("  NONE");
  else docsByCity.forEach(g => console.log(`  city:${g._id} -> ${g.slugs.join(", ")}`));

  // Check surgeonpages duplicates by city
  const spByCity = await db.collection("surgeonpages").aggregate([
    { $group: { _id: "$general.city", slugs: { $push: "$slug" }, count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]).toArray();
  console.log("\nSurgeonPage duplicates by city (multiple docs same city):");
  if (spByCity.length === 0) console.log("  NONE");
  else spByCity.forEach(g => console.log(`  city:${g._id} -> ${g.slugs.join(", ")}`));

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
