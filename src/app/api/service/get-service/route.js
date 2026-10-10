import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import Services from "@/models/services";
import Doctor from "@/models/Doctors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await DBConnection();
    const fulldata = await Services.find({})
      .populate({
        path: "assignedDoctor",
        select:
          "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
        strictPopulate: false,
      })
      .lean();

    return NextResponse.json(
      { success: true, data: fulldata || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("get-service API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch services", data: [] },
      { status: 500 }
    );
  }
}