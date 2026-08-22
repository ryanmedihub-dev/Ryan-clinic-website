import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import SurgeonPage from "@/models/SurgeonPage";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo, normalizeSurgeonDoc } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Surgeon Page ID is required." },
        { status: 400 }
      );
    }

    const original = await SurgeonPage.findById(id).lean();

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Surgeon Page not found." },
        { status: 404 }
      );
    }

    if (original.settings?.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Cannot duplicate a deleted Surgeon Page." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const newSlug = await generateUniqueDuplicateSlug(original.slug, SurgeonPage, "slug");

    // Clean and normalize data for new document
    const originalObj = normalizeSurgeonDoc(JSON.parse(JSON.stringify(original)));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;

    // Update fields specifically for duplication
    originalObj.title = `${original.title || "Surgeon Page"} - Copy`;
    originalObj.slug = newSlug;

    if (!originalObj.settings) originalObj.settings = {};
    originalObj.settings.status = "draft";
    originalObj.settings.isDeleted = false;

    // Update canonical URL in SEO
    if (originalObj.seo) {
      originalObj.seo = updateCanonicalInSeo(originalObj.seo, original.slug, newSlug);
    }

    const duplicatedDoc = new SurgeonPage(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Surgeon page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          title: duplicatedDoc.title,
          slug: duplicatedDoc.slug,
          status: duplicatedDoc.settings?.status,
          editUrl: `/admin/surgeon/edit/${duplicatedDoc._id}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Surgeon duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate surgeon page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
