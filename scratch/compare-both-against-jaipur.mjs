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
const jammu = await coll.findOne({ slug: "hair-transplant-surgeon-in-jammu" });
const dehradun = await coll.findOne({ slug: "hair-transplant-surgeon-in-dehradun" });
const jaipur = await coll.findOne({ slug: "hair-transplant-surgeon-in-jaipur" });

function findDifferences(obj1, obj2, city1, city2, path = "") {
  const diffs = [];
  const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
  for (const k of keys) {
    if (["_id", "__v", "createdAt", "updatedAt"].includes(k)) continue;
    const p = path ? `${path}.${k}` : k;
    let v1 = obj1 ? obj1[k] : undefined;
    let v2 = obj2 ? obj2[k] : undefined;

    let s1 = JSON.stringify(v1);
    let s2 = JSON.stringify(v2);
    if (s1) {
      s1 = s1.replaceAll(city1, "CITY").replaceAll(city1.toLowerCase(), "city");
    }
    if (s2) {
      s2 = s2.replaceAll(city2, "CITY").replaceAll(city2.toLowerCase(), "city");
    }

    if (s1 !== s2) {
      diffs.push({ path: p, v1: JSON.stringify(v1), v2: JSON.stringify(v2) });
    }
  }
  return diffs;
}

const diffsJammu = findDifferences(jammu, jaipur, "Jammu", "Jaipur");
console.log("Differences Jammu vs Jaipur (normalized city):", diffsJammu.length);
diffsJammu.forEach(d => console.log("  Diff:", d.path));

const diffsDehradun = findDifferences(dehradun, jaipur, "Dehradun", "Jaipur");
console.log("Differences Dehradun vs Jaipur (normalized city):", diffsDehradun.length);
diffsDehradun.forEach(d => console.log("  Diff:", d.path));

await mongoose.disconnect();
