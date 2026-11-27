// app/api/register/route.js (for App Router)

import Service from '@/models/services';
import Doctor from '@/models/Doctors';
import mongoose from 'mongoose';
import { withDB } from '@/lib/withDB';
import { requireAdmin } from "@/lib/requireAdmin";

async function registerHandler(request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const data = await request.json();
    
    // Handle assignedDoctors (ordered array) & backwards-compatible assignedDoctor validation
    if (Array.isArray(data.assignedDoctors)) {
      const seenIds = new Set();
      const validIds = [];
      for (const rawId of data.assignedDoctors) {
        const idStr = rawId && typeof rawId === "object" && rawId._id
          ? String(rawId._id).trim()
          : typeof rawId === "string"
            ? rawId.trim()
            : "";
        if (idStr && idStr !== "none" && !seenIds.has(idStr)) {
          if (!mongoose.Types.ObjectId.isValid(idStr)) {
            return Response.json({ success: false, message: "Invalid Doctor ID format" }, { status: 400 });
          }
          seenIds.add(idStr);
          validIds.push(idStr);
        }
      }
      if (validIds.length > 0) {
        const matched = await Doctor.find({
          _id: { $in: validIds },
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          status: "published",
        }).select("_id");
        if (matched.length !== validIds.length) {
          return Response.json({ success: false, message: "One or more assigned doctors not found or not published" }, { status: 400 });
        }
      }
      data.assignedDoctors = validIds;
      data.assignedDoctor = validIds[0] || null;
    } else {
      const assignedDoctorId = data.assignedDoctorId !== undefined ? data.assignedDoctorId : data.assignedDoctor;
      if (assignedDoctorId && assignedDoctorId !== "none" && assignedDoctorId !== "" && assignedDoctorId !== null) {
        if (!mongoose.Types.ObjectId.isValid(assignedDoctorId)) {
          return Response.json({ success: false, message: "Invalid Doctor ID format" }, { status: 400 });
        }
        const doctorExists = await Doctor.findOne({
          _id: assignedDoctorId,
          $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
          status: "published",
        }).select("_id");

        if (!doctorExists) {
          return Response.json({ success: false, message: "Assigned doctor not found or is not published" }, { status: 400 });
        }
        data.assignedDoctor = assignedDoctorId;
        data.assignedDoctors = [assignedDoctorId];
      } else {
        data.assignedDoctor = null;
        data.assignedDoctors = [];
      }
    }

    const newService = new Service(data);
    const savedService = await newService.save();
    
    return Response.json({
      success: true,
      message: 'Service registered successfully',
      data: savedService
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      message: 'Registration failed',
      error: error.message
    }, { status: 400 });
  }
}

export const POST = withDB(registerHandler);

