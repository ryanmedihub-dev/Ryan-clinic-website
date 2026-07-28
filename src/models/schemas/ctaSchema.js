import mongoose from "mongoose";

export const ctaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      default: "",
    },
    url: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

export default ctaSchema;
