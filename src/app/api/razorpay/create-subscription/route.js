import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { name } = await request.json();

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      total_count: 120, // 10 years of monthly billing
      quantity: 1,
      customer_notify: 1,
      notes: {
        applicant_name: name || "Partner Applicant",
        source: "apply-for-partners",
      },
    });

    return Response.json({ success: true, subscriptionId: subscription.id }, { status: 200 });
  } catch (error) {
    console.error("Razorpay create-subscription error:", error);
    return Response.json(
      { success: false, message: error.error?.description || "Failed to create subscription" },
      { status: 500 }
    );
  }
}
