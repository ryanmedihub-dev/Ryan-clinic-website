import mongoose from "mongoose";

export const galleryImageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    alt: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

export default galleryImageSchema;
