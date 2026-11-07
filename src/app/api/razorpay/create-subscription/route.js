import { razorpay } from "@/lib/razorpayClient";

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
    return Response.json(
      { success: false, message: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
