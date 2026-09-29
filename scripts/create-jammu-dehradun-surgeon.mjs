/**
 * scripts/create-jammu-dehradun-surgeon.mjs
 *
 * Creates the two missing Surgeon CMS draft pages:
 * 1. Jammu (hair-transplant-surgeon-in-jammu)
 * 2. Dehradun (hair-transplant-surgeon-in-dehradun)
 *
 * Requirements:
 * - Uses approved Delhi Surgeon CMS document as structural/content template.
 * - Created through Mongoose model .save() to ensure automatic timestamps.
 * - Duplicate protection: aborts if slug already exists.
 * - status: 'draft', isDeleted: false, showInSitemap: false, allowIndexing: false.
 * - Preserves verified Delhi clinic address/NAP (no fabricated branch addresses).
 * - No malformed "New Jammu" or "New Dehradun" phrases.
 */

import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import SurgeonPage from "../src/models/SurgeonPage.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "../.env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) {
    console.error("Could not load .env.local:", e.message);
  }
}

loadEnv();

const MONGO_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URL ||
  process.env.DATABASE_URL ||
  process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: No MongoDB connection string found in environment.");
  process.exit(1);
}

const NEW_CITIES = [
  {
    city: "Jammu",
    slug: "hair-transplant-surgeon-in-jammu",
    title: "Best Hair Transplant Surgeon in Jammu",
  },
  {
    city: "Dehradun",
    slug: "hair-transplant-surgeon-in-dehradun",
    title: "Best Hair Transplant Surgeon in Dehradun",
  },
];

function normalizeImages(doc) {
  const cloned = JSON.parse(JSON.stringify(doc));
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

  if (cloned.hero?.doctorCard)
    cloned.hero.doctorCard.image = toImageObj(cloned.hero.doctorCard.image);
  if (Array.isArray(cloned.whySkill?.cards))
    cloned.whySkill.cards = cloned.whySkill.cards.map((c) => ({
      ...c,
      image: toImageObj(c.image),
    }));
  if (Array.isArray(cloned.whyClinic?.cards))
    cloned.whyClinic.cards = cloned.whyClinic.cards.map((c) => ({
      ...c,
      image: toImageObj(c.image),
    }));
  if (Array.isArray(cloned.procedures?.items))
    cloned.procedures.items = cloned.procedures.items.map((p) => ({
      ...p,
      image: toImageObj(p.image),
    }));
  if (cloned.leadSurgeon?.doctorCard)
    cloned.leadSurgeon.doctorCard.image = toImageObj(
      cloned.leadSurgeon.doctorCard.image
    );

  return cloned;
}

