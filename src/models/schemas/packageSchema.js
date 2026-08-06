import mongoose from "mongoose";

export const packageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: String,
      trim: true,
      default: "",
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    buttonText: {
      type: String,
      trim: true,
      default: "",
    },
    buttonLink: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    priceNote: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

export default packageSchema;
