/**
 * scripts/bulk-create-surgeon-pages.mjs
 *
 * Bulk-creates 20 Surgeon CMS city pages by cloning the Delhi master document.
 *
 * Usage:
 *   node --env-file=.env.local scripts/bulk-create-surgeon-pages.mjs
 *
 * Rules:
 *  - Skips slugs that already exist (idempotent).
 *  - All new pages created with status = 'draft'.
 *  - Delhi, Mumbai, Gurgaon (already published) are skipped automatically.
 *  - Slug values are taken verbatim from the TARGET_CITIES list (no auto-correction).
 *  - Dr. Pranendra Singh is the surgeon on all pages.
 *  - City-specific text (titles, headings, SEO, visitSurgeon, FAQ answers) is updated.
 *  - visitSurgeon uses generic "our nearest centre" copy for cities without a physical clinic.
 */

import mongoose from "mongoose";

// ─── Target cities ─────────────────────────────────────────────────────────────
// Slugs are EXACT as specified by the user — do NOT normalise them.
const TARGET_CITIES = [
  // Already exist (will be skipped)
  { city: "Delhi",     slug: "hair-transplant-surgeon-in-delhi",     skip: true },
  { city: "Mumbai",    slug: "hair-transplant-surgeon-in-mumbai",    skip: true },
  { city: "Gurgaon",   slug: "hair-transplant-surgeon-in-gurgaon",   skip: true },

  // To create
  { city: "Hyderabad",  slug: "hair-transplant-surgeon-in-hyderabad"  },
  { city: "Bangalore",  slug: "hair-transplant-surgeon-in-banglore"   }, // intentional spelling
  { city: "Chennai",    slug: "hair-transplant-surgeon-in-chennai"    },
  { city: "Kolkata",    slug: "hair-transplant-surgeon-in-kolkata"    },
  { city: "Pune",       slug: "hair-transplant-surgeon-in-pune"       },
  { city: "Ahmedabad",  slug: "hair-transplant-surgeon-in-ahmedabad"  },
  { city: "Jaipur",     slug: "hair-transplant-surgeon-in-jaipur"     },
  { city: "Chandigarh", slug: "hair-transplant-surgeon-in-chandigarh" },
  { city: "Lucknow",    slug: "hair-transplant-surgeon-in-lucknow"    },
  { city: "Noida",      slug: "hair-transplant-surgeon-in-noida"      },
  { city: "Faridabad",  slug: "hair-transplant-surgeon-in-faridabad"  },
  { city: "Ranchi",     slug: "hair-transplant-surgeon-in-rachi"      }, // intentional spelling
  { city: "Surat",      slug: "hair-transplant-surgeon-in-surat"      },
  { city: "Nagpur",     slug: "hair-transplant-surgeon-in-nagpur"     },
  { city: "Bhopal",     slug: "hair-transplant-surgeon-in-bhopal"     },
  { city: "Indore",     slug: "hair-transplant-surgeon-indore"        }, // intentional no "in-"
  { city: "Patna",      slug: "hair-transplant-surgeon-in-patna"      },
  { city: "Amritsar",   slug: "hair-transplant-surgeon-in-amritsar"   },
];

// ─── Normalize image fields ──────────────────────────────────────────────────
function normalizeSurgeonDoc(doc) {
  const toImageObj = (val) => {
    if (!val) return { url: "", alt: "" };
    if (typeof val === "string") return { url: val, alt: "" };
    if (typeof val === "object") {
      const url =
        (typeof val.url === "string" && val.url) ||
        (typeof val.image === "string" && val.image) ||
        "";
      const alt =
        (typeof val.alt === "string" && val.alt) ||
        (typeof val.imageAlt === "string" && val.imageAlt) ||
        "";
      return { url, alt };
    }
    return { url: "", alt: "" };
  };

  if (doc.hero?.doctorCard) doc.hero.doctorCard.image = toImageObj(doc.hero.doctorCard.image);
  if (Array.isArray(doc.whySkill?.cards))
    doc.whySkill.cards = doc.whySkill.cards.map((c) => ({ ...c, image: toImageObj(c.image) }));
  if (Array.isArray(doc.whyClinic?.cards))
    doc.whyClinic.cards = doc.whyClinic.cards.map((c) => ({ ...c, image: toImageObj(c.image) }));
  if (Array.isArray(doc.procedures?.items))
    doc.procedures.items = doc.procedures.items.map((p) => ({ ...p, image: toImageObj(p.image) }));
  if (doc.leadSurgeon?.doctorCard)
    doc.leadSurgeon.doctorCard.image = toImageObj(doc.leadSurgeon.doctorCard.image);

  return doc;
}

