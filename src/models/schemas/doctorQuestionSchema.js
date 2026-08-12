import mongoose from "mongoose";

export const doctorQuestionSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      trim: true,
      default: "",
    },
    question: {
      type: String,
      trim: true,
      default: "",
    },
    answer: {
      type: String,
      trim: true,
      default: "",
    },
    ryanStandard: {
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

export default doctorQuestionSchema;
