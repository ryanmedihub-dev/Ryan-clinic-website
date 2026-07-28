"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import dynamic from "next/dynamic";
import { initialHairFallState } from "../create/page";
import "suneditor/dist/css/suneditor.min.css";

const sunEditorOptions = {
    height: "300px",
    buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor"],
        ["align", "horizontalRule", "list", "table"],
        ["link", "image", "video"],
        ["fullScreen", "showBlocks", "codeView"],
        ["preview", "print"],
    ],
    defaultStyle: "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
    imageUploadUrl: "/api/upload",
};

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

// ─── SHARED SUB-COMPONENTS — module level so React never remounts them on re-renders ──

function CTABlock({ label, value, onChange }) {
    return (
        <div className="border rounded-xl p-5 bg-gray-50 space-y-3 mt-4">
            <h5 className="text-sm font-semibold text-gray-700">{label}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Button Text</label>
                    <input type="text" value={value?.text || ""} onChange={(e) => onChange("text", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Book Consultation" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Button Link</label>
                    <input type="text" value={value?.link || ""} onChange={(e) => onChange("link", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. /book-now" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={!!value?.external} onChange={(e) => onChange("external", e.target.checked)} className="w-4 h-4" />
                <label className="text-sm text-gray-600">Open in new tab (External URL)</label>
            </div>
        </div>
    );
}

function ImageBlock({ label, value, onChange }) {
    return (
        <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <ImageUploader initialImage={value?.image} onUpload={(url) => onChange({ ...value, image: url })} />
            <input type="text" value={value?.imageAlt || ""} onChange={(e) => onChange({ ...value, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder={`${label} — Alt Text`} />
        </div>
    );
}

function StringListEditor({ label, items, onAdd, onUpdate, onDelete, placeholder }) {
    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">{label}</label>
                <button type="button" onClick={onAdd} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">+ Add</button>
            </div>
            {(items || []).length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center"><p className="text-gray-500 text-sm">None added yet.</p></div>
            ) : (
                <div className="space-y-2">
                    {items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => onUpdate(i, e.target.value)} className="flex-1 p-2 border rounded-md" placeholder={placeholder} />
                            <button type="button" onClick={() => onDelete(i)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function useToast() {
    const [toasts, setToasts] = useState([]);
    const add = useCallback((type, title, message) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    }, []);
    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    return {
        toasts,
        remove,
        success: (title, message) => add("success", title, message),
        error: (title, message) => add("error", title, message),
    };
}

function EditHairFallForm() {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialHairFallState);

    const fetchHairFallPage = useCallback(async () => {
        if (!slug) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/hair-fall/get?slug=${slug}`);
            const data = await response.json();
            if (response.ok && data.hairFallPage) {
                const d = data.hairFallPage;
                setFormData({
                    ...initialHairFallState,
                    ...d,
                    seo: { ...initialHairFallState.seo, ...(d.seo || {}) },
                    hero: { ...initialHairFallState.hero, ...(d.hero || {}), stats: d.hero?.stats || [], quickFacts: d.hero?.quickFacts || [] },
                    introduction: { ...initialHairFallState.introduction, ...(d.introduction || {}), heroStats: d.introduction?.heroStats || [] },
                    causes: {
                        ...initialHairFallState.causes, ...(d.causes || {}),
                        featuredCauses: (d.causes?.featuredCauses || []).map((c) => ({ ...c, points: c.points || [] })),
                        otherCauses: d.causes?.otherCauses || [],
                    },
                    warning: { ...initialHairFallState.warning, ...(d.warning || {}), warningSigns: d.warning?.warningSigns || [] },
                    diagnosis: { ...initialHairFallState.diagnosis, ...(d.diagnosis || {}), steps: d.diagnosis?.steps || [] },
                    treatments: {
                        ...initialHairFallState.treatments, ...(d.treatments || {}),
                        treatments: (d.treatments?.treatments || []).map((t) => ({ ...t, bulletPoints: t.bulletPoints || [] })),
                    },
                    gender: {
                        menCard: { ...initialHairFallState.gender.menCard, ...(d.gender?.menCard || {}) },
                        womenCard: { ...initialHairFallState.gender.womenCard, ...(d.gender?.womenCard || {}) },
                        heading: d.gender?.heading || "",
                    },
                    treatmentMap: { ...initialHairFallState.treatmentMap, ...(d.treatmentMap || {}), rows: d.treatmentMap?.rows || [] },
                    results: { ...initialHairFallState.results, ...(d.results || {}), facts: d.results?.facts || [] },
                    doctor: { ...initialHairFallState.doctor, ...(d.doctor || {}), criteria: d.doctor?.criteria || [] },
                    whyChoose: { ...initialHairFallState.whyChoose, ...(d.whyChoose || {}), points: d.whyChoose?.points || [] },
                    cost: { ...initialHairFallState.cost, ...(d.cost || {}), items: d.cost?.items || [] },
                    myths: { ...initialHairFallState.myths, ...(d.myths || {}), myths: d.myths?.myths || [] },
                    visitClinic: { ...initialHairFallState.visitClinic, ...(d.visitClinic || {}), infoCards: d.visitClinic?.infoCards || [] },
                    consultation: { ...initialHairFallState.consultation, ...(d.consultation || {}), contactCards: d.consultation?.contactCards || [], statsRow: d.consultation?.statsRow || [] },
                    faq: { ...initialHairFallState.faq, ...(d.faq || {}), stats: d.faq?.stats || [], faqs: d.faq?.faqs || [] },
                });
            } else {
                toast.error("Error", data.message || "Hair fall treatment page NOT found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Failed to load page data.");
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    useEffect(() => {
        fetchHairFallPage();
    }, [fetchHairFallPage]);

    // ─── STATE MUTATION HELPERS ────────────────────────────────────────────────
    const handleTopLevelChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };
    const handleDeepChange = (section, subSection, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subSection]: { ...prev[section][subSection], [field]: value },
            },
        }));
    };
    const addToArray = (section, field, newItem) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: [...(prev[section][field] || []), newItem] },
        }));
    };
    const deleteFromArray = (section, field, index) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: prev[section][field].filter((_, i) => i !== index) },
        }));
    };
    const updateArrayItem = (section, field, index, itemField, value) => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            arr[index] = { ...arr[index], [itemField]: value };
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };
    const addStringItem = (section, field, value = "") => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: [...(prev[section][field] || []), value] },
        }));
    };
    const deleteStringItem = (section, field, index) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: prev[section][field].filter((_, i) => i !== index) },
        }));
    };
    const updateStringItem = (section, field, index, value) => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            arr[index] = value;
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };
    const addNestedItem = (section, field, index, subField, newItem = "") => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            arr[index] = { ...arr[index], [subField]: [...(arr[index][subField] || []), newItem] };
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };
    const deleteNestedItem = (section, field, index, subField, subIndex) => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            arr[index] = { ...arr[index], [subField]: arr[index][subField].filter((_, i) => i !== subIndex) };
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };
    const updateNestedItem = (section, field, index, subField, subIndex, value) => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            const subArr = [...(arr[index][subField] || [])];
            subArr[subIndex] = value;
            arr[index] = { ...arr[index], [subField]: subArr };
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };

    // ─── SUBMIT HANDLER ────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.city.trim()) {
            toast.error("Validation Error", "City is required.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch(`/api/hair-fall/update?slug=${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Success", data.message || "Hair fall treatment page updated successfully.");
                setTimeout(() => router.push("/admin/hair-fall"), 1500);
            } else {
                toast.error("Error", data.message || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network Error", "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading page data...</p>
            </div>
        );
    }

    return (
        <section className="pb-24">
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
            <AdminHeader title={`/ Edit Hair Fall Treatment Page: ${formData.pageName || slug}`} />

            <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto">

                {/* ─── GENERAL INFO ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mb-5">General Info</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">City *</label>
                        <input type="text" value={formData.city} onChange={(e) => handleTopLevelChange("city", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Delhi" required />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Status</label>
                        <select value={formData.status} onChange={(e) => handleTopLevelChange("status", e.target.value)} className="w-full mt-2 p-2 border rounded-md">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>

                {/* ─── SEO ─────────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Meta Details</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Meta Title *</label>
                        <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" required />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Meta Description *</label>
                        <textarea rows={4} value={formData.seo.metaDescription} onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)} className="w-full mt-2 p-2 border rounded-md" required />
                    </div>
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Keywords</label>
                        <input type="text" value={formData.seo.keywords} onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)} className="w-full mt-2 p-2 border rounded-md" />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Canonical URL</label>
                        <input type="text" value={formData.seo.canonicalUrl} onChange={(e) => handleNestedChange("seo", "canonicalUrl", e.target.value)} className="w-full mt-2 p-2 border rounded-md" />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Robots</label>
                        <input type="text" value={formData.seo.robots} onChange={(e) => handleNestedChange("seo", "robots", e.target.value)} className="w-full mt-2 p-2 border rounded-md" />
                    </div>
                </div>
                <ImageBlock label="OG Share Image" value={formData.seo.openGraphImage} onChange={(v) => handleNestedChange("seo", "openGraphImage", v)} />

                {/* ─── HERO ────────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Hero / Banner Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Breadcrumb</label><input type="text" value={formData.hero.breadcrumb} onChange={(e) => handleNestedChange("hero", "breadcrumb", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Hero Title</label><input type="text" value={formData.hero.title} onChange={(e) => handleNestedChange("hero", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Hero Description</label>
                        <textarea rows={3} value={formData.hero.description} onChange={(e) => handleNestedChange("hero", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" />
                    </div>
                    <ImageBlock label="Hero Banner Image" value={formData.hero.heroImage} onChange={(v) => handleNestedChange("hero", "heroImage", v)} />

                    <div className="mt-4">
                        <button type="button" onClick={() => addToArray("hero", "stats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Banner Stat</button>
                        {formData.hero.stats.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No banner stats added yet.</p></div>
                        ) : (
                            <div className="space-y-4">
                                {formData.hero.stats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-semibold">Stat {i + 1}</h5>
                                            <button type="button" onClick={() => deleteFromArray("hero", "stats", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("hero", "stats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("hero", "stats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <StringListEditor
                        label="Quick Facts (pill chips under the intro)"
                        items={formData.hero.quickFacts}
                        onAdd={() => addStringItem("hero", "quickFacts")}
                        onUpdate={(i, v) => updateStringItem("hero", "quickFacts", i, v)}
                        onDelete={(i) => deleteStringItem("hero", "quickFacts", i)}
                        placeholder="e.g. Diagnosis before treatment"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <CTABlock label="WhatsApp CTA" value={formData.hero.whatsappText} onChange={(field, val) => handleNestedChange("hero", "whatsappText", { ...formData.hero.whatsappText, [field]: val })} />
                        <CTABlock label="Phone Call CTA" value={formData.hero.callText} onChange={(field, val) => handleNestedChange("hero", "callText", { ...formData.hero.callText, [field]: val })} />
                    </div>
                </div>

                {/* ─── INTRODUCTION ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Introduction Section (Image Showcase)</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Small Heading</label><input type="text" value={formData.introduction.smallHeading} onChange={(e) => handleNestedChange("introduction", "smallHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Title</label><input type="text" value={formData.introduction.title} onChange={(e) => handleNestedChange("introduction", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label>
                        <SunEditor setContents={formData.introduction.description} onChange={(val) => handleNestedChange("introduction", "description", val)} setOptions={sunEditorOptions} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Highlight Box Text (Rich Text)</label>
                        <SunEditor setContents={formData.introduction.highlightBoxText} onChange={(val) => handleNestedChange("introduction", "highlightBoxText", val)} setOptions={sunEditorOptions} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageBlock label="Main (Back) Image" value={formData.introduction.mainImage} onChange={(v) => handleNestedChange("introduction", "mainImage", v)} />
                        <ImageBlock label="Floating (Front) Image" value={formData.introduction.floatingImage} onChange={(v) => handleNestedChange("introduction", "floatingImage", v)} />
                    </div>
                    <div>
                        <button type="button" onClick={() => addToArray("introduction", "heroStats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Stat</button>
                        {formData.introduction.heroStats.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.introduction.heroStats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-semibold">Stat {i + 1}</h5>
                                            <button type="button" onClick={() => deleteFromArray("introduction", "heroStats", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("introduction", "heroStats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("introduction", "heroStats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── CAUSES ──────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Causes Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.causes.heading} onChange={(e) => handleNestedChange("causes", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label><SunEditor setContents={formData.causes.description} onChange={(val) => handleNestedChange("causes", "description", val)} setOptions={sunEditorOptions} /></div>

                    <button type="button" onClick={() => addToArray("causes", "featuredCauses", { tag: "", title: "", subtitle: "", description: "", points: [], cardImage: { image: "", imageAlt: "" }, reverse: false, displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Featured Cause</button>
                    {formData.causes.featuredCauses.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4"><p className="text-gray-500">No featured causes added yet.</p></div>
                    ) : (
                        <div className="space-y-5 mt-4">
                            {formData.causes.featuredCauses.map((c, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Featured Cause {i + 1}</h4>
                                        <button type="button" onClick={() => deleteFromArray("causes", "featuredCauses", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-semibold">Tag (e.g. Most Common)</label><input type="text" value={c.tag} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "tag", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={c.title} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Subtitle</label><input type="text" value={c.subtitle} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "subtitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Description</label><textarea rows={3} value={c.description} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    <ImageBlock label="Card Image" value={c.cardImage} onChange={(v) => updateArrayItem("causes", "featuredCauses", i, "cardImage", v)} />
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-semibold">Bullet Points</label>
                                            <button type="button" onClick={() => addNestedItem("causes", "featuredCauses", i, "points")} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">+ Add Point</button>
                                        </div>
                                        {(c.points || []).map((pt, pi) => (
                                            <div key={pi} className="flex gap-2 mt-2">
                                                <input type="text" value={pt} onChange={(e) => updateNestedItem("causes", "featuredCauses", i, "points", pi, e.target.value)} className="flex-1 p-2 border rounded-md" />
                                                <button type="button" onClick={() => deleteNestedItem("causes", "featuredCauses", i, "points", pi)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked={!!c.reverse} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "reverse", e.target.checked)} className="w-4 h-4" />
                                        <label className="text-sm text-gray-600">Reverse layout (image on right)</label>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Display Order</label><input type="number" value={c.displayOrder} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border rounded-xl p-6 bg-gray-50 space-y-4 mt-6">
                        <div><label className="block text-sm font-semibold text-gray-700">Other Causes — Strip Heading</label><input type="text" value={formData.causes.otherCausesHeading} onChange={(e) => handleNestedChange("causes", "otherCausesHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <button type="button" onClick={() => addToArray("causes", "otherCauses", { icon: "", title: "", description: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Cause</button>
                        {formData.causes.otherCauses.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No causes added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.causes.otherCauses.map((c, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-semibold">Cause {i + 1}</h5>
                                            <button type="button" onClick={() => deleteFromArray("causes", "otherCauses", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={c.icon} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Title</label><input type="text" value={c.title} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "title", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Order</label><input type="number" value={c.displayOrder} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                        <div className="mt-2"><label className="block text-sm font-semibold">Description</label><textarea rows={2} value={c.description} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── WARNING / WHEN TO SEE A DOCTOR ─────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">&quot;When to See a Doctor&quot; Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.warning.heading} onChange={(e) => handleNestedChange("warning", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.warning.description} onChange={(e) => handleNestedChange("warning", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <StringListEditor label="Warning Signs" items={formData.warning.warningSigns} onAdd={() => addStringItem("warning", "warningSigns")} onUpdate={(i, v) => updateStringItem("warning", "warningSigns", i, v)} onDelete={(i) => deleteStringItem("warning", "warningSigns", i)} placeholder="e.g. Visible thinning or a receding hairline." />
                    <ImageBlock label="Callout Panel Image" value={formData.warning.calloutImage} onChange={(v) => handleNestedChange("warning", "calloutImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-gray-700">Callout Badge</label><input type="text" value={formData.warning.calloutBadge} onChange={(e) => handleNestedChange("warning", "calloutBadge", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700">Callout Title</label><input type="text" value={formData.warning.calloutTitle} onChange={(e) => handleNestedChange("warning", "calloutTitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div><label className="block text-sm font-semibold text-gray-700">Callout Description</label><textarea rows={2} value={formData.warning.calloutDescription} onChange={(e) => handleNestedChange("warning", "calloutDescription", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <CTABlock label="Callout CTA" value={formData.warning.calloutCTA} onChange={(field, val) => handleNestedChange("warning", "calloutCTA", { ...formData.warning.calloutCTA, [field]: val })} />
                </div>

                {/* ─── DIAGNOSIS ───────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Diagnosis Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.diagnosis.heading} onChange={(e) => handleNestedChange("diagnosis", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.diagnosis.description} onChange={(e) => handleNestedChange("diagnosis", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <ImageBlock label="Side Image" value={formData.diagnosis.sideImage} onChange={(v) => handleNestedChange("diagnosis", "sideImage", v)} />
                    <button type="button" onClick={() => addToArray("diagnosis", "steps", { icon: "", stepNumber: "", title: "", description: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Step</button>
                    {formData.diagnosis.steps.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No steps added yet.</p></div>
                    ) : (
                        <div className="space-y-3">
                            {formData.diagnosis.steps.map((s, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-semibold">Step {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("diagnosis", "steps", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <div><label className="block text-sm font-semibold">Step No.</label><input type="text" value={s.stepNumber} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "stepNumber", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={s.icon} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div className="md:col-span-2"><label className="block text-sm font-semibold">Title</label><input type="text" value={s.title} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "title", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                    <div className="mt-2"><label className="block text-sm font-semibold">Description</label><textarea rows={2} value={s.description} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── TREATMENTS ──────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Treatment Options Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.treatments.heading} onChange={(e) => handleNestedChange("treatments", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.treatments.description} onChange={(e) => handleNestedChange("treatments", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>

                    <button type="button" onClick={() => addToArray("treatments", "treatments", { icon: "", title: "", description: "", treatmentImage: { image: "", imageAlt: "" }, bulletPoints: [], featured: false, ctaText: { text: "", link: "", external: false }, displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Treatment</button>
                    {formData.treatments.treatments.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4"><p className="text-gray-500">No treatments added yet.</p></div>
                    ) : (
                        <div className="space-y-5 mt-4">
                            {formData.treatments.treatments.map((t, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-lg font-semibold">Treatment {i + 1}</h4>
                                        <button type="button" onClick={() => deleteFromArray("treatments", "treatments", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={t.icon} onChange={(e) => updateArrayItem("treatments", "treatments", i, "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={t.title} onChange={(e) => updateArrayItem("treatments", "treatments", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Description</label><textarea rows={3} value={t.description} onChange={(e) => updateArrayItem("treatments", "treatments", i, "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    <ImageBlock label="Treatment Image (optional — leave blank for icon-style card)" value={t.treatmentImage} onChange={(v) => updateArrayItem("treatments", "treatments", i, "treatmentImage", v)} />
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-semibold">Bullet Points</label>
                                            <button type="button" onClick={() => addNestedItem("treatments", "treatments", i, "bulletPoints")} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">+ Add Bullet</button>
                                        </div>
                                        {(t.bulletPoints || []).map((b, bi) => (
                                            <div key={bi} className="flex gap-2 mt-2">
                                                <input type="text" value={b} onChange={(e) => updateNestedItem("treatments", "treatments", i, "bulletPoints", bi, e.target.value)} className="flex-1 p-2 border rounded-md" />
                                                <button type="button" onClick={() => deleteNestedItem("treatments", "treatments", i, "bulletPoints", bi)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                    <CTABlock label="Link CTA" value={t.ctaText} onChange={(field, val) => updateArrayItem("treatments", "treatments", i, "ctaText", { ...t.ctaText, [field]: val })} />
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked={!!t.featured} onChange={(e) => updateArrayItem("treatments", "treatments", i, "featured", e.target.checked)} className="w-4 h-4" />
                                            <label className="text-sm text-gray-600">Featured (highlighted dark card)</label>
                                        </div>
                                        <div className="flex-1"><label className="block text-sm font-semibold">Display Order</label><input type="number" value={t.displayOrder} onChange={(e) => updateArrayItem("treatments", "treatments", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── GENDER (MEN/WOMEN) ──────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Men / Women Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.gender.heading} onChange={(e) => handleNestedChange("gender", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {["menCard", "womenCard"].map((key) => (
                            <div key={key} className="border rounded-xl p-5 bg-gray-50 space-y-3">
                                <h5 className="text-sm font-semibold text-gray-700">{key === "menCard" ? "Men's Card" : "Women's Card"}</h5>
                                <input type="text" value={formData.gender[key].title} onChange={(e) => handleDeepChange("gender", key, "title", e.target.value)} className="w-full p-2 border rounded-md" placeholder="Title" />
                                <textarea rows={4} value={formData.gender[key].description} onChange={(e) => handleDeepChange("gender", key, "description", e.target.value)} className="w-full p-2 border rounded-md" placeholder="Description" />
                                <ImageBlock label="Card Image" value={formData.gender[key].cardImage} onChange={(v) => handleDeepChange("gender", key, "cardImage", v)} />
                                <CTABlock label="Card CTA (optional)" value={formData.gender[key].ctaText} onChange={(field, val) => handleDeepChange("gender", key, "ctaText", { ...formData.gender[key].ctaText, [field]: val })} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── TREATMENT MAP TABLE ─────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Cause → Treatment Table</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.treatmentMap.heading} onChange={(e) => handleNestedChange("treatmentMap", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.treatmentMap.description} onChange={(e) => handleNestedChange("treatmentMap", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <button type="button" onClick={() => addToArray("treatmentMap", "rows", { cause: "", approach: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Row</button>
                    {formData.treatmentMap.rows.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No rows added yet.</p></div>
                    ) : (
                        <div className="space-y-3">
                            {formData.treatmentMap.rows.map((r, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                                    <div><label className="block text-sm font-semibold">Likely Cause</label><input type="text" value={r.cause} onChange={(e) => updateArrayItem("treatmentMap", "rows", i, "cause", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    <div className="flex gap-2">
                                        <div className="flex-1"><label className="block text-sm font-semibold">Typical Approach</label><input type="text" value={r.approach} onChange={(e) => updateArrayItem("treatmentMap", "rows", i, "approach", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <button type="button" onClick={() => deleteFromArray("treatmentMap", "rows", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm h-fit self-end mb-0.5">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── RESULTS & TIMELINES ─────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Results &amp; Timelines Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.results.heading} onChange={(e) => handleNestedChange("results", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <ImageBlock label="Result Image" value={formData.results.resultImage} onChange={(v) => handleNestedChange("results", "resultImage", v)} />
                    <StringListEditor label="Facts" items={formData.results.facts} onAdd={() => addStringItem("results", "facts")} onUpdate={(i, v) => updateStringItem("results", "facts", i, v)} onDelete={(i) => deleteStringItem("results", "facts", i)} placeholder="e.g. Most treatments take 3–6 months to show visible change." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-gray-700">Warning Box Title</label><input type="text" value={formData.results.warningTitle} onChange={(e) => handleNestedChange("results", "warningTitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700">Warning Box Text</label><input type="text" value={formData.results.warningText} onChange={(e) => handleNestedChange("results", "warningText", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                </div>

                {/* ─── DOCTOR ──────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Best Doctor Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.doctor.heading} onChange={(e) => handleNestedChange("doctor", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.doctor.description} onChange={(e) => handleNestedChange("doctor", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <StringListEditor label="Criteria" items={formData.doctor.criteria} onAdd={() => addStringItem("doctor", "criteria")} onUpdate={(i, v) => updateStringItem("doctor", "criteria", i, v)} onDelete={(i) => deleteStringItem("doctor", "criteria", i)} placeholder="e.g. Diagnoses the cause first." />
                    <ImageBlock label="Team Image" value={formData.doctor.teamImage} onChange={(v) => handleNestedChange("doctor", "teamImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-gray-700">Image Caption</label><input type="text" value={formData.doctor.imageCaption} onChange={(e) => handleNestedChange("doctor", "imageCaption", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700">Image Subcaption</label><input type="text" value={formData.doctor.imageSubcaption} onChange={(e) => handleNestedChange("doctor", "imageSubcaption", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                </div>

                {/* ─── WHY CHOOSE ──────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Why Choose Us Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.whyChoose.heading} onChange={(e) => handleNestedChange("whyChoose", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <ImageBlock label="Background Image" value={formData.whyChoose.backgroundImage} onChange={(v) => handleNestedChange("whyChoose", "backgroundImage", v)} />
                    <StringListEditor label="Points" items={formData.whyChoose.points} onAdd={() => addStringItem("whyChoose", "points")} onUpdate={(i, v) => updateStringItem("whyChoose", "points", i, v)} onDelete={(i) => deleteStringItem("whyChoose", "points", i)} placeholder="e.g. Diagnosis-first approach." />
                    <div><label className="block text-sm font-semibold text-gray-700">Honest Note</label><textarea rows={2} value={formData.whyChoose.honestNote} onChange={(e) => handleNestedChange("whyChoose", "honestNote", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                </div>

                {/* ─── COST ────────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Cost Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.cost.heading} onChange={(e) => handleNestedChange("cost", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.cost.description} onChange={(e) => handleNestedChange("cost", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <button type="button" onClick={() => addToArray("cost", "items", { icon: "", title: "", description: "", ctaText: { text: "", link: "", external: false }, displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Cost Item</button>
                    {formData.cost.items.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No cost items added yet.</p></div>
                    ) : (
                        <div className="space-y-4">
                            {formData.cost.items.map((c, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Cost Item {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("cost", "items", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={c.icon} onChange={(e) => updateArrayItem("cost", "items", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={c.title} onChange={(e) => updateArrayItem("cost", "items", i, "title", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Description</label><textarea rows={2} value={c.description} onChange={(e) => updateArrayItem("cost", "items", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    <CTABlock label="Link CTA (optional)" value={c.ctaText} onChange={(field, val) => updateArrayItem("cost", "items", i, "ctaText", { ...c.ctaText, [field]: val })} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── MYTHS ───────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Myths vs Facts Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.myths.heading} onChange={(e) => handleNestedChange("myths", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <button type="button" onClick={() => addToArray("myths", "myths", { myth: "", fact: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Myth / Fact</button>
                    {formData.myths.myths.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">None added yet.</p></div>
                    ) : (
                        <div className="space-y-3">
                            {formData.myths.myths.map((m, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Pair {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("myths", "myths", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Myth</label><input type="text" value={m.myth} onChange={(e) => updateArrayItem("myths", "myths", i, "myth", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    <div><label className="block text-sm font-semibold">Fact</label><input type="text" value={m.fact} onChange={(e) => updateArrayItem("myths", "myths", i, "fact", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── VISIT CLINIC ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Visit Clinic Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.visitClinic.description} onChange={(e) => handleNestedChange("visitClinic", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <ImageBlock label="Banner Image" value={formData.visitClinic.bannerImage} onChange={(v) => handleNestedChange("visitClinic", "bannerImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-gray-700">Banner Title</label><input type="text" value={formData.visitClinic.bannerTitle} onChange={(e) => handleNestedChange("visitClinic", "bannerTitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700">Banner Address</label><input type="text" value={formData.visitClinic.bannerAddress} onChange={(e) => handleNestedChange("visitClinic", "bannerAddress", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div><label className="block text-sm font-semibold text-gray-700">Google Maps Embed URL</label><input type="text" value={formData.visitClinic.mapEmbedUrl} onChange={(e) => handleNestedChange("visitClinic", "mapEmbedUrl", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <button type="button" onClick={() => addToArray("visitClinic", "infoCards", { icon: "", label: "", value: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Info Card</button>
                    {formData.visitClinic.infoCards.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No info cards added yet.</p></div>
                    ) : (
                        <div className="space-y-3">
                            {formData.visitClinic.infoCards.map((c, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-semibold">Info Card {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("visitClinic", "infoCards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={c.icon} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Label</label><input type="text" value={c.label} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Value</label><input type="text" value={c.value} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── CONSULTATION ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Book Consultation Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.consultation.heading} onChange={(e) => handleNestedChange("consultation", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.consultation.description} onChange={(e) => handleNestedChange("consultation", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <ImageBlock label="Background Image" value={formData.consultation.backgroundImage} onChange={(v) => handleNestedChange("consultation", "backgroundImage", v)} />
                    <button type="button" onClick={() => addToArray("consultation", "contactCards", { icon: "", title: "", description: "", link: "", ext: false, displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Contact Channel</button>
                    {formData.consultation.contactCards.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No contact channels added yet.</p></div>
                    ) : (
                        <div className="space-y-3">
                            {formData.consultation.contactCards.map((c, i) => (
                                <div key={i} className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">Channel {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("consultation", "contactCards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div><label className="block text-sm font-semibold">Icon (lucide name)</label><input type="text" value={c.icon} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={c.title} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "title", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Value / Text</label><input type="text" value={c.description} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                    <div className="flex gap-3 items-end">
                                        <div className="flex-1"><label className="block text-sm font-semibold">Link</label><input type="text" value={c.link} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "link", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div className="flex items-center gap-2 pb-2">
                                            <input type="checkbox" checked={!!c.ext} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "ext", e.target.checked)} className="w-4 h-4" />
                                            <label className="text-sm text-gray-600">Opens new tab</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div>
                        <button type="button" onClick={() => addToArray("consultation", "statsRow", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Stat</button>
                        {formData.consultation.statsRow.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.consultation.statsRow.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-semibold">Stat {i + 1}</h5>
                                            <button type="button" onClick={() => deleteFromArray("consultation", "statsRow", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("consultation", "statsRow", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("consultation", "statsRow", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">FAQ Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.faq.description} onChange={(e) => handleNestedChange("faq", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div>
                        <button type="button" onClick={() => addToArray("faq", "stats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Sidebar Stat</button>
                        {formData.faq.stats.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.faq.stats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-semibold">Stat {i + 1}</h5>
                                            <button type="button" onClick={() => deleteFromArray("faq", "stats", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("faq", "stats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("faq", "stats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="button" onClick={() => addToArray("faq", "faqs", { question: "", answer: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add FAQ</button>
                    {formData.faq.faqs.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4"><p className="text-gray-500">No FAQs added yet.</p></div>
                    ) : (
                        <div className="space-y-4 mt-4">
                            {formData.faq.faqs.map((f, i) => (
                                <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold">FAQ {i + 1}</h5>
                                        <button type="button" onClick={() => deleteFromArray("faq", "faqs", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Question</label><input type="text" value={f.question} onChange={(e) => updateArrayItem("faq", "faqs", i, "question", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    <div><label className="block text-sm font-semibold mb-2">Answer</label><SunEditor setContents={f.answer} onChange={(val) => updateArrayItem("faq", "faqs", i, "answer", val)} setOptions={sunEditorOptions} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── SUBMIT ──────────────────────────────────────── */}
                <div className="pt-8 border-t">
                    <button type="submit" disabled={submitting} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default function EditHairFallPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading form...</p>
            </div>
        }>
            <EditHairFallForm />
        </Suspense>
    );
}
