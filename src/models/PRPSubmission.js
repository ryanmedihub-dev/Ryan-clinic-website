import mongoose from "mongoose";

const PRPSubmissionSchema = new mongoose.Schema(
  {
    // ── Patient Details ──────────────────────────────────────────────────────
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be a positive number"],
      max: [120, "Please enter a valid age"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    // ── PRP Session Details ──────────────────────────────────────────────────
    currentSessionNumber: {
      type: Number,
      required: [true, "Current PRP session number is required"],
      min: [1, "Session number must be at least 1"],
      max: [5, "Session number cannot exceed 5"],
    },
    totalSessionsCompleted: {
      type: Number,
      required: [true, "Total sessions completed is required"],
      min: [0, "Total sessions completed cannot be negative"],
      max: [4, "Total sessions completed cannot exceed 4"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.PRPSubmission ||
  mongoose.model("PRPSubmission", PRPSubmissionSchema);
