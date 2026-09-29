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

console.log("Delhi keys:", Object.keys(delhi));

await mongoose.disconnect();
