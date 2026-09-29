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
const delhi = await coll.findOne({ slug: "hair-transplant-surgeon-in-delhi" });
const jaipur = await coll.findOne({ slug: "hair-transplant-surgeon-in-jaipur" });

function findDifferences(obj1, obj2, path = "") {
  const diffs = [];
  const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
  for (const k of keys) {
    if (["_id", "__v", "createdAt", "updatedAt"].includes(k)) continue;
    const p = path ? `${path}.${k}` : k;
    const v1 = obj1 ? obj1[k] : undefined;
    const v2 = obj2 ? obj2[k] : undefined;
    if (typeof v1 === "object" && v1 !== null && typeof v2 === "object" && v2 !== null && !Array.isArray(v1) && !Array.isArray(v2)) {
      diffs.push(...findDifferences(v1, v2, p));
    } else {
      const s1 = JSON.stringify(v1);
      const s2 = JSON.stringify(v2);
      if (s1 !== s2) {
        diffs.push({ path: p, delhi: s1, jaipur: s2 });
      }
    }
  }
  return diffs;
}

const diffs = findDifferences(delhi, jaipur);
for (const d of diffs.slice(30, 36)) {
  console.log(`\n=== [${d.path}] ===`);
  console.log(`Delhi : ${d.delhi}`);
  console.log(`Jaipur: ${d.jaipur}`);
}

await mongoose.disconnect();
