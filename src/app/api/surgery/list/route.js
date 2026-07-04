import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async () => {
    try {
        // const authError = await requireAdmin();
        // if (authError) return authError;

        const surgeryPages = await SurgeryPageModel.find()
            .select("pageName slug createdAt updatedAt")
            .sort({ createdAt: -1 });

        return NextResponse.json(
            {
                surgeryPages,
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

export const GET = withDB(handler);