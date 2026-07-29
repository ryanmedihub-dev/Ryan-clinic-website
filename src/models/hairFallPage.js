import mongoose from "mongoose";

// ─── REUSABLE SUB-SCHEMAS ───────────────────────────────────────────────────

const imageFieldSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    value: { type: String, trim: true, default: "" },
    label: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const buttonSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    external: { type: Boolean, default: false },
  },
  { _id: false }
);

// ─── SECTION SCHEMAS ────────────────────────────────────────────────────────

const seoSectionSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true, default: "" },
    metaDescription: { type: String, trim: true, default: "" },
    keywords: { type: String, trim: true, default: "" },
    canonicalUrl: { type: String, trim: true, default: "" },
    robots: { type: String, trim: true, default: "index,follow" },
    openGraphImage: { type: imageFieldSchema, default: () => ({}) },
  },
  { _id: false }
);

const heroSectionSchema = new mongoose.Schema(
  {
    breadcrumb: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    heroImage: { type: imageFieldSchema, default: () => ({}) },
    stats: { type: [statSchema], default: [] },
    quickFacts: { type: [String], default: [] },
    whatsappText: { type: buttonSchema, default: () => ({}) },
    callText: { type: buttonSchema, default: () => ({}) },
  },
  { _id: false }
);

const introductionSectionSchema = new mongoose.Schema(
  {
    smallHeading: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    highlightBoxText: { type: String, trim: true, default: "" },
    mainImage: { type: imageFieldSchema, default: () => ({}) },
    floatingImage: { type: imageFieldSchema, default: () => ({}) },
    heroStats: { type: [statSchema], default: [] },
  },
  { _id: false }
);

const featuredCauseSchema = new mongoose.Schema(
  {
    tag: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    points: { type: [String], default: [] },
    cardImage: { type: imageFieldSchema, default: () => ({}) },
    reverse: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const otherCauseSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const causesSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    featuredCauses: { type: [featuredCauseSchema], default: [] },
    otherCausesHeading: { type: String, trim: true, default: "" },
    otherCauses: { type: [otherCauseSchema], default: [] },
  },
  { _id: false }
);

const warningSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    warningSigns: { type: [String], default: [] },
    calloutImage: { type: imageFieldSchema, default: () => ({}) },
    calloutBadge: { type: String, trim: true, default: "" },
    calloutTitle: { type: String, trim: true, default: "" },
    calloutDescription: { type: String, trim: true, default: "" },
    calloutCTA: { type: buttonSchema, default: () => ({}) },
  },
  { _id: false }
);

const diagnosisStepSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    stepNumber: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const diagnosisSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    sideImage: { type: imageFieldSchema, default: () => ({}) },
    steps: { type: [diagnosisStepSchema], default: [] },
  },
  { _id: false }
);

const treatmentItemSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    treatmentImage: { type: imageFieldSchema, default: () => ({}) },
    bulletPoints: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    ctaText: { type: buttonSchema, default: () => ({}) },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const treatmentsSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    treatments: { type: [treatmentItemSchema], default: [] },
  },
  { _id: false }
);

const genderCardSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    cardImage: { type: imageFieldSchema, default: () => ({}) },
    ctaText: { type: buttonSchema, default: () => ({}) },
  },
  { _id: false }
);

const genderSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    menCard: { type: genderCardSchema, default: () => ({}) },
    womenCard: { type: genderCardSchema, default: () => ({}) },
  },
  { _id: false }
);

const treatmentMapRowSchema = new mongoose.Schema(
  {
    cause: { type: String, trim: true, default: "" },
    approach: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const treatmentMapSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    rows: { type: [treatmentMapRowSchema], default: [] },
  },
  { _id: false }
);

const resultsSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    resultImage: { type: imageFieldSchema, default: () => ({}) },
    facts: { type: [String], default: [] },
    warningTitle: { type: String, trim: true, default: "" },
    warningText: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const doctorSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    criteria: { type: [String], default: [] },
    teamImage: { type: imageFieldSchema, default: () => ({}) },
    imageCaption: { type: String, trim: true, default: "" },
    imageSubcaption: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const whyChooseSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    backgroundImage: { type: imageFieldSchema, default: () => ({}) },
    points: { type: [String], default: [] },
    honestNote: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const costItemSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    ctaText: { type: buttonSchema, default: () => ({}) },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const costSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    items: { type: [costItemSchema], default: [] },
  },
  { _id: false }
);

const mythItemSchema = new mongoose.Schema(
  {
    myth: { type: String, trim: true, default: "" },
    fact: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const mythsSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    myths: { type: [mythItemSchema], default: [] },
  },
  { _id: false }
);

const visitInfoCardSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    label: { type: String, trim: true, default: "" },
    value: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const visitClinicSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    bannerImage: { type: imageFieldSchema, default: () => ({}) },
    bannerTitle: { type: String, trim: true, default: "" },
    bannerAddress: { type: String, trim: true, default: "" },
    infoCards: { type: [visitInfoCardSchema], default: [] },
    mapEmbedUrl: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const contactCardSchema = new mongoose.Schema(
  {
    icon: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    ext: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const consultationSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    backgroundImage: { type: imageFieldSchema, default: () => ({}) },
    contactCards: { type: [contactCardSchema], default: [] },
    statsRow: { type: [statSchema], default: [] },
  },
  { _id: false }
);

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, trim: true, default: "" },
    answer: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const faqSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    stats: { type: [statSchema], default: [] },
    faqs: { type: [faqItemSchema], default: [] },
  },
  { _id: false }
);

// ─── ROOT SCHEMA ─────────────────────────────────────────────────────────────

const hairFallPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    pageName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },

    seo: { type: seoSectionSchema, default: () => ({}) },
    hero: { type: heroSectionSchema, default: () => ({}) },
    introduction: { type: introductionSectionSchema, default: () => ({}) },
    causes: { type: causesSectionSchema, default: () => ({}) },
    warning: { type: warningSectionSchema, default: () => ({}) },
    diagnosis: { type: diagnosisSectionSchema, default: () => ({}) },
    treatments: { type: treatmentsSectionSchema, default: () => ({}) },
    gender: { type: genderSectionSchema, default: () => ({}) },
    treatmentMap: { type: treatmentMapSectionSchema, default: () => ({}) },
    results: { type: resultsSectionSchema, default: () => ({}) },
    doctor: { type: doctorSectionSchema, default: () => ({}) },
    whyChoose: { type: whyChooseSectionSchema, default: () => ({}) },
    cost: { type: costSectionSchema, default: () => ({}) },
    myths: { type: mythsSectionSchema, default: () => ({}) },
    visitClinic: { type: visitClinicSectionSchema, default: () => ({}) },
    consultation: { type: consultationSectionSchema, default: () => ({}) },
    faq: { type: faqSectionSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.models.HairFallPage ||
  mongoose.model("HairFallPage", hairFallPageSchema);
