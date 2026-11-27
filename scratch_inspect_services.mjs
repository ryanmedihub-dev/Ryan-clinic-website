import mongoose from "mongoose";
import { readFileSync } from "fs";

const envFile = readFileSync(".env.local", "utf8");
const env = {};
for (const line of envFile.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx < 0) continue;
  env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
}

const MONGO_URL = env.MONGODB_URI || env.MONGO_URL;
await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

// Sample one service doc to get keys
const sample = await db.collection("services").findOne({});
console.log("SERVICE KEYS:", Object.keys(sample || {}));

// Get all services
const services = await db.collection("services").find({}, {
  projection: { _id: 1, assignedDoctor: 1, slug: 1, pageName: 1, city: 1 }
}).toArray();

// Get all doctors
const doctors = await db.collection("doctors").find({}, {
  projection: { _id: 1, slug: 1, "basicInfo.doctorName": 1, "basicInfo.rating": 1 }
}).toArray();

const docMap = {};
doctors.forEach(d => { docMap[d._id.toString()] = d; });

console.log("\n=== SERVICE → DOCTOR MAPPING ===");
services.forEach(s => {
  const docId = s.assignedDoctor?.toString();
  const doc = docMap[docId];
  const docInfo = doc ? `${doc.slug} (${doc.basicInfo?.doctorName})` : "NONE";
  console.log(`${s._id} | ${s.slug || s.pageName || "(no slug)"} | ${docInfo}`);
});

// Count ratings
const ratingsCount = {};
doctors.forEach(d => {
  const r = d.basicInfo?.rating;
  ratingsCount[r] = (ratingsCount[r] || 0) + 1;
});
console.log("\n=== DOCTOR RATING COUNTS ===", ratingsCount);

await mongoose.disconnect();
