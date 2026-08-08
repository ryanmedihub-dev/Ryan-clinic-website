import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { withDB } from "@/lib/withDB";
import CostPage from "@/models/CostPage";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        let costPage = await CostPage.findOne({
            slug,
            "settings.isDeleted": { $ne: true },
        }).lean();

        if (!costPage && mongoose.Types.ObjectId.isValid(slug)) {
            costPage = await CostPage.findOne({
                _id: slug,
                "settings.isDeleted": { $ne: true },
            }).lean();
        }

        if (!costPage) {
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

        const validTypes = ["hair-transplant", "prp", "dhi", "beard-transplant", "other"];
        if (!costPage.pageType || !validTypes.includes(costPage.pageType)) {
            costPage.pageType = "hair-transplant";
        }

        const defaultVisibility = {
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
        };

        costPage.sectionVisibility = {
            ...defaultVisibility,
            ...(costPage.sectionVisibility || {}),
        };

        return NextResponse.json(
            {
                success: true,
                costPage,
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

export const GET = withDB(handler);