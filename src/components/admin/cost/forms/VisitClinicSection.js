"use client";

export default function VisitClinicSection({ formData, updateField, addItem, removeItem }) {
  const vc = formData.visitClinic || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">Visit Clinic (Location / Address Block)</h3>
      <p className="text-sm text-gray-500 mb-4">
        All fields here are CMS-controlled. Leave phone/whatsapp blank until the correct number is confirmed.
        Do not invent nearby areas, metro directions, or parking unless verified.
      </p>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Badge</label>
          <input
            type="text"
            value={vc.badge || ""}
            onChange={(e) => updateField("visitClinic.badge", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Our Delhi Clinic"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={vc.heading || ""}
            onChange={(e) => updateField("visitClinic.heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Visiting Ryan Clinic for PRP in Delhi"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Description</label>
        <textarea
          rows={3}
          value={vc.description || ""}
          onChange={(e) => updateField("visitClinic.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="Brief intro for the visit section..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full Address</label>
          <textarea
            rows={3}
            value={vc.address || ""}
            onChange={(e) => updateField("visitClinic.address", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">City</label>
          <input
            type="text"
            value={vc.city || ""}
            onChange={(e) => updateField("visitClinic.city", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Delhi"
          />
          <label className="block text-sm font-semibold text-gray-700 mt-3">Landmark</label>
          <input
            type="text"
            value={vc.landmark || ""}
            onChange={(e) => updateField("visitClinic.landmark", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Leave blank if unverified"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Phone Number <span className="text-amber-600 font-normal">(leave blank — confirm correct number first)</span>
          </label>
          <input
            type="text"
            value={vc.phone || ""}
            onChange={(e) => updateField("visitClinic.phone", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Leave blank until verified"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            WhatsApp Number <span className="text-amber-600 font-normal">(leave blank — confirm correct number first)</span>
          </label>
          <input
            type="text"
            value={vc.whatsapp || ""}
            onChange={(e) => updateField("visitClinic.whatsapp", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Leave blank until verified"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Clinic Hours / Timings</label>
        <input
          type="text"
          value={vc.timings || ""}
          onChange={(e) => updateField("visitClinic.timings", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="e.g. Mon–Sat: 9 AM – 7 PM"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Google Maps Embed URL</label>
        <input
          type="text"
          value={vc.mapEmbedUrl || ""}
          onChange={(e) => updateField("visitClinic.mapEmbedUrl", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
          placeholder="https://maps.google.com/embed?pb=..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">CTA Button Text</label>
          <input
            type="text"
            value={vc.buttonText || "Get Directions"}
            onChange={(e) => updateField("visitClinic.buttonText", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">CTA Button Link</label>
          <input
            type="text"
            value={vc.buttonLink || ""}
            onChange={(e) => updateField("visitClinic.buttonLink", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Google Maps link or /contact"
          />
        </div>
      </div>

      {/* Nearby Areas */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Nearby Areas <span className="text-gray-400 font-normal">(leave empty if unverified)</span>
          </label>
          <button
            type="button"
            onClick={() => addItem("visitClinic.nearbyAreas", "")}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition font-semibold cursor-pointer"
          >
            + Add Area
          </button>
        </div>
        {(vc.nearbyAreas || []).map((area, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="text"
              value={area || ""}
              onChange={(e) => {
                const updated = [...(vc.nearbyAreas || [])];
                updated[i] = e.target.value;
                updateField("visitClinic.nearbyAreas", updated);
              }}
              className="flex-1 p-2 border rounded-md text-sm"
              placeholder="e.g. Pitampura, Rohini, etc."
            />
            <button
              type="button"
              onClick={() => removeItem("visitClinic.nearbyAreas", i)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
