"use client";

import ImageUploader from "@/components/admin/ImageUploader";

/**
 * Shared admin editor for managing multiple teamDoctors on a location's Doctor CMS page.
 */
export default function TeamDoctorsEditor({
  teamDoctors = [],
  onChange,
  enableReordering = false,
}) {
  const list = Array.isArray(teamDoctors) ? teamDoctors : [];

  const handleAdd = () => {
    onChange([
      ...list,
      {
        doctorName: "",
        qualification: "",
        designation: "",
        about: "",
        profileImage: { image: "", alt: "" },
      },
    ]);
  };

  const handleMove = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const handleRemove = (idx) => {
    onChange(list.filter((_, i) => i !== idx));
  };

  const handleFieldChange = (idx, field, val) => {
    const next = [...list];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  };

  return (
    <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Branch Team Doctors (Multi-Doctor Zigzag Profiles)
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Each doctor listed here renders as an independent alternating profile section (Doctor 1: Text Left / Photo Right, Doctor 2: Photo Left / Text Right). Separate published Doctor CMS pages sharing the same city also appear automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3.5 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 shrink-0 cursor-pointer"
        >
          + Add Team Doctor
        </button>
      </div>

      {list.length > 0 && (
        <div className="space-y-4">
          {list.map((td, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Team Doctor #{idx + 1}
                </span>
                <div className="flex items-center gap-2">
                  {enableReordering && (
                    <>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        className="px-2 py-0.5 text-xs font-bold border rounded bg-slate-50 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={idx === list.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        className="px-2 py-0.5 text-xs font-bold border rounded bg-slate-50 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                      >
                        ↓
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Doctor Name *</label>
                  <input
                    type="text"
                    value={td.doctorName || ""}
                    onChange={(e) => handleFieldChange(idx, "doctorName", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="e.g. Sayali Sanjay Kote"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Qualification</label>
                  <input
                    type="text"
                    value={td.qualification || ""}
                    onChange={(e) => handleFieldChange(idx, "qualification", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="e.g. MBBS"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Designation</label>
                  <input
                    type="text"
                    value={td.designation || ""}
                    onChange={(e) => handleFieldChange(idx, "designation", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                    placeholder="Hair Transplant Doctor"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700">Individual Bio / Overview</label>
                <textarea
                  rows={2}
                  value={td.about || ""}
                  onChange={(e) => handleFieldChange(idx, "about", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  placeholder="Verified bio for this doctor..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Individual Profile Image</label>
                <ImageUploader
                  initialImage={td.profileImage?.image || ""}
                  onUpload={(url) =>
                    handleFieldChange(idx, "profileImage", {
                      ...(td.profileImage || {}),
                      image: url,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
