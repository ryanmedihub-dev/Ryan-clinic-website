import mongoose from "mongoose";

export const comparisonRowSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      default: "",
    },
    parameter: {
      type: String,
      trim: true,
      default: "",
    },
    doctorValue: {
      type: String,
      trim: true,
      default: "",
    },
    technicianValue: {
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

export default comparisonRowSchema;
