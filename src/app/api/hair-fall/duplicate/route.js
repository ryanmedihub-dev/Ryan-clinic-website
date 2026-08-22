import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import HairFallPageModel from "@/models/hairFallPage";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Treatment Page ID is required." },
        { status: 400 }
      );
    }

    const original = await HairFallPageModel.findById(id).lean();

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Treatment page not found." },
        { status: 404 }
      );
    }

    // Generate unique slug
    const newSlug = await generateUniqueDuplicateSlug(original.slug, HairFallPageModel, "slug");

    // Clean data for new document
    const originalObj = JSON.parse(JSON.stringify(original));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;

    // Update fields specifically for duplication
    originalObj.pageName = `${original.pageName || "Treatment Page"} - Copy`;
    originalObj.slug = newSlug;
    originalObj.status = "draft";

    // Update canonical URL in SEO
    if (originalObj.seo) {
      originalObj.seo = updateCanonicalInSeo(originalObj.seo, original.slug, newSlug);
    }

    const duplicatedDoc = new HairFallPageModel(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Treatment page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          pageName: duplicatedDoc.pageName,
          slug: duplicatedDoc.slug,
          status: duplicatedDoc.status,
          editUrl: `/admin/hair-fall/edit/${duplicatedDoc.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Treatment duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate treatment page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
