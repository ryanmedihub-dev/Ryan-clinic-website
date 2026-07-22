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

    // The current slug is passed as a query param so we know which doc to update
    const { searchParams } = new URL(req.url);
    const currentSlug = searchParams.get("slug");

    if (!currentSlug) {
      return NextResponse.json(
        { message: "Slug query parameter is required." },
        { status: 400 }
      );
    }

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

    const surgeryPage = await SurgeryPageModel.findOne({ slug: currentSlug });
    if (!surgeryPage) {
      return NextResponse.json(
        { message: "Surgery page not found." },
        { status: 404 }
      );
    }

    // Compute new slug (use provided slug or re-derive from pageName)
    const newSlug = rawSlug ? generateSlug(rawSlug) : generateSlug(pageName);

    // If the slug is changing, ensure no other document already uses it
    if (newSlug !== surgeryPage.slug) {
      const duplicate = await SurgeryPageModel.findOne({
        slug: newSlug,
        _id: { $ne: surgeryPage._id },
      });

      if (duplicate) {
        return NextResponse.json(
          { message: `A surgery page with slug "${newSlug}" already exists.` },
          { status: 409 }
        );
      }
    }

    surgeryPage.pageName = pageName.trim();
    surgeryPage.slug = newSlug;
    surgeryPage.seo = seo;
    surgeryPage.hero = hero;
    surgeryPage.introduction = introduction;
    surgeryPage.procedureScience = procedureScience;
    surgeryPage.safety = safety;
    surgeryPage.techniques = techniques;
    surgeryPage.qualityBenchmarks = qualityBenchmarks;
    surgeryPage.procedureTimeline = procedureTimeline;
    surgeryPage.recoveryTimeline = recoveryTimeline;
    surgeryPage.doctors = doctors;
    surgeryPage.pricing = pricing;
    surgeryPage.visitClinic = visitClinic;
    surgeryPage.consultation = consultation;
    surgeryPage.faq = faq;

    await surgeryPage.save();

    return NextResponse.json(
      {
        message: "Surgery page updated successfully.",
        surgeryPage: {
          _id: surgeryPage._id,
          pageName: surgeryPage.pageName,
          slug: surgeryPage.slug,
          status: surgeryPage.status,
          url: `/surgery/${surgeryPage.slug}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
};

export const PUT = withDB(handler);