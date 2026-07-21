import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateSurgeryPageDetails } from "@/lib/surgerySlug";

const handler = async (req) => {
    const authError = await requireAdmin();

    if (authError) return authError;

    try {
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
        // Validate Required Sections
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
        const { pageName, slug: normalizedSlug } = generateSurgeryPageDetails(city);

        // Check Existing Surgery Page
        const existingSurgeryPage = await SurgeryPageModel.findOne({
            slug: normalizedSlug,
        });

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
            pageName,
            city,
            slug: normalizedSlug,
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
        });

        await surgeryPageDoc.save();

        return NextResponse.json(
            {
                message: "Surgery page created successfully.",
                surgeryPage: {
                    _id: surgeryPageDoc._id,
                    pageName: surgeryPageDoc.pageName,
                    city: surgeryPageDoc.city,
                    slug: surgeryPageDoc.slug,
                    status: surgeryPageDoc.status,
                },
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