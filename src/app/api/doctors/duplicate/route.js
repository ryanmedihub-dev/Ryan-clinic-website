import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Doctor from "@/models/Doctors";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Doctor ID is required." },
        { status: 400 }
      );
    }

    const original = await Doctor.findById(id).lean();

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Doctor page not found." },
        { status: 404 }
      );
    }

    if (original.deletedAt) {
      return NextResponse.json(
        { success: false, message: "Cannot duplicate a deleted Doctor page." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const newSlug = await generateUniqueDuplicateSlug(original.slug, Doctor, "slug");

    // Clean data for new document
    const originalObj = JSON.parse(JSON.stringify(original));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;
    delete originalObj.deletedAt;

    // Update fields specifically for duplication
    originalObj.pageName = `${original.pageName || "Doctor Page"} - Copy`;
    if (originalObj.basicInfo && originalObj.basicInfo.doctorName) {
      originalObj.basicInfo.doctorName = `${original.basicInfo.doctorName} (Copy)`;
    }
    originalObj.slug = newSlug;
    originalObj.status = "draft";
    originalObj.featured = false;

    // Update canonical URL in SEO
    if (originalObj.seo) {
      originalObj.seo = updateCanonicalInSeo(originalObj.seo, original.slug, newSlug);
    }

    const duplicatedDoc = new Doctor(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Doctor page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          pageName: duplicatedDoc.pageName,
          slug: duplicatedDoc.slug,
          status: duplicatedDoc.status,
          editUrl: `/admin/doctors/edit/${duplicatedDoc.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Doctor duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate doctor page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
