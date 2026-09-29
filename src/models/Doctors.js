import mongoose from "mongoose";
import imageSchema from "./schemas/imageSchema.js";
import ctaSchema from "./schemas/ctaSchema.js";
import statSchema from "./schemas/statSchema.js";
import breadcrumbSchema from "./schemas/breadcrumbSchema.js";
import cardSchema from "./schemas/cardSchema.js";
import faqSchema from "./schemas/faqSchema.js";
import doctorQuestionSchema from "./schemas/doctorQuestionSchema.js";
import timelineStepSchema from "./schemas/timelineStepSchema.js";
import credentialTabSchema from "./schemas/credentialTabSchema.js";
import contactCardSchema from "./schemas/contactCardSchema.js";
import packageSchema from "./schemas/packageSchema.js";
import bottomCtaSchema from "./schemas/bottomCtaSchema.js";
import contactSchema from "./schemas/contactSchema.js";
import galleryImageSchema from "./schemas/galleryImageSchema.js";
import addressSchema from "./schemas/addressSchema.js";
import timingSchema from "./schemas/timingSchema.js";
import comparisonCardSchema from "./schemas/comparisonCardSchema.js";
import comparisonRowSchema from "./schemas/comparisonRowSchema.js";
import titleDescriptionSchema from "./schemas/titleDescriptionSchema.js";
import orderedTitleSchema from "./schemas/orderedTitleSchema.js";
import verificationChecklistSchema from "./schemas/verificationChecklistSchema.js";
import surgicalProcessStepSchema from "./schemas/surgicalProcessStepSchema.js";

/**
 * Enterprise Doctor CMS Schema for Ryan Skin & Hair Transplant Clinic
 * Next.js 15 + MongoDB + Mongoose Implementation (Refactored & Production Ready)
 */
