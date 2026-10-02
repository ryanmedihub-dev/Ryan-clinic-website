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
    
    // Handle assignedDoctor validation
    const assignedDoctorId = data.assignedDoctorId !== undefined ? data.assignedDoctorId : data.assignedDoctor;
    if (assignedDoctorId && assignedDoctorId !== "none" && assignedDoctorId !== "" && assignedDoctorId !== null) {
      if (!mongoose.Types.ObjectId.isValid(assignedDoctorId)) {
        return Response.json({ success: false, message: "Invalid Doctor ID format" }, { status: 400 });
      }
      const doctorExists = await Doctor.findOne({
        _id: assignedDoctorId,
        deletedAt: null,
        status: "published",
      }).select("_id");

      if (!doctorExists) {
        return Response.json({ success: false, message: "Assigned doctor not found or is not published" }, { status: 400 });
      }
      data.assignedDoctor = assignedDoctorId;
    } else {
      data.assignedDoctor = null;
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

