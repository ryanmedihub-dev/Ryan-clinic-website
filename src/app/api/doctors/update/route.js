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

        const { searchParams } = new URL(req.url);
        const currentSlug = searchParams.get("slug");

        if (!currentSlug) {
            return NextResponse.json(
                {
                    message: "Slug query parameter is required.",
                },
                {
                    status: 400,
                }
            );
        }

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
                }
            );
        }

        if (!hero) {
            return NextResponse.json(
                {
                    message: "Hero section is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const doctor = await Doctor.findOne({
            slug: currentSlug,
            deletedAt: null,
        });

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

        const newSlug = rawSlug
            ? generateDoctorSlug(rawSlug)
            : generateDoctorSlug(pageName);

        if (newSlug !== doctor.slug) {
            const duplicate = await Doctor.findOne({
                slug: newSlug,
                deletedAt: null,
                _id: { $ne: doctor._id },
            });

            if (duplicate) {
                return NextResponse.json(
                    {
                        message: `Doctor page with slug "${newSlug}" already exists.`,
                    },
                    {
                        status: 409,
                    }
                );
            }
        }

        Object.assign(doctor, {
            ...body,
            pageName: pageName.trim(),
            slug: newSlug,
        });

        await doctor.save();

        return NextResponse.json(
            {
                message: "Doctor page updated successfully.",
                doctor: {
                    _id: doctor._id,
                    pageName: doctor.pageName,
                    slug: doctor.slug,
                    status: doctor.status,
                    url: `/doctors/${doctor.slug}`,
                },
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

export const PUT = withDB(handler);