import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {

    try {

        // const authError = await requireAdmin();

        // if (authError) return authError;

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

        const { searchParams } = new URL(req.url);

        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required." },
                { status: 400 }
            );
        }

        const surgeryPage = await SurgeryPageModel.findOne({
            slug: slug.toLowerCase().trim(),
        });
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


        surgeryPage.seo = seo;
        surgeryPage.banner = banner;
        surgeryPage.stats = stats;
        surgeryPage.introduction = introduction;
        surgeryPage.procedureScience = procedureScience;
        surgeryPage.safety = safety;
        surgeryPage.techniques = techniques;
        surgeryPage.recovery = recovery;
        surgeryPage.doctors = doctors;
        surgeryPage.faq = faq;

        await surgeryPage.save();

        return NextResponse.json(
            {
                message: "Surgery page updated successfully.",
            },
            {
                status: 200,
            }
        );


    }
    catch (error) {
        return NextResponse.json({
            message: error.message
        },
            {
                status: 500
            }
        )

    }

}

export const PUT = withDB(handler);