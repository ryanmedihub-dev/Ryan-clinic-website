import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import HairFallPageModel from "@/models/hairFallPage";

// Intentionally public (no requireAdmin gate) — this endpoint backs the
// public-facing page's server-side fetch, which carries no admin session.
const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get("slug");
        if (!slug) {
            return NextResponse.json({ message: "Slug is required." }, { status: 400 });
        }

        const normalizedSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        const hairFallPage = await HairFallPageModel.findOne({
            slug: normalizedSlug,
        }).lean();

        if (!hairFallPage) {
            return NextResponse.json({ message: "Hair fall treatment page not found" }, { status: 404 });
        }

        return NextResponse.json({ hairFallPage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const GET = withDB(handler);
