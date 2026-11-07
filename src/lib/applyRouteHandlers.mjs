const ALLOWED_STATUSES = new Set(["pending", "approved", "rejected"]);
const MAX_PAGE_SIZE = 100;

export function createApplyRouteHandlers({ ApplyForm, DBConnection, requireAdmin, isValidId, verifyPayment }) {
  async function withDatabase(request, handler) {
    try {
      await DBConnection();
      return await handler(request);
    } catch (error) {
      console.error("Apply API error:", error);
      return Response.json(
        { success: false, message: "Request could not be completed" },
        { status: 500 }
      );
    }
  }

  async function withAdminAndDatabase(request, handler) {
    try {
      const authError = await requireAdmin();
      if (authError) return authError;
      return await withDatabase(request, handler);
    } catch (error) {
      console.error("Apply API authorization error:", error);
      return Response.json(
        { success: false, message: "Request could not be completed" },
        { status: 500 }
      );
    }
  }

  async function POST(request) {
    return withDatabase(request, async (req) => {
      try {
        const formData = await req.formData();
        const fields = [
          "fullName", "age", "gender", "city", "profession", "income",
          "lookingFor", "marriageTimeline", "seriousnessScore", "whyNow",
          "smoke", "drink", "lifestyle", "weekend",
          "height", "bodyType", "fitnessLevel", "diet",
          "recharge", "conflict", "relationshipPriority",
          "ambitionLevel", "fiveYears",
          "familyImportance", "religionImportance", "livingPreference", "familyInvolvement",
          "preferredAge", "preferredCity", "preferredHeight", "partnerFitness", "partnerDiet",
          "attracts", "turnoffs",
          "whySingle", "idealPartner", "noCompromise",
          "relocate", "children",
          "instaId", "facebookId",
        ];

        // Payment state is server-owned. The browser must never select it.
        if (formData.has("paymentStatus") || formData.has("applicationId")) {
          return Response.json({ success: false, message: "Invalid submission" }, { status: 400 });
        }

        const paymentId = formData.get("razorpayPaymentId");
        const subscriptionId = formData.get("razorpaySubscriptionId");
        const signature = formData.get("razorpaySignature");
        const hasPaymentDetails = [paymentId, subscriptionId, signature].some((value) => value !== null);
        if (hasPaymentDetails && [paymentId, subscriptionId, signature].some(
          (value) => typeof value !== "string" || value.length === 0
        )) {
          return Response.json({ success: false, message: "Payment verification required" }, { status: 400 });
        }

        const data = {};
        for (const key of fields) {
          const value = formData.get(key);
          if (value === null) continue;

          if (key === "attracts" || key === "turnoffs") {
            try {
              const parsed = JSON.parse(value);
              data[key] = Array.isArray(parsed) ? parsed : [];
            } catch {
              data[key] = [];
            }
          } else if (["age", "seriousnessScore", "familyImportance", "religionImportance"].includes(key)) {
            const numberValue = Number(value);
            if (!Number.isFinite(numberValue)) {
              return Response.json({ success: false, message: "Invalid submission" }, { status: 400 });
            }
            data[key] = numberValue;
          } else {
            data[key] = value;
          }
        }

        data.paymentStatus = "pending";

        if (hasPaymentDetails) {
          if (typeof verifyPayment !== "function") {
            return Response.json({ success: false, message: "Payment verification unavailable" }, { status: 503 });
          }

          const isVerified = await verifyPayment({
            paymentId,
            subscriptionId,
            signature,
          });
          if (!isVerified) {
            return Response.json({ success: false, message: "Payment verification failed" }, { status: 400 });
          }

          data.razorpayPaymentId = paymentId;
          data.razorpaySubscriptionId = subscriptionId;
          data.paymentStatus = "paid";

          // A payment can create or update only one application. This makes
          // retries safe and prevents replaying a payment onto another form.
          const existing = await ApplyForm.findOne({ razorpayPaymentId: paymentId });
          if (existing) {
            if (existing.razorpaySubscriptionId !== subscriptionId) {
              return Response.json({ success: false, message: "Payment is already associated" }, { status: 409 });
            }
            if (existing.paymentStatus !== "paid") {
              await ApplyForm.findOneAndUpdate(
                { _id: existing._id, razorpaySubscriptionId: subscriptionId },
                { $set: { paymentStatus: "paid" } },
                { new: true, runValidators: true }
              );
            }
            return Response.json(
              { success: true, message: "Application submitted successfully", id: existing._id },
              { status: 200 }
            );
          }
        }

        let application;
        try {
          application = await ApplyForm.create(data);
        } catch (error) {
          // A concurrent retry may win the unique payment-id insert.
          if (!hasPaymentDetails || error?.code !== 11000) throw error;
          const existing = await ApplyForm.findOne({ razorpayPaymentId: paymentId });
          if (!existing || existing.razorpaySubscriptionId !== subscriptionId) {
            return Response.json({ success: false, message: "Payment is already associated" }, { status: 409 });
          }
          return Response.json(
            { success: true, message: "Application submitted successfully", id: existing._id },
            { status: 200 }
          );
        }
        return Response.json(
          { success: true, message: "Application submitted successfully", id: application._id },
          { status: 201 }
        );
      } catch (error) {
        // Avoid logging submitted fields or provider/payment identifiers.
        console.error("Apply POST failed");
        return Response.json(
          { success: false, message: "Submission failed" },
          { status: 500 }
        );
      }
    });
  }

  async function GET(request) {
    return withAdminAndDatabase(request, async (req) => {
      const { searchParams } = new URL(req.url);
      const page = Number(searchParams.get("page") ?? "1");
      const limit = Number(searchParams.get("limit") ?? "20");
      const status = searchParams.get("status");

      if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE) {
        return Response.json({ success: false, message: "Invalid pagination" }, { status: 400 });
      }
      if (status && !ALLOWED_STATUSES.has(status)) {
        return Response.json({ success: false, message: "Invalid status filter" }, { status: 400 });
      }

      try {
        const query = status ? { status } : {};
        const skip = (page - 1) * limit;
        const [applications, total] = await Promise.all([
          ApplyForm.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
          ApplyForm.countDocuments(query),
        ]);

        return Response.json(
          { success: true, data: applications, total, page, totalPages: Math.ceil(total / limit) },
          { status: 200, headers: { "Cache-Control": "private, no-store" } }
        );
      } catch (error) {
        console.error("Apply GET error:", error);
        return Response.json(
          { success: false, message: "Failed to fetch applications" },
          { status: 500 }
        );
      }
    });
  }

  async function PATCH(request) {
    return withAdminAndDatabase(request, async (req) => {
      const id = new URL(req.url).searchParams.get("id");
      if (!id || !isValidId(id)) {
        return Response.json({ success: false, message: "Valid application ID required" }, { status: 400 });
      }

      let body;
      try {
        body = await req.json();
      } catch {
        return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
      }

      const { status } = body ?? {};
      if (typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
        return Response.json({ success: false, message: "Invalid application status" }, { status: 400 });
      }

      try {
        const updated = await ApplyForm.findByIdAndUpdate(
          id,
          { $set: { status } },
          { new: true, runValidators: true }
        ).select("_id status").lean();

        if (!updated) {
          return Response.json({ success: false, message: "Application not found" }, { status: 404 });
        }

        return Response.json(
          { success: true, data: { id: updated._id, status: updated.status } },
          { headers: { "Cache-Control": "private, no-store" } }
        );
      } catch (error) {
        console.error("Apply PATCH error:", error);
        return Response.json(
          { success: false, message: "Failed to update application" },
          { status: 500 }
        );
      }
    });
  }

  return { GET, POST, PATCH };
}
