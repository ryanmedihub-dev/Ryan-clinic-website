
import mongoose from "mongoose";
import { DBConnection } from "./db.js";
import Services from "@/models/services";
import Doctor from "@/models/Doctors";

export const getAllServices = async () => {
  try {
    await DBConnection();
    const services = await Services.find({})
      .populate({
        path: "assignedDoctor",
        select:
          "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
        strictPopulate: false,
      })
      .lean();
    return JSON.parse(JSON.stringify(services || []));
  } catch (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
};

export const getAssignedDoctor = async (doctorId) => {
  if (!doctorId) return null;
  try {
    await DBConnection();
    const cleanId = typeof doctorId === "object" && doctorId._id ? doctorId._id : doctorId;
    const doc = await Doctor.findOne({
      _id: cleanId,
      deletedAt: null,
    })
      .select(
        "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt"
      )
      .lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch (error) {
    console.error("getAssignedDoctor error:", error.message);
    return null;
  }
};

export const getServiceBySlug = async (id) => {
  try {
    await DBConnection();
    const cleanId = decodeURIComponent(id).trim();
    let service = await Services.findOne({ "metadata.pageurl": cleanId })
      .populate({
        path: "assignedDoctor",
        select:
          "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
        strictPopulate: false,
      })
      .lean();
    if (!service) {
      const escaped = cleanId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      service = await Services.findOne({
        "metadata.pageurl": { $regex: new RegExp(`^${escaped}$`, "i") },
      })
        .populate({
          path: "assignedDoctor",
          select:
            "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
          strictPopulate: false,
        })
        .lean();
    }
    if (!service && mongoose.Types.ObjectId.isValid(cleanId)) {
      service = await Services.findById(cleanId)
        .populate({
          path: "assignedDoctor",
          select:
            "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison slug status isActive deletedAt",
          strictPopulate: false,
        })
        .lean();
    }
    if (!service) return null;

    // If assignedDoctor was an unpopulated ObjectId or string, resolve it safely
    if (
      service.assignedDoctor &&
      (typeof service.assignedDoctor === "string" ||
        service.assignedDoctor._bsontype === "ObjectID" ||
        service.assignedDoctor.constructor?.name === "ObjectId" ||
        !service.assignedDoctor.basicInfo)
    ) {
      const docId = service.assignedDoctor?._id || service.assignedDoctor;
      const resolved = await getAssignedDoctor(docId);
      if (resolved) {
        service.assignedDoctor = resolved;
      }
    }

    return JSON.parse(JSON.stringify(service));
  } catch (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
};

export const getDoctorByCity = async (city) => {
  try {
    if (!city || typeof city !== "string" || !city.trim()) {
      return null;
    }
    await DBConnection();
    const cleanCity = decodeURIComponent(city).trim();
    const escaped = cleanCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Exact city match first (e.g., city === "Delhi" or "Mumbai")
    let doc = await Doctor.findOne({
      "basicInfo.city": { $regex: new RegExp(`^\\s*${escaped}\\s*$`, "i") },
      deletedAt: null,
      status: "published",
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    // If no exact match, check word boundary match within city
    if (!doc) {
      doc = await Doctor.findOne({
        "basicInfo.city": { $regex: new RegExp(`\\b${escaped}\\b`, "i") },
        deletedAt: null,
        status: "published",
      })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
    }

    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch (error) {
    console.error("getDoctorByCity error:", error.message);
    return null;
  }
};
