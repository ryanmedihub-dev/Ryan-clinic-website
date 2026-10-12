import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdmin } from "@/lib/requireAdmin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function isImageBuffer(buffer) {
  if (!buffer || buffer.length < 12) return false;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return true;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true;
  // GIF: 47 49 46 38 ('GIF8')
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return true;
  // WebP: RIFF (bytes 0-3) ... WEBP (bytes 8-11)
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return true;
  return false;
}

export async function POST(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

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

  // 1. Enforce file size limit (10MB)
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File size exceeds 10MB limit', errorMessage: 'File size exceeds 10MB limit' },
      { status: 400 }
    );
  }

  // 2. Validate MIME type
  const mimeType = (file.type || '').toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: `Invalid image type (${mimeType}). Allowed: JPG, PNG, WebP, GIF.`, errorMessage: `Invalid image type (${mimeType}).` },
      { status: 400 }
    );
  }

  // 3. Validate file extension
  const fileName = file.name || '';
  const lastDot = fileName.lastIndexOf('.');
  const ext = lastDot !== -1 ? fileName.slice(lastDot).toLowerCase() : '';
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: `Invalid file extension (${ext}). Allowed: .jpg, .jpeg, .png, .webp, .gif`, errorMessage: `Invalid file extension (${ext}).` },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // 4. Content / magic bytes verification
  if (!isImageBuffer(buffer)) {
    return NextResponse.json(
      { error: 'File content does not match a valid image signature', errorMessage: 'Invalid image signature' },
      { status: 400 }
    );
  }

  const patientId = formData.get('patientId');
  const section = formData.get('section');
  const folder = patientId
    ? `patient-documents/${patientId}`
    : (section || 'admin-uploads');

  const uploaded = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // Comprehensive backward-compatible response shape:
  // - secure_url & url: for ImageUploader and general URL consumers
  // - public_id & publicId: for lifecycle deletion tracking
  // - filePath: for patient documents / CRM file uploads
  // - result: array for SunEditor rich text editor
  return NextResponse.json({
    success: true,
    url: uploaded.secure_url,
    secure_url: uploaded.secure_url,
    public_id: uploaded.public_id,
    publicId: uploaded.public_id,
    filePath: uploaded.secure_url,
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
