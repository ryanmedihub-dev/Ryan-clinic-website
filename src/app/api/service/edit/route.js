// src/app/api/service/edit/route.js
import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";
import { requireAdmin } from "@/lib/requireAdmin";

export async function handler(request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const updateData = await request.json();
    
    // Validate required fields
    if (!updateData.id) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    // Format the data according to the schema
    const formattedUpdate = {
      bannerData: {
        title: updateData.bannerTitle || "",
        description: updateData.bannerDescription || "",
        imageurl: updateData.bannerImage || "",
        imagealt: updateData.bannerAlt || "",
      },
      benefitsData: {
        title: updateData.benefitsTitle || "",
        description: updateData.benefitsDescription || "",
        component: updateData.benefitComponents || [],
      },
      extraFields: {
        detail1: updateData.extraDetail1 || "",
        detail2: updateData.extraDetail2 || "",
      },
      faq: updateData.faqs || [],
      metadata: {
        pageName: updateData.pageName || "",
        pageType: updateData.pageType || "transplant",
        description: updateData.description || "",
        pageurl: updateData.pageUrl || "",
        title: updateData.serviceTitle || "",
        overviewData: updateData.overviewContent || "",
        keywords: updateData.keywords || [],
      },
      typesData: {
        details: updateData.typesDetails || "",
        // Safely handle typeImages - use empty array if undefined
        images: Array.isArray(updateData.typeImages) 
          ? updateData.typeImages.map(image => ({
              url: image?.url || "",
              alt: image?.alt || "",
            }))
          : [],
      },
    };


    // Find and update the service
    const updatedService = await Services.findByIdAndUpdate(
      updateData.id,
      formattedUpdate,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Service updated successfully", 
        service: updatedService 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service", details: error.message },
      { status: 500 }
    );
  }
}


export const PUT = withDB(handler);