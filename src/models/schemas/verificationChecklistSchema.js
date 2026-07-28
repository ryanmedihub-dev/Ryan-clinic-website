import mongoose from "mongoose";

export const verificationChecklistSchema = new mongoose.Schema(
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
    checked: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

export default verificationChecklistSchema;
