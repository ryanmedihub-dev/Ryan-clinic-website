import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";

export const PUT = withDB(async (req, { params }) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    const {
      metaTitle,
      metaDiscription,
      pageUrl,
      pageTitle,
      pageDiscription,
      pageImageUrl,
      pageImageAlt,
      blogTitle,
      blogContent,
    } = body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        metaTitle,
        metaDiscription,
        pageUrl,
        pageTitle,
        pageDiscription,
        pageImageUrl,
        pageImageAlt,
        blogTitle,
        blogContent,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: updatedBlog,
        message: "Blog updated successfully" 
      }
    );

  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to update blog",
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
});