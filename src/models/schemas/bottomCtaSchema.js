import mongoose from "mongoose";

export const bottomCtaSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      trim: true,
      default: "",
    },
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
  },
  { _id: false }
);

export default bottomCtaSchema;
