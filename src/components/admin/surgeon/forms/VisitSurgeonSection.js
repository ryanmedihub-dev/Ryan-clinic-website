"use client";

export default function VisitSurgeonSection({ formData, updateField }) {
  const section = formData.visitSurgeon || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">
        Visit Surgeon / Contact Section
      </h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={section.badge?.text || ""}
            onChange={(e) => updateField("visitSurgeon.badge.text", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Visit Us"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={section.heading || ""}
            onChange={(e) => updateField("visitSurgeon.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Section heading"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={section.description || ""}
          onChange={(e) => updateField("visitSurgeon.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Address</label>
          <input
            type="text"
            value={section.address || ""}
            onChange={(e) => updateField("visitSurgeon.address", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Full clinic address"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Phone</label>
          <input
            type="text"
            value={section.phone || ""}
            onChange={(e) => updateField("visitSurgeon.phone", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="+91-XXXXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Clinic Hours</label>
          <input
            type="text"
            value={section.hours || ""}
            onChange={(e) => updateField("visitSurgeon.hours", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Mon–Sat, 9am–6pm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Nearest Metro</label>
          <input
            type="text"
            value={section.metro || ""}
            onChange={(e) => updateField("visitSurgeon.metro", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. AIIMS Metro Station"
          />
        </div>
      </div>
    </div>
  );
}
