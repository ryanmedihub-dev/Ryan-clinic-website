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
const jaipur = await coll.findOne({ slug: "hair-transplant-surgeon-in-jaipur" });

for (const key of ["general", "seo", "hero", "whySkill", "benefits", "surgeonRole", "comparison", "leadSurgeon", "bookingChecklist", "procedures", "faq", "settings"]) {
  console.log(`\n=== [${key}] ===`);
  console.log("Jammu keys:", Object.keys(jammu[key] || {}));
  console.log("Jaipur keys:", Object.keys(jaipur[key] || {}));
}

await mongoose.disconnect();
