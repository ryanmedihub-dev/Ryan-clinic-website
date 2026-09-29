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
const docs = await coll.find({}, { projection: { slug: 1, title: 1, "general.city": 1, "settings.status": 1 } }).toArray();

console.log("Total surgeon documents in DB:", docs.length);
docs.forEach((d, i) => {
  console.log(`${i + 1}. [${d.settings?.status || "NO_STATUS"}] City: ${d.general?.city} | Slug: ${d.slug} | ID: ${d._id}`);
});

await mongoose.disconnect();
