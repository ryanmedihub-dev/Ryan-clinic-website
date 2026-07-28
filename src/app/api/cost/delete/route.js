import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import CostPage from "@/models/CostPage";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { _id } = await req.json();

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page ID is required.",
                },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid page ID.",
                },
                { status: 400 }
            );
        }

        const page = await CostPage.findByIdAndDelete(_id);

        if (!page) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cost page not found or already deleted.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Cost page deleted successfully.",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
};

export const DELETE = withDB(handler);