import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import Doctor from "@/models/Doctors";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            return NextResponse.json(
                {
                    message: "Doctor ID or slug is required.",
                },
                {
                    status: 400,
                }
            );
        }

        let doctor;

        if (id) {
            doctor = await Doctor.findOne({
                _id: id,
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            });
        } else {
            doctor = await Doctor.findOne({
                slug: slug.trim().toLowerCase(),
                $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
            });
        }

        if (!doctor) {
            return NextResponse.json(
                {
                    message: "Doctor page not found.",
                },
                {
                    status: 404,
                }
            );
        }

        // Soft Delete
        doctor.deletedAt = new Date();
        doctor.isActive = false;

        await doctor.save();

        return NextResponse.json(
            {
                message: "Doctor page deleted successfully.",
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

export const DELETE = withDB(handler);