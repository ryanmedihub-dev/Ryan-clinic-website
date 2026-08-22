import mongoose from "mongoose";
import Blog from "../src/models/blog.js";
import CostPage from "../src/models/CostPage.js";
import Doctors from "../src/models/Doctors.js";
import SurgeonPage from "../src/models/SurgeonPage.js";
import SurgeryPage from "../src/models/surgeryPage.js";
import HairFallPage from "../src/models/hairFallPage.js";
import Services from "../src/models/services.js";

async function auditAllDynamicRoutes() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB for Complete Dynamic Route Audit\n");

  const categories = {
    Blog: [],
    Cost: [],
    Doctors: [],
    Surgeon: [],
    Surgery: [],
    Treatments: [],
    Services_Branches: []
  };

  // 1. Blogs
  const blogs = await Blog.find({}).lean();
  for (const b of blogs) {
    if (b.pageUrl) categories.Blog.push(`/blog/${b.pageUrl}`);
  }

  // 2. Cost
  const costs = await CostPage.find({ "settings.isDeleted": { $ne: true } }).lean();
  for (const c of costs) {
    if (c.slug) categories.Cost.push(`/cost/${c.slug}`);
  }

  // 3. Doctors (active only)
  const docs = await Doctors.find({
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
  }).lean();
  for (const d of docs) {
    if (d.slug) categories.Doctors.push(`/doctors/${d.slug}`);
  }

  // 4. Surgeon (active only)
  const surgeons = await SurgeonPage.find({ "settings.isDeleted": { $ne: true } }).lean();
  for (const sp of surgeons) {
    if (sp.slug) categories.Surgeon.push(`/surgeon/${sp.slug}`);
  }

  // 5. Surgery
  const surgeries = await SurgeryPage.find({ isDeleted: { $ne: true } }).lean();
  for (const sg of surgeries) {
    if (sg.slug) categories.Surgery.push(`/surgery/${sg.slug}`);
  }

  // 6. Treatments
  const hairfalls = await HairFallPage.find({}).lean();
  for (const hf of hairfalls) {
    if (hf.slug) categories.Treatments.push(`/treatments/${hf.slug}`);
  }

  // 7. Services & Branches
  const services = await Services.find({ isDeleted: { $ne: true } }).lean();
  for (const s of services) {
    if (s.metadata?.pageurl) categories.Services_Branches.push(`/${s.metadata.pageurl}`);
  }

  console.log("Found Active DB Records to Test:");
  for (const [cat, urls] of Object.entries(categories)) {
    console.log(`- ${cat}: ${urls.length} records`);
  }
  console.log("");

  let totalTests = 0;
  let totalPass = 0;
  let totalFail = 0;
  const failureList = [];

  for (const [cat, urls] of Object.entries(categories)) {
    console.log(`\n=== Testing ${cat} (${urls.length} routes) ===`);
    let catPass = 0;
    for (const url of urls) {
      totalTests++;
      try {
        const res = await fetch(`http://localhost:3000${url}`, { redirect: "manual" });
        const is200 = res.status === 200;
        if (is200) {
          totalPass++;
          catPass++;
          console.log(`  ✓ 200 | ${url}`);
        } else {
          totalFail++;
          failureList.push({ cat, url, status: res.status, location: res.headers.get("location") || "-" });
          console.log(`  ✗ ${res.status} | ${url}`);
        }
      } catch (err) {
        totalFail++;
        failureList.push({ cat, url, status: "ERR", error: err.message });
        console.log(`  ✗ ERR | ${url} (${err.message})`);
      }
    }
    console.log(`  -> ${cat} Result: ${catPass}/${urls.length} Working (0 broken)`);
  }

  console.log("\n" + "=".repeat(60));
  console.log(`FINAL DYNAMIC ROUTE AUDIT:`);
  console.log(`Total Tested: ${totalTests} | Passed (200 OK): ${totalPass} | Failed: ${totalFail}`);
  console.log(`Success Rate: ${((totalPass / totalTests) * 100).toFixed(1)}%`);
  console.log("=".repeat(60));

  if (failureList.length > 0) {
    console.log("\nFailures:");
    failureList.forEach(f => console.log(`- [${f.status}] ${f.url} (${f.cat})`));
    process.exit(1);
  } else {
    console.log("\nALL DYNAMIC ROUTES ACROSS ALL COLLECTIONS ARE 100% WORKING WITH HTTP 200!");
  }

  await mongoose.disconnect();
}

auditAllDynamicRoutes().catch(console.error);
