import mongoose from "mongoose"


const patientSchema = new mongoose.Schema({
    cardImage: {
        type: String,
        required: true,
    },
    beforeImage: {
        type: String,
        required: true,
    },
    afterImage: {
        type: String,
        required: true,
    },
    altImage: {
        type: String,
        required: true,
    },
    clinicLocation: {
        type: String,
        required: true,
        trim: true,
    },
    graftCount: {
        type: Number,
        required: true,
        min: 1,
    },
    techniqueUsed: {
        type: String,
        required: true,
        trim: true,
    },
    timeline: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });


const gallerySchema = new mongoose.Schema({

    seo: {
        metaTitle: {
            type: String,
            required: true,
            trim: true,
        },

        metaDescription: {
            type: String,
            required: true,
            trim: true,
        },
    },
    banner: {
        title: {
            type: String,
            required: true,
            minLength: 3,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            trim: true,
        },
        bannerImage: {
            type: String,
            required: true,

        },
        bannerAltImage: {
            type: String,
            required: true,
            trim: true,
        }

    },
    heroSection: {
        title: {
            type: String,
            required: true,
            minLength: 3,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minLength: 4
        },
        afterImage: {
            type: String,
            required: true
        },
        beforeImage: {
            type: String,
            required: true,
        },
        altImage: {
            type: String,
            required: true
        }

    },

    gallerySection: [
        {
            category: {
                type: String,
                required: true,
                enum: ["graft", "technique"],


            },
            title: {
                type: String,
                required: true,
                trim: true
            },
            subTitle: {
                type: String,
                required: true,
                trim: true,
                minLength: 5,

            },
            cases: [patientSchema]

        }

    ],
    faqSection: [
        {
            question: {
                type: String,
                required: true,
                trim: true,
            },
            answer: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ]



}, { timestamps: true })

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);