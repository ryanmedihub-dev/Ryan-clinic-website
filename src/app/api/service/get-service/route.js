import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import Services from "@/models/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await DBConnection();
    const fulldata = await Services.find({}).lean();

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