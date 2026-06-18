import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    // Update all docs missing metadata.keywords
    const result = await Services.updateMany(
      { "metadata.keywords": { $exists: false } },
      { $set: { "metadata.keywords": ["Best Hair Transplant", "Hair Transplant", "Hair Clinic"] } }
    );

    return NextResponse.json(
      {
        success: true,
        message: `Migration complete. Updated ${result.modifiedCount} services.`,
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Migration failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const PATCH = withDB(handler);
