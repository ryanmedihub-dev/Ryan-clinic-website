import { v2 as cloudinary } from "cloudinary";
import ApplyForm from "@/models/ApplyForm";
import { withDB } from "@/lib/withDB";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Helper: upload a Buffer to Cloudinary ─────────────────────────────────────
async function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "intent-dating/applicants",
        public_id: `applicant_${Date.now()}_${filename.replace(/\.[^/.]+$/, "")}`,
        resource_type: "image",
        transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// ── POST /api/apply ────────────────────────────────────────────────────────────
async function postHandler(request) {
  try {
    const formData = await request.formData();

    // Parse all text fields
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
    ];

    const data = {};
    for (const key of fields) {
      const value = formData.get(key);
      if (value !== null) {
        // JSON-encoded arrays (attracts, turnoffs)
        if (key === "attracts" || key === "turnoffs") {
          try { data[key] = JSON.parse(value); } catch { data[key] = []; }
        } else if (["age", "seriousnessScore", "familyImportance", "religionImportance"].includes(key)) {
          data[key] = Number(value);
        } else {
          data[key] = value;
        }
      }
    }

    // Handle photo upload
    const photoFile = formData.get("photo");
    if (photoFile && photoFile.size > 0) {
      const arrayBuffer = await photoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await uploadToCloudinary(buffer, photoFile.name || "photo.jpg");
      data.photoUrl = result.secure_url;
      data.photoPublicId = result.public_id;
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
