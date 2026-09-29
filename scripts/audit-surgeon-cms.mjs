import mongoose from "mongoose";

async function runAudit() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("MONGO_URL not found in environment");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const collectionName = "surgeonpages";
  const docs = await db.collection(collectionName).find({}).toArray();

  console.log(`Found ${docs.length} documents in ${collectionName}`);

  const auditResults = docs.map((doc) => {
    // 1. _id
    const id = doc._id.toString();
    // 2. title
    const title = doc.title || "";
    // 3. slug
    const slug = doc.slug || "";
    // 4. general.city
    const generalCity = doc.general?.city ?? null;
    // 5. general.pageType
    const pageType = doc.general?.pageType ?? null;
    // 6. settings.status
    const status = doc.settings?.status ?? null;
    // 7. settings.isDeleted
    const isDeleted = doc.settings?.isDeleted ?? false;
    // 8. settings.showInSitemap
    const showInSitemap = doc.settings?.showInSitemap ?? null;
    // 9. settings.allowIndexing
    const allowIndexing = doc.settings?.allowIndexing ?? null;
    // 10. settings.featured
    const featured = doc.settings?.featured ?? null;
    // 11. createdAt
    const createdAt = doc.createdAt ?? null;
    // 12. updatedAt
    const updatedAt = doc.updatedAt ?? null;
    // 13. sections.seo.canonical
    const canonical = doc.seo?.canonical ?? doc.sections?.seo?.canonical ?? null;
    // 14. sections.seo.title
    const seoTitle = doc.seo?.metaTitle ?? doc.sections?.seo?.metaTitle ?? doc.seo?.title ?? null;
    // 15. sections.seo.description
    const seoDescription = doc.seo?.metaDescription ?? doc.sections?.seo?.metaDescription ?? null;

    // Content fields inspection for city-localization
    // Note: Surgeon document has sections at root or inside sections/general?
    // Let's inspect keys
    return {
      id,
      title,
      slug,
      generalCity,
      pageType,
      status,
      isDeleted,
      showInSitemap,
      allowIndexing,
      featured,
      createdAt: createdAt ? new Date(createdAt).toISOString() : null,
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
      canonical,
      seoTitle,
      seoDescription,
      hasHero: !!doc.hero,
      hasGeneral: !!doc.general,
      hasSeo: !!doc.seo,
      rawKeys: Object.keys(doc),
    };
  });

  console.log(JSON.stringify(auditResults, null, 2));
  await mongoose.disconnect();
}

runAudit().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
