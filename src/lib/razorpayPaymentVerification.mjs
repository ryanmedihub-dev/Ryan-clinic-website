import { createHmac, timingSafeEqual } from "node:crypto";

const PAYMENT_ID_PATTERN = /^pay_[A-Za-z0-9]+$/;
const SUBSCRIPTION_ID_PATTERN = /^sub_[A-Za-z0-9]+$/;
const SIGNATURE_PATTERN = /^[a-fA-F0-9]{64}$/;

function toMinorUnits(value) {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value > 0 ? value : null;
  }
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

/**
 * Verifies a Checkout callback and confirms the resulting captured payment
 * and the configured plan directly with Razorpay. Plan amounts use the
 * currency's smallest unit, as represented by the Razorpay SDK. All provider
 * calls are injected so this logic can be tested without a live payment account.
 */
export function createRazorpayPaymentVerifier({
  keySecret,
  planId,
  fetchPayment,
  fetchSubscription,
  fetchPlan,
}) {
  return async function verifyRazorpayPayment({ paymentId, subscriptionId, signature }) {
    if (
      typeof keySecret !== "string" || keySecret.length === 0 ||
      typeof planId !== "string" || planId.length === 0 ||
      typeof paymentId !== "string" || !PAYMENT_ID_PATTERN.test(paymentId) ||
      typeof subscriptionId !== "string" || !SUBSCRIPTION_ID_PATTERN.test(subscriptionId) ||
      typeof signature !== "string" || !SIGNATURE_PATTERN.test(signature)
    ) {
      return false;
    }

    const expectedSignature = createHmac("sha256", keySecret)
      .update(`${paymentId}|${subscriptionId}`)
      .digest();
    const suppliedSignature = Buffer.from(signature, "hex");
    if (
      suppliedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(expectedSignature, suppliedSignature)
    ) {
      return false;
    }

    try {
      const [payment, subscription, plan] = await Promise.all([
        fetchPayment(paymentId),
        fetchSubscription(subscriptionId),
        fetchPlan(planId),
      ]);
      const expectedAmount = toMinorUnits(plan?.item?.amount);
      const capturedAmount = toMinorUnits(payment?.amount);
      const refundedAmount = payment?.amount_refunded === undefined
        ? 0
        : payment.amount_refunded;

      return Boolean(
        payment?.id === paymentId &&
        payment.subscription_id === subscriptionId &&
        payment.status === "captured" &&
        payment.captured === true &&
        expectedAmount !== null &&
        capturedAmount === expectedAmount &&
        typeof plan?.item?.currency === "string" &&
        /^[A-Z]{3}$/.test(plan.item.currency) &&
        payment.currency === plan.item.currency &&
        Number.isSafeInteger(refundedAmount) &&
        refundedAmount >= 0 &&
        refundedAmount < capturedAmount &&
        subscription?.id === subscriptionId &&
        subscription.plan_id === planId &&
        plan?.id === planId
      );
    } catch {
      // Fail closed without logging provider responses or payment details.
      return false;
    }
  };
}
