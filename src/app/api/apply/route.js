import ApplyForm from "@/models/ApplyForm";
import { withDB } from "@/lib/withDB";

// ── POST /api/apply ────────────────────────────────────────────────────────────
async function postHandler(request) {
  try {
    const formData = await request.formData();

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

    const data = {};
    for (const key of fields) {
      const value = formData.get(key);
      if (value !== null) {
        if (key === "attracts" || key === "turnoffs") {
          try { data[key] = JSON.parse(value); } catch { data[key] = []; }
        } else if (["age", "seriousnessScore", "familyImportance", "religionImportance"].includes(key)) {
          data[key] = Number(value);
        } else {
          data[key] = value;
        }
      }
    }

    const application = await ApplyForm.create(data);

    return Response.json(
      { success: true, message: "Application submitted successfully", id: application._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply POST error:", error);
    return Response.json(
      { success: false, message: "Submission failed", error: error.message },
      { status: 500 }
    );
  }
}

// ── GET /api/apply ─────────────────────────────────────────────────────────────
async function getHandler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query = status ? { status } : {};
    const [applications, total] = await Promise.all([
      ApplyForm.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ApplyForm.countDocuments(query),
    ]);

    return Response.json(
      { success: true, data: applications, total, page, totalPages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Apply GET error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch applications", error: error.message },
      { status: 500 }
    );
  }
}

// ── PATCH /api/apply?id=xxx  (update status) ──────────────────────────────────
async function patchHandler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { status } = await request.json();

    if (!id) return Response.json({ success: false, message: "ID required" }, { status: 400 });

    const updated = await ApplyForm.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return Response.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export const POST = withDB(postHandler);
export const GET = withDB(getHandler);
export const PATCH = withDB(patchHandler);
