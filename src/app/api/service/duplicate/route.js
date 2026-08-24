import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Services from "@/models/services";
import { generateUniqueDuplicateSlug } from "@/lib/duplicateHelper";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Original Service ID or pageurl is required." },
        { status: 400 }
      );
    }

    let original = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      original = await Services.findById(id).lean();
    }
    if (!original) {
      original = await Services.findOne({ "metadata.pageurl": id }).lean();
    }

    if (!original) {
      return NextResponse.json(
        { success: false, message: "Original Service page not found." },
        { status: 404 }
      );
    }

    // Generate unique slug for metadata.pageurl
    const oldSlug = original.metadata?.pageurl || "service";
    const newSlug = await generateUniqueDuplicateSlug(oldSlug, Services, "metadata.pageurl");

    // Clean data for new document
    const originalObj = JSON.parse(JSON.stringify(original));
    delete originalObj._id;
    delete originalObj.id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    delete originalObj.__v;

    // Update fields specifically for duplication
    if (!originalObj.metadata) originalObj.metadata = {};
    originalObj.metadata.pageurl = newSlug;
    originalObj.metadata.title = `${original.metadata?.title || "Service"} - Copy`;
    if (originalObj.metadata.pageName) {
      originalObj.metadata.pageName = `${original.metadata.pageName} - Copy`;
    }

    const duplicatedDoc = new Services(originalObj);
    await duplicatedDoc.save();

    return NextResponse.json(
      {
        success: true,
        message: "Service page duplicated successfully.",
        data: {
          _id: duplicatedDoc._id,
          pageurl: duplicatedDoc.metadata?.pageurl,
          title: duplicatedDoc.metadata?.title,
          editUrl: `/admin/pages/edit/${duplicatedDoc.metadata?.pageurl}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Service duplicate error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to duplicate service page." },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);
