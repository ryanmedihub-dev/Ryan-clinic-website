import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import HairFallPageModel from "@/models/hairFallPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async () => {
    try {
        const authError = await requireAdmin();
        if (authError) return authError;

        const hairFallPages = await HairFallPageModel.find()
            .select("city pageName slug status createdAt updatedAt")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                total: hairFallPages.length,
                hairFallPages,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
};

export const GET = withDB(handler);
