import mongoose from "mongoose";
import imageSchema from "./imageSchema.js";

export const comparisonCardSchema = new mongoose.Schema(
  {
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
    badge: {
      type: String,
      trim: true,
      default: "",
    },
    disclaimer: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: imageSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

export default comparisonCardSchema;
