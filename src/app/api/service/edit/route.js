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

    const existingService = await Services.findById(serviceId).lean();
    if (!existingService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Format the data according to the schema while safely preserving banner badgeText
    const formattedUpdate = {
      bannerData: {
        title: updateData.bannerTitle !== undefined ? updateData.bannerTitle : (existingService.bannerData?.title || ""),
        description: updateData.bannerDescription !== undefined ? updateData.bannerDescription : (existingService.bannerData?.description || ""),
        imageurl: updateData.bannerImage !== undefined ? updateData.bannerImage : (existingService.bannerData?.imageurl || ""),
        imagealt: updateData.bannerAlt !== undefined ? updateData.bannerAlt : (existingService.bannerData?.imagealt || ""),
        badgeText:
          updateData.bannerBadgeText !== undefined
            ? updateData.bannerBadgeText
            : updateData.badgeText !== undefined
            ? updateData.badgeText
            : updateData.bannerData?.badgeText !== undefined
            ? updateData.bannerData.badgeText
            : (existingService.bannerData?.badgeText || ""),
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

    // Handle assignedDoctors (ordered array) & backwards-compatible assignedDoctor
    let normalizedAssignedDoctorIds = null;
    if (Array.isArray(updateData.assignedDoctors)) {
      const seenIds = new Set();
      normalizedAssignedDoctorIds = [];
      for (const rawItem of updateData.assignedDoctors) {
        let idStr = "";
        if (rawItem && typeof rawItem === "object" && rawItem._id) {
          idStr = String(rawItem._id).trim();
        } else if (typeof rawItem === "string") {
          idStr = rawItem.trim();
        }
        if (
          idStr &&
          idStr !== "none" &&
          idStr !== "null" &&
          idStr !== "undefined" &&
          !seenIds.has(idStr)
        ) {
          if (!mongoose.Types.ObjectId.isValid(idStr)) {
            return NextResponse.json(
              { error: `Invalid Doctor ID format in assignedDoctors: ${idStr}` },
              { status: 400 }
            );
          }
          seenIds.add(idStr);
          normalizedAssignedDoctorIds.push(idStr);
        }
      }

      if (normalizedAssignedDoctorIds.length > 0) {
        const matchedDocs = await Doctor.find({
          _id: { $in: normalizedAssignedDoctorIds },
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        }).select("_id");
        if (matchedDocs.length !== normalizedAssignedDoctorIds.length) {
          return NextResponse.json(
            { error: "One or more assigned doctors were not found" },
            { status: 400 }
          );
        }
      }

      formattedUpdate.assignedDoctors = normalizedAssignedDoctorIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      formattedUpdate.assignedDoctor =
        formattedUpdate.assignedDoctors[0] || null;
    } else {
      // Legacy single assignedDoctor fallback
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
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
        }).select("_id basicInfo status isActive");

        if (!doctorExists) {
          return NextResponse.json(
            { error: "Assigned doctor not found" },
            { status: 400 }
          );
        }
        const oid = new mongoose.Types.ObjectId(assignedDoctorId);
        formattedUpdate.assignedDoctor = oid;
        formattedUpdate.assignedDoctors = [oid];
      } else if (rawDoctorInput !== undefined) {
        formattedUpdate.assignedDoctor = null;
        formattedUpdate.assignedDoctors = [];
      }
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
    )
      .populate({
        path: "assignedDoctor",
        select: "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison teamDoctors displayOrder createdAt slug status isActive deletedAt",
        strictPopulate: false,
      })
      .populate({
        path: "assignedDoctors",
        select: "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison teamDoctors displayOrder createdAt slug status isActive deletedAt",
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