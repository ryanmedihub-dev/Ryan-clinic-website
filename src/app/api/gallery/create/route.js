import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Gallery from "@/models/gallery";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async (req) => {
    // const authError = await requireAdmin();

    //if (authError) return authError;

    try {
        const body = await req.json();

        const {
            seo,
            banner,
            heroSection,
            gallerySection,
        } = body;

        // Validate Required Sections
        if (!seo || !banner || !heroSection || !gallerySection) {
            return NextResponse.json(
                {
                    message: "Please provide all required gallery data.",
                },
                {
                    status: 400,
                }
            );
        }

        // Check Existing Gallery
        const existingGallery = await Gallery.findOne();

        if (existingGallery) {
            return NextResponse.json(
                {
                    message: "Gallery already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        // Create Gallery
        const gallery = new Gallery(body);

        await gallery.save();

        return NextResponse.json(
            {
                message: "Gallery created successfully.",
                status: 200,
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

export const POST = withDB(handler);