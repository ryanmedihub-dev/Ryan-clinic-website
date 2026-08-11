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
      city,
      slug: rawSlug,
      status,
      landingCardImage,
      seo,
      hero,
      introduction,
      safetyInfo,
      surgeryTypes,
      bestSurgeryChecklist,
      candidateSuitability,
      beforeSurgeryTimeline,
      procedureScience,
      safety,
      techniques,
      qualityBenchmarks,
      procedureTimeline,
      recoveryTimeline,
      surgicalRisks,
      doctors,
      patientResults,
      pricing,
      visitClinic,
      consultation,
      faq,
      internalLinks,
      whyChooseUs,
    } = body;

    if (!pageName) {
      return NextResponse.json(
        { message: "Page name is required." },
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

    const normalizeImage = (img) => {
      if (typeof img === "string") return { image: img, imageAlt: "" };
      if (img && typeof img === "object") {
        return {
          image: typeof img.image === "string" ? img.image : (typeof img.url === "string" ? img.url : ""),
          imageAlt: typeof img.imageAlt === "string" ? img.imageAlt : (typeof img.alt === "string" ? img.alt : ""),
        };
      }
      return { image: "", imageAlt: "" };
    };

    const normalizeItem = (item) => {
      if (typeof item === "string") return { title: item, description: "" };
      return item || { title: "", description: "" };
    };

    const normalizedSurgicalRisks = surgicalRisks || {};
    if (Array.isArray(normalizedSurgicalRisks.preventionPoints)) {
      normalizedSurgicalRisks.preventionPoints = normalizedSurgicalRisks.preventionPoints.map(normalizeItem);
    }

    const normalizedPatientResults = patientResults || {};
    if (Array.isArray(normalizedPatientResults.cases)) {
      normalizedPatientResults.cases = normalizedPatientResults.cases.map((c) => ({
        ...c,
        beforeImage: normalizeImage(c.beforeImage),
        afterImage: normalizeImage(c.afterImage),
      }));
    }

    const normalizedWhyChooseUs = whyChooseUs || {};
    if (Array.isArray(normalizedWhyChooseUs.points)) {
      normalizedWhyChooseUs.points = normalizedWhyChooseUs.points.map(normalizeItem);
    }

    const doc = new SurgeryPageModel({
      pageName: pageName.trim(),
      city: (city || "").trim(),
      slug,
      status: status || "draft",
      landingCardImage: normalizeImage(landingCardImage),
      seo: seo || {},
      hero: hero || {},
      introduction: introduction || {},
      safetyInfo: safetyInfo || {},
      surgeryTypes: surgeryTypes || {},
      bestSurgeryChecklist: bestSurgeryChecklist || {},
      candidateSuitability: candidateSuitability || {},
      beforeSurgeryTimeline: beforeSurgeryTimeline || {},
      procedureScience: procedureScience || {},
      safety: safety || {},
      techniques: techniques || {},
      qualityBenchmarks: qualityBenchmarks || {},
      procedureTimeline: procedureTimeline || {},
      recoveryTimeline: recoveryTimeline || {},
      surgicalRisks: normalizedSurgicalRisks,
      doctors: doctors || {},
      patientResults: normalizedPatientResults,
      pricing: pricing || {},
      visitClinic: visitClinic || {},
      consultation: consultation || {},
      faq: faq || {},
      internalLinks: internalLinks || {},
      whyChooseUs: normalizedWhyChooseUs,
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