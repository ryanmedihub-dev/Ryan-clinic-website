import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  attempts: { type: Number, default: 0 },
  blockedUntil: { type: Date, default: null },
  lastAttempt: { type: Date, default: Date.now },
});

// Auto-delete records after 24 hours of inactivity
loginAttemptSchema.index({ lastAttempt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.LoginAttempt ||
  mongoose.model("LoginAttempt", loginAttemptSchema);
