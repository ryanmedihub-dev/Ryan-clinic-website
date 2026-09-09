import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from "@/lib/requireAdmin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const formData = await req.formData();
  let file = formData.get('file') || formData.get('file-0');

  if (!file || typeof file.arrayBuffer !== 'function') {
    // Fallback: look for any valid File in entries
    for (const [, val] of formData.entries()) {
      if (val && typeof val === 'object' && typeof val.arrayBuffer === 'function') {
        file = val;
        break;
      }
    }
  }

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded', errorMessage: 'No file uploaded' }, { status: 400 });
  }

  const patientId = formData.get('patientId');
  const section = formData.get('section');
  const folder = patientId
    ? `patient-documents/${patientId}`
    : (section || 'blog-content');

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploaded = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // Backward-compatible response:
  // - filePath: for patient documents / existing CRM file uploads
  // - url: for general URL callers
  // - result: for SunEditor rich text editor callers
  return NextResponse.json({
    filePath: uploaded.secure_url,
    url: uploaded.secure_url,
    result: [
      {
        url: uploaded.secure_url,
        name: file.name,
        size: uploaded.bytes,
      },
    ],
  });
}

export async function DELETE(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json().catch(() => ({}));
    const publicId = body.public_id || body.publicId;

    if (!publicId) {
      return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 500 });
  }
}
