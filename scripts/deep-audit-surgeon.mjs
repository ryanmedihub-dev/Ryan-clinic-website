import mongoose from "mongoose";

const REQUESTED_SLUGS = [
  "hair-transplant-surgeon-in-delhi",
  "hair-transplant-surgeon-in-mumbai",
  "hair-transplant-surgeon-in-hyderabad",
  "hair-transplant-surgeon-in-gurgaon",
  "hair-transplant-surgeon-in-noida",
  "hair-transplant-surgeon-in-pune",
  "hair-transplant-surgeon-in-patna",
  "hair-transplant-surgeon-in-ahmedabad",
  "hair-transplant-surgeon-in-banglore",
  "hair-transplant-surgeon-in-jammu",
  "hair-transplant-surgeon-in-lucknow",
  "hair-transplant-surgeon-in-kolkata",
  "hair-transplant-surgeon-in-chennai",
  "hair-transplant-surgeon-indore",
  "hair-transplant-surgeon-in-bhopal",
  "hair-transplant-surgeon-in-chandigarh",
  "hair-transplant-surgeon-in-rachi",
  "hair-transplant-surgeon-in-dehradun",
  "hair-transplant-surgeon-in-nagpur",
  "hair-transplant-surgeon-in-jaipur"
];

const ALL_INDIAN_CITIES = [
  "Delhi", "New Delhi", "Mumbai", "Hyderabad", "Gurgaon", "Gurugram", "Noida", "Pune",
  "Patna", "Ahmedabad", "Banglore", "Bangalore", "Bengaluru", "Jammu", "Lucknow", "Kolkata",
  "Chennai", "Indore", "Bhopal", "Chandigarh", "Rachi", "Ranchi", "Dehradun", "Nagpur",
  "Jaipur", "Surat", "Amritsar", "Kochi", "Goa", "Kanpur", "Varanasi", "Agra", "Ludhiana"
];

function findCityMentions(obj, currentCity) {
  const text = JSON.stringify(obj || {});
  const results = {};
  
  for (const c of ALL_INDIAN_CITIES) {
    // case-insensitive word boundary check
    const regex = new RegExp(`\\b${c}\\b`, "gi");
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      results[c] = matches.length;
    }
  }
  return results;
}

async function deepAudit() {
  await mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection.db;
  const docs = await db.collection("surgeonpages").find({}).sort({ createdAt: 1, _id: 1 }).toArray();

  console.log(`TOTAL_DOCUMENTS_COUNT: ${docs.length}`);

  const docSummaries = [];

  for (const d of docs) {
    const slug = d.slug || "";
    const city = d.general?.city || "";
    
    // Inspect specific content sections for city mentions
    const sectionsToCheck = {
      hero: d.hero,
      whySkill: d.whySkill,
      benefits: d.benefits,
      whyClinic: d.whyClinic,
      surgeonRole: d.surgeonRole,
      comparison: d.comparison,
      leadSurgeon: d.leadSurgeon,
      bookingChecklist: d.bookingChecklist,
      procedures: d.procedures,
      consultationCTA: d.consultationCTA,
      faq: d.faq,
    };

    const sectionMentions = {};
    for (const [sName, sVal] of Object.entries(sectionsToCheck)) {
      if (sVal) {
        const m = findCityMentions(sVal, city);
        if (Object.keys(m).length > 0) {
          sectionMentions[sName] = m;
        }
      }
    }

    docSummaries.push({
      _id: d._id.toString(),
      title: d.title,
      slug: d.slug,
      generalCity: d.general?.city ?? null,
      pageType: d.general?.pageType ?? null,
      status: d.settings?.status ?? null,
      isDeleted: d.settings?.isDeleted ?? false,
      showInSitemap: d.settings?.showInSitemap ?? null,
      allowIndexing: d.settings?.allowIndexing ?? null,
      featured: d.settings?.featured ?? null,
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
      updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : null,
      canonical: d.seo?.canonical ?? null,
      seoTitle: d.seo?.metaTitle ?? null,
      seoDescription: d.seo?.metaDescription ?? null,
      sectionMentions,
    });
  }

  // Groupings
  const publishedDocs = docSummaries.filter(d => d.status === "published" && !d.isDeleted);
  const draftDocs = docSummaries.filter(d => d.status === "draft" && !d.isDeleted);
  const deletedDocs = docSummaries.filter(d => d.isDeleted);

  const existingSlugs = new Set(docSummaries.map(d => d.slug));
  const missingRequestedSlugs = REQUESTED_SLUGS.filter(s => !existingSlugs.has(s));
  const extraSlugs = docSummaries.filter(d => !REQUESTED_SLUGS.includes(d.slug)).map(d => ({ slug: d.slug, title: d.title }));

  const report = {
    totalDocuments: docs.length,
    publishedCount: publishedDocs.length,
    draftCount: draftDocs.length,
    deletedCount: deletedDocs.length,
    publishedSlugs: publishedDocs.map(d => d.slug),
    draftSlugs: draftDocs.map(d => d.slug),
    missingRequestedSlugs,
    extraSlugs,
    docSummaries,
  };

  console.log("===AUDIT_JSON_START===");
  console.log(JSON.stringify(report, null, 2));
  console.log("===AUDIT_JSON_END===");

  await mongoose.disconnect();
}

deepAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
