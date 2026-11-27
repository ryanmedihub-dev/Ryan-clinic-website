import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Doctor from "@/models/Doctors";

const handler = async (req) => {
    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");
        const isAdminRequest = searchParams.get("admin") === "1";

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

        // Block demo-doctor-* profiles from public access; allow authenticated admin CMS reads.
        if (slug && slug.trim().toLowerCase().startsWith("demo-doctor-")) {
            if (!isAdminRequest) {
                return NextResponse.json(
                    { success: false, message: "Doctor not found." },
                    { status: 404 }
                );
            }
            const authError = await requireAdmin();
            if (authError) {
                return NextResponse.json(
                    { success: false, message: "Doctor not found." },
                    { status: 404 }
                );
            }
        }

        let doctor;
        const notDeletedFilter = {
            $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        };

        if (id) {
            doctor = await Doctor.findOne({
                _id: id,
                ...notDeletedFilter,
            }).lean();
        } else {
            doctor = await Doctor.findOne({
                slug: slug.trim().toLowerCase(),
                ...notDeletedFilter,
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