const doctorSchema = new mongoose.Schema(
  {
    /* ── Document Identification & Metadata ── */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    pageName: {
      type: String,
      trim: true,
      default: "",
    },

    /* ── Schema Versioning & Soft Delete / Audit Lifecycle ── */
    schemaVersion: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    /* ── 1. Basic Information (Single Source of Truth) ── */
    basicInfo: {
      doctorName: { type: String, required: true, trim: true },
      designation: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
      yearsExperience: { type: Number, min: 0, default: 0 },
      proceduresCount: { type: Number, min: 0, default: 0 },
      successRate: { type: String, trim: true, default: "95%+" },
      rating: { type: Number, min: 0, max: 5, default: 5.0 },
      phoneNumber: {
        type: String,
        trim: true,
        default: "",
        match: [/^[0-9+\s-]{7,15}$/, "Please enter a valid phone number"],
      },
      whatsappNumber: {
        type: String,
        trim: true,
        default: "",
        match: [/^[0-9+\s-]{7,15}$/, "Please enter a valid WhatsApp number"],
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      },
      clinicName: { type: String, trim: true, default: "" },
      clinicAddress: { type: String, trim: true, default: "" },
      languages: {
        type: [{ type: String, trim: true }],
        default: [],
      },
      profileImage: { type: imageSchema, default: () => ({}) },
    },

    /* ── 2. SEO & Metadata ── */
    seo: {
      metaTitle: { type: String, trim: true, default: "" },
      metaDescription: { type: String, trim: true, default: "" },
      keywords: { type: String, trim: true, default: "" },
      canonicalUrl: { type: String, trim: true, default: "" },
      robots: {
        type: String,
        enum: [
          "index, follow",
          "noindex, follow",
          "index, nofollow",
          "noindex, nofollow",
        ],
        default: "index, follow",
      },
      openGraphImage: { type: imageSchema, default: () => ({}) },
      useGlobalSEO: { type: Boolean, default: false },
    },

    /* ── 3. Hero Section ── */
    hero: {
      title: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      heroImage: { type: imageSchema, default: () => ({}) },
      breadcrumbs: {
        type: [breadcrumbSchema],
        default: [],
      },
      whatsappCTA: { type: ctaSchema, default: () => ({}) },
      callCTA: { type: ctaSchema, default: () => ({}) },
      stats: {
        type: [statSchema],
        default: [],
      },
    },

    /* ── 4. Why Doctor-Led Hair Transplant Matters ── */
    whyItMatters: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      secondaryDescription: { type: String, trim: true, default: "" },
      highlightBox: { type: String, trim: true, default: "" },
      image: { type: imageSchema, default: () => ({}) },
      floatingStats: {
        type: [statSchema],
        default: [],
      },
      bottomCard: { type: cardSchema, default: () => ({}) },
      primaryCTA: { type: ctaSchema, default: () => ({}) },
      secondaryCTA: { type: ctaSchema, default: () => ({}) },
    },

    /* ── 5. Doctor Standards & Excellence ── */
    doctorStandards: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      cards: {
        type: [cardSchema],
        default: [],
      },
    },

    /* ── 6. Qualifications & Credentials ── */
    credentials: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      cardHeading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      bottomNote: { type: String, trim: true, default: "" },
      tabs: {
        type: [credentialTabSchema],
        default: [],
      },
      bottomCTA: { type: bottomCtaSchema, default: () => ({}) },
    },

    /* ── 7. Verification & Safety Steps ── */
    verification: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      steps: {
        type: [titleDescriptionSchema],
        default: [],
      },
      checklist: {
        type: [verificationChecklistSchema],
        default: [],
      },
      progressCard: { type: titleDescriptionSchema, default: () => ({}) },
    },

    /* ── 8. Doctor vs Technician Comparison Matrix ── */
    comparison: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      leftCard: { type: comparisonCardSchema, default: () => ({}) },
      rightCard: { type: comparisonCardSchema, default: () => ({}) },
      rows: {
        type: [comparisonRowSchema],
        default: [],
      },
    },

    /* ── 9. Surgeon Profile & Bio ── */
    surgeonProfile: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      achievementsHeading: { type: String, trim: true, default: "" },
      about: { type: String, trim: true, default: "" },
      philosophy: { type: String, trim: true, default: "" },
      whyChooseDoctor: {
        type: [cardSchema],
        default: [],
      },
      achievements: {
        type: [titleDescriptionSchema],
        default: [],
      },
      consultationHeading: { type: String, trim: true, default: "" },
      consultationIncludes: {
        type: [titleDescriptionSchema],
        default: [],
      },
      primaryCTA: { type: ctaSchema, default: () => ({}) },
      secondaryCTA: { type: ctaSchema, default: () => ({}) },
    },

    /* ── 10. Surgery Timeline ── */
    surgeryTimeline: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      steps: {
        type: [timelineStepSchema],
        default: [],
      },
    },

    /* ── 11. Consultation Section ── */
    consultation: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      rightCardBadge: { type: String, trim: true, default: "" },
      rightCardHeading: { type: String, trim: true, default: "" },
      rightCardDescription: { type: String, trim: true, default: "" },
      contactCards: {
        type: [contactCardSchema],
        default: [],
      },
      form: {
        title: { type: String, trim: true, default: "" },
        services: {
          type: [{ type: String, trim: true }],
          default: [],
        },
        submitButtonText: { type: String, trim: true, default: "" },
      },
    },

    /* ── 12. Questions to Ask Your Surgeon ── */
    questionsToAsk: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      questions: {
        type: [doctorQuestionSchema],
        default: [],
      },
      ctaCard: { type: bottomCtaSchema, default: () => ({}) },
    },

    /* ── Key Facts & Medical Reviewer ── */
    keyFacts: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      qualifications: { type: String, trim: true, default: "" },
      registration: { type: String, trim: true, default: "" },
      specialisation: { type: String, trim: true, default: "" },
      experience: { type: String, trim: true, default: "" },
      procedures: { type: String, trim: true, default: "" },
      memberships: { type: String, trim: true, default: "" },
      location: { type: String, trim: true, default: "" },
      consultation: { type: String, trim: true, default: "" },
    },
    medicalReviewer: {
      isVerified: { type: Boolean, default: false },
      reviewerName: { type: String, trim: true, default: "" },
      qualifications: { type: String, trim: true, default: "" },
      registration: { type: String, trim: true, default: "" },
    },

    /* ── Doctor Card Fields (listing + landing pages) ── */
    doctorCard: {
      /* One-line credential string shown under doctor name in cards */
      shortQualification: { type: String, trim: true, default: "" },
      /* Short paragraph bio shown in /doctors listing cards */
      cardDescription: { type: String, trim: true, default: "" },
      /* Education list used in OurDoctorSection on city landing pages */
      qualifications: {
        type: [
          new mongoose.Schema(
            {
              degree: { type: String, trim: true, default: "" },
              institute: { type: String, trim: true, default: "" },
            },
            { _id: false }
          ),
        ],
        default: [],
      },
      /* Certification & awards list for OurDoctorSection */
      certifications: {
        type: [{ type: String, trim: true }],
        default: [],
      },
      /* Specialization tags for both carousel and OurDoctorSection */
      specializations: {
        type: [{ type: String, trim: true }],
        default: [],
      },
    },

    /* ── 13. Great Doctor Qualities ── */
    greatDoctorQualities: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      cards: {
        type: [cardSchema],
        default: [],
      },
    },

    /* ── 14. Warning Signs & Red Flags ── */
    warningSigns: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      image: { type: imageSchema, default: () => ({}) },
      cards: {
        type: [cardSchema],
        default: [],
      },
      bottomCTA: { type: bottomCtaSchema, default: () => ({}) },
    },

    /* ── 14B. Procedures Our Doctors Perform ── */
    proceduresPerformed: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      cards: {
        type: [cardSchema],
        default: [],
      },
    },

    /* ── 15. Surgical Process Steps ── */
    surgicalProcess: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      steps: {
        type: [surgicalProcessStepSchema],
        default: [],
      },
    },

    /* ── 16. Pricing & Packages ── */
    pricing: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      packageSectionHeading: { type: String, trim: true, default: "" },
      packageSectionDescription: { type: String, trim: true, default: "" },
      packages: {
        type: [packageSchema],
        default: [],
      },
      disclaimer: { type: String, trim: true, default: "" },
    },

    /* ── 17. Visit Clinic Information ── */
    visitClinic: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      clinicImage: { type: imageSchema, default: () => ({}) },
      gallery: {
        type: [galleryImageSchema],
        default: [],
      },
      address: { type: addressSchema, default: () => ({}) },
      timings: {
        type: [timingSchema],
        default: [],
      },
      mapUrl: { type: String, trim: true, default: "" },
      contact: { type: contactSchema, default: () => ({}) },
      nearbyLocations: {
        type: [{ type: String, trim: true }],
        default: [],
      },
      informationCards: {
        type: [cardSchema],
        default: [],
      },
    },

    /* ── 18. Frequently Asked Questions ── */
    faq: {
      sectionLabel: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      faqs: {
        type: [faqSchema],
        default: [],
      },
    },

    /* ── Page Control & Status ── */
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ── Compound & Production Performance Indexes ── */
doctorSchema.index({ status: 1, displayOrder: 1 });
doctorSchema.index({ status: 1, featured: 1 });
doctorSchema.index({ deletedAt: 1, status: 1 });
doctorSchema.index({ "basicInfo.city": 1 });

export const Doctor =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
