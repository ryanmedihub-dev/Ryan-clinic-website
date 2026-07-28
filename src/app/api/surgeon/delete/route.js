import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import SurgeonPage from "@/models/Surgeon";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { _id } = body;

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const page = await SurgeonPage.findById(_id);

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

        if (page.settings?.isDeleted) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Surgeon page is already deleted.",
                },
                {
                    status: 400,
                }
            );
        }

        page.settings.isDeleted = true;
        page.settings.deletedAt = new Date();

        await page.save();

        return NextResponse.json(
            {
                success: true,
                message: "Surgeon page deleted successfully.",
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

export const DELETE = withDB(handler);