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
        const currentId = searchParams.get("id") || body._id;

        if (!currentId && !currentSlug && !body.slug) {
            return NextResponse.json(
                {
                    message: "Doctor ID or slug is required for update.",
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

        let doctor = null;
        if (currentId) {
            doctor = await Doctor.findById(currentId);
        }
        if (!doctor && currentSlug) {
            doctor = await Doctor.findOne({
                slug: currentSlug,
                deletedAt: { $ne: true },
            });
        }
        if (!doctor && body.slug) {
            doctor = await Doctor.findOne({
                slug: body.slug,
                deletedAt: { $ne: true },
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

        const newSlug = rawSlug
            ? generateDoctorSlug(rawSlug)
            : generateDoctorSlug(pageName);

        if (newSlug !== doctor.slug) {
            const duplicate = await Doctor.findOne({
                slug: newSlug,
                _id: { $ne: doctor._id },
            });

            if (duplicate) {
                return NextResponse.json(
                    {
                        message: `Doctor page with slug "${newSlug}" already exists in the database. Please choose a different slug.`,
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

        [
            "basicInfo", "seo", "hero", "whyItMatters", "doctorStandards", "credentials",
            "verification", "comparison", "surgeonProfile", "surgeryTimeline", "consultation",
            "questionsToAsk", "greatDoctorQualities", "warningSigns", "proceduresPerformed",
            "surgicalProcess", "pricing", "visitClinic", "faq", "keyFacts", "medicalReviewer"
        ].forEach((key) => {
            if (body[key] !== undefined) {
                doctor.markModified(key);
            }
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
            }
        );
    }
};

export const PUT = withDB(handler);