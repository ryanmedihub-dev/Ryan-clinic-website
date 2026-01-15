import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { withDB } from "@/lib/withDB";

export const PUT = withDB(async (req, { params }) => {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { 
        ...body,
        updatedAt: new Date() 
      },
      { 
        new: true,
        runValidators: true 
      }
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