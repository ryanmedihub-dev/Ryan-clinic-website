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
    geoRegion: {
      type: String,
      default: "",
      trim: true,
    },
    geoPlacename: {
      type: String,
      default: "",
      trim: true,
    },
    geoPosition: {
      type: String,
      default: "",
      trim: true,
    },
    icbm: {
      type: String,
      default: "",
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
      default: "",
      trim: true,
    },
    value: {
      type: String,
      default: "",
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
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const serviceButtonSchema = new Schema(
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
      default: "",
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
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const graftPricingCardSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
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
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const comparisonRowSchema = new Schema(
  {
    label: {
      type: String,
      default: "",
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
      default: "",
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
    icon: { type: String, default: "", trim: true },
    title: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    text: { type: String, default: "", trim: true },
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
      default: "",
      trim: true,
    },
    title: {
      type: String,
      default: "",
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
    /* Canonical items array — used by admin and frontend going forward.
       hiddenCosts kept for backward compat with existing Hair Transplant docs. */
    items: {
      type: [hiddenCostItemSchema],
      default: [],
    },
    hiddenCosts: {
      type: [hiddenCostItemSchema],
      default: [],
    },
    guarantees: {
      type: [guaranteeItemSchema],
      default: [],
    },
    /* Canonical disclosures — kept alongside existing guarantees */
    disclosures: {
      type: [hiddenCostItemSchema],
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
      default: "",
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
    emiBadge: {
      type: String,
      default: "",
      trim: true,
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

const consultationBenefitSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const consultationButtonSchema = new Schema(
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
      default: "primary",
      trim: true,
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
    features: {
      type: [Schema.Types.Mixed],
      default: [],
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
    buttonText: {
      type: String,
      default: "Book Free Consultation",
      trim: true,
    },
    buttonLink: {
      type: String,
      default: "https://wa.me/919911111247",
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
      default: "",
      trim: true,
    },
    answer: {
      type: String,
      default: "",
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
    items: {
      type: [faqItemSchema],
      default: [],
    },
    faqs: {
      type: [faqItemSchema],
      default: [],
    },
  },
  { _id: false }
);

/* ==============================================================================
   10.1 Section Visibility Schema
============================================================================== */

const sectionVisibilitySchema = new Schema(
  {
    hero: { type: Boolean, default: true },
    intro: { type: Boolean, default: true },
    /* Section 5 — How Much Does It Cost? */
    services: { type: Boolean, default: true },
    /* Section 6 — Per Graft / Session Pricing */
    pricing: { type: Boolean, default: true },
    /* Section 7 — Pricing by Graft Count / Treatment Size */
    graftPricing: { type: Boolean, default: true },
    /* Section 8 — What's Included */
    includedSection: { type: Boolean, default: true },
    /* Section 9 — What Affects the Cost? */
    priceFactors: { type: Boolean, default: true },
    /* Section 10 — Technique Comparison */
    techniqueComparison: { type: Boolean, default: true },
    /* Section 11 — FUE vs FUT */
    fueVsFut: { type: Boolean, default: true },
    /* Section 12 — Delhi vs Turkey */
    delhiVsTurkey: { type: Boolean, default: true },
    /* Section 13 — Affordable / Cheap Treatment */
    cheapFue: { type: Boolean, default: false },
    /* Section 14 — EMI & Payment Options */
    emi: { type: Boolean, default: true },
    /* Section 15 — Ryan Clinic Transparent Pricing */
    ryanPricing: { type: Boolean, default: true },
    /* Section 16 — Why Ryan Clinic */
    whyRyan: { type: Boolean, default: true },
    /* Section 17 — Myths vs Facts */
    mythsFacts: { type: Boolean, default: true },
    /* Section 18 — Clinic / Location */
    clinic: { type: Boolean, default: true },
    /* Section 19 — Consultation / Quote CTA */
    consultation: { type: Boolean, default: true },
    /* Section 20 — FAQ */
    faq: { type: Boolean, default: true },
  },
  { _id: false }
);

/* ==============================================================================
   10.2 Generic Pricing Schema
============================================================================== */

const pricingCardFeatureSchema = new Schema(
  {
    text: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const pricingCardSchema = new Schema(
  {
    title: { type: String, default: "", trim: true },
    price: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    features: { type: [Schema.Types.Mixed], default: [] },
    badge: { type: String, default: "", trim: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const pricingSchema = new Schema(
  {
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    cards: { type: [pricingCardSchema], default: [] },
  },
  { _id: false }
);

/* ==============================================================================
   11. Generic Pricing Options Schema (PRP sessions, packages, future cost types)
   — Hair Transplant pages use graftPricing; PRP and others use pricingOptions
============================================================================== */

const pricingOptionItemSchema = new Schema(
  {
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    price: { type: String, default: "", trim: true },
    priceSuffix: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    badge: { type: String, default: "", trim: true },
    features: { type: [{ type: String }], default: [] },
    ctaText: { type: String, default: "Book Consultation", trim: true },
    ctaLink: { type: String, default: "/contact", trim: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const pricingOptionsSchema = new Schema(
  {
    badge: { type: String, default: "", trim: true },
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    items: { type: [pricingOptionItemSchema], default: [] },
  },
  { _id: false }
);

/* ==============================================================================
   12. Content Sections Schema (Generic multi-purpose CMS sections)
   Supports: educational content, comparison tables, highlights, checklists
   sectionKey identifies each section (e.g. "session-vs-package", "worth-it")
============================================================================== */

const contentSectionItemSchema = new Schema(
  {
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    value: { type: String, default: "", trim: true },
    label: { type: String, default: "", trim: true },
    secondaryValue: { type: String, default: "", trim: true },
    secondaryLabel: { type: String, default: "", trim: true },
    badge: { type: String, default: "", trim: true },
    icon: { type: String, default: "", trim: true },
    ctaText: { type: String, default: "", trim: true },
    ctaLink: { type: String, default: "", trim: true },
    highlight: { type: Boolean, default: false },
    type: { type: String, default: "", trim: true }, // e.g. "positive", "negative", "neutral"
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const contentSectionSchema = new Schema(
  {
    sectionKey: { type: String, default: "", trim: true },
    badge: { type: String, default: "", trim: true },
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    layout: {
      type: String,
      enum: ["content", "cards", "checklist", "highlight", "comparison", "timeline", "suitability"],
      default: "cards",
    },
    items: { type: [contentSectionItemSchema], default: [] },
    displayOrder: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

/* ==============================================================================
   13. Myths vs Facts Schema
============================================================================== */

const mythFactPairSchema = new Schema(
  {
    myth: { type: String, default: "", trim: true },
    fact: { type: String, default: "", trim: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const mythsFactsSchema = new Schema(
  {
    badge: { type: String, default: "", trim: true },
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    pairs: { type: [mythFactPairSchema], default: [] },
  },
  { _id: false }
);

/* ==============================================================================
   14. Visit Clinic Schema (location/address block)
============================================================================== */

const visitClinicSchema = new Schema(
  {
    badge: { type: String, default: "", trim: true },
    heading: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    mapEmbedUrl: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    whatsapp: { type: String, default: "", trim: true },
    timings: { type: String, default: "", trim: true },
    landmark: { type: String, default: "", trim: true },
    nearbyAreas: { type: [String], default: [] },
    buttonText: { type: String, default: "Get Directions", trim: true },
    buttonLink: { type: String, default: "", trim: true },
  },
  { _id: false }
);

/* ==============================================================================
   15. Settings Schema
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
      enum: ["hair-transplant", "prp", "dhi", "beard-transplant", "other"],
      default: "hair-transplant",
      trim: true,
    },

    sectionVisibility: {
      type: sectionVisibilitySchema,
      default: () => ({
        hero: true,
        intro: true,
        services: true,
        pricing: true,
        graftPricing: true,
        priceFactors: true,
        includedSection: true,
        consultation: true,
        faq: true,
        clinic: true,
      }),
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

    pricing: {
      type: pricingSchema,
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

    /* ---------- Generic / Multi-Type Sections ---------- */
    pricingOptions: {
      type: pricingOptionsSchema,
      default: () => ({}),
    },

    contentSections: {
      type: [contentSectionSchema],
      default: [],
    },

    mythsFacts: {
      type: mythsFactsSchema,
      default: () => ({}),
    },

    visitClinic: {
      type: visitClinicSchema,
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

costPageSchema.pre("validate", function (next) {
  const validTypes = ["hair-transplant", "prp", "dhi", "beard-transplant", "other"];
  if (!this.pageType || !validTypes.includes(this.pageType)) {
    this.pageType = "hair-transplant";
  }
  next();
});

/* ==============================================================================
   13. Model Export
   NOTE: In development we always delete and re-register the model so that
   hot-module-replacement schema changes take effect without a server restart.
   In production the standard `models.X || model(...)` caching pattern is used.
============================================================================== */

const CostPage =
  process.env.NODE_ENV === "development"
    ? (() => {
        if (models.CostPage) {
          mongoose.deleteModel("CostPage");
        }
        return model("CostPage", costPageSchema);
      })()
    : models.CostPage || model("CostPage", costPageSchema);

export default CostPage;