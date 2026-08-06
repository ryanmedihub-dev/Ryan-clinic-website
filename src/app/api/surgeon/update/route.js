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
            _id,
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

        if (!_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Page ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

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

        const page = await SurgeonPage.findById(_id);

        if (!page || page.settings?.isDeleted) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Surgeon page not found.",
                },
                {
                    status: 404,
                }
            );
        }

        const slug = rawSlug
            ? generateSurgeonSlug(rawSlug)
            : generateSurgeonSlug(title);

        const duplicate = await SurgeonPage.findOne({
            slug,
            _id: { $ne: _id },
            "settings.isDeleted": { $ne: true },
        });

        if (duplicate) {
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

        // Preserve slug history
        const activeGeneral = general || {};
        if (page.slug !== slug) {
            const history = Array.isArray(activeGeneral.slugHistory) ? [...activeGeneral.slugHistory] : [];

            if (!history.includes(page.slug)) {
                history.push(page.slug);
            }

            activeGeneral.slugHistory = history;
        }

        page.title = title.trim();
        page.slug = slug;

        page.general = activeGeneral;
        page.seo = seo;
        page.hero = hero;
        page.whySkill = whySkill;
        page.benefits = benefits;
        page.whyClinic = whyClinic;
        page.surgeonRole = surgeonRole;
        page.comparison = comparison;
        page.leadSurgeon = leadSurgeon;
        page.bookingChecklist = bookingChecklist;
        page.procedures = procedures;
        page.consultationCTA = consultationCTA;
        page.faq = faq;
        if (experienceSpecialization !== undefined) page.experienceSpecialization = experienceSpecialization;
        if (skillEvaluation !== undefined) page.skillEvaluation = skillEvaluation;
        if (hairlineArtistry !== undefined) page.hairlineArtistry = hairlineArtistry;
        if (revisionRepair !== undefined) page.revisionRepair = revisionRepair;
        if (costConsultation !== undefined) page.costConsultation = costConsultation;
        if (visitSurgeon !== undefined) page.visitSurgeon = visitSurgeon;
        page.settings = settings;

        await page.save();

        return NextResponse.json(
            {
                success: true,
                message: "Surgeon page updated successfully.",

                surgeonPage: {
                    _id: page._id,
                    title: page.title,
                    slug: page.slug,
                    status: page.settings?.status,
                    url: `/${page.slug}`,
                },
            },
            {
                status: 200,
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

export const PUT = withDB(handler);