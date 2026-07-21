import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import Tracker from "@/models/Tracker";

export async function POST(request) {
    try {
        await DBConnection();

        const {
            type,
            ctaName,
            buttonLocation,
            pageName,
            slug,
        } = await request.json();

        if (
            !type ||
            !ctaName ||
            !buttonLocation ||
            !pageName ||
            !slug
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required.",
                },
                { status: 400 }
            );
        }

        const tracker = await Tracker.create({
            type,
            ctaName,
            buttonLocation,
            pageName,
            slug,
        });

        return NextResponse.json(
            {
                success: true,
                tracker,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Tracker Create Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create tracker.",
            },
            { status: 500 }
        );
    }
}