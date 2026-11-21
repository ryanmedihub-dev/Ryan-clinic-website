import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Services from "@/models/services";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json(
        { success: false, message: "Service page ID is required." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { success: false, message: "Invalid service page ID." },
        { status: 400 }
      );
    }

    const page = await Services.findByIdAndDelete(_id);

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Service page not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service page deleted successfully.",
    });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete service page." },
      { status: 500 }
    );
  }
};

export const DELETE = withDB(handler);

