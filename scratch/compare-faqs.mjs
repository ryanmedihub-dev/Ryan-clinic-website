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

console.log("Delhi FAQs count:", delhi.faq?.faqs?.length);
console.log("Jaipur FAQs count:", jaipur.faq?.faqs?.length);

delhi.faq.faqs.forEach((df, i) => {
  const jf = jaipur.faq.faqs[i];
  const qDiff = df.question !== jf.question;
  const aDiff = df.answer !== jf.answer;
  if (qDiff || aDiff) {
    console.log(`\nFAQ #${i}:`);
    if (qDiff) {
      console.log(`  Q Delhi : ${df.question}`);
      console.log(`  Q Jaipur: ${jf.question}`);
    }
    if (aDiff) {
      console.log(`  A Delhi : ${df.answer}`);
      console.log(`  A Jaipur: ${jf.answer}`);
    }
  }
});

await mongoose.disconnect();
