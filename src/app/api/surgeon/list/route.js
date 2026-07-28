import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import SurgeonPage from "@/models/Surgeon";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";

        const skip = (page - 1) * limit;

        const query = {
            "settings.isDeleted": false,
        };

        if (search) {
            query.title = {
                $regex: search,
                $options: "i",
            };
        }

        if (status) {
            query["settings.status"] = status;
        }

        const total = await SurgeonPage.countDocuments(query);

        const pages = await SurgeonPage.find(query)
            .sort({
                "settings.displayOrder": 1,
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit)
            .lean();

        return NextResponse.json(
            {
                success: true,

                data: pages,

                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
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

export const GET = withDB(handler);