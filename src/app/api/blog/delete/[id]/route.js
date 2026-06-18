import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";

export const DELETE = withDB(async (req, { params }) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
});
