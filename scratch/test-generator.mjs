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

// Normalize images like duplicateHelper does
function normalizeImages(doc) {
  const cloned = JSON.parse(JSON.stringify(doc));
  const toImageObj = (val) => {
    if (!val) return { url: "", alt: "" };
    if (typeof val === "string") return { url: val, alt: "" };
    if (typeof val === "object") {
      const url = (typeof val.url === "string" && val.url) || (typeof val.image === "string" && val.image) || "";
      const alt = (typeof val.alt === "string" && val.alt) || (typeof val.imageAlt === "string" && val.imageAlt) || "";
      return { url, alt };
    }
    return { url: "", alt: "" };
  };

  if (cloned.hero?.doctorCard) cloned.hero.doctorCard.image = toImageObj(cloned.hero.doctorCard.image);
  if (Array.isArray(cloned.whySkill?.cards)) cloned.whySkill.cards = cloned.whySkill.cards.map((c) => ({ ...c, image: toImageObj(c.image) }));
  if (Array.isArray(cloned.whyClinic?.cards)) cloned.whyClinic.cards = cloned.whyClinic.cards.map((c) => ({ ...c, image: toImageObj(c.image) }));
  if (Array.isArray(cloned.procedures?.items)) cloned.procedures.items = cloned.procedures.items.map((p) => ({ ...p, image: toImageObj(p.image) }));
  if (cloned.leadSurgeon?.doctorCard) cloned.leadSurgeon.doctorCard.image = toImageObj(cloned.leadSurgeon.doctorCard.image);
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

  // WhyClinic
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

  // VisitSurgeon
  doc.visitSurgeon = {
    badge: { text: "VISIT OUR CLINIC" },
    heading: `Visiting our hair transplant surgeon in ${city}`,
    description: `Our nearest centre to ${city} offers the same surgeon-led FUE and DHI procedures with the same standard of care. Contact us to arrange a consultation in ${city} or at our primary clinic.`,
    address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
    phone: "+91-9217958539",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
    nearestMetro: "Pitampura Metro Station (Red Line)",
  };

  // Settings
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

const generatedJaipur = buildSurgeonCityDoc("Jaipur", "hair-transplant-surgeon-in-jaipur", delhi);

function findDifferences(obj1, obj2, path = "") {
  const diffs = [];
  const keys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);
  for (const k of keys) {
    if (["_id", "__v", "createdAt", "updatedAt"].includes(k)) continue;
    const p = path ? `${path}.${k}` : k;
    const v1 = obj1 ? obj1[k] : undefined;
    const v2 = obj2 ? obj2[k] : undefined;
    if (typeof v1 === "object" && v1 !== null && typeof v2 === "object" && v2 !== null && !Array.isArray(v1) && !Array.isArray(v2)) {
      diffs.push(...findDifferences(v1, v2, p));
    } else {
      const s1 = JSON.stringify(v1);
      const s2 = JSON.stringify(v2);
      if (s1 !== s2) {
        diffs.push({ path: p, gen: s1, db: s2 });
      }
    }
  }
  return diffs;
}

const diffs = findDifferences(generatedJaipur, jaipur);
console.log("Differences between generated Jaipur and DB Jaipur:", diffs.length);
diffs.forEach((d) => {
  console.log(`Path: ${d.path}`);
  console.log(`  Gen: ${d.gen}`);
  console.log(`  DB : ${d.db}`);
});

await mongoose.disconnect();
