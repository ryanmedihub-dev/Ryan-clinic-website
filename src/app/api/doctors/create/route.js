import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateDoctorSlug } from "@/lib/doctorSlug";
import Doctor from "@/models/Doctors";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();

        const {
            pageName,
            slug: rawSlug,
            basicInfo,
            seo,
            hero,
        } = body;

        // Required Validation
        if (!pageName) {
            return NextResponse.json(
                {
                    message: "Page name is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!basicInfo) {
            return NextResponse.json(
                {
                    message: "Basic information is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!seo) {
            return NextResponse.json(
                {
                    message: "SEO data is required.",
                },
                {
                    status: 400,
                },
            );
        }

        if (!hero) {
            return NextResponse.json(
                {
                    message: "Hero section is required.",
                },
                {
                    status: 400,
                },
            );
        }

        // Generate Slug
        const slug = rawSlug
            ? generateDoctorSlug(rawSlug)
            : generateDoctorSlug(pageName);

        // Check duplicate slug across all docs
        const existingSlug = await Doctor.findOne({
            slug,
        });

        if (existingSlug) {
            return NextResponse.json(
                {
                    message: `Doctor page with slug "${slug}" already exists.`,
                },
                {
                    status: 409,
                },
            );
        }

        // Check duplicate page name
        const existingPage = await Doctor.findOne({
            pageName: pageName.trim(),
            deletedAt: null,
        });

        if (existingPage) {
            return NextResponse.json(
                {
                    message: `Doctor page "${pageName}" already exists.`,
                },
                {
                    status: 409,
                },
            );
        }

        // Create Document
        const doctor = new Doctor({
            ...body,
            pageName: pageName.trim(),
            slug,
        });

        await doctor.save();

        return NextResponse.json(
            {
                message: "Doctor page created successfully.",
                doctor: {
                    _id: doctor._id,
                    pageName: doctor.pageName,
                    slug: doctor.slug,
                    status: doctor.status,
                    url: `/doctors/${doctor.slug}`,
                },
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        if (error.code === 11000 || error.message?.includes("E11000")) {
            return NextResponse.json(
                {
                    message: `A doctor page with that slug already exists in the database index. Please use a unique slug.`,
                },
                {
                    status: 409,
                }
            );
        }
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            },
        );
    }
};

export const POST = withDB(handler);