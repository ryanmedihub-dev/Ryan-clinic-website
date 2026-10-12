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
  // WebP: RIFF ... WEBP
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return true;
  return false;
}

export async function POST(req) {
  try {
    // Authenticate Admin session
    const authError = await requireAdmin();
    if (authError) return authError;

    const formData = await req.formData();
    const files = [];

    // SunEditor sends files using indexed keys: 'file-0', 'file-1', ...
    let index = 0;
    while (formData.has(`file-${index}`)) {
      const f = formData.get(`file-${index}`);
      if (f && typeof f === 'object' && typeof f.arrayBuffer === 'function') {
        files.push(f);
      }
      index++;
    }

    // Fallback: check for 'file' or any File/Blob entries
    if (files.length === 0) {
      const singleFile = formData.get('file');
      if (singleFile && typeof singleFile === 'object' && typeof singleFile.arrayBuffer === 'function') {
        files.push(singleFile);
      } else {
        for (const [, val] of formData.entries()) {
          if (val && typeof val === 'object' && typeof val.arrayBuffer === 'function') {
            files.push(val);
          }
        }
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { errorMessage: 'No image file uploaded.' },
        { status: 400 }
      );
    }

    // Security validation: MIME type, file extension, and file size
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { errorMessage: `File "${file.name}" exceeds the 10MB size limit.` },
          { status: 400 }
        );
      }

      const mimeType = (file.type || '').toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          { errorMessage: `File "${file.name}" has invalid image type (${mimeType}). Allowed: JPG, PNG, WebP, GIF.` },
          { status: 400 }
        );
      }

      const lastDot = file.name.lastIndexOf('.');
      const ext = lastDot !== -1 ? file.name.slice(lastDot).toLowerCase() : '';
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { errorMessage: `File "${file.name}" has an invalid extension (${ext}).` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      if (!isImageBuffer(buffer)) {
        return NextResponse.json(
          { errorMessage: `File "${file.name}" content does not match a valid image signature.` },
          { status: 400 }
        );
      }
      file._buffer = buffer;
    }

    // Upload all files to Cloudinary in parallel
    const uploadPromises = files.map(async (file) => {
      const buffer = file._buffer || Buffer.from(await file.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'blog-content' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return {
        url: uploaded.secure_url,
        name: file.name,
        size: uploaded.bytes || file.size,
      };
    });

    const uploadedResults = await Promise.all(uploadPromises);

    // SunEditor expects exact response shape: { "result": [ { "url": "...", "name": "...", "size": ... } ] }
    return NextResponse.json({
      result: uploadedResults,
    });
  } catch (error) {
    console.error('Editor image upload error:', error);
    return NextResponse.json(
      { errorMessage: error.message || 'Internal server error during image upload.' },
      { status: 500 }
    );
  }
}
