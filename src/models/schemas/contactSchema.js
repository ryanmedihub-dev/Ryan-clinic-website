import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      default: "",
      match: [/^[0-9+\s-]{7,15}$/, "Please enter a valid phone number"],
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
      match: [/^[0-9+\s-]{7,15}$/, "Please enter a valid WhatsApp number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
  },
  { _id: false }
);

export default contactSchema;
