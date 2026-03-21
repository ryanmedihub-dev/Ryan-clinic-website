'use client';

import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    
    // Replace with your actual Cloudinary upload preset and cloud name
    formData.append('upload_preset', 'dashzer-data'); 
    formData.append('cloud_name', 'dq1tzl5ir');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dq1tzl5ir/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setImageURL(data.secure_url);
        if (onUpload) onUpload(data.secure_url, data.public_id);
      } else {
        alert(data.error?.message || 'Upload failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image!');
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full mb-2 border rounded p-2"
      />

      {loading && <p className="text-sm text-gray-500">Uploading...</p>}

      {imageURL && (
        <div className="mt-2 flex align-middle gap-3">
          <p className="text-sm text-gray-600">Uploaded Preview:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 wrap-break-words">
            {imageURL}
          </a>
        </div>
      )}
    </div>
  );
}
