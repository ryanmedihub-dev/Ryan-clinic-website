import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
    //const authError = await requireAdmin();

    //if (authError) return authError;

    try {
        const body = await req.json();

        const {
            seo,
            banner,
            stats,
            introduction,
            procedureScience,
            safety,
            techniques,
            recovery,
            doctors,
            faq,
        } = body;

        // Validate Required Sections
        if (
            !seo ||
            !banner ||
            !stats ||
            !introduction ||
            !procedureScience ||
            !safety ||
            !techniques ||
            !recovery ||
            !doctors ||
            !faq
        ) {
            return NextResponse.json(
                {
                    message: "Please provide all required surgery page data.",
                },
                {
                    status: 400,
                }
            );
        }

        // Check Existing Surgery Page
        const existingSurgeryPage = await SurgeryPageModel.findOne();

        if (existingSurgeryPage) {
            return NextResponse.json(
                {
                    message: "Surgery page already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Create Surgery Page
        const surgeryPageDoc = new SurgeryPageModel({
            seo,
            banner,
            stats,
            introduction,
            procedureScience,
            safety,
            techniques,
            recovery,
            doctors,
            faq,
        });

        await surgeryPageDoc.save();

        return NextResponse.json(
            {
                message: "Surgery page created successfully.",
            },
            {
                status: 201,
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

export const POST = withDB(handler);