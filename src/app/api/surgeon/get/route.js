import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeonPage from "@/models/Surgeon";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Either id or slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        let page = null;

        if (id) {
            page = await SurgeonPage.findOne({
                _id: id,
                "settings.isDeleted": { $ne: true },
            });
        } else {
            page = await SurgeonPage.findOne({
                slug,
                "settings.isDeleted": { $ne: true },
            });
        }

        if (!page) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Surgeon page not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                surgeonPage: page,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
};

export const GET = withDB(handler);