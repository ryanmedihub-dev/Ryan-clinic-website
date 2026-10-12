import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db";
import Tracker from "@/models/Tracker";

const ALLOWED_TYPES = new Set(["whatsapp", "call", "form"]);
const MAX_STRING_LENGTH = 200;

export async function POST(request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid JSON payload." },
                { status: 400 }
            );
        }

        const { type, ctaName, buttonLocation, pageName, slug } = body || {};

        if (
            typeof type !== "string" ||
            typeof ctaName !== "string" ||
            typeof buttonLocation !== "string" ||
            typeof pageName !== "string" ||
            typeof slug !== "string"
        ) {
            return NextResponse.json(
                { success: false, message: "All fields are required and must be strings." },
                { status: 400 }
            );
        }

        const cleanType = type.trim().toLowerCase();
        const cleanCtaName = ctaName.trim();
        const cleanButtonLocation = buttonLocation.trim();
        const cleanPageName = pageName.trim();
        const cleanSlug = slug.trim();

        if (!cleanType || !cleanCtaName || !cleanButtonLocation || !cleanPageName || !cleanSlug) {
            return NextResponse.json(
                { success: false, message: "Fields cannot be empty." },
                { status: 400 }
            );
        }

        if (!ALLOWED_TYPES.has(cleanType)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Invalid tracker type. Allowed types: ${Array.from(ALLOWED_TYPES).join(", ")}.`,
                },
                { status: 400 }
            );
        }

        if (
            cleanCtaName.length > MAX_STRING_LENGTH ||
            cleanButtonLocation.length > MAX_STRING_LENGTH ||
            cleanPageName.length > MAX_STRING_LENGTH ||
            cleanSlug.length > MAX_STRING_LENGTH
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Field length exceeds maximum limit of ${MAX_STRING_LENGTH} characters.`,
                },
                { status: 400 }
            );
        }

        await DBConnection();

        const tracker = await Tracker.create({
            type: cleanType,
            ctaName: cleanCtaName,
            buttonLocation: cleanButtonLocation,
            pageName: cleanPageName,
            slug: cleanSlug,
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