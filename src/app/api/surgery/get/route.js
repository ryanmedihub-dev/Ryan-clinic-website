import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get("slug");
        if (!slug) {
            return NextResponse.json(
                {
                    message: "Slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const normalizedSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        const surgeryPage = await SurgeryPageModel.findOne({
            slug: normalizedSlug,
        }).lean();

        if (!surgeryPage) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Surgery page not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                surgeryPage,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
};

export const GET = withDB(handler);