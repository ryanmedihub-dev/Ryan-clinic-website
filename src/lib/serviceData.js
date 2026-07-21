
import { DBConnection } from "./db";
import Services from "@/models/services";

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
    const service = await Services.findOne({ "metadata.pageurl": id }).lean();
    return service ? JSON.parse(JSON.stringify(service)) : null;
  } catch (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
};
