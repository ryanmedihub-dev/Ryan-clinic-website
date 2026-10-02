// src/app/api/service/edit/route.js
import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import Services from "@/models/services";
import Doctor from "@/models/Doctors";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidatePath } from "next/cache";

async function handler(request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const updateData = await request.json();
    
    const serviceId = updateData.id || updateData._id;
    // Validate required fields
    if (!serviceId) {
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

    if (updateData.branchName !== undefined) {
      formattedUpdate.metadata.branchName = updateData.branchName;
    }

    // Handle assignedDoctor validation
    const rawDoctorInput =
      updateData.assignedDoctorId !== undefined
        ? updateData.assignedDoctorId
        : updateData.assignedDoctor;

    let assignedDoctorId = null;
    if (rawDoctorInput && typeof rawDoctorInput === "object" && rawDoctorInput._id) {
      assignedDoctorId = String(rawDoctorInput._id).trim();
    } else if (typeof rawDoctorInput === "string") {
      assignedDoctorId = rawDoctorInput.trim();
    }

    if (
      assignedDoctorId &&
      assignedDoctorId !== "none" &&
      assignedDoctorId !== "" &&
      assignedDoctorId !== "null" &&
      assignedDoctorId !== "undefined"
    ) {
      if (!mongoose.Types.ObjectId.isValid(assignedDoctorId)) {
        return NextResponse.json(
          { error: "Invalid Doctor ID format" },
          { status: 400 }
        );
      }
      const doctorExists = await Doctor.findOne({
        _id: assignedDoctorId,
        deletedAt: null,
      }).select("_id basicInfo status isActive");

      if (!doctorExists) {
        return NextResponse.json(
          { error: "Assigned doctor not found" },
          { status: 400 }
        );
      }
      formattedUpdate.assignedDoctor = new mongoose.Types.ObjectId(assignedDoctorId);
    } else {
      formattedUpdate.assignedDoctor = null;
    }

    // Handle meetYourSurgeon presentation settings
    if (updateData.meetYourSurgeon) {
      formattedUpdate.meetYourSurgeon = {
        enabled: updateData.meetYourSurgeon.enabled !== false,
        eyebrow: updateData.meetYourSurgeon.eyebrow || "",
        heading: updateData.meetYourSurgeon.heading || "",
        badgeText: updateData.meetYourSurgeon.badgeText || "",
        consultationButtonLabel:
          updateData.meetYourSurgeon.consultationButtonLabel || "",
        profileButtonLabel: updateData.meetYourSurgeon.profileButtonLabel || "",
      };
    }

    // Preserve or update pageSections if provided
    if (Array.isArray(updateData.pageSections)) {
      formattedUpdate.pageSections = updateData.pageSections;
    }

    // Find and update the service
    const updatedService = await Services.findByIdAndUpdate(
      serviceId,
      { $set: formattedUpdate },
      { new: true, strict: false }
    ).populate({
      path: "assignedDoctor",
      select: "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
      strictPopulate: false,
    });

    if (!updatedService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    try {
      if (updatedService.metadata?.pageurl) {
        revalidatePath(`/${updatedService.metadata.pageurl}`);
        revalidatePath(`/admin/pages/edit/${updatedService.metadata.pageurl}`);
      }
      revalidatePath("/admin/pages");
      revalidatePath("/");
    } catch (revalErr) {
      console.error("revalidatePath error:", revalErr);
    }

    return NextResponse.json(
      { 
        message: "Service updated successfully", 
        service: updatedService 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating service:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to update service" },
      { status: 500 }
    );
  }
}


export const PUT = withDB(handler);