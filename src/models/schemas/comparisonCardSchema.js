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
    // Doctor Card specific
    statValue: {
      type: String,
      trim: true,
      default: "",
    },
    statLabel: {
      type: String,
      trim: true,
      default: "",
    },
    experienceValue: {
      type: String,
      trim: true,
      default: "",
    },
    experienceLabel: {
      type: String,
      trim: true,
      default: "",
    },
    casesValue: {
      type: String,
      trim: true,
      default: "",
    },
    casesLabel: {
      type: String,
      trim: true,
      default: "",
    },
    councilValue: {
      type: String,
      trim: true,
      default: "",
    },
    councilLabel: {
      type: String,
      trim: true,
      default: "",
    },
    buttonText: {
      type: String,
      trim: true,
      default: "",
    },
    buttonUrl: {
      type: String,
      trim: true,
      default: "",
    },
    // Technician Card specific
    safetyNotice: {
      type: String,
      trim: true,
      default: "",
    },
    riskHeading: {
      type: String,
      trim: true,
      default: "",
    },
    riskDescription: {
      type: String,
      trim: true,
      default: "",
    },
    riskStatValue: {
      type: String,
      trim: true,
      default: "",
    },
    riskStatLabel: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill1Value: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill1Label: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill2Value: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill2Label: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill3Value: {
      type: String,
      trim: true,
      default: "",
    },
    checklistPill3Label: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

export default comparisonCardSchema;
