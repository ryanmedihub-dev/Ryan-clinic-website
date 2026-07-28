import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import HairFallPageModel from "@/models/hairFallPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateHairFallPageDetails } from "@/lib/hairFallSlug";

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

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json({ message: "Slug is required." }, { status: 400 });
        }

        const normalizedSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        const { pageName, slug: generatedSlug } = generateHairFallPageDetails(city);

        const hairFallPage = await HairFallPageModel.findOne({ slug: normalizedSlug });
        if (!hairFallPage) {
            return NextResponse.json({ message: "Hair fall treatment page not found." }, { status: 404 });
        }

        const duplicatePage = await HairFallPageModel.findOne({
            slug: generatedSlug,
            _id: { $ne: hairFallPage._id },
        });

        if (duplicatePage) {
            return NextResponse.json(
                { message: "A hair fall treatment page for this city already exists." },
                { status: 409 }
            );
        }

        hairFallPage.city = city;
        hairFallPage.pageName = pageName;
        hairFallPage.slug = generatedSlug;

        hairFallPage.seo = seo;
        hairFallPage.hero = hero;
        hairFallPage.introduction = introduction;
        hairFallPage.causes = causes;
        hairFallPage.warning = warning;
        hairFallPage.diagnosis = diagnosis;
        hairFallPage.treatments = treatments;
        hairFallPage.gender = gender;
        hairFallPage.treatmentMap = treatmentMap;
        hairFallPage.results = results;
        hairFallPage.doctor = doctor;
        hairFallPage.whyChoose = whyChoose;
        hairFallPage.cost = cost;
        hairFallPage.myths = myths;
        hairFallPage.visitClinic = visitClinic;
        hairFallPage.consultation = consultation;
        hairFallPage.faq = faq;

        await hairFallPage.save();

        return NextResponse.json(
            {
                message: "Hair fall treatment page updated successfully.",
                hairFallPage: {
                    _id: hairFallPage._id,
                    pageName: hairFallPage.pageName,
                    city: hairFallPage.city,
                    slug: hairFallPage.slug,
                    status: hairFallPage.status,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const PUT = withDB(handler);
