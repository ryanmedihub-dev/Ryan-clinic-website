import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploaded = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'blog-content' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // SunEditor expects this exact shape to insert the image
  return NextResponse.json({
    result: [
      {
        url: uploaded.secure_url,
        name: file.name,
        size: uploaded.bytes,
      },
    ],
  });
}
