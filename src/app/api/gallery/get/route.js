import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Gallery from "@/models/gallery";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = async () => {
    try {
        //const authError = await requireAdmin();
        //if (authError) return authError;

        const gallery = await Gallery.findOne();

        if (!gallery) {
            return NextResponse.json({
                message: "Gallery not found",
            }, {
                status: 404
            })
        }

        return NextResponse.json(
            {
                gallery,
            },
            {
                status: 200,
            }
        );

    }
    catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export const GET = withDB(handler);