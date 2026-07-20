import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["whatsapp", "call", "form"],
            required: true,
            trim: true,
        },

        ctaName: {
            type: String,
            required: true,
            trim: true,
        },

        buttonLocation: {
            type: String,
            required: true,
            trim: true,
        },

        pageName: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Tracker ||
    mongoose.model("Tracker", trackerSchema);