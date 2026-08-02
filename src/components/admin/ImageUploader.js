'use client';

import { useState, useEffect } from 'react';

export default function ImageUploader({ onUpload, onChange, initialImage, value }) {
  const currentImage = value !== undefined ? (value || '') : (initialImage || '');
  const [imageURL, setImageURL] = useState(currentImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setImageURL(currentImage);
  }, [currentImage]);

  const notifyChange = (newUrl, publicId) => {
    setImageURL(newUrl);
    if (onUpload) onUpload(newUrl, publicId);
    if (onChange) onChange(newUrl, publicId);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dashzer-data');
    formData.append('cloud_name', 'dq1tzl5ir');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dq1tzl5ir/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.secure_url) {
        notifyChange(data.secure_url, data.public_id);
      } else {
        setError(data.error?.message || 'Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors">
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {loading ? (
            <span className="text-sm text-blue-500 font-medium">Uploading…</span>
          ) : (
            <>
              <span className="text-sm font-medium">Click to upload image</span>
              <span className="text-xs">PNG, JPG, WebP up to 10MB</span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={loading}
          className="hidden"
        />
      </label>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* Manual URL Input Option */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Or paste image URL (e.g. /uploads/banner.jpg or https://...)"
          value={imageURL}
          onChange={(e) => notifyChange(e.target.value, null)}
          className="w-full text-xs p-2 border rounded-md"
        />
      </div>

      {imageURL && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageURL} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-600 mb-0.5">Uploaded / Selected</p>
            <a
              href={imageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline truncate block"
            >
              {imageURL}
            </a>
          </div>
          <button
            type="button"
            onClick={() => notifyChange('', null)}
            className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
