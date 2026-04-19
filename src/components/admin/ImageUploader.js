'use client';

import { useState } from 'react';

export default function ImageUploader({ onUpload, initialImage }) {
  const [imageURL, setImageURL] = useState(initialImage || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        setImageURL(data.url);
        if (onUpload) onUpload(data.url);
      } else {
        setError(data.error || 'Upload failed. Please try again.');
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

      {imageURL && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageURL} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-600 mb-0.5">Uploaded</p>
            <a
              href={imageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline truncate block"
            >
              {imageURL}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
