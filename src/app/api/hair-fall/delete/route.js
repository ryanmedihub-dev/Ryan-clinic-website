import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import HairFallPageModel from "@/models/hairFallPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
    try {
        const authError = await requireAdmin();
        if (authError) return authError;

        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            return NextResponse.json({ message: "ID or Slug is required." }, { status: 400 });
        }

        let hairFallPage;
        if (id) {
            hairFallPage = await HairFallPageModel.findById(id);
        } else {
            const normalizedSlug = slug
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");

            hairFallPage = await HairFallPageModel.findOne({ slug: normalizedSlug });
        }

        if (!hairFallPage) {
            return NextResponse.json({ message: "Hair fall treatment page not found." }, { status: 404 });
        }

        await hairFallPage.deleteOne();

        return NextResponse.json(
            { message: "Hair fall treatment page deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const DELETE = withDB(handler);
