import mongoose from "mongoose";

const { Schema, models, model } = mongoose;
const imageSchema = new Schema(
    {
        url: {
            type: String,
            default: "",
            trim: true,
        },

        alt: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);
const buttonSchema = new Schema(
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
const statSchema = new Schema(
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
const badgeSchema = new Schema(
    {
        text: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);
const textItemSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

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

const generalSchema = new Schema(
    {


        slugHistory: {
            type: [String],
            default: [],
        },

        shortDescription: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);
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
const doctorCardSchema = new Schema(
    {
        image: {
            type: imageSchema,
            default: () => ({}),
        },

        doctorName: {
            type: String,
            default: "",
            trim: true,
        },

        qualification: {
            type: String,
            default: "",
            trim: true,
        },

        designation: {
            type: String,
            default: "",
            trim: true,
        },

        experience: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);
const heroSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        featurePills: {
            type: [textItemSchema],
            default: [],
        },

        buttons: {
            type: [buttonSchema],
            default: [],
        },

        stats: {
            type: [statSchema],
            default: [],
        },

        doctorCard: {
            type: doctorCardSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const highlightBoxSchema = new Schema(
    {
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

        icon: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
);
const skillCardSchema = new Schema(
    {
        image: {
            type: imageSchema,
            default: () => ({}),
        },

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

        button: {
            type: buttonSchema,
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
const whySkillSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        highlightBox: {
            type: highlightBoxSchema,
            default: () => ({}),
        },

        cards: {
            type: [skillCardSchema],
            default: [],
        },
    },
    { _id: false }
);
const benefitCardSchema = new Schema(
    {
        number: {
            type: String,
            default: "",
            trim: true,
        },

        icon: {
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
const benefitsSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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
            type: [benefitCardSchema],
            default: [],
        },
    },
    { _id: false }
);
const accordionItemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
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
const whyClinicSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        image: {
            type: imageSchema,
            default: () => ({}),
        },

        stats: {
            type: [statSchema],
            default: [],
        },

        accordions: {
            type: [accordionItemSchema],
            default: [],
        },
    },
    { _id: false }
);
const timelineStepSchema = new Schema(
    {
        stepNumber: {
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

        image: {
            type: imageSchema,
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
const timelineCtaSchema = new Schema(
    {
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

        button: {
            type: buttonSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const surgeonRoleSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        steps: {
            type: [timelineStepSchema],
            default: [],
        },

        bottomCTA: {
            type: timelineCtaSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const comparisonItemSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);
const comparisonCardSchema = new Schema(
    {
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

        footer: {
            type: String,
            default: "",
            trim: true,
        },

        items: {
            type: [comparisonItemSchema],
            default: [],
        },

        button: {
            type: buttonSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const comparisonSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        surgeonCard: {
            type: comparisonCardSchema,
            default: () => ({}),
        },

        technicianCard: {
            type: comparisonCardSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const galleryImageSchema = new Schema(
    {
        image: {
            type: imageSchema,
            default: () => ({}),
        },

        caption: {
            type: String,
            default: "",
            trim: true,
        },

        displayOrder: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);
const qualificationSchema = new Schema(
    {
        icon: {
            type: String,
            default: "",
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
const leadSurgeonSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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
            type: imageSchema,
            default: () => ({}),
        },

        gallery: {
            type: [galleryImageSchema],
            default: [],
        },

        qualifications: {
            type: [qualificationSchema],
            default: [],
        },

        stats: {
            type: [statSchema],
            default: [],
        },

        buttons: {
            type: [buttonSchema],
            default: [],
        },
    },
    { _id: false }
);
const warningBoxSchema = new Schema(
    {
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

        icon: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { _id: false }
); const bookingChecklistSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        questions: {
            type: [textItemSchema],
            default: [],
        },

        warningBox: {
            type: warningBoxSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const procedureCardSchema = new Schema(
    {
        image: {
            type: imageSchema,
            default: () => ({}),
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

        button: {
            type: buttonSchema,
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
const proceduresSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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
            type: [procedureCardSchema],
            default: [],
        },
    },
    { _id: false }
);
const ctaFeatureSchema = new Schema(
    {
        icon: {
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
const consultationCtaSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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

        image: {
            type: imageSchema,
            default: () => ({}),
        },

        stats: {
            type: [statSchema],
            default: [],
        },

        buttons: {
            type: [buttonSchema],
            default: [],
        },

        featureCard: {
            type: ctaFeatureSchema,
            default: () => ({}),
        },
    },
    { _id: false }
);
const faqSchema = new Schema(
    {
        badge: {
            type: badgeSchema,
            default: () => ({}),
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
const settingsSchema = new Schema(
    {
        isDeleted: {
            type: Boolean,
            default: false,
        },

        deletedAt: {
            type: Date,
            default: null,
        },
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
    },
    { _id: false }
);
const surgeonPageSchema = new Schema(
    {
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
        general: {
            type: generalSchema,
            default: () => ({}),
        },

        seo: {
            type: seoSchema,
            default: () => ({}),
        },

        hero: {
            type: heroSchema,
            default: () => ({}),
        },

        whySkill: {
            type: whySkillSchema,
            default: () => ({}),
        },

        benefits: {
            type: benefitsSchema,
            default: () => ({}),
        },

        whyClinic: {
            type: whyClinicSchema,
            default: () => ({}),
        },

        surgeonRole: {
            type: surgeonRoleSchema,
            default: () => ({}),
        },

        comparison: {
            type: comparisonSchema,
            default: () => ({}),
        },

        leadSurgeon: {
            type: leadSurgeonSchema,
            default: () => ({}),
        },

        bookingChecklist: {
            type: bookingChecklistSchema,
            default: () => ({}),
        },

        procedures: {
            type: proceduresSchema,
            default: () => ({}),
        },

        consultationCTA: {
            type: consultationCtaSchema,
            default: () => ({}),
        },

        faq: {
            type: faqSchema,
            default: () => ({}),
        },

        settings: {
            type: settingsSchema,
            default: () => ({}),
        },

    },
    {
        timestamps: true,
    }
);
surgeonPageSchema.index({
    "settings.status": 1,
});

surgeonPageSchema.index({
    "settings.displayOrder": 1,
});

surgeonPageSchema.index({
    "settings.featured": 1,
});
const SurgeonPage =
    models.SurgeonPage || model("SurgeonPage", surgeonPageSchema);

export default SurgeonPage;