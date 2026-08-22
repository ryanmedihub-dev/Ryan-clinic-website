import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import CostPage from "@/models/CostPage";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Cost Page ID is required." },
        { status: 400 }
      );
    }

    const original = await CostPage.findById(id).lean();

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Cost page not found." },
        { status: 404 }
      );
    }

    if (original.settings?.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Cannot duplicate a deleted Cost page." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const newSlug = await generateUniqueDuplicateSlug(original.slug, CostPage, "slug");

    // Clean data for new document
    const originalObj = JSON.parse(JSON.stringify(original));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;

    // Update fields specifically for duplication
    originalObj.title = `${original.title || "Cost Page"} - Copy`;
    originalObj.slug = newSlug;

    if (!originalObj.settings) originalObj.settings = {};
    originalObj.settings.status = "draft";
    originalObj.settings.isDeleted = false;

    // Update canonical URL in SEO
    if (originalObj.seo) {
      originalObj.seo = updateCanonicalInSeo(originalObj.seo, original.slug, newSlug);
    }

    const duplicatedDoc = new CostPage(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Cost page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          title: duplicatedDoc.title,
          slug: duplicatedDoc.slug,
          status: duplicatedDoc.settings?.status,
          editUrl: `/admin/cost/edit/${duplicatedDoc._id}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Cost duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate cost page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
