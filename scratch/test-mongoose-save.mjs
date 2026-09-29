import mongoose from "mongoose";
import { readFileSync } from "fs";
import SurgeonPage from "../src/models/SurgeonPage.js";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const [k, ...v] = line.trim().split("=");
  if (k && !k.startsWith("#")) process.env[k.trim()] = v.join("=").trim().replace(/^["']|["']$/g, "");
}

const MONGO = process.env.MONGODB_URI || process.env.MONGO_URL || process.env.DATABASE_URL || process.env.MONGO_URI;
await mongoose.connect(MONGO);

const testSlug = "test-temp-slug-verification-99999";
// Clean up if already exists
await SurgeonPage.deleteOne({ slug: testSlug });

const testDoc = new SurgeonPage({
  title: "Test Temp Surgeon",
  slug: testSlug,
  spotlightTitle: "Test Spotlight",
  ctaSection: { heading: "Test CTA" },
  general: { city: "TestCity", status: "draft" },
  settings: { status: "draft", isDeleted: false }
}, null, { strict: false });

const saved = await testDoc.save();
console.log("Saved ID:", saved._id);
console.log("Saved createdAt:", saved.createdAt);
console.log("Saved updatedAt:", saved.updatedAt);
console.log("Saved spotlightTitle:", saved.spotlightTitle);
console.log("Saved ctaSection:", saved.ctaSection);

// Verify directly from collection in DB
const fromDb = await mongoose.connection.db.collection("surgeonpages").findOne({ _id: saved._id });
console.log("DB createdAt exists:", !!fromDb.createdAt, fromDb.createdAt);
console.log("DB updatedAt exists:", !!fromDb.updatedAt, fromDb.updatedAt);
console.log("DB spotlightTitle:", fromDb.spotlightTitle);
console.log("DB ctaSection:", fromDb.ctaSection);

// Clean up test doc
await SurgeonPage.deleteOne({ _id: saved._id });
console.log("Cleaned up test doc.");

await mongoose.disconnect();
