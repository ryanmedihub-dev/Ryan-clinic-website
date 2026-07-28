import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import CostPage from "@/models/CostPage";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const sort = searchParams.get("sort") || "latest";

    const skip = (page - 1) * limit;

    const query = {
      "settings.isDeleted": { $ne: true },
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          slug: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query["settings.status"] = status;
    }

    let sortQuery = {};

    switch (sort) {
      case "oldest":
        sortQuery = { createdAt: 1 };
        break;

      case "displayOrder":
        sortQuery = {
          "settings.displayOrder": 1,
        };
        break;

      default:
        sortQuery = {
          createdAt: -1,
        };
    }

    const [costPages, total] = await Promise.all([
      CostPage.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),

      CostPage.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,

      costPages,

      pagination: {
        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

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