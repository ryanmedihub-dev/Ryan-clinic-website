import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Doctor from "@/models/Doctors";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
        const limit = Math.max(parseInt(searchParams.get("limit")) || 10, 1);
        const skip = (page - 1) * limit;

        // Filters
        const search = searchParams.get("search")?.trim() || "";
        const status = searchParams.get("status");
        const featured = searchParams.get("featured");
        const isActive = searchParams.get("isActive");

        // Sorting
        const sortBy = searchParams.get("sortBy") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

        // Allowed sorting fields
        const allowedSortFields = [
            "createdAt",
            "updatedAt",
            "displayOrder",
            "pageName",
            "basicInfo.doctorName",
        ];

        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        // Base filter
        const filter = {
            deletedAt: null,
        };

        if (status) {
            filter.status = status;
        }

        if (featured !== null && featured !== undefined) {
            filter.featured = featured === "true";
        }

        if (isActive !== null && isActive !== undefined) {
            filter.isActive = isActive === "true";
        }

        if (search) {
            filter.$or = [
                {
                    pageName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    "basicInfo.doctorName": {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    "basicInfo.designation": {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    "basicInfo.city": {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const doctors = await Doctor.find(filter)
            .select(
                `
        pageName
        slug
        basicInfo.doctorName
        basicInfo.designation
        basicInfo.city
        basicInfo.profileImage
        status
        featured
        isActive
        displayOrder
        createdAt
        updatedAt
      `
            )
            .sort({
                [sortField]: sortOrder,
            })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Doctor.countDocuments(filter);

        return NextResponse.json(
            {
                success: true,
                message: "Doctors fetched successfully.",
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                doctors,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
};

export const GET = withDB(handler);