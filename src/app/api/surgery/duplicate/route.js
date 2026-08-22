import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Surgery Page ID is required." },
        { status: 400 }
      );
    }

    const original = await SurgeryPageModel.findById(id).lean();

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Surgery Page not found." },
        { status: 404 }
      );
    }

    if (original.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Cannot duplicate a deleted Surgery Page." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const newSlug = await generateUniqueDuplicateSlug(original.slug, SurgeryPageModel, "slug");

    // Clean data for new document
    const originalObj = JSON.parse(JSON.stringify(original));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;

    // Update fields specifically for duplication
    originalObj.pageName = `${original.pageName || "Surgery Page"} - Copy`;
    originalObj.slug = newSlug;
    originalObj.status = "draft";
    originalObj.isDeleted = false;

    // Update canonical URL in SEO
    if (originalObj.seo) {
      originalObj.seo = updateCanonicalInSeo(originalObj.seo, original.slug, newSlug);
    }

    const duplicatedDoc = new SurgeryPageModel(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Surgery page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          pageName: duplicatedDoc.pageName,
          slug: duplicatedDoc.slug,
          status: duplicatedDoc.status,
          editUrl: `/admin/surgery/edit/${duplicatedDoc.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Surgery duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate surgery page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
