import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {

        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            return NextResponse.json(
                {
                    message: "ID or Slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        let surgeryPage;
        if (id) {
            surgeryPage = await SurgeryPageModel.findById(id);
        } else {
            const normalizedSlug = slug
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");

            surgeryPage = await SurgeryPageModel.findOne({
                slug: normalizedSlug,
            });
        }

        if (!surgeryPage) {
            return NextResponse.json(
                {
                    message: "Surgery page not found.",
                },
                {
                    status: 404,
                }
            );
        }

        await surgeryPage.deleteOne();

        return NextResponse.json(
            {
                message: "Surgery page deleted successfully.",
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
};

export const DELETE = withDB(handler);