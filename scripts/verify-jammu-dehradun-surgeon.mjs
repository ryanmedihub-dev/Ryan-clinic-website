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
  } catch (e) {
    console.error("Could not load .env.local:", e.message);
  }
}

loadEnv();

const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URL ||
  process.env.DATABASE_URL ||
  process.env.MONGO_URI;

await mongoose.connect(MONGO_URI);
const coll = mongoose.connection.db.collection("surgeonpages");

const delhi = await coll.findOne({ slug: "hair-transplant-surgeon-in-delhi" });

const targets = [
  { city: "Jammu", slug: "hair-transplant-surgeon-in-jammu" },
  { city: "Dehradun", slug: "hair-transplant-surgeon-in-dehradun" },
];

console.log("=====================================================================");
console.log("POST-CREATION DIRECT MONGODB VERIFICATION: JAMMU & DEHRADUN");
console.log("=====================================================================\n");

let allPassed = true;

for (const t of targets) {
  const doc = await coll.findOne({ slug: t.slug });
  console.log(`Checking [${t.city}] (slug: ${t.slug}):`);

  if (!doc) {
    console.error(`  ✗ FAIL: Document NOT FOUND in database!`);
    allPassed = false;
    continue;
  }

  const jsonStr = JSON.stringify(doc);

  const checks = [
    { label: "_id exists", pass: !!doc._id, val: doc._id?.toString() },
    { label: "title correct", pass: doc.title === `Best Hair Transplant Surgeon in ${t.city}`, val: doc.title },
    { label: "slug correct", pass: doc.slug === t.slug, val: doc.slug },
    { label: "general.city correct", pass: doc.general?.city === t.city, val: doc.general?.city },
    { label: "settings.status = draft", pass: doc.settings?.status === "draft", val: doc.settings?.status },
    { label: "general.status = draft", pass: doc.general?.status === "draft", val: doc.general?.status },
    { label: "settings.isDeleted != true", pass: doc.settings?.isDeleted === false, val: doc.settings?.isDeleted },
    { label: "settings.showInSitemap = false", pass: doc.settings?.showInSitemap === false, val: doc.settings?.showInSitemap },
    { label: "settings.allowIndexing = false", pass: doc.settings?.allowIndexing === false, val: doc.settings?.allowIndexing },
    { label: "createdAt exists", pass: !!doc.createdAt && doc.createdAt !== null, val: doc.createdAt },
    { label: "updatedAt exists", pass: !!doc.updatedAt && doc.updatedAt !== null, val: doc.updatedAt },
    { label: "canonical correct for /surgeon/ route", pass: doc.seo?.canonical === `https://www.clinicryan.com/surgeon/${t.slug}`, val: doc.seo?.canonical },
    { label: `no malformed "New ${t.city}" text`, pass: !jsonStr.includes(`New ${t.city}`) && !jsonStr.includes(`new ${t.city.toLowerCase()}`), val: "clean" },
    { label: "no invented branch address (verified Pitampura preserved)", pass: doc.visitSurgeon?.address === "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034", val: doc.visitSurgeon?.address },
    { label: "verified nearest metro preserved", pass: doc.visitSurgeon?.nearestMetro === "Pitampura Metro Station (Red Line)", val: doc.visitSurgeon?.nearestMetro },
    { label: "whyClinic.description verified", pass: doc.whyClinic?.description === "Located in New Delhi (Pitampura), our clinic features sterile HEPA-filtered operating theaters.", val: doc.whyClinic?.description },
    { label: "FAQ 12 address verified", pass: doc.faq?.faqs?.[12]?.answer?.includes("New Delhi – 110034") && doc.faq?.faqs?.[12]?.answer?.includes("Pitampura centre"), val: doc.faq?.faqs?.[12]?.answer },
    { label: "surgeon credentials preserved from Delhi template", pass: doc.leadSurgeon?.title === delhi.leadSurgeon?.title && doc.leadSurgeon?.credentials === delhi.leadSurgeon?.credentials, val: doc.leadSurgeon?.title },
  ];

  for (const c of checks) {
    if (!c.pass) allPassed = false;
    console.log(`  ${c.pass ? "✓ PASS" : "✗ FAIL"} | ${c.label} (Value: ${c.val})`);
  }
  console.log();
}

console.log("=====================================================================");
console.log(`OVERALL DATABASE VERIFICATION RESULT: ${allPassed ? "✓ ALL CHECKS PASSED (100%)" : "✗ SOME CHECKS FAILED"}`);
console.log("=====================================================================\n");

await mongoose.disconnect();
process.exit(allPassed ? 0 : 1);
