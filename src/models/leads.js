import mongoose from "mongoose";

const LeadsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true }, // duplicates allowed
    email: { type: String },
    location: { type: String },
    visitPlan: { type: String },
    visitDate: { type: String }, // kept as string: never reject a lead over a bad date
    remarks: { type: String },
    tag: { type: String },
    serviceType: { type: String },
    message: { type: String },
    source: { type: String }, // which form/route it came from
    crmStatus: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    crmError: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Leads || mongoose.model("Leads", LeadsSchema);
