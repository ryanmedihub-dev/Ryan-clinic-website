import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import Services from "@/models/services";
import {
  createNavigationErrorResponse,
  createNavigationResponse,
  NAVIGATION_FIELDS,
} from "@/lib/serviceNavigation.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await DBConnection();
    const navigationData = await Services.find({})
      .select(NAVIGATION_FIELDS)
      .lean();

    return NextResponse.json(
      createNavigationResponse(navigationData),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      createNavigationErrorResponse(),
      { status: 500 }
    );
  }
}
