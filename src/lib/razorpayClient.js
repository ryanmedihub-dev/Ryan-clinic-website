import Razorpay from "razorpay";
import { createRazorpayPaymentVerifier } from "./razorpayPaymentVerification.mjs";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export const verifyRazorpayPayment = createRazorpayPaymentVerifier({
  keySecret: process.env.RAZORPAY_KEY_SECRET,
  planId: process.env.RAZORPAY_PLAN_ID,
  fetchPayment: (paymentId) => razorpay.payments.fetch(paymentId),
  fetchSubscription: (subscriptionId) => razorpay.subscriptions.fetch(subscriptionId),
  fetchPlan: (planId) => razorpay.plans.fetch(planId),
});
