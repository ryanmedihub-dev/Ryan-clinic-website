
import { DBConnection } from "./db.js";
import Services from "@/models/services";
import Doctor from "@/models/Doctors";

export const getAllServices = async () => {
  try {
    await DBConnection();
    const services = await Services.find({}).lean();
    return JSON.parse(JSON.stringify(services || []));
  } catch (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
};

export const getServiceBySlug = async (id) => {
  try {
    await DBConnection();
    const cleanId = decodeURIComponent(id).trim();
    let service = await Services.findOne({ "metadata.pageurl": cleanId }).lean();
    if (!service) {
      const escaped = cleanId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      service = await Services.findOne({
        "metadata.pageurl": { $regex: new RegExp(`^${escaped}$`, "i") },
      }).lean();
    }
    return service ? JSON.parse(JSON.stringify(service)) : null;
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
