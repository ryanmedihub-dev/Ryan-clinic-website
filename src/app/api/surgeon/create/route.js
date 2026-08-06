import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateSurgeonSlug } from "@/lib/surgeonSlug";
import SurgeonPage from "@/models/Surgeon";

const handler = async (req) => {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();

        const {
            title,
            slug: rawSlug,

            general,
            seo,
            hero,
            whySkill,
            benefits,
            whyClinic,
            surgeonRole,
            comparison,
            leadSurgeon,
            bookingChecklist,
            procedures,
            consultationCTA,
            faq,
            experienceSpecialization,
            skillEvaluation,
            hairlineArtistry,
            revisionRepair,
            costConsultation,
            visitSurgeon,
            settings,
        } = body;

        // Required validation
        if (!title?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page title is required.",
                },
                {
                    status: 400,
                }
            );
        }

        // Generate slug
        const slug = rawSlug
            ? generateSurgeonSlug(rawSlug)
            : generateSurgeonSlug(title);

        // Check duplicate slug
        const existing = await SurgeonPage.findOne({ slug });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: `A surgeon page with slug "${slug}" already exists.`,
                },
                {
                    status: 409,
                }
            );
        }

        // Create document
        const doc = new SurgeonPage({
            title: title.trim(),
            slug,

            general,
            seo,
            hero,
            whySkill,
            benefits,
            whyClinic,
            surgeonRole,
            comparison,
            leadSurgeon,
            bookingChecklist,
            procedures,
            consultationCTA,
            faq,
            ...(experienceSpecialization !== undefined && { experienceSpecialization }),
            ...(skillEvaluation !== undefined && { skillEvaluation }),
            ...(hairlineArtistry !== undefined && { hairlineArtistry }),
            ...(revisionRepair !== undefined && { revisionRepair }),
            ...(costConsultation !== undefined && { costConsultation }),
            ...(visitSurgeon !== undefined && { visitSurgeon }),
            settings,
        });

        await doc.save();

        return NextResponse.json(
            {
                success: true,
                message: "Surgeon page created successfully.",

                surgeonPage: {
                    _id: doc._id,
                    title: doc.title,
                    slug: doc.slug,
                    status: doc.settings?.status,
                    url: `/${doc.slug}`,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
};

export const POST = withDB(handler);