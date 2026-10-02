import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Doctor from "@/models/Doctors";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Doctor ID or slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Block demo-doctor-* profiles from any public access via this endpoint.
        // They are CMS-only records used for branch testing.
        if (slug && slug.trim().toLowerCase().startsWith("demo-doctor-")) {
            return NextResponse.json(
                { success: false, message: "Doctor not found." },
                { status: 404 }
            );
        }

        let doctor;

        if (id) {
            doctor = await Doctor.findOne({
                _id: id,
                deletedAt: null,
            }).lean();
        } else {
            doctor = await Doctor.findOne({
                slug: slug.trim().toLowerCase(),
                deletedAt: null,
            }).lean();
        }

        if (!doctor) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Doctor not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                doctor,
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