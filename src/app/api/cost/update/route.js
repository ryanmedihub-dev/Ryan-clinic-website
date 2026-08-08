import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

        if (pageType !== undefined) {
            const validTypes = ["hair-transplant", "prp", "dhi", "beard-transplant", "other"];
            doc.pageType = validTypes.includes(pageType) ? pageType : "hair-transplant";
        }

        if (sectionVisibility !== undefined) {
            const currentVis = doc.sectionVisibility?.toObject ? doc.sectionVisibility.toObject() : (doc.sectionVisibility || {});
            doc.sectionVisibility = {
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
                ...currentVis,
                ...sectionVisibility,
            };
        }

        doc.seo = seo;
        doc.hero = hero;
        doc.intro = intro;
        doc.services = services;
        if (pricing !== undefined) doc.pricing = pricing;
        doc.graftPricing = graftPricing;
        doc.techniqueComparison = techniqueComparison;

        if (includedSection) {
            const itemsList = includedSection.items?.length ? includedSection.items : (includedSection.hiddenCosts || []);
            const discList = includedSection.disclosures?.length ? includedSection.disclosures : (includedSection.guarantees || []);
            doc.includedSection = {
                ...includedSection,
                items: itemsList,
                hiddenCosts: itemsList,
                disclosures: discList,
                guarantees: discList,
            };
        } else {
            doc.includedSection = includedSection;
        }

        doc.priceFactors = priceFactors;
        doc.consultation = consultation;

        if (faq) {
            const faqList = faq.items?.length ? faq.items : (faq.faqs || []);
            doc.faq = {
                badge: faq.badge || "",
                heading: faq.heading || "",
                description: faq.description || "",
                items: faqList,
                faqs: faqList,
            };
        } else {
            doc.faq = faq;
        }

        doc.settings = settings;

        /* Generic / multi-type sections */
        if (pricingOptions !== undefined) doc.pricingOptions = pricingOptions;
        if (contentSections !== undefined) doc.contentSections = contentSections;
        if (mythsFacts !== undefined) doc.mythsFacts = mythsFacts;
        if (visitClinic !== undefined) doc.visitClinic = visitClinic;

        /* Explicitly mark modified for sub-documents & arrays */
        ["pageType", "sectionVisibility", "pricing", "seo", "hero", "intro", "services", "graftPricing", "techniqueComparison", "includedSection", "priceFactors", "consultation", "faq", "settings", "pricingOptions", "contentSections", "mythsFacts", "visitClinic"].forEach((path) => {
            doc.markModified(path);
        });

        await doc.save();

        try {
            revalidatePath(`/cost/${doc.slug}`);
            revalidatePath(`/cost/${newSlug}`);
            revalidatePath("/cost/[slug]", "page");
            revalidatePath("/cost");
        } catch (e) {
            console.error("Revalidation error:", e);
        }

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