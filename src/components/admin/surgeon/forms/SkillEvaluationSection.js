"use client";

export default function SkillEvaluationSection({
  formData,
  updateField,
  addItem,
  removeItem,
  updateArrayItem,
}) {
  const section = formData.skillEvaluation || {};

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold underline mt-10 mb-5">
        Skill Evaluation Section
      </h3>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Badge Text</label>
          <input
            type="text"
            value={section.badge?.text || ""}
            onChange={(e) =>
              updateField("skillEvaluation.badge.text", e.target.value)
            }
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="e.g. Skill Assessment"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold text-gray-700">Heading</label>
          <input
            type="text"
            value={section.heading || ""}
            onChange={(e) => updateField("skillEvaluation.heading", e.target.value)}
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
          onChange={(e) => updateField("skillEvaluation.description", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() =>
            addItem("skillEvaluation.items", {
              label: "",
              score: 0,
              description: "",
              displayOrder: 0,
              active: true,
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 transition font-semibold text-sm cursor-pointer"
        >
          + Add Skill Item
        </button>

        {(section.items || []).length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-gray-500 text-sm">No skill items added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {(section.items || []).map((item, i) => (
              <div key={i} className="border rounded-xl p-4 bg-white shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-sm">Skill {i + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeItem("skillEvaluation.items", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Label</label>
                    <input
                      type="text"
                      value={item.label || ""}
                      onChange={(e) =>
                        updateArrayItem("skillEvaluation.items", i, "label", e.target.value)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="e.g. Graft Survival Rate"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Score (0-100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={item.score ?? 0}
                      onChange={(e) =>
                        updateArrayItem("skillEvaluation.items", i, "score", parseInt(e.target.value) || 0)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Display Order</label>
                    <input
                      type="number"
                      value={item.displayOrder ?? 0}
                      onChange={(e) =>
                        updateArrayItem("skillEvaluation.items", i, "displayOrder", parseInt(e.target.value) || 0)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700">Description</label>
                    <textarea
                      rows={2}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateArrayItem("skillEvaluation.items", i, "description", e.target.value)
                      }
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
