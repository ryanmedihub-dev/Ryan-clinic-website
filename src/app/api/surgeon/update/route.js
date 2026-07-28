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
            "settings.isDeleted": false,
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
        if (page.slug !== slug) {
            const history = general?.slugHistory || [];

            if (!history.includes(page.slug)) {
                history.push(page.slug);
            }

            general.slugHistory = history;
        }

        page.title = title.trim();
        page.slug = slug;

        page.general = general;
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