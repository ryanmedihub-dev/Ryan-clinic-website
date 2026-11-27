
import mongoose from "mongoose";
import { DBConnection } from "./db.js";
import Services from "@/models/services";
import Doctor from "@/models/Doctors";
import { servicePageFixtures } from "@/lib/fixtures/marketingPageFixtures";
import { resolveBranchDoctors } from "@/lib/doctorProfiles.mjs";

const POPULATE_DOCTOR_FIELDS =
  "basicInfo doctorCard credentials surgeonProfile hero keyFacts medicalReviewer comparison teamDoctors displayOrder createdAt slug status isActive deletedAt";

export const getAllServices = async () => {
  try {
    await DBConnection();
    const services = await Services.find({})
      .populate({
        path: "assignedDoctor",
        select: POPULATE_DOCTOR_FIELDS,
        strictPopulate: false,
      })
      .populate({
        path: "assignedDoctors",
        select: POPULATE_DOCTOR_FIELDS,
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
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    })
      .select(POPULATE_DOCTOR_FIELDS)
      .lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch (error) {
    console.error("getAssignedDoctor error:", error.message);
    return null;
  }
};

export const getServiceBySlug = async (id) => {
  const cleanId = decodeURIComponent(id).trim();
  if (servicePageFixtures && servicePageFixtures[cleanId]) {
    return JSON.parse(JSON.stringify(servicePageFixtures[cleanId]));
  }
  try {
    await DBConnection();
    let service = await Services.findOne({ "metadata.pageurl": cleanId })
      .populate({
        path: "assignedDoctor",
        select: POPULATE_DOCTOR_FIELDS,
        strictPopulate: false,
      })
      .populate({
        path: "assignedDoctors",
        select: POPULATE_DOCTOR_FIELDS,
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
          select: POPULATE_DOCTOR_FIELDS,
          strictPopulate: false,
        })
        .populate({
          path: "assignedDoctors",
          select: POPULATE_DOCTOR_FIELDS,
          strictPopulate: false,
        })
        .lean();
    }
    if (!service && mongoose.Types.ObjectId.isValid(cleanId)) {
      service = await Services.findById(cleanId)
        .populate({
          path: "assignedDoctor",
          select: POPULATE_DOCTOR_FIELDS,
          strictPopulate: false,
        })
        .populate({
          path: "assignedDoctors",
          select: POPULATE_DOCTOR_FIELDS,
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

    // Resolve any unpopulated entries in assignedDoctors
    if (Array.isArray(service.assignedDoctors) && service.assignedDoctors.length > 0) {
      const resolvedList = await Promise.all(
        service.assignedDoctors.map(async (item) => {
          if (item && typeof item === "object" && item.basicInfo) return item;
          const docId = item?._id || item;
          return docId ? await getAssignedDoctor(docId) : null;
        })
      );
      service.assignedDoctors = resolvedList.filter(Boolean);
    }

    return JSON.parse(JSON.stringify(service));
  } catch (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
};

export const getDoctorsByCity = async (city) => {
  try {
    if (!city || typeof city !== "string" || !city.trim()) {
      return [];
    }
    await DBConnection();
    const cleanCity = decodeURIComponent(city).trim();
    const escaped = cleanCity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const baseFilter = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
      status: "published",
      isActive: { $ne: false },
      slug: { $not: /^demo-doctor-/i },
    };

    let docs = await Doctor.find({
      ...baseFilter,
      "basicInfo.city": { $regex: new RegExp(`^\\s*${escaped}\\s*$`, "i") },
    })
      .select(POPULATE_DOCTOR_FIELDS)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    if (!docs.length) {
      docs = await Doctor.find({
        ...baseFilter,
        "basicInfo.city": { $regex: new RegExp(`\\b${escaped}\\b`, "i") },
      })
        .select(POPULATE_DOCTOR_FIELDS)
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();
    }

    return JSON.parse(JSON.stringify(docs || []));
  } catch (error) {
    console.error("getDoctorsByCity error:", error.message);
    return [];
  }
};

export const getDoctorByCity = async (city) => {
  const docs = await getDoctorsByCity(city);
  return docs[0] || null;
};

export const getResolvedDoctorsForService = async (service, branchCity = "") => {
  try {
    const cityName = branchCity?.trim() || service?.metadata?.branchName?.trim() || "";
    const cityDoctors = cityName ? await getDoctorsByCity(cityName) : [];
    return resolveBranchDoctors({
      assignedDoctors: Array.isArray(service?.assignedDoctors) ? service.assignedDoctors : [],
      assignedDoctor: service?.assignedDoctor || null,
      cityDoctors,
    });
  } catch (error) {
    console.error("getResolvedDoctorsForService error:", error.message);
    return resolveBranchDoctors({
      assignedDoctors: Array.isArray(service?.assignedDoctors) ? service.assignedDoctors : [],
      assignedDoctor: service?.assignedDoctor || null,
      cityDoctors: [],
    });
  }
};
