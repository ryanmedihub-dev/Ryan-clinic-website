import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import SurgeryPageModel from "@/models/surgeryPage";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateSlug } from "@/lib/surgerySlug";

const handler = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();

    const {
      pageName,
      slug: rawSlug,
      seo,
      hero,
      introduction,
      procedureScience,
      safety,
      techniques,
      qualityBenchmarks,
      procedureTimeline,
      recoveryTimeline,
      doctors,
      pricing,
      visitClinic,
      consultation,
      faq,
    } = body;

    if (!pageName) {
      return NextResponse.json(
        { message: "Page name is required." },
        { status: 400 }
      );
    }

    if (
      !seo || !hero || !introduction || !procedureScience || !safety ||
      !techniques || !qualityBenchmarks || !procedureTimeline ||
      !recoveryTimeline || !doctors || !pricing || !visitClinic ||
      !consultation || !faq
    ) {
      return NextResponse.json(
        { message: "Please provide all required surgery page data." },
        { status: 400 }
      );
    }

    // Use provided slug, or auto-generate from page name
    const slug = rawSlug ? generateSlug(rawSlug) : generateSlug(pageName);

    // Validate uniqueness
    const existing = await SurgeryPageModel.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: `A surgery page with slug "${slug}" already exists.` },
        { status: 409 }
      );
    }

    const doc = new SurgeryPageModel({
      pageName: pageName.trim(),
      slug,
      seo,
      hero,
      introduction,
      procedureScience,
      safety,
      techniques,
      qualityBenchmarks,
      procedureTimeline,
      recoveryTimeline,
      doctors,
      pricing,
      visitClinic,
      consultation,
      faq,
    });

    await doc.save();

    return NextResponse.json(
      {
        message: "Surgery page created successfully.",
        surgeryPage: {
          _id: doc._id,
          pageName: doc.pageName,
          slug: doc.slug,
          status: doc.status,
          url: `/surgery/${doc.slug}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
};

export const POST = withDB(handler);