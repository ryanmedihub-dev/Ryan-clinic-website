// scripts/fetch-all-surgeon-docs.mjs
// READ-ONLY: Fetches all surgeon documents for localization audit
import mongoose from "mongoose";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Manual env loading (no dotenv dependency)
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
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.MONGO_URL;
if (!MONGO_URI) { console.error("No MONGO_URI/MONGO_URL found"); process.exit(1); }

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const col = db.collection("surgeonpages");

  const docs = await col.find({}).sort({ "general.city": 1 }).toArray();
  console.log(`Total documents: ${docs.length}`);

  // Write full JSON to file for analysis
  const outPath = join(__dirname, "surgeon-full-dump.json");
  writeFileSync(outPath, JSON.stringify(docs, null, 2), "utf8");
  console.log(`Full dump written to: scripts/surgeon-full-dump.json`);

  // ─── Per-doc summary ────────────────────────────────────────────────────────
  for (const doc of docs) {
    const city = doc.general?.city || "N/A";
    const status = doc.settings?.status || "N/A";
    console.log("\n" + "=".repeat(80));
    console.log(`CITY: ${city}  |  SLUG: ${doc.slug}  |  STATUS: ${status}`);
    console.log(`_id: ${doc._id}`);
    console.log(`title: ${doc.title}`);

    // Flatten all strings and look for artifacts
    const artifacts = [];
    function scan(obj, path = "") {
      if (!obj || typeof obj !== "object") return;
      for (const [k, v] of Object.entries(obj)) {
        const p = path ? `${path}.${k}` : k;
        if (typeof v === "string") {
          const lv = v.toLowerCase();
          const malformed = ["new hyderabad","new chennai","new banglore","new bangalore",
            "new mumbai","new pune","new jaipur","new lucknow","new gurgaon","new kolkata",
            "new ahmedabad","new surat","new nagpur","new raipur","new bhopal","new patna",
            "new chandigarh","new indore","new agra","new meerut","new rachi","new ranchi",
            "new kochi","new vadodara","new coimbatore","new visakhapatnam","new vizag",
            "new amritsar","new faridabad","new noida"];
          const hasDelhi = lv.includes("pitampura") || lv.includes("paschim vihar") ||
                           lv.includes("netaji subhash") || lv.includes("rohini") ||
                           (lv.includes("delhi") && city !== "Delhi");
          const hasMalformed = malformed.some(m => lv.includes(m));
          if (hasDelhi || hasMalformed) {
            artifacts.push({ path: p, value: v.substring(0, 300), hasMalformed, hasDelhi });
          }
        } else if (Array.isArray(v)) {
          v.forEach((item, i) => scan(item, `${p}[${i}]`));
        } else if (typeof v === "object") {
          scan(v, p);
        }
      }
    }
    scan(doc);

    if (artifacts.length > 0) {
      console.log(`  ARTIFACTS (${artifacts.length}):`);
      artifacts.forEach(a => {
        const tag = a.hasMalformed ? "[MALFORMED]" : "[DELHI-LEAK]";
        console.log(`  ${tag} ${a.path}`);
        console.log(`    VALUE: "${a.value}"`);
      });
    } else {
      console.log("  No artifacts detected.");
    }
  }

  await mongoose.disconnect();
  console.log("\nDone.");
}

main().catch(e => { console.error(e); process.exit(1); });