// ─── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  const MONGO =
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.MONGODB_URL;

  if (!MONGO) {
    console.error("ERROR: No MongoDB connection string found in environment.");
    process.exit(1);
  }

  await mongoose.connect(MONGO);
  console.log("Connected to MongoDB");

  const coll = mongoose.connection.db.collection("surgeonpages");

  // Fetch the Delhi master document
  const delhi = await coll.findOne({ slug: "hair-transplant-surgeon-in-delhi" });
  if (!delhi) {
    console.error("ERROR: Delhi master document not found.");
    process.exit(1);
  }
  console.log(`Loaded Delhi master: "${delhi.title}"\n`);

  const results = { created: [], skipped: [], failed: [] };

  for (const target of TARGET_CITIES) {
    const { city, slug, skip } = target;

    // Hard-skip the three existing ones
    if (skip) {
      console.log(`SKIP  [${city}] — already exists as published.`);
      results.skipped.push({ city, slug, reason: "pre-existing published document" });
      continue;
    }

    // Check if this slug already exists
    const existing = await coll.findOne({ slug });
    if (existing) {
      console.log(`SKIP  [${city}] slug="${slug}" — already in DB.`);
      results.skipped.push({ city, slug, reason: "already exists in DB" });
      continue;
    }

    try {
      // Deep-clone the Delhi doc
      const raw = JSON.parse(JSON.stringify(delhi));
      delete raw._id;
      delete raw.__v;
      delete raw.createdAt;
      delete raw.updatedAt;

      // Run normalization (image field safety)
      normalizeSurgeonDoc(raw);

      // Replace "Delhi" with city throughout the document
      const replaceCity = (doc) => {
        const str = JSON.stringify(doc);
        const replaced = str
          .replace(/in Delhi/g, `in ${city}`)
          .replace(/in delhi/g, `in ${city.toLowerCase()}`)
          .replace(/\bDelhi\b/g, city)
          .replace(/\bdelhi\b/g, city.toLowerCase());
        return JSON.parse(replaced);
      };

      const doc = replaceCity(raw);

      // Slug & title
      doc.slug = slug;
      doc.title = `Best Hair Transplant Surgeon in ${city}`;

      // general
      doc.general.pageName = `Hair Transplant Surgeon in ${city}`;
      doc.general.city = city;
      doc.general.shortDescription = `Looking for the best hair transplant surgeon in ${city}? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.`;
      doc.general.status = "draft";

      // SEO
      doc.seo.metaTitle = `Best Hair Transplant Surgeon in ${city} | Ryan Clinic`;
      doc.seo.metaDescription = `Looking for the best hair transplant surgeon in ${city}? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.`;
      doc.seo.keywords = [
        `hair transplant surgeon in ${city}`,
        `best hair transplant surgeon in ${city}`,
        `hair transplant surgeon ${city}`,
        `best hair transplant surgeon ${city}`,
      ];
      doc.seo.canonical = `https://www.clinicryan.com/surgeon/${slug}`;
      doc.seo.ogTitle = `Best Hair Transplant Surgeon in ${city} — Doctor-Led FUE & DHI | Ryan Clinic`;
      doc.seo.ogDescription = `Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in ${city}.`;

      // visitSurgeon — generic copy for non-Delhi cities
      doc.visitSurgeon = {
        badge: { text: "VISIT OUR CLINIC" },
        heading: `Visiting our hair transplant surgeon in ${city}`,
        description: `Our nearest centre to ${city} offers the same surgeon-led FUE and DHI procedures with the same standard of care. Contact us to arrange a consultation in ${city} or at our primary clinic.`,
        address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
        phone: "+91-9217958539",
        hours: "Mon–Sat, 9:00 AM – 7:00 PM",
        nearestMetro: "Pitampura Metro Station (Red Line)",
      };

      // ctaSection
      doc.ctaSection.heading = `Book a consultation with a hair transplant surgeon in ${city}`;
      doc.ctaSection.phone = "+91-9217958539";

      // spotlightTitle
      doc.spotlightTitle = `Meet the hair transplant surgeon at Ryan Clinic — serving ${city}`;

      // settings: always draft
      doc.settings = {
        ...doc.settings,
        status: "draft",
        featured: false,
        displayOrder: 99,
        showInSitemap: false,
        allowIndexing: false,
        isDeleted: false,
      };

      // Insert
      const insertResult = await coll.insertOne(doc);
      console.log(`CREATED [${city}] slug="${slug}" _id=${insertResult.insertedId}`);
      results.created.push({ city, slug, _id: insertResult.insertedId.toString() });

    } catch (err) {
      console.error(`FAILED  [${city}] slug="${slug}"`, err.message);
      results.failed.push({ city, slug, error: err.message });
    }
  }

  // Summary
  console.log("\n===================================================");
  console.log("  BULK CREATE SURGEON PAGES — SUMMARY");
  console.log("===================================================");
  console.log(`  Created : ${results.created.length}`);
  console.log(`  Skipped : ${results.skipped.length}`);
  console.log(`  Failed  : ${results.failed.length}`);
  console.log("---------------------------------------------------");

  if (results.created.length) {
    console.log("\nCreated pages:");
    results.created.forEach((r) => console.log(`  [${r.city}] /surgeon/${r.slug}  (_id: ${r._id})`));
  }

  if (results.skipped.length) {
    console.log("\nSkipped:");
    results.skipped.forEach((r) => console.log(`  [${r.city}] /surgeon/${r.slug}  (${r.reason})`));
  }

  if (results.failed.length) {
    console.log("\nFailed:");
    results.failed.forEach((r) => console.log(`  [${r.city}] /surgeon/${r.slug}  -- ${r.error}`));
  }

  console.log("\n===================================================\n");

  await mongoose.disconnect();
  process.exit(results.failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
