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
            pageType,
            sectionVisibility,
            pricing,

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
            /* Generic / multi-type sections */
            pricingOptions,
            contentSections,
            mythsFacts,
            visitClinic,
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

        // Validate pageType if provided
        const validPageTypes = ["hair-transplant", "prp", "dhi", "beard-transplant", "other"];
        const normalizedPageType = validPageTypes.includes(pageType) ? pageType : "hair-transplant";

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

        const normalizedIncluded = includedSection ? {
            ...includedSection,
            items: includedSection.items?.length ? includedSection.items : (includedSection.hiddenCosts || []),
            hiddenCosts: includedSection.items?.length ? includedSection.items : (includedSection.hiddenCosts || []),
            disclosures: includedSection.disclosures?.length ? includedSection.disclosures : (includedSection.guarantees || []),
            guarantees: includedSection.disclosures?.length ? includedSection.disclosures : (includedSection.guarantees || []),
        } : includedSection;

        const normalizedFaq = faq ? {
            badge: faq.badge || "",
            heading: faq.heading || "",
            description: faq.description || "",
            items: faq.items?.length ? faq.items : (faq.faqs || []),
            faqs: faq.items?.length ? faq.items : (faq.faqs || []),
        } : faq;

        // Create document
        const doc = new CostPage({
            title: title.trim(),
            slug,
            pageType: normalizedPageType,
            sectionVisibility: sectionVisibility || {
                hero: true,
                intro: true,
                services: true,
                pricing: true,
                graftPricing: true,
                priceFactors: true,
                includedSection: true,
                consultation: true,
                faq: true,
                clinic: true,
            },

            seo,
            hero,
            intro,
            services,
            graftPricing,
            techniqueComparison,
            includedSection: normalizedIncluded,
            priceFactors,
            consultation,
            faq: normalizedFaq,
            settings,
            /* Generic / multi-type sections */
            ...(pricing !== undefined && { pricing }),
            ...(pricingOptions !== undefined && { pricingOptions }),
            ...(contentSections !== undefined && { contentSections }),
            ...(mythsFacts !== undefined && { mythsFacts }),
            ...(visitClinic !== undefined && { visitClinic }),
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