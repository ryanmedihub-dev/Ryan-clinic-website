// app/api/register/route.js (for App Router)

import Service from '@/models/services';
import { withDB } from '@/lib/withDB';
import { requireAdmin } from "@/lib/requireAdmin";

async function registerHandler(request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const data = await request.json();
    
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

