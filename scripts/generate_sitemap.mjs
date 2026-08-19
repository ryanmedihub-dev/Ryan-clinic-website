import fs from 'fs';
import mongoose from 'mongoose';
import Services from '../src/models/services.js';
import Blog from '../src/models/blog.js';
import CostPage from '../src/models/CostPage.js';
import Doctors from '../src/models/Doctors.js';
import SurgeonPage from '../src/models/SurgeonPage.js';
import SurgeryPage from '../src/models/surgeryPage.js';
import HairFallPage from '../src/models/hairFallPage.js';

const DOMAIN = "https://www.clinicryan.com";

const STATIC_ROUTES = [
  { url: "", priority: "1.00", changefreq: "daily" },
  { url: "/about", priority: "0.80", changefreq: "monthly" },
  { url: "/gallery", priority: "0.85", changefreq: "weekly" },
  { url: "/contact", priority: "0.80", changefreq: "monthly" },
  { url: "/blog", priority: "0.80", changefreq: "daily" },
  { url: "/surgery", priority: "0.85", changefreq: "weekly" },
  { url: "/cost", priority: "0.85", changefreq: "weekly" },
  { url: "/doctors", priority: "0.80", changefreq: "weekly" },
  { url: "/surgeon", priority: "0.80", changefreq: "weekly" },
  { url: "/book-consult", priority: "0.80", changefreq: "monthly" },
  { url: "/privacy-policy", priority: "0.50", changefreq: "yearly" },
  { url: "/terms-and-conditions", priority: "0.50", changefreq: "yearly" },
  { url: "/refund-policy", priority: "0.50", changefreq: "yearly" },
];

async function generate() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB for Sitemap Generation");

  const today = new Date().toISOString().split("T")[0];
  const urlEntries = [];
  const seenUrls = new Set();

  function addUrl(path, priority = "0.80", changefreq = "weekly", lastmod = today) {
    const fullUrl = `${DOMAIN}${path}`;
    if (seenUrls.has(fullUrl)) return;
    seenUrls.add(fullUrl);
    urlEntries.push(`  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  // 1. Static pages
  for (const r of STATIC_ROUTES) {
    addUrl(r.url, r.priority, r.changefreq);
  }

  // 2. Services & Branches
  const services = await Services.find({
    $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }]
  }).lean();
  for (const s of services) {
    if (s.metadata?.pageurl) {
      addUrl(`/${s.metadata.pageurl}`, s.metadata.pageType === "branch" ? "0.85" : "0.80", "weekly");
    }
  }

  // 3. Surgeries
  const surgeries = await SurgeryPage.find({
    $or: [{ "settings.isDeleted": false }, { "settings.isDeleted": { $exists: false } }, { settings: { $exists: false } }]
  }).lean();
  for (const sg of surgeries) {
    if (sg.slug && !sg.settings?.isDeleted) {
      addUrl(`/surgery/${sg.slug}`, "0.85", "weekly");
    }
  }

  // 4. Cost Pages
  const costs = await CostPage.find({
    $or: [{ "settings.isDeleted": false }, { "settings.isDeleted": { $exists: false } }]
  }).lean();
  for (const c of costs) {
    if (c.slug && !c.settings?.isDeleted) {
      addUrl(`/cost/${c.slug}`, "0.85", "weekly");
    }
  }

  // 5. Doctors (Exclude soft-deleted doctors)
  const docs = await Doctors.find({
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
  }).lean();
  for (const d of docs) {
    if (d.slug && !d.deletedAt && !d.settings?.isDeleted) {
      addUrl(`/doctors/${d.slug}`, "0.80", "weekly");
    }
  }

  // 6. Surgeons (Exclude deleted surgeons)
  const surgeons = await SurgeonPage.find({
    $or: [{ "settings.isDeleted": false }, { "settings.isDeleted": { $exists: false } }]
  }).lean();
  for (const sp of surgeons) {
    if (sp.slug && !sp.settings?.isDeleted) {
      addUrl(`/surgeon/${sp.slug}`, "0.80", "weekly");
    }
  }

  // 7. Hair Fall / Treatments
  const hairfalls = await HairFallPage.find({
    $or: [{ "settings.isDeleted": false }, { "settings.isDeleted": { $exists: false } }]
  }).lean();
  for (const hf of hairfalls) {
    if (hf.slug && !hf.settings?.isDeleted) {
      addUrl(`/treatments/${hf.slug}`, "0.80", "weekly");
    }
  }

  // 8. Blogs
  const blogs = await Blog.find({}).lean();
  for (const b of blogs) {
    if (b.pageUrl) {
      const blogMod = b.updatedAt ? new Date(b.updatedAt).toISOString().split("T")[0] : today;
      addUrl(`/blog/${b.pageUrl}`, "0.70", "monthly", blogMod);
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemapXml, "utf8");
  console.log(`✓ public/sitemap.xml written successfully with ${urlEntries.length} canonical URLs!`);

  await mongoose.disconnect();
}

generate().catch(err => {
  console.error("Sitemap generation error:", err);
  process.exit(1);
});
