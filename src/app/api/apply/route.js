import mongoose from "mongoose";
import ApplyForm from "@/models/ApplyForm";
import { requireAdmin } from "@/lib/requireAdmin";
import { DBConnection } from "@/lib/db";
import { createApplyRouteHandlers } from "@/lib/applyRouteHandlers.mjs";
import { verifyRazorpayPayment } from "@/lib/razorpayClient";

const handlers = createApplyRouteHandlers({
  ApplyForm,
  DBConnection,
  requireAdmin,
  isValidId: (id) => mongoose.Types.ObjectId.isValid(id),
  verifyPayment: verifyRazorpayPayment,
});

export const GET = handlers.GET;
export const POST = handlers.POST;
export const PATCH = handlers.PATCH;
