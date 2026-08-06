import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Gallery from "@/models/gallery";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {

    try {

        const authError = await requireAdmin();
        if (authError) return authError;

        const body = await req.json();



        const { seo, banner, heroSection, gallerySection, faqSection } = body;

        if (!seo || !banner || !heroSection || !gallerySection || !faqSection) {
            return NextResponse.json(
                {
                    message: "Please provide all required gallery data.",
                },
                {
                    status: 400,
                }
            );
        }

        const gallery = await Gallery.findOne();
        if (!gallery) {
            return NextResponse.json(
                {
                    message: "Gallery not found.",
                },
                {
                    status: 404,
                }
            );
        }


        gallery.seo = seo;
        gallery.banner = banner;
        gallery.heroSection = heroSection;
        gallery.gallerySection = gallerySection;
        gallery.faqSection = faqSection;

        await gallery.save();

        return NextResponse.json(
            {
                message: "Gallery updated successfully.",
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