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
      type: String, // Supports HTML
      trim: true,
      default: "",
    },
    highlightBoxText: {
      type: String, // Supports HTML
      trim: true,
      default: "",
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
      type: String,
      trim: true,
      default: "",
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
      type: String,
      trim: true,
      default: "",
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

const faqItemSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
      default: "",
    },
    answer: {
      type: String, // Supports HTML
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
    doctors: {
      type: doctorsSectionSchema,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SurgeryPage ||
  mongoose.model("SurgeryPage", surgeryPageSchema);