function buildSurgeonCityDoc(city, slug, delhiMaster) {
  const doc = normalizeImages(delhiMaster);
  delete doc._id;
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;

  // Title & slug
  doc.title = `Best Hair Transplant Surgeon in ${city}`;
  doc.slug = slug;

  // General
  doc.general = {
    ...doc.general,
    pageName: `Hair Transplant Surgeon in ${city}`,
    city: city,
    shortDescription: `Looking for the best hair transplant surgeon in ${city}? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.`,
    status: "draft",
  };

  // SEO
  doc.seo = {
    ...doc.seo,
    metaTitle: `Best Hair Transplant Surgeon in ${city} | Ryan Clinic`,
    metaDescription: `Looking for the best hair transplant surgeon in ${city}? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.`,
    keywords: [
      `hair transplant surgeon in ${city}`,
      `best hair transplant surgeon in ${city}`,
      `hair transplant surgeon ${city}`,
      `best hair transplant surgeon ${city}`,
    ],
    canonical: `https://www.clinicryan.com/surgeon/${slug}`,
    ogTitle: `Best Hair Transplant Surgeon in ${city} — Doctor-Led FUE & DHI | Ryan Clinic`,
    ogDescription: `Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in ${city}.`,
  };

  // Hero
  if (doc.hero) {
    doc.hero.title = `Best Hair Transplant Surgeon in ${city}`;
    doc.hero.description = `Your result depends less on the clinic's name or the machine used and more on the hands and eye of the surgeon. The best hair transplant surgeon in ${city} is a qualified, experienced surgeon who personally performs every step — designing a natural hairline, extracting follicles cleanly, and implanting each graft at the right angle, depth, and density. At Ryan Clinic in Pitampura, your hair transplant is surgeon-led from start to finish, never delegated to technicians. Suitability and results vary — a consultation decides what's right for you.`;
    if (doc.hero.doctorCard?.image) {
      doc.hero.doctorCard.image.alt = `Dr. Pranendra Singh Best Hair Transplant Surgeon in ${city}`;
    }
  }

  // WhySkill
  if (doc.whySkill) {
    doc.whySkill.heading = `Why a skilled hair transplant surgeon in ${city} matters more than anything else`;
    doc.whySkill.description = `A hair transplant is a one-time redistribution of a finite donor supply — and an aesthetic procedure on your face and scalp. Both facts point to the same conclusion: the surgeon's skill is the single biggest factor in your outcome. A gifted hair transplant surgeon in ${city} makes a result look completely natural; an inexperienced or absent one can waste follicles you can never recover and leave a result that looks "off."`;
  }

  // Benefits
  if (doc.benefits) {
    doc.benefits.heading = `What makes the best hair transplant surgeon in ${city}`;
    doc.benefits.description = `The best hair transplant surgeon in ${city} combines surgical precision with an artist's eye:`;
  }

  // WhyClinic - preserve verified Delhi address / sterile facility
  if (doc.whyClinic) {
    doc.whyClinic.heading = `State-of-the-Art Surgical Facility in ${city}`;
    doc.whyClinic.description = `Located in New Delhi (Pitampura), our clinic features sterile HEPA-filtered operating theaters.`;
  }

  // SurgeonRole
  if (doc.surgeonRole) {
    doc.surgeonRole.heading = `The hair transplant surgeon's role at every step in ${city}`;
    doc.surgeonRole.description = `A great hair transplant surgeon in ${city} is involved at every stage, because each one depends on surgical skill:`;
    doc.surgeonRole.footerNote = `When you choose a surgeon, you're choosing who performs each of these — which is exactly why a surgeon-led hair transplant in ${city} outperforms technician-led work.`;
  }

  // Comparison
  if (doc.comparison) {
    doc.comparison.heading = `Hair transplant surgeon vs technician in ${city}: the difference that defines your result`;
    doc.comparison.description = `This is the most important thing to verify at any clinic in ${city}. In many high-volume "graft mills," technicians perform large parts of the surgery — including extraction and implantation — while the surgeon's role is minimal. Technician-heavy, rushed work is a leading cause of poor graft survival and unnatural hairlines.`;
    doc.comparison.footerNote = `Choosing the best hair transplant surgeon in ${city} means insisting the surgeon — not a technician — does the work that determines your result.`;
  }

  // LeadSurgeon
  if (doc.leadSurgeon) {
    doc.leadSurgeon.heading = `Best Hair Transplant Surgeon in ${city}`;
    doc.leadSurgeon.description = `Your result depends less on the clinic's name or the machine used and more on the hands and eye of the surgeon. The best hair transplant surgeon in ${city} is a qualified, experienced surgeon who personally performs every step — designing a natural hairline, extracting follicles cleanly, and implanting each graft at the right angle, depth, and density. At Ryan Clinic in Pitampura, your hair transplant is surgeon-led from start to finish, never delegated to technicians.`;
  }

  // BookingChecklist
  if (doc.bookingChecklist) {
    doc.bookingChecklist.questionsHeading = `Questions to ask a hair transplant surgeon in ${city} before booking`;
    doc.bookingChecklist.redFlagsHeading = `Red flags when choosing a hair transplant surgeon in ${city}`;
    doc.bookingChecklist.heading = `How to judge a hair transplant surgeon in ${city} before you book`;
  }

  // Procedures
  if (doc.procedures) {
    doc.procedures.heading = `Procedures performed by our hair transplant surgeon in ${city}`;
  }

  // ConsultationCTA
  if (doc.consultationCTA) {
    doc.consultationCTA.heading = `Book a consultation with a hair transplant surgeon in ${city}`;
  }

  // FAQ
  if (doc.faq) {
    doc.faq.heading = `Hair transplant surgeon in ${city} — frequently asked questions`;
    if (Array.isArray(doc.faq.faqs)) {
      doc.faq.faqs = doc.faq.faqs.map((f, idx) => {
        const item = { ...f };
        if (idx === 0) {
          item.question = `How do I find the best hair transplant surgeon in ${city}?`;
        } else if (idx === 7) {
          item.answer = `Ask to see the surgeon's own before-and-afters — particularly hairlines — and cases similar to yours. A skilled hair transplant surgeon in ${city} will gladly show their portfolio.`;
        } else if (idx === 11) {
          item.question = `How much does a hair transplant surgeon in ${city} charge?`;
        } else if (idx === 12) {
          item.question = `Where can I meet the hair transplant surgeon in ${city}?`;
          item.answer = `At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034), Mon–Sat, 9 AM–7 PM. Accessible via Pitampura Metro Station (Red Line).`;
        }
        return item;
      });
    }
  }

  // CostConsultation
  if (doc.costConsultation) {
    doc.costConsultation.heading = `Cost of consulting a hair transplant surgeon in ${city}`;
    doc.costConsultation.description = `A consultation with our hair transplant surgeon in ${city} includes a free scalp analysis — the surgeon assesses your case and gives an exact graft count and transparent, per-graft cost. Surgery pricing starts from ₹40,000, with 0% EMI available.`;
  }

  // CTASection
  if (doc.ctaSection) {
    doc.ctaSection.heading = `Book a consultation with a hair transplant surgeon in ${city}`;
    doc.ctaSection.phone = "+91-9217958539";
  }

  // ExperienceSpecialization
  if (doc.experienceSpecialization) {
    doc.experienceSpecialization.heading = `Experience and specialization to look for in a hair transplant surgeon in ${city}`;
    doc.experienceSpecialization.description = `When evaluating a hair transplant surgeon in ${city}, weigh:`;
  }

  // HairlineArtistry
  if (doc.hairlineArtistry) {
    doc.hairlineArtistry.heading = `The artistry of hairline design: what surgical skill looks like in ${city}`;
    doc.hairlineArtistry.description = `The difference between a natural result and an obvious one is, above all, hairline design — the most artistic part of the surgery. A skilled hair transplant surgeon in ${city}:`;
  }

  // RevisionRepair
  if (doc.revisionRepair) {
    doc.revisionRepair.heading = `Revision and repair work by a hair transplant surgeon in ${city}`;
    doc.revisionRepair.description = `One of the clearest signs of an expert hair transplant surgeon in ${city} is the ability to correct previous work — refining an unnatural hairline, adding density to a thin result, or improving an over-harvested donor area. Revision cases demand even more surgical judgement and artistry than first-time surgery.`;
  }

  // SkillEvaluation
  if (doc.skillEvaluation) {
    doc.skillEvaluation.heading = `How to judge a hair transplant surgeon's skill in ${city} before booking`;
    doc.skillEvaluation.footerNote = `A confident, skilled hair transplant surgeon in ${city} will happily show their work. Evasiveness is your answer.`;
  }

  // SpotlightTitle
  doc.spotlightTitle = `Meet the hair transplant surgeon at Ryan Clinic — serving ${city}`;

  // VisitSurgeon — preserved verified Pitampura clinic address
  doc.visitSurgeon = {
    badge: { text: "VISIT OUR CLINIC" },
    heading: `Visiting our hair transplant surgeon in ${city}`,
    description: `Our nearest centre to ${city} offers the same surgeon-led FUE and DHI procedures with the same standard of care. Contact us to arrange a consultation in ${city} or at our primary clinic.`,
    address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
    phone: "+91-9217958539",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
    nearestMetro: "Pitampura Metro Station (Red Line)",
  };

  // Settings: draft, not deleted, no sitemap, no indexing
  doc.settings = {
    ...doc.settings,
    status: "draft",
    featured: false,
    displayOrder: 99,
    showInSitemap: false,
    allowIndexing: false,
    isDeleted: false,
  };

  return doc;
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB.");

  const coll = mongoose.connection.db.collection("surgeonpages");

  // Load Delhi master document
  const delhi = await coll.findOne({ slug: "hair-transplant-surgeon-in-delhi" });
  if (!delhi) {
    console.error("ERROR: Master Delhi surgeon document not found!");
    process.exit(1);
  }
  console.log(`Loaded Delhi master template: "${delhi.title}" (ID: ${delhi._id})`);

  const createdDocs = [];

  for (const item of NEW_CITIES) {
    const { city, slug, title } = item;
    console.log(`\nProcessing [${city}] (slug: "${slug}")...`);

    // Duplicate protection
    const existing = await coll.findOne({ slug });
    if (existing) {
      console.error(`DUPLICATE DETECTED: Slug "${slug}" already exists! (ID: ${existing._id}). Skipping creation.`);
      continue;
    }

    // Build document
    const docData = buildSurgeonCityDoc(city, slug, delhi);

    // Save through Mongoose Model to trigger automatic timestamps
    const mongooseDoc = new SurgeonPage(docData, null, { strict: false });
    const saved = await mongooseDoc.save();

    console.log(`✓ CREATED [${city}] via Mongoose model:`);
    console.log(`   _id:       ${saved._id}`);
    console.log(`   slug:      ${saved.slug}`);
    console.log(`   title:     ${saved.title}`);
    console.log(`   city:      ${saved.general?.city}`);
    console.log(`   status:    ${saved.settings?.status}`);
    console.log(`   createdAt: ${saved.createdAt}`);
    console.log(`   updatedAt: ${saved.updatedAt}`);

    createdDocs.push({
      city,
      slug,
      _id: saved._id.toString(),
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  }

  console.log("\n===================================================");
  console.log("POST-CREATION DIRECT MONGODB VERIFICATION");
  console.log("===================================================");

  for (const c of createdDocs) {
    const dbDoc = await coll.findOne({ slug: c.slug });
    if (!dbDoc) {
      console.error(`ERROR: Document for slug "${c.slug}" not found in DB!`);
      continue;
    }

    const checks = {
      _idExists: !!dbDoc._id,
      titleCorrect: dbDoc.title === `Best Hair Transplant Surgeon in ${c.city}`,
      slugCorrect: dbDoc.slug === c.slug,
      cityCorrect: dbDoc.general?.city === c.city,
      statusDraft: dbDoc.settings?.status === "draft" && dbDoc.general?.status === "draft",
      isDeletedFalse: dbDoc.settings?.isDeleted === false,
      showInSitemapFalse: dbDoc.settings?.showInSitemap === false,
      allowIndexingFalse: dbDoc.settings?.allowIndexing === false,
      createdAtExists: !!dbDoc.createdAt && dbDoc.createdAt !== null,
      updatedAtExists: !!dbDoc.updatedAt && dbDoc.updatedAt !== null,
      canonicalCorrect: dbDoc.seo?.canonical === `https://www.clinicryan.com/surgeon/${c.slug}`,
      noMalformedNewCity:
        !JSON.stringify(dbDoc).includes(`New ${c.city}`) &&
        !JSON.stringify(dbDoc).includes(`new ${c.city.toLowerCase()}`),
      verifiedAddressPreserved:
        dbDoc.visitSurgeon?.address ===
        "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
      verifiedMetroPreserved:
        dbDoc.visitSurgeon?.nearestMetro === "Pitampura Metro Station (Red Line)",
      credentialsPreserved:
        dbDoc.leadSurgeon?.title === delhi.leadSurgeon?.title &&
        dbDoc.leadSurgeon?.credentials === delhi.leadSurgeon?.credentials,
    };

    console.log(`\nVerification checks for [${c.city}]:`);
    let allPass = true;
    for (const [k, v] of Object.entries(checks)) {
      console.log(`  - ${k}: ${v ? "✓ PASS" : "✗ FAIL"}`);
      if (!v) allPass = false;
    }
    console.log(`  Overall: ${allPass ? "✓ ALL CHECKS PASSED" : "✗ FAILED CHECKS"}`);
  }

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB.");
}

main().catch((err) => {
  console.error("Fatal error during creation:", err);
  process.exit(1);
});
