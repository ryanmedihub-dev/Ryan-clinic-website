import { DBConnection } from "../src/lib/db.js";
import Services from "../src/models/services.js";

async function createNagpurService() {
  await DBConnection();

  // Find a reference branch to clone clean structure from (Indore or Jaipur)
  const ref = await Services.findOne({ "metadata.pageurl": "hair-transplant-in-indore" }).lean();
  if (!ref) {
    throw new Error("Reference service hair-transplant-in-indore not found");
  }

  // Create Nagpur document by cleanly adapting ref
  const nagpurFaqs = ref.faq.map(item => ({
    question: item.question.replace(/Indore/g, "Nagpur"),
    answer: item.answer.replace(/Indore/g, "Nagpur"),
  }));

  const nagpurBenefits = {
    title: ref.benefitsData.title.replace(/Indore/g, "Nagpur"),
    description: ref.benefitsData.description.replace(/Indore/g, "Nagpur"),
    component: ref.benefitsData.component.map(c => ({
      title: c.title.replace(/Indore/g, "Nagpur"),
      description: c.description.replace(/Indore/g, "Nagpur"),
      icon: c.icon,
    })),
  };

  const nagpurTypes = {
    details: ref.typesData.details.replace(/Indore/g, "Nagpur"),
    images: ref.typesData.images.map(img => ({
      url: img.url,
      alt: img.alt.replace(/Indore/g, "Nagpur"),
    })),
  };

  const nagpurSections = ref.pageSections.map(s => ({
    key: s.key,
    enabled: s.enabled,
    order: s.order,
    data: s.data || {},
  }));

  const nagpurDoc = {
    bannerData: {
      title: "Best Hair Transplant in Nagpur",
      description: "Looking for the best hair transplant in Nagpur? Ryan Clinic restores permanent, natural-looking hair using Turkey's authentic Sapphire FUE technique — performed by certified doctors, never technicians. With 90%+ graft survival, transparent pricing from ₹40,000, and undetectable results, we've earned the trust of 10,000+ patients across Nagpur",
      imageurl: ref.bannerData.imageurl,
      imagealt: ref.bannerData.imagealt,
    },
    benefitsData: nagpurBenefits,
    extraFields: {
      detail1: "",
      detail2: "",
    },
    faq: nagpurFaqs,
    metadata: {
      pageName: "Hair Transplant in Nagpur",
      pageType: "branch",
      description: "Best hair transplant in Nagpur by certified doctors — Sapphire FUE technique, 90%+ graft survival, cost from ₹40,000. Free scalp analysis & consult: +91-9217958539.",
      pageurl: "hair-transplant-in-nagpur",
      title: "Best Hair Transplant in Nagpur Near Me | Ryan Clinic",
      overviewData: ref.metadata.overviewData.replace(/Indore/g, "Nagpur"),
      keywords: [
        "hair transplant in nagpur",
        "best hair transplant in nagpur",
        "hair transplant clinic in nagpur",
        "best hair transplant clinic in nagpur",
        "hair transplant surgery in nagpur",
        "hair transplant treatment in nagpur",
        "best hair transplant doctor in nagpur",
        "best hair transplant surgeon in nagpur",
        "hair transplant specialist in nagpur",
        "hair transplant nagpur",
      ],
      branchName: "Nagpur",
    },
    typesData: nagpurTypes,
    pageSections: nagpurSections,
  };

  const existing = await Services.findOne({ "metadata.pageurl": "hair-transplant-in-nagpur" });
  if (existing) {
    await Services.updateOne({ _id: existing._id }, { $set: nagpurDoc });
    console.log("✅ Updated existing Nagpur service document:", existing._id);
  } else {
    const created = await Services.create(nagpurDoc);
    console.log("✅ Created new Nagpur service document:", created._id);
  }

  process.exit(0);
}

createNagpurService().catch(err => {
  console.error("❌ Error creating Nagpur service:", err);
  process.exit(1);
});
