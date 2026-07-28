import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import HairFallPageModel from "@/models/hairFallPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateHairFallPageDetails } from "@/lib/hairFallSlug";

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
            causes,
            warning,
            diagnosis,
            treatments,
            gender,
            treatmentMap,
            results,
            doctor,
            whyChoose,
            cost,
            myths,
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
            !causes ||
            !warning ||
            !diagnosis ||
            !treatments ||
            !gender ||
            !treatmentMap ||
            !results ||
            !doctor ||
            !whyChoose ||
            !cost ||
            !myths ||
            !visitClinic ||
            !consultation ||
            !faq
        ) {
            return NextResponse.json(
                { message: "Please provide all required hair fall page data." },
                { status: 400 }
            );
        }

        const { pageName, slug: normalizedSlug } = generateHairFallPageDetails(city);

        // Check Existing Page
        const existingPage = await HairFallPageModel.findOne({ slug: normalizedSlug });

        if (existingPage) {
            return NextResponse.json(
                { message: "Hair fall treatment page already exists for this city." },
                { status: 409 }
            );
        }

        const hairFallPageDoc = new HairFallPageModel({
            pageName,
            city,
            slug: normalizedSlug,
            seo,
            hero,
            introduction,
            causes,
            warning,
            diagnosis,
            treatments,
            gender,
            treatmentMap,
            results,
            doctor,
            whyChoose,
            cost,
            myths,
            visitClinic,
            consultation,
            faq,
        });

        await hairFallPageDoc.save();

        return NextResponse.json(
            {
                message: "Hair fall treatment page created successfully.",
                hairFallPage: {
                    _id: hairFallPageDoc._id,
                    pageName: hairFallPageDoc.pageName,
                    city: hairFallPageDoc.city,
                    slug: hairFallPageDoc.slug,
                    status: hairFallPageDoc.status,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = withDB(handler);
