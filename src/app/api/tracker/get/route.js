import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db.js";
import Tracker from "@/models/Tracker.js";

export async function GET() {
    try {
        await DBConnection();

        const trackers = await Tracker.find({})
            .sort({ createdAt: -1 })
            .select(
                "type slug pageName ctaName createdAt updatedAt"
            );

        return NextResponse.json(
            {
                success: true,
                trackers,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Tracker Fetch Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch trackers.",
            },
            { status: 500 }
        );
    }
}