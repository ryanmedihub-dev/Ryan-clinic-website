import mongoose from "mongoose";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const [k, ...v] = line.trim().split("=");
  if (k && !k.startsWith("#")) process.env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
}

const MONGO = process.env.MONGODB_URI || process.env.MONGO_URL || process.env.DATABASE_URL || process.env.MONGO_URI;
await mongoose.connect(MONGO);

const coll = mongoose.connection.db.collection("surgeonpages");
const jaipur = await coll.findOne({ slug: "hair-transplant-surgeon-in-jaipur" });

function findStringOccurrences(obj, targetStr, path = "") {
  const found = [];
  for (const [k, v] of Object.entries(obj || {})) {
    const p = path ? `${path}.${k}` : k;
    if (typeof v === "string") {
      if (v.toLowerCase().includes(targetStr.toLowerCase())) {
        found.push({ path: p, val: v });
      }
    } else if (typeof v === "object" && v !== null) {
      found.push(...findStringOccurrences(v, targetStr, p));
    }
  }
  return found;
}

console.log("=== OCCURRENCES OF 'Jaipur' IN JAIPUR DOC ===");
const jaipurMatches = findStringOccurrences(jaipur, "Jaipur");
jaipurMatches.forEach((m) => console.log(`[${m.path}]: ${m.val}`));

console.log("\n=== OCCURRENCES OF 'Delhi' IN JAIPUR DOC ===");
const delhiMatches = findStringOccurrences(jaipur, "Delhi");
delhiMatches.forEach((m) => console.log(`[${m.path}]: ${m.val}`));

await mongoose.disconnect();
