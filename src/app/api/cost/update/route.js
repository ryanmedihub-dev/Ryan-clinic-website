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
            _id,
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

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

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

        const doc = await CostPage.findById(_id);

        if (!doc) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cost page not found.",
                },
                {
                    status: 404,
                }
            );
        }

        const newSlug = rawSlug
            ? generateCostSlug(rawSlug)
            : generateCostSlug(title);

        const existing = await CostPage.findOne({
            slug: newSlug,
            _id: { $ne: _id },
        });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: `A cost page with slug "${newSlug}" already exists.`,
                },
                {
                    status: 409,
                }
            );
        }

        // Store previous slug
        if (doc.slug !== newSlug) {
            if (!doc.slugHistory.includes(doc.slug)) {
                doc.slugHistory.push(doc.slug);
            }
            doc.slug = newSlug;
        }

        doc.title = title.trim();

        doc.seo = seo;
        doc.hero = hero;
        doc.intro = intro;
        doc.services = services;
        doc.graftPricing = graftPricing;
        doc.techniqueComparison = techniqueComparison;
        doc.includedSection = includedSection;
        doc.priceFactors = priceFactors;
        doc.consultation = consultation;
        doc.faq = faq;
        doc.settings = settings;

        await doc.save();

        return NextResponse.json(
            {
                success: true,
                message: "Cost page updated successfully.",
                costPage: {
                    _id: doc._id,
                    title: doc.title,
                    slug: doc.slug,
                    status: doc.settings?.status,
                    url: `/${doc.slug}`,
                },
            },
            {
                status: 200,
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

export const PUT = withDB(handler);