import mongoose from "mongoose";

const ApplyFormSchema = new mongoose.Schema(
  {
    // Basic Info
    fullName: { type: String, trim: true },
    age: { type: Number },
    gender: { type: String },
    city: { type: String, trim: true },
    profession: { type: String, trim: true },
    income: { type: String },

    // Intent
    lookingFor: { type: String },
    marriageTimeline: { type: String },
    seriousnessScore: { type: Number },
    whyNow: { type: String },

    // Lifestyle
    smoke: { type: String },
    drink: { type: String },
    lifestyle: { type: String },
    weekend: { type: String },

    // Physical
    height: { type: String },
    bodyType: { type: String },
    fitnessLevel: { type: String },
    diet: { type: String },

    // Personality
    recharge: { type: String },
    conflict: { type: String },
    relationshipPriority: { type: String },

    // Ambition
    ambitionLevel: { type: String },
    fiveYears: { type: String },

    // Family
    familyImportance: { type: Number },
    religionImportance: { type: Number },
    livingPreference: { type: String },
    familyInvolvement: { type: String },

    // Preferences
    preferredAge: { type: String },
    preferredCity: { type: String },
    preferredHeight: { type: String },
    partnerFitness: { type: String },
    partnerDiet: { type: String },

    // Attraction
    attracts: [{ type: String }],
    turnoffs: [{ type: String }],

    // Deep Insights
    whySingle: { type: String },
    idealPartner: { type: String },
    noCompromise: { type: String },

    // Compatibility
    relocate: { type: String },
    children: { type: String },

    // Social
    instaId: { type: String, default: "" },
    facebookId: { type: String, default: "" },

    // Payment
    razorpaySubscriptionId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    // Meta
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ApplyForm ||
  mongoose.model("ApplyForm", ApplyFormSchema);
