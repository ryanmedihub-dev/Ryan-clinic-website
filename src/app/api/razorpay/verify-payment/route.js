import { verifyRazorpayPayment } from "@/lib/razorpayClient";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid payment details" }, { status: 400 });
  }

  const { razorpay_payment_id: paymentId, razorpay_subscription_id: subscriptionId, razorpay_signature: signature } = body ?? {};
  if (!paymentId || !subscriptionId || !signature) {
    return Response.json({ success: false, message: "Missing payment details" }, { status: 400 });
  }

  const verified = await verifyRazorpayPayment({ paymentId, subscriptionId, signature });
  if (!verified) {
    return Response.json({ success: false, message: "Payment verification failed" }, { status: 400 });
  }

  // This endpoint confirms a payment only. The public application endpoint
  // repeats verification before creating/marking its associated record paid.
  return Response.json({ success: true, message: "Payment verified" }, { status: 200 });
}
