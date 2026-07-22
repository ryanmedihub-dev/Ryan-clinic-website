import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema(
  {
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
  },
  { _id: false }
);

export default imageSchema;
