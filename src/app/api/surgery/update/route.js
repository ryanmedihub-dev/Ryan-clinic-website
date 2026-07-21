import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateSurgeryPageDetails } from "@/lib/surgerySlug";

const handler = async (req) => {

    try {

        const authError = await requireAdmin();

        if (authError) return authError;

        const body = await req.json();



        const {
            city,
            seo,
            hero,
            introduction,
            procedureScience,
            safety,
            techniques,
            qualityBenchmarks,
            procedureTimeline,
            recoveryTimeline,
            doctors,
            pricing,
            visitClinic,
            consultation,
            faq,
        } = body;

        if (
            !city ||
            !seo ||
            !hero ||
            !introduction ||
            !procedureScience ||
            !safety ||
            !techniques ||
            !qualityBenchmarks ||
            !procedureTimeline ||
            !recoveryTimeline ||
            !doctors ||
            !pricing ||
            !visitClinic ||
            !consultation ||
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
        const {
            pageName,
            slug: generatedSlug,
        } = generateSurgeryPageDetails(city);

        const { searchParams } = new URL(req.url);

        const slug = searchParams.get("slug");
        const normalizedSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required." },
                { status: 400 }
            );
        }

        const surgeryPage = await SurgeryPageModel.findOne({
            slug: normalizedSlug,
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

        const duplicatePage = await SurgeryPageModel.findOne({
            slug: generatedSlug,
            _id: { $ne: surgeryPage._id },
        });

        if (duplicatePage) {
            return NextResponse.json(
                {
                    message: "A surgery page for this city already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        surgeryPage.city = city;
        surgeryPage.pageName = pageName;
        surgeryPage.slug = generatedSlug;

        surgeryPage.seo = seo;

        surgeryPage.hero = hero;

        surgeryPage.introduction = introduction;

        surgeryPage.procedureScience = procedureScience;

        surgeryPage.safety = safety;

        surgeryPage.techniques = techniques;

        surgeryPage.qualityBenchmarks = qualityBenchmarks;

        surgeryPage.procedureTimeline = procedureTimeline;

        surgeryPage.recoveryTimeline = recoveryTimeline;

        surgeryPage.doctors = doctors;

        surgeryPage.pricing = pricing;

        surgeryPage.visitClinic = visitClinic;

        surgeryPage.consultation = consultation;

        surgeryPage.faq = faq;

        await surgeryPage.save();

        return NextResponse.json(
            {
                message: "Surgery page updated successfully.",
                surgeryPage: {
                    _id: surgeryPage._id,
                    pageName: surgeryPage.pageName,
                    city: surgeryPage.city,
                    slug: surgeryPage.slug,
                    status: surgeryPage.status,
                },
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