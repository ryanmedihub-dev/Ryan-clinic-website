import mongoose from "mongoose";




const seoSchema = new mongoose.Schema(
    {
        metaTitle: {
            type: String,
            trim: true,
            default: ""
        },
        metaDescription: {
            type: String,
            trim: true,
        },
        keywords: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const bannerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: ""
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        imageAlt: {
            type: String,
            trim: true,
            default: ""
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

const introductionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const procedureCardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const procedureScienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        cards: {
            type: [procedureCardSchema],
            default: []
        }
    },
    { _id: false }
);

const faqItemSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            trim: true,
        },

        answer: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const faqSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        subtitle: {
            type: String,
            trim: true,
        },

        faqs: { type: [faqItemSchema], default: [] }

    },
    { _id: false }
);

const safetyCardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);

const safetySectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        cards: {
            type: [safetyCardSchema],
            default: []
        },
    },
    { _id: false }
);

const techniqueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        badge: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);
const techniquesSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        techniques: {
            type: [techniqueSchema],
            default: [],
        },
    },
    { _id: false }
);

const recoveryCardSchema = new mongoose.Schema(
    {
        timeline: {
            type: String,
            trim: true,
        },

        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    { _id: false }
);
const recoverySectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        cards: {
            type: [recoveryCardSchema],
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
        },

        designation: {
            type: String,
            trim: true,
        },

        image: {
            type: String,
            default: ""
        },

        imageAlt: {
            type: String,
            trim: true,
        },

        qualifications: {
            type: [String],
            default: [],
        },
    },
    { _id: false }
);

const doctorsSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        doctors: {
            type: [doctorSchema],
            default: [],
        },
    },
    { _id: false }
);

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
        seo: seoSchema,

        banner: bannerSchema,

        stats: { type: [statSchema], default: [] },



        introduction: introductionSchema,

        procedureScience: procedureScienceSchema,

        faq: faqSchema,
        safety: safetySectionSchema,

        techniques: techniquesSectionSchema,

        recovery: recoverySectionSchema,

        doctors: doctorsSectionSchema,
    },
    {
        timestamps: true,
    }
);
export default mongoose.models.surgeryPage ||
    mongoose.model("surgeryPage", surgeryPageSchema);