import Sliders from "@/models/sliders";
import { NextResponse } from "next/server";
import { withDB } from "@/lib/withDB";
import { requireAdmin } from "@/lib/requireAdmin";


const isValidType = (type) => {
  const validTypes = ['results', 'service', 'branch', 'testimonial'];
  return validTypes.includes(type);
};


const getAllSliders = async () => {
  try {
    const sliders = await Sliders.findOne({});
    return NextResponse.json(
      { success: true, data: sliders || {} }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },  
      { status: 500 }
    );
  }
};


const createSlider = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { type, data } = await req.json();

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Type and data are required' },
        { status: 400 }
      );
    }

    if (!isValidType(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid slider type' },
        { status: 400 }
      );
    }

    const slider = await Sliders.findOneAndUpdate(
      {},
      { $push: { [type]: data } },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      { success: true, data: slider },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};


const updateSlider = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const data = await req.json();

    if (!type || !id || !data) {
      return NextResponse.json(
        { success: false, error: 'Type, id and data are required' },
        { status: 400 }
      );
    }

    if (!isValidType(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid slider type' },
        { status: 400 }
      );
    }

    const updated = await Sliders.findOneAndUpdate(
      { [`${type}._id`]: id },
      { $set: { [`${type}.$`]: data } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};


const deleteSlider = async (req) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Type and id are required' },
        { status: 400 }
      );
    }

    if (!isValidType(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid slider type' },
        { status: 400 }
      );
    }

    const deleted = await Sliders.findOneAndUpdate(
      {},
      { $pull: { [type]: { _id: id } } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, data: deleted },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};


const handler = async (req) => {
  switch (req.method) {
    case 'GET':
      return getAllSliders();
    case 'POST':
      return createSlider(req);
    case 'PUT':
      return updateSlider(req);
    case 'DELETE':
      return deleteSlider(req);
    default:
      return NextResponse.json(
        { success: false, error: `Method ${req.method} not allowed` },
        { status: 405 }
      );
  }
};

export const GET = withDB(handler);
export const POST = withDB(handler);
export const PUT = withDB(handler);
export const DELETE = withDB(handler);