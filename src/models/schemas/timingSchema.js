import mongoose from "mongoose";

export const timingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      default: "",
    },
    day: {
      type: String,
      trim: true,
      default: "",
    },
    time: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

export default timingSchema;
