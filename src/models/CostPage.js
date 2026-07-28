import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

/* ==============================================================================
   1. SEO Schema
============================================================================== */

const seoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    canonical: {
      type: String,
      default: "",
      trim: true,
    },
    ogImage: {
      type: String,
      default: "",
      trim: true,
    },
    robots: {
      type: String,
      default: "index, follow",
      trim: true,
    },
  },
  { _id: false }
);

/* ==============================================================================
   2. Hero Section Schemas
============================================================================== */

const heroStatSchema = new Schema(
  {
    value: {
      type: String,
      default: "",
      trim: true,
    },
    label: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const heroButtonSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    variant: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  { _id: false }
);

const heroSchema = new Schema(
  {
    breadcrumbs: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    pricingLine: {
      type: String,
      default: "",
      trim: true,
    },
    heroImage: {
      type: String,
      default: "",
      trim: true,
    },
    heroImageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    buttons: {
      type: [heroButtonSchema],
      default: [],
    },
    stats: {
      type: [heroStatSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   3. Intro Section Schemas
============================================================================== */

const summaryRowSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const introButtonSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    variant: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  { _id: false }
);

const introSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    buttons: {
      type: [introButtonSchema],
      default: [],
    },
    summaryRows: {
      type: [summaryRowSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   4. Services / Procedures Section Schemas
============================================================================== */

const serviceFeatureSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const serviceButtonSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const serviceCardSchema = new Schema(
  {
    image: {
      type: String,
      default: "",
      trim: true,
    },
    imageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    startingPrice: {
      type: String,
      default: "",
      trim: true,
    },
    features: {
      type: [serviceFeatureSchema],
      default: [],
    },
    button: {
      type: serviceButtonSchema,
      default: () => ({}),
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const servicesSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    cards: {
      type: [serviceCardSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   5. Graft Pricing Tier Section Schemas
============================================================================== */

const graftFeatureSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const graftPricingCardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    graftRange: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    imageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    coverage: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
      trim: true,
    },
    recovery: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    features: {
      type: [graftFeatureSchema],
      default: [],
    },
    buttonText: {
      type: String,
      default: "Book Consultation",
      trim: true,
    },
    buttonLink: {
      type: String,
      default: "/contact",
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const graftPricingSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    cards: {
      type: [graftPricingCardSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   6. Technique Comparison Section Schemas
============================================================================== */

const comparisonValueSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const comparisonRowSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    values: {
      type: [comparisonValueSchema],
      default: [],
    },
  },
  { _id: false }
);

const techniqueColumnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const techniqueComparisonSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    columns: {
      type: [techniqueColumnSchema],
      default: [],
    },
    rows: {
      type: [comparisonRowSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   7. Included / Guarantee Section Schemas
============================================================================== */

const hiddenCostItemSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const guaranteeItemSchema = new Schema(
  {
    icon: {
      type: String,
      default: "✓",
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const includedSectionSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    hiddenCosts: {
      type: [hiddenCostItemSchema],
      default: [],
    },
    guarantees: {
      type: [guaranteeItemSchema],
      default: [],
    },
    buttonText: {
      type: String,
      default: "Get Written Graft Quote",
      trim: true,
    },
    buttonLink: {
      type: String,
      default: "/contact",
      trim: true,
    },
  },
  { _id: false }
);

/* ==============================================================================
   8. Price Factors & Financing Section Schemas
============================================================================== */

const priceFactorItemSchema = new Schema(
  {
    number: {
      type: String,
      default: "",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const emiPlanSchema = new Schema(
  {
    planTitle: {
      type: String,
      default: "",
      trim: true,
    },
    exampleText: {
      type: String,
      default: "",
      trim: true,
    },
    tagText: {
      type: String,
      default: "0% Interest",
      trim: true,
    },
  },
  { _id: false }
);

const priceFactorsSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    factors: {
      type: [priceFactorItemSchema],
      default: [],
    },
    emiHeading: {
      type: String,
      default: "0% EMI Available",
      trim: true,
    },
    emiSubheading: {
      type: String,
      default: "Pay comfortably in easy monthly installments.",
      trim: true,
    },
    emiPlans: {
      type: [emiPlanSchema],
      default: [],
    },
    areasServed: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   9. Consultation Section Schemas
============================================================================== */

const consultationStatSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const consultationBenefitSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const consultationButtonSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    variant: {
      type: String,
      enum: ["primary", "secondary"],
      default: "primary",
    },
  },
  { _id: false }
);

const consultationSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    doctorImage: {
      type: String,
      default: "",
      trim: true,
    },
    doctorImageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    stats: {
      type: [consultationStatSchema],
      default: [],
    },
    benefits: {
      type: [consultationBenefitSchema],
      default: [],
    },
    buttons: {
      type: [consultationButtonSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   10. FAQ Section Schemas
============================================================================== */

const faqItemSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const faqSchema = new Schema(
  {
    badge: {
      type: String,
      default: "",
      trim: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    faqs: {
      type: [faqItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   11. Settings Schema
============================================================================== */

const settingsSchema = new Schema(
  {
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    showInSitemap: {
      type: Boolean,
      default: true,
    },
    allowIndexing: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

/* ==============================================================================
   12. Main CostPage Schema
============================================================================== */

const costPageSchema = new Schema(
  {
    /* ---------- General Fields ---------- */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    slugHistory: {
      type: [String],
      default: [],
    },

    pageType: {
      type: String,
      default: "cost-page",
      trim: true,
    },

    /* ---------- SEO ---------- */
    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    /* ---------- Page Sections ---------- */
    hero: {
      type: heroSchema,
      default: () => ({}),
    },

    intro: {
      type: introSchema,
      default: () => ({}),
    },

    services: {
      type: servicesSchema,
      default: () => ({}),
    },

    graftPricing: {
      type: graftPricingSchema,
      default: () => ({}),
    },

    techniqueComparison: {
      type: techniqueComparisonSchema,
      default: () => ({}),
    },

    includedSection: {
      type: includedSectionSchema,
      default: () => ({}),
    },

    priceFactors: {
      type: priceFactorsSchema,
      default: () => ({}),
    },

    consultation: {
      type: consultationSchema,
      default: () => ({}),
    },

    faq: {
      type: faqSchema,
      default: () => ({}),
    },

    /* ---------- Settings ---------- */
    settings: {
      type: settingsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

/* ==============================================================================
   13. Model Export
============================================================================== */

const CostPage = models.CostPage || model("CostPage", costPageSchema);

export default CostPage;