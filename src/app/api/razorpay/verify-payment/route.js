import crypto from "crypto";

export async function POST(request) {
  try {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
      await request.json();

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return Response.json({ success: false, message: "Missing payment details" }, { status: 400 });
    }

    const body = razorpay_payment_id + "|" + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }

    return Response.json({ success: true, message: "Payment verified" }, { status: 200 });
  } catch (error) {
    console.error("Razorpay verify-payment error:", error);
    return Response.json({ success: false, message: "Verification error" }, { status: 500 });
  }
}
