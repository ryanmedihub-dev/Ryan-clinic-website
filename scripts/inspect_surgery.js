const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const idx = t.indexOf("=");
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function check() {
  await mongoose.connect(MONGO_URI);
  const SurgeryPage = mongoose.connection.collection("surgerypages");
  const docs = await SurgeryPage.find({}).toArray();
  console.log("Found Surgery Pages count:", docs.length);
  for (const d of docs) {
    console.log("----------------------------------------");
    console.log("SLUG:", d.slug, "| PageName:", d.pageName, "| Status:", d.status, "| City:", d.city);
    console.log("SEO:", JSON.stringify(d.seo || {}));
    console.log("ProcedureTimeline steps count:", d.procedureTimeline?.timelineSteps?.length);
    if (d.procedureTimeline?.timelineSteps) {
      console.log("Steps summary:", d.procedureTimeline.timelineSteps.map(s => ({ stepNumber: s.stepNumber, title: s.title, desc: s.description?.slice(0, 50) })));
    }
    console.log("Pricing factors:", d.pricing?.pricingFactors);
    console.log("BeforeSurgeryTimeline steps:", d.beforeSurgeryTimeline?.timelineItems?.map(s => ({ stepNumber: s.stepNumber, title: s.title })));
  }
  process.exit(0);
}
check();
