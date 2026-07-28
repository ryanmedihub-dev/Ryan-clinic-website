import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateCostSlug } from "@/lib/costSlug";
import CostPage from "@/models/CostPage";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();

        const {
            title,
            slug: rawSlug,

            seo,
            hero,
            intro,
            services,
            graftPricing,
            techniqueComparison,
            includedSection,
            priceFactors,
            consultation,
            faq,
            settings,
        } = body;

        // Required validation
        if (!title?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page title is required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Generate slug
        const slug = rawSlug
            ? generateCostSlug(rawSlug)
            : generateCostSlug(title);

        // Check duplicate slug
        const existing = await CostPage.findOne({ slug });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: `A cost page with slug "${slug}" already exists.`,
                },
                {
                    status: 409,
                }
            );
        }

        // Create document
        const doc = new CostPage({
            title: title.trim(),
            slug,

            seo,
            hero,
            intro,
            services,
            graftPricing,
            techniqueComparison,
            includedSection,
            priceFactors,
            consultation,
            faq,
            settings,
        });

        await doc.save();

        return NextResponse.json(
            {
                success: true,
                message: "Cost page created successfully.",

                costPage: {
                    _id: doc._id,
                    title: doc.title,
                    slug: doc.slug,
                    status: doc.settings?.status,
                    url: `/${doc.slug}`,
                },
            },
            {
                status: 201,
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

export const POST = withDB(handler);