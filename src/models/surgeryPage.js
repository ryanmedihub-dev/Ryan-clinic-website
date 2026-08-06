import mongoose from "mongoose";

// ─── REUSABLE SUB-SCHEMAS ───────────────────────────────────────────────────

const imageFieldSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
      default: "",
    },
    imageAlt: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      trim: true,
      default: "",
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const buttonSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ─── SECTION SCHEMAS ────────────────────────────────────────────────────────

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },
    keywords: {
      type: String,
      trim: true,
      default: "",
    },
    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
    },
    robots: {
      type: String,
      trim: true,
      default: "index,follow",
    },
    openGraphImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const heroSectionSchema = new mongoose.Schema(
  {
    breadcrumb: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    heroImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    whatsappText: {
      type: buttonSchema,
      default: () => ({}),
    },
    callText: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const introductionSectionSchema = new mongoose.Schema(
  {
    smallHeading: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML / SunEditor
      trim: true,
      default: "",
    },
    highlightBoxText: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    honestPoints: {
      type: [String],
      default: [],
    },
    mainImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    floatingImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    bottomStats: {
      type: [statSchema],
      default: [],
    },
    primaryCTA: {
      type: buttonSchema,
      default: () => ({}),
    },
    secondaryCTA: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// SECTION 3 (NEW): Safety Info
const safetyInfoCardSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const safetyInfoSectionSchema = new mongoose.Schema(
  {
    badge: { type: String, trim: true, default: "" },
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    safetyPoints: { type: [String], default: [] },
    safetyCard: { type: safetyInfoCardSchema, default: () => ({}) },
    metrics: { type: [statSchema], default: [] },
  },
  { _id: false }
);

// SECTION 4 (NEW): Types of Hair Transplant Surgery
const typeCardSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image: { type: imageFieldSchema, default: () => ({}) },
    badge: { type: String, trim: true, default: "" },
    cta: { type: buttonSchema, default: () => ({}) },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const surgeryTypesSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    cards: { type: [typeCardSchema], default: [] },
  },
  { _id: false }
);

// SECTION 5 (NEW): Best Surgery Checklist
const checklistItemSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const bestSurgeryChecklistSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    checklistItems: { type: [checklistItemSchema], default: [] },
  },
  { _id: false }
);

// SECTION 6 (NEW): Candidate Suitability & Norwood Table
const norwoodStageSchema = new mongoose.Schema(
  {
    stage: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    grafts: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const candidateSuitabilitySectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    suitableList: { type: [String], default: [] },
    notSuitableList: { type: [String], default: [] },
    norwoodTable: { type: [norwoodStageSchema], default: [] },
  },
  { _id: false }
);

// SECTION 7 (NEW): Before Surgery Timeline
const beforeTimelineItemSchema = new mongoose.Schema(
  {
    stepNumber: { type: String, trim: true, default: "" },
    badge: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const beforeSurgeryTimelineSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    timelineItems: { type: [beforeTimelineItemSchema], default: [] },
  },
  { _id: false }
);

// SECTION 8: Procedure Science
const scienceCardSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML / SunEditor
      trim: true,
      default: "",
    },
    advantages: {
      type: String, // Long description / advantages
      trim: true,
      default: "",
    },
    clinicalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    cardImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    badge: {
      type: String,
      trim: true,
      default: "",
    },
    bulletPoints: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const procedureScienceSectionSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    cards: {
      type: [scienceCardSchema],
      default: [],
    },
  },
  { _id: false }
);

// SECTION 9: Safety Standards
const safetyCardSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const safetyRightHighlightSchema = new mongoose.Schema(
  {
    smallHeading: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    metrics: {
      type: [statSchema],
      default: [],
    },
    bottomNotice: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const safetySectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    safetyCards: {
      type: [safetyCardSchema],
      default: [],
    },
    rightSideHighlightBox: {
      type: safetyRightHighlightSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// SECTION 10: Surgical Techniques
const techniqueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    benefits: {
      type: [String],
      default: [],
    },
    idealCandidate: {
      type: String,
      trim: true,
      default: "",
    },
    recoveryInfo: {
      type: String,
      trim: true,
      default: "",
    },
    badge: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bulletPoints: {
      type: [String],
      default: [],
    },
    bottomStatistics: {
      type: [statSchema],
      default: [],
    },
    ctaText: {
      type: buttonSchema,
      default: () => ({}),
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const techniqueBottomCTASchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    primaryCTA: {
      type: buttonSchema,
      default: () => ({}),
    },
    secondaryCTA: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const surgicalTechniquesSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    techniques: {
      type: [techniqueSchema],
      default: [],
    },
    bottomCTABlock: {
      type: techniqueBottomCTASchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// SECTION 11: Quality Benchmarks
const qualityBenchmarkCardSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const qualityBenchmarkSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    benchmarkCards: {
      type: [qualityBenchmarkCardSchema],
      default: [],
    },
  },
  { _id: false }
);

// SECTION 12: Day of Surgery
const timelineStepSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: String,
      trim: true,
      default: "",
    },
    badge: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    stepImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const procedureTimelineSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    timelineSteps: {
      type: [timelineStepSchema],
      default: [],
    },
    bottomHighlightMessage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

// SECTION 13: Recovery Timeline
const recoveryLeftHighlightSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    statistics: {
      type: [statSchema],
      default: [],
    },
  },
  { _id: false }
);

const recoveryStageSchema = new mongoose.Schema(
  {
    duration: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const recoveryTimelineSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    leftHighlightCard: {
      type: recoveryLeftHighlightSchema,
      default: () => ({}),
    },
    recoveryStages: {
      type: [recoveryStageSchema],
      default: [],
    },
  },
  { _id: false }
);

// SECTION 14 (NEW): Surgical Risks & Prevention
const riskItemSchema = new mongoose.Schema(
  {
    riskTitle: { type: String, trim: true, default: "" },
    riskDescription: { type: String, trim: true, default: "" },
    severity: { type: String, trim: true, default: "Low" },
  },
  { _id: false }
);

const preventionPointSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const surgicalRisksSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    risks: { type: [riskItemSchema], default: [] },
    preventionPoints: { type: [preventionPointSchema], default: [] },
  },
  { _id: false }
);

// SECTION 15: Pricing
const pricingSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    warningText: {
      type: String,
      trim: true,
      default: "",
    },
    pricingFactors: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    pricingStats: {
      type: [statSchema],
      default: [],
    },
    ctaTextWhatsApp: {
      type: buttonSchema,
      default: () => ({}),
    },
    ctaTextCall: {
      type: buttonSchema,
      default: () => ({}),
    },
    ctaTextGuide: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// SECTION 16: Meet Your Surgeons
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    doctorImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    experience: {
      type: String,
      trim: true,
      default: "",
    },
    proceduresCount: {
      type: String,
      trim: true,
      default: "",
    },
    qualifications: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    specializations: {
      type: [String],
      default: [],
    },
    credentials: {
      type: [String],
      default: [],
    },
    memberships: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [imageFieldSchema],
      default: [],
    },
    profileButtonText: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const doctorsSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    doctors: {
      type: [doctorSchema],
      default: [],
    },
    topButtonText: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

// SECTION 17 (NEW): Real Patient Results
const patientResultCaseSchema = new mongoose.Schema(
  {
    patientName: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    graftCount: { type: String, trim: true, default: "" },
    technique: { type: String, trim: true, default: "" },
    recoveryTime: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    beforeImage: { type: imageFieldSchema, default: () => ({}) },
    afterImage: { type: imageFieldSchema, default: () => ({}) },
    displayOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const patientResultsSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    cases: { type: [patientResultCaseSchema], default: [] },
  },
  { _id: false }
);

// SECTION 18: Visit Clinic
const infoCardSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const visitClinicSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML / Rich Text
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },
    mapEmbedUrl: {
      type: String,
      trim: true,
      default: "",
    },
    nearbyLocations: {
      type: [String],
      default: [],
    },
    informationCards: {
      type: [infoCardSchema],
      default: [],
    },
    buttonText: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const contactCardSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
    ext: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const consultationLeftSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    contactCards: {
      type: [contactCardSchema],
      default: [],
    },
  },
  { _id: false }
);

const consultationFormConfigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    servicesDropdown: {
      type: [String],
      default: [],
    },
    submitButtonText: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const consultationSectionSchema = new mongoose.Schema(
  {
    backgroundImage: {
      type: imageFieldSchema,
      default: () => ({}),
    },
    leftSide: {
      type: consultationLeftSchema,
      default: () => ({}),
    },
    consultationFormConfig: {
      type: consultationFormConfigSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// SECTION 20: FAQ
const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      default: "",
    },
    answer: {
      type: String, // Supports HTML / SunEditor
      trim: true,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    faqs: {
      type: [faqItemSchema],
      default: [],
    },
    ctaButtonText: {
      type: buttonSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

// DYNAMIC INTERNAL LINKS SCHEMA
const internalLinkItemSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    badge: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const internalLinksSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    links: { type: [internalLinkItemSchema], default: [] },
  },
  { _id: false }
);

const whyChoosePointSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const whyChooseUsSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    points: { type: [whyChoosePointSchema], default: [] },
  },
  { _id: false }
);

// ─── ROOT SCHEMA ─────────────────────────────────────────────────────────────

const surgeryPageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pageName: {
      type: String,
      required: true,
      trim: true,
    },
    landingCardImage: {
      image: { type: String, trim: true, default: "" },
      imageAlt: { type: String, trim: true, default: "" },
    },
    city: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    seo: {
      type: seoSchema,
      default: () => ({}),
    },
    hero: {
      type: heroSectionSchema,
      default: () => ({}),
    },
    introduction: {
      type: introductionSectionSchema,
      default: () => ({}),
    },
    safetyInfo: {
      type: safetyInfoSectionSchema,
      default: () => ({}),
    },
    surgeryTypes: {
      type: surgeryTypesSectionSchema,
      default: () => ({}),
    },
    bestSurgeryChecklist: {
      type: bestSurgeryChecklistSectionSchema,
      default: () => ({}),
    },
    candidateSuitability: {
      type: candidateSuitabilitySectionSchema,
      default: () => ({}),
    },
    beforeSurgeryTimeline: {
      type: beforeSurgeryTimelineSectionSchema,
      default: () => ({}),
    },
    procedureScience: {
      type: procedureScienceSectionSchema,
      default: () => ({}),
    },
    safety: {
      type: safetySectionSchema,
      default: () => ({}),
    },
    techniques: {
      type: surgicalTechniquesSectionSchema,
      default: () => ({}),
    },
    qualityBenchmarks: {
      type: qualityBenchmarkSectionSchema,
      default: () => ({}),
    },
    procedureTimeline: {
      type: procedureTimelineSectionSchema,
      default: () => ({}),
    },
    recoveryTimeline: {
      type: recoveryTimelineSectionSchema,
      default: () => ({}),
    },
    surgicalRisks: {
      type: surgicalRisksSectionSchema,
      default: () => ({}),
    },
    doctors: {
      type: doctorsSectionSchema,
      default: () => ({}),
    },
    patientResults: {
      type: patientResultsSectionSchema,
      default: () => ({}),
    },
    pricing: {
      type: pricingSectionSchema,
      default: () => ({}),
    },
    visitClinic: {
      type: visitClinicSectionSchema,
      default: () => ({}),
    },
    consultation: {
      type: consultationSectionSchema,
      default: () => ({}),
    },
    faq: {
      type: faqSchema,
      default: () => ({}),
    },
    internalLinks: {
      type: internalLinksSectionSchema,
      default: () => ({}),
    },
    whyChooseUs: {
      type: whyChooseUsSectionSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

export default process.env.NODE_ENV === "development"
  ? (() => {
      if (mongoose.models.SurgeryPage) {
        mongoose.deleteModel("SurgeryPage");
      }
      return mongoose.model("SurgeryPage", surgeryPageSchema);
    })()
  : mongoose.models.SurgeryPage || mongoose.model("SurgeryPage", surgeryPageSchema);