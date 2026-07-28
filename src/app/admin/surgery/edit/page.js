"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const sunEditorOptions = {
    height: "400px",
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

// ─── CTA BLOCK — module-level so React never unmounts it on re-renders ─────────────
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

const initialState = {
    pageName: "",
    city: "",
    slug: "",
    status: "draft",
    seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonicalUrl: "",
        robots: "index,follow",
        openGraphImage: { image: "", imageAlt: "" },
    },
    hero: {
        breadcrumb: "",
        title: "",
        description: "",
        heroImage: { image: "", imageAlt: "" },
        stats: [],
        whatsappText: { text: "", link: "", external: false },
        callText: { text: "", link: "", external: false },
    },
    introduction: {
        smallHeading: "",
        title: "",
        description: "",
        highlightBoxText: "",
        mainImage: { image: "", imageAlt: "" },
        floatingImage: { image: "", imageAlt: "" },
        bottomStats: [],
        primaryCTA: { text: "", link: "", external: false },
        secondaryCTA: { text: "", link: "", external: false },
    },
    procedureScience: {
        mainHeading: "",
        description: "",
        cards: [],
    },
    safety: {
        heading: "",
        description: "",
        safetyCards: [],
        rightSideHighlightBox: {
            smallHeading: "",
            title: "",
            description: "",
            metrics: [],
            bottomNotice: "",
        },
    },
    techniques: {
        heading: "",
        description: "",
        techniques: [],
        bottomCTABlock: {
            heading: "",
            description: "",
            primaryCTA: { text: "", link: "", external: false },
            secondaryCTA: { text: "", link: "", external: false },
        },
    },
    qualityBenchmarks: {
        heading: "",
        description: "",
        benchmarkCards: [],
    },
    procedureTimeline: {
        heading: "",
        description: "",
        timelineSteps: [],
        bottomHighlightMessage: "",
    },
    recoveryTimeline: {
        heading: "",
        description: "",
        leftHighlightCard: {
            icon: "",
            title: "",
            description: "",
            statistics: [],
        },
        recoveryStages: [],
    },
    doctors: {
        heading: "",
        description: "",
        doctors: [],
        topButtonText: "",
    },
    pricing: {
        heading: "",
        description: "",
        warningText: "",
        pricingStats: [],
        ctaTextWhatsApp: { text: "", link: "", external: false },
        ctaTextCall: { text: "", link: "", external: false },
        ctaTextGuide: { text: "", link: "", external: false },
    },
    visitClinic: {
        heading: "",
        description: "",
        informationCards: [],
        buttonText: { text: "", link: "", external: false },
    },
    consultation: {
        backgroundImage: { image: "", imageAlt: "" },
        leftSide: {
            heading: "",
            description: "",
            contactCards: [],
        },
        consultationFormConfig: {
            title: "",
            servicesDropdown: [],
            submitButtonText: { text: "", link: "", external: false },
        },
    },
    faq: {
        heading: "",
        description: "",
        stats: [],
        faqs: [],
        ctaButtonText: { text: "", link: "", external: false },
    },
};

function EditSurgeryForm() {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialState);

    const fetchSurgeryPage = useCallback(async () => {
        if (!slug) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/surgery/get?slug=${slug}`);
            const data = await response.json();
            if (response.ok && data.surgeryPage) {
                const d = data.surgeryPage;
                // Merge with initialState to ensure all fields exist
                setFormData({
                    ...initialState,
                    ...d,
                    pageName: d.pageName || "",
                    city: d.city || "",
                    slug: d.slug || "",
                    seo: { ...initialState.seo, ...(d.seo || {}) },
                    hero: { ...initialState.hero, ...(d.hero || {}), stats: d.hero?.stats || [] },
                    introduction: { ...initialState.introduction, ...(d.introduction || {}), bottomStats: d.introduction?.bottomStats || [] },
                    procedureScience: { ...initialState.procedureScience, ...(d.procedureScience || {}), cards: d.procedureScience?.cards || [] },
                    safety: {
                        ...initialState.safety, ...(d.safety || {}),
                        safetyCards: d.safety?.safetyCards || [],
                        rightSideHighlightBox: { ...initialState.safety.rightSideHighlightBox, ...(d.safety?.rightSideHighlightBox || {}), metrics: d.safety?.rightSideHighlightBox?.metrics || [] }
                    },
                    techniques: {
                        ...initialState.techniques, ...(d.techniques || {}),
                        techniques: d.techniques?.techniques || [],
                        bottomCTABlock: { ...initialState.techniques.bottomCTABlock, ...(d.techniques?.bottomCTABlock || {}) }
                    },
                    qualityBenchmarks: { ...initialState.qualityBenchmarks, ...(d.qualityBenchmarks || {}), benchmarkCards: d.qualityBenchmarks?.benchmarkCards || [] },
                    procedureTimeline: { ...initialState.procedureTimeline, ...(d.procedureTimeline || {}), timelineSteps: d.procedureTimeline?.timelineSteps || [] },
                    recoveryTimeline: {
                        ...initialState.recoveryTimeline, ...(d.recoveryTimeline || {}),
                        recoveryStages: d.recoveryTimeline?.recoveryStages || [],
                        leftHighlightCard: { ...initialState.recoveryTimeline.leftHighlightCard, ...(d.recoveryTimeline?.leftHighlightCard || {}), statistics: d.recoveryTimeline?.leftHighlightCard?.statistics || [] }
                    },
                    doctors: { ...initialState.doctors, ...(d.doctors || {}), doctors: d.doctors?.doctors || [] },
                    pricing: { ...initialState.pricing, ...(d.pricing || {}), pricingStats: d.pricing?.pricingStats || [] },
                    visitClinic: { ...initialState.visitClinic, ...(d.visitClinic || {}), informationCards: d.visitClinic?.informationCards || [] },
                    consultation: {
                        backgroundImage: { ...initialState.consultation.backgroundImage, ...(d.consultation?.backgroundImage || {}) },
                        leftSide: { ...initialState.consultation.leftSide, ...(d.consultation?.leftSide || {}), contactCards: d.consultation?.leftSide?.contactCards || [] },
                        consultationFormConfig: { ...initialState.consultation.consultationFormConfig, ...(d.consultation?.consultationFormConfig || {}), servicesDropdown: d.consultation?.consultationFormConfig?.servicesDropdown || [] }
                    },
                    faq: { ...initialState.faq, ...(d.faq || {}), stats: d.faq?.stats || [], faqs: d.faq?.faqs || [] },
                });
            } else {
                toast.error("Error", data.message || "Surgery Page NOT Found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Failed to load page data.");
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchSurgeryPage();
    }, [fetchSurgeryPage]);

    // ─── STATE HELPERS ────────────────────────────────────────────────────────
    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const handleDeepChange = (section, subSection, field, value) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [subSection]: { ...prev[section][subSection], [field]: value } } }));
    };

    const handleTopLevelChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addToArray = (section, field, newItem) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: [...(prev[section][field] || []), newItem] } }));
    };

    const deleteFromArray = (section, field, index) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: prev[section][field].filter((_, i) => i !== index) } }));
    };

    const updateArrayItem = (section, field, index, itemField, value) => {
        setFormData((prev) => {
            const arr = [...prev[section][field]];
            arr[index] = { ...arr[index], [itemField]: value };
            return { ...prev, [section]: { ...prev[section], [field]: arr } };
        });
    };

    const addNestedItem = (section, field, index, subField, newItem) => {
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

    // ─── SUBMIT ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`/api/surgery/update?slug=${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Success", data.message || "Surgery page updated successfully.");
                setTimeout(() => router.push("/admin/surgery"), 1500);
            } else {
                toast.error("Error", data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading page content...</p>
            </div>
        );
    }

    return (
        <section className="pb-24" suppressHydrationWarning>
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
            <AdminHeader title={`/ Edit Surgery Page: ${formData.pageName}`} />

            <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto" suppressHydrationWarning>

                {/* ─── GENERAL INFO ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mb-5">General Info</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Page Name *
                        </label>
                        <input
                            type="text"
                            value={formData.pageName}
                            onChange={(e) => handleTopLevelChange("pageName", e.target.value)}
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="e.g. Hair Transplant Surgery in Delhi"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleTopLevelChange("status", e.target.value)}
                            className="w-full mt-2 p-2 border rounded-md"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            value={formData.city || ""}
                            onChange={(e) => handleTopLevelChange("city", e.target.value)}
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="e.g. Delhi"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Slug (URL) — editing changes the public URL
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleTopLevelChange("slug", e.target.value
                                .toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"))}
                            className="w-full mt-2 p-2 border rounded-md font-mono"
                            placeholder="e.g. hair-transplant-surgery-in-delhi"
                        />
                        {formData.slug && (
                            <p className="text-xs text-gray-400 mt-1">
                                URL preview: <span className="text-blue-600 font-mono">/surgery/{formData.slug}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* ─── SEO SECTION ─────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Meta Details</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
                        <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Meta Title" required />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
                        <textarea rows={4} value={formData.seo.metaDescription} onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)} className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Meta Description" required />
                    </div>
                </div>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Keywords</label><input type="text" value={formData.seo.keywords} onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="hair transplant, FUE..." /></div>
                    <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Canonical URL</label><input type="text" value={formData.seo.canonicalUrl} onChange={(e) => handleNestedChange("seo", "canonicalUrl", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="https://..." /></div>
                    <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Robots</label><input type="text" value={formData.seo.robots} onChange={(e) => handleNestedChange("seo", "robots", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="index,follow" /></div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">OG Share Image</label>
                    <ImageUploader initialImage={formData.seo.openGraphImage?.image} onUpload={(url) => handleNestedChange("seo", "openGraphImage", { ...formData.seo.openGraphImage, image: url })} />
                    <input type="text" value={formData.seo.openGraphImage?.imageAlt || ""} onChange={(e) => handleNestedChange("seo", "openGraphImage", { ...formData.seo.openGraphImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="OG Image Alt Text" />
                </div>

                {/* ─── HERO SECTION ────────────────────────────────── */}
                {/* 2. BANNER SECTION */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Banner Section</h3>
                <div className="space-y-4">
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Banner Title</label>
                        <input type="text" value={formData.hero.title} onChange={(e) => handleNestedChange("hero", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Enter Banner Title" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Banner Description</label>
                        <textarea rows={4} value={formData.hero.description} onChange={(e) => handleNestedChange("hero", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Enter Banner Description" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Image</label>
                        <ImageUploader initialImage={formData.hero.heroImage?.image} onUpload={(url) => handleNestedChange("hero", "heroImage", { ...formData.hero.heroImage, image: url })} />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Banner Image Alt</label>
                        <input type="text" value={formData.hero.heroImage?.imageAlt || ""} onChange={(e) => handleNestedChange("hero", "heroImage", { ...formData.hero.heroImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Enter Banner Image Alt" />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">Breadcrumb</label>
                        <input type="text" value={formData.hero.breadcrumb} onChange={(e) => handleNestedChange("hero", "breadcrumb", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Home > Surgeries > Hair Transplant" />
                    </div>
                    <div>
                        <button type="button" onClick={() => addToArray("hero", "stats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Hero Stat</button>
                        {(formData.hero.stats || []).length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No hero stats added yet.</p></div>
                        ) : (
                            <div className="space-y-4">
                                {formData.hero.stats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3"><h5 className="font-semibold">Stat {i + 1}</h5><button type="button" onClick={() => deleteFromArray("hero", "stats", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("hero", "stats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("hero", "stats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <CTABlock label="WhatsApp CTA" value={formData.hero.whatsappText} onChange={(field, val) => handleNestedChange("hero", "whatsappText", { ...formData.hero.whatsappText, [field]: val })} />
                        <CTABlock label="Phone Call CTA" value={formData.hero.callText} onChange={(field, val) => handleNestedChange("hero", "callText", { ...formData.hero.callText, [field]: val })} />
                    </div>
                </div>

                {/* ─── INTRODUCTION ────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Introduction Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Small Heading</label><input type="text" value={formData.introduction.smallHeading} onChange={(e) => handleNestedChange("introduction", "smallHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="WELCOME TO RYAN CLINIC" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Title</label><input type="text" value={formData.introduction.title} onChange={(e) => handleNestedChange("introduction", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Restore Confidence..." /></div>
                    </div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label><SunEditor setContents={formData.introduction.description} onChange={(val) => handleNestedChange("introduction", "description", val)} setOptions={sunEditorOptions} /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Highlight Box Text (Rich Text)</label><SunEditor setContents={formData.introduction.highlightBoxText} onChange={(val) => handleNestedChange("introduction", "highlightBoxText", val)} setOptions={sunEditorOptions} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Image</label>
                            <ImageUploader initialImage={formData.introduction.mainImage?.image} onUpload={(url) => handleNestedChange("introduction", "mainImage", { ...formData.introduction.mainImage, image: url })} />
                            <input type="text" value={formData.introduction.mainImage?.imageAlt || ""} onChange={(e) => handleNestedChange("introduction", "mainImage", { ...formData.introduction.mainImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Main Image Alt Text" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Floating Image</label>
                            <ImageUploader initialImage={formData.introduction.floatingImage?.image} onUpload={(url) => handleNestedChange("introduction", "floatingImage", { ...formData.introduction.floatingImage, image: url })} />
                            <input type="text" value={formData.introduction.floatingImage?.imageAlt || ""} onChange={(e) => handleNestedChange("introduction", "floatingImage", { ...formData.introduction.floatingImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Floating Image Alt Text" />
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={() => addToArray("introduction", "bottomStats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Bottom Stat</button>
                        {(formData.introduction.bottomStats || []).length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.introduction.bottomStats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3"><h5 className="font-semibold">Stat {i + 1}</h5><button type="button" onClick={() => deleteFromArray("introduction", "bottomStats", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("introduction", "bottomStats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("introduction", "bottomStats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CTABlock label="Primary CTA" value={formData.introduction.primaryCTA} onChange={(field, val) => handleNestedChange("introduction", "primaryCTA", { ...formData.introduction.primaryCTA, [field]: val })} />
                        <CTABlock label="Secondary CTA" value={formData.introduction.secondaryCTA} onChange={(field, val) => handleNestedChange("introduction", "secondaryCTA", { ...formData.introduction.secondaryCTA, [field]: val })} />
                    </div>
                </div>

                {/* ─── PROCEDURE SCIENCE ───────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Procedure Science Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Main Heading</label><input type="text" value={formData.procedureScience.mainHeading} onChange={(e) => handleNestedChange("procedureScience", "mainHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="The Science of Follicle Survival" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label><SunEditor setContents={formData.procedureScience.description} onChange={(val) => handleNestedChange("procedureScience", "description", val)} setOptions={sunEditorOptions} /></div>
                    <button type="button" onClick={() => addToArray("procedureScience", "cards", { icon: "", title: "", description: "", cardImage: { image: "", imageAlt: "" }, badge: "", bulletPoints: [], displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Science Card</button>
                    {(formData.procedureScience.cards || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-4"><p className="text-gray-500">No science cards added yet.</p></div>
                    ) : (
                        <div className="space-y-5 mt-4">
                            {formData.procedureScience.cards.map((card, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Science Card {i + 1}</h4><button type="button" onClick={() => deleteFromArray("procedureScience", "cards", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete Card</button></div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={card.icon} onChange={(e) => updateArrayItem("procedureScience", "cards", i, "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Brain" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={card.title} onChange={(e) => updateArrayItem("procedureScience", "cards", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Badge</label><input type="text" value={card.badge} onChange={(e) => updateArrayItem("procedureScience", "cards", i, "badge", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Advanced" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Description</label><textarea rows={3} value={card.description} onChange={(e) => updateArrayItem("procedureScience", "cards", i, "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Image</label>
                                        <ImageUploader initialImage={card.cardImage?.image} onUpload={(url) => updateArrayItem("procedureScience", "cards", i, "cardImage", { ...card.cardImage, image: url })} />
                                        <input type="text" value={card.cardImage?.imageAlt || ""} onChange={(e) => updateArrayItem("procedureScience", "cards", i, "cardImage", { ...card.cardImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Image Alt Text" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2"><label className="block text-sm font-semibold">Bullet Points</label><button type="button" onClick={() => addNestedItem("procedureScience", "cards", i, "bulletPoints", "")} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">+ Add Bullet</button></div>
                                        {(card.bulletPoints || []).map((b, bi) => (
                                            <div key={bi} className="flex gap-2 mt-2">
                                                <input type="text" value={b} onChange={(e) => updateNestedItem("procedureScience", "cards", i, "bulletPoints", bi, e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Bullet..." />
                                                <button type="button" onClick={() => deleteNestedItem("procedureScience", "cards", i, "bulletPoints", bi)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── SAFETY SECTION ──────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Safety Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.safety.heading} onChange={(e) => handleNestedChange("safety", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Zero Infection Clinical Environments" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label><SunEditor setContents={formData.safety.description} onChange={(val) => handleNestedChange("safety", "description", val)} setOptions={sunEditorOptions} /></div>
                    <button type="button" onClick={() => addToArray("safety", "safetyCards", { icon: "", title: "", description: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Safety Card</button>
                    {(formData.safety.safetyCards || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No safety cards added yet.</p></div>
                    ) : (
                        <div className="space-y-5">
                            {formData.safety.safetyCards.map((card, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Safety Card {i + 1}</h4><button type="button" onClick={() => deleteFromArray("safety", "safetyCards", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button></div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={card.icon} onChange={(e) => updateArrayItem("safety", "safetyCards", i, "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Shield" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={card.title} onChange={(e) => updateArrayItem("safety", "safetyCards", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Order</label><input type="number" value={card.displayOrder} onChange={(e) => updateArrayItem("safety", "safetyCards", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Description</label><textarea rows={3} value={card.description} onChange={(e) => updateArrayItem("safety", "safetyCards", i, "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border rounded-xl p-6 bg-gray-50 space-y-4 mt-4">
                        <h4 className="text-lg font-semibold">Right Side Highlight Box</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-gray-700">Small Heading</label><input type="text" value={formData.safety.rightSideHighlightBox?.smallHeading || ""} onChange={(e) => handleDeepChange("safety", "rightSideHighlightBox", "smallHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="SAFETY RATING" /></div>
                            <div><label className="block text-sm font-semibold text-gray-700">Title</label><input type="text" value={formData.safety.rightSideHighlightBox?.title || ""} onChange={(e) => handleDeepChange("safety", "rightSideHighlightBox", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="ISO Certified Clinic" /></div>
                        </div>
                        <div><label className="block text-sm font-semibold text-gray-700">Description</label><textarea rows={2} value={formData.safety.rightSideHighlightBox?.description || ""} onChange={(e) => handleDeepChange("safety", "rightSideHighlightBox", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div><label className="block text-sm font-semibold text-gray-700">Bottom Notice</label><input type="text" value={formData.safety.rightSideHighlightBox?.bottomNotice || ""} onChange={(e) => handleDeepChange("safety", "rightSideHighlightBox", "bottomNotice", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div>
                            <button type="button" onClick={() => { const updated = { ...formData.safety.rightSideHighlightBox, metrics: [...(formData.safety.rightSideHighlightBox?.metrics || []), { value: "", label: "" }] }; handleNestedChange("safety", "rightSideHighlightBox", updated); }} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm mb-3">+ Add Metric</button>
                            {(formData.safety.rightSideHighlightBox?.metrics || []).map((metric, mi) => (
                                <div key={mi} className="flex gap-3 mb-2 items-center">
                                    <input type="text" value={metric.value} onChange={(e) => { const m = [...formData.safety.rightSideHighlightBox.metrics]; m[mi] = { ...m[mi], value: e.target.value }; handleNestedChange("safety", "rightSideHighlightBox", { ...formData.safety.rightSideHighlightBox, metrics: m }); }} className="flex-1 p-2 border rounded-md" placeholder="Value" />
                                    <input type="text" value={metric.label} onChange={(e) => { const m = [...formData.safety.rightSideHighlightBox.metrics]; m[mi] = { ...m[mi], label: e.target.value }; handleNestedChange("safety", "rightSideHighlightBox", { ...formData.safety.rightSideHighlightBox, metrics: m }); }} className="flex-1 p-2 border rounded-md" placeholder="Label" />
                                    <button type="button" onClick={() => { const metrics = formData.safety.rightSideHighlightBox.metrics.filter((_, idx) => idx !== mi); handleNestedChange("safety", "rightSideHighlightBox", { ...formData.safety.rightSideHighlightBox, metrics }); }} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm">Del</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── TECHNIQUES SECTION ──────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Techniques Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.techniques.heading} onChange={(e) => handleNestedChange("techniques", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Our Extraction Techniques" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.techniques.description} onChange={(e) => handleNestedChange("techniques", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <button type="button" onClick={() => addToArray("techniques", "techniques", { name: "", subtitle: "", description: "", badge: "", featured: false, bulletPoints: [], bottomStatistics: [], ctaText: { text: "", link: "", external: false }, displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Technique</button>
                    {(formData.techniques.techniques || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No techniques added yet.</p></div>
                    ) : (
                        <div className="space-y-5">
                            {formData.techniques.techniques.map((tech, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Technique {i + 1}</h4><button type="button" onClick={() => deleteFromArray("techniques", "techniques", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button></div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div><label className="block text-sm font-semibold">Name</label><input type="text" value={tech.name} onChange={(e) => updateArrayItem("techniques", "techniques", i, "name", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="FUE Hair Transplant" /></div>
                                        <div><label className="block text-sm font-semibold">Subtitle</label><input type="text" value={tech.subtitle} onChange={(e) => updateArrayItem("techniques", "techniques", i, "subtitle", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Badge</label><input type="text" value={tech.badge} onChange={(e) => updateArrayItem("techniques", "techniques", i, "badge", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Popular" /></div>
                                        <div><label className="block text-sm font-semibold">Order</label><input type="number" value={tech.displayOrder} onChange={(e) => updateArrayItem("techniques", "techniques", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div className="flex items-center gap-2"><input type="checkbox" checked={!!tech.featured} onChange={(e) => updateArrayItem("techniques", "techniques", i, "featured", e.target.checked)} className="w-4 h-4" /><label className="text-sm text-gray-700">Mark as Featured Technique</label></div>
                                    <div><label className="block text-sm font-semibold mb-2">Description (Rich Text)</label><SunEditor setContents={tech.description} onChange={(val) => updateArrayItem("techniques", "techniques", i, "description", val)} setOptions={sunEditorOptions} /></div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2"><label className="block text-sm font-semibold">Bullet Points</label><button type="button" onClick={() => addNestedItem("techniques", "techniques", i, "bulletPoints", "")} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">+ Add Bullet</button></div>
                                        {(tech.bulletPoints || []).map((b, bi) => (
                                            <div key={bi} className="flex gap-2 mt-2">
                                                <input type="text" value={b} onChange={(e) => updateNestedItem("techniques", "techniques", i, "bulletPoints", bi, e.target.value)} className="flex-1 p-2 border rounded-md" />
                                                <button type="button" onClick={() => deleteNestedItem("techniques", "techniques", i, "bulletPoints", bi)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                    <CTABlock label="Technique CTA" value={tech.ctaText || { text: "", link: "", external: false }} onChange={(field, val) => updateArrayItem("techniques", "techniques", i, "ctaText", { ...(tech.ctaText || {}), [field]: val })} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border rounded-xl p-6 bg-gray-50 space-y-4 mt-4">
                        <h4 className="text-lg font-semibold">Bottom CTA Block</h4>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.techniques.bottomCTABlock?.heading || ""} onChange={(e) => handleDeepChange("techniques", "bottomCTABlock", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                            <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.techniques.bottomCTABlock?.description || ""} onChange={(e) => handleDeepChange("techniques", "bottomCTABlock", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CTABlock label="Primary CTA" value={formData.techniques.bottomCTABlock?.primaryCTA || {}} onChange={(field, val) => handleNestedChange("techniques", "bottomCTABlock", { ...formData.techniques.bottomCTABlock, primaryCTA: { ...(formData.techniques.bottomCTABlock?.primaryCTA || {}), [field]: val } })} />
                            <CTABlock label="Secondary CTA" value={formData.techniques.bottomCTABlock?.secondaryCTA || {}} onChange={(field, val) => handleNestedChange("techniques", "bottomCTABlock", { ...formData.techniques.bottomCTABlock, secondaryCTA: { ...(formData.techniques.bottomCTABlock?.secondaryCTA || {}), [field]: val } })} />
                        </div>
                    </div>
                </div>

                {/* ─── QUALITY BENCHMARKS ──────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Quality Benchmarks Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.qualityBenchmarks.heading} onChange={(e) => handleNestedChange("qualityBenchmarks", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.qualityBenchmarks.description} onChange={(e) => handleNestedChange("qualityBenchmarks", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <button type="button" onClick={() => addToArray("qualityBenchmarks", "benchmarkCards", { number: "", description: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Benchmark Card</button>
                    {(formData.qualityBenchmarks.benchmarkCards || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No benchmark cards added yet.</p></div>
                    ) : (
                        <div className="space-y-4">
                            {formData.qualityBenchmarks.benchmarkCards.map((card, i) => (
                                <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-center"><h5 className="font-semibold">Benchmark {i + 1}</h5><button type="button" onClick={() => deleteFromArray("qualityBenchmarks", "benchmarkCards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div><label className="block text-sm font-semibold">Number</label><input type="text" value={card.number} onChange={(e) => updateArrayItem("qualityBenchmarks", "benchmarkCards", i, "number", e.target.value)} className="w-full mt-1 p-2 border rounded-md" placeholder="99%" /></div>
                                        <div className="col-span-2"><label className="block text-sm font-semibold">Description</label><input type="text" value={card.description} onChange={(e) => updateArrayItem("qualityBenchmarks", "benchmarkCards", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" placeholder="Success rate..." /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── PROCEDURE TIMELINE ──────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Procedure Timeline Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.procedureTimeline.heading} onChange={(e) => handleNestedChange("procedureTimeline", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.procedureTimeline.description} onChange={(e) => handleNestedChange("procedureTimeline", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div><label className="block text-sm font-semibold text-gray-700">Bottom Highlight Message</label><input type="text" value={formData.procedureTimeline.bottomHighlightMessage} onChange={(e) => handleNestedChange("procedureTimeline", "bottomHighlightMessage", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <button type="button" onClick={() => addToArray("procedureTimeline", "timelineSteps", { stepNumber: "", badge: "", title: "", description: "", stepImage: { image: "", imageAlt: "" }, icon: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Timeline Step</button>
                    {(formData.procedureTimeline.timelineSteps || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No timeline steps added yet.</p></div>
                    ) : (
                        <div className="space-y-5">
                            {formData.procedureTimeline.timelineSteps.map((step, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Step {i + 1}</h4><button type="button" onClick={() => deleteFromArray("procedureTimeline", "timelineSteps", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button></div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div><label className="block text-sm font-semibold">Step Number</label><input type="text" value={step.stepNumber} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "stepNumber", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="01" /></div>
                                        <div><label className="block text-sm font-semibold">Badge</label><input type="text" value={step.badge} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "badge", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Day 1" /></div>
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={step.icon} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Order</label><input type="number" value={step.displayOrder} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold">Title</label><input type="text" value={step.title} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    <div><label className="block text-sm font-semibold mb-2">Description (Rich Text)</label><SunEditor setContents={step.description} onChange={(val) => updateArrayItem("procedureTimeline", "timelineSteps", i, "description", val)} setOptions={sunEditorOptions} /></div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Step Image</label>
                                        <ImageUploader initialImage={step.stepImage?.image} onUpload={(url) => updateArrayItem("procedureTimeline", "timelineSteps", i, "stepImage", { ...step.stepImage, image: url })} />
                                        <input type="text" value={step.stepImage?.imageAlt || ""} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", i, "stepImage", { ...step.stepImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Image Alt Text" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── RECOVERY TIMELINE ───────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Recovery Timeline Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.recoveryTimeline.heading} onChange={(e) => handleNestedChange("recoveryTimeline", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.recoveryTimeline.description} onChange={(e) => handleNestedChange("recoveryTimeline", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div className="border rounded-xl p-5 bg-gray-50 space-y-3">
                        <h4 className="text-lg font-semibold">Left Highlight Card</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={formData.recoveryTimeline.leftHighlightCard?.icon || ""} onChange={(e) => handleDeepChange("recoveryTimeline", "leftHighlightCard", "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-semibold">Title</label><input type="text" value={formData.recoveryTimeline.leftHighlightCard?.title || ""} onChange={(e) => handleDeepChange("recoveryTimeline", "leftHighlightCard", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-semibold">Description</label><input type="text" value={formData.recoveryTimeline.leftHighlightCard?.description || ""} onChange={(e) => handleDeepChange("recoveryTimeline", "leftHighlightCard", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        </div>
                        <div>
                            <button type="button" onClick={() => { const updated = { ...formData.recoveryTimeline.leftHighlightCard, statistics: [...(formData.recoveryTimeline.leftHighlightCard?.statistics || []), { value: "", label: "" }] }; handleNestedChange("recoveryTimeline", "leftHighlightCard", updated); }} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm mb-3">+ Add Statistic</button>
                            {(formData.recoveryTimeline.leftHighlightCard?.statistics || []).map((stat, si) => (
                                <div key={si} className="flex gap-3 mb-2 items-center">
                                    <input type="text" value={stat.value} onChange={(e) => { const s = [...formData.recoveryTimeline.leftHighlightCard.statistics]; s[si] = { ...s[si], value: e.target.value }; handleNestedChange("recoveryTimeline", "leftHighlightCard", { ...formData.recoveryTimeline.leftHighlightCard, statistics: s }); }} className="flex-1 p-2 border rounded-md" placeholder="Value" />
                                    <input type="text" value={stat.label} onChange={(e) => { const s = [...formData.recoveryTimeline.leftHighlightCard.statistics]; s[si] = { ...s[si], label: e.target.value }; handleNestedChange("recoveryTimeline", "leftHighlightCard", { ...formData.recoveryTimeline.leftHighlightCard, statistics: s }); }} className="flex-1 p-2 border rounded-md" placeholder="Label" />
                                    <button type="button" onClick={() => { const statistics = formData.recoveryTimeline.leftHighlightCard.statistics.filter((_, idx) => idx !== si); handleNestedChange("recoveryTimeline", "leftHighlightCard", { ...formData.recoveryTimeline.leftHighlightCard, statistics }); }} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm">Del</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="button" onClick={() => addToArray("recoveryTimeline", "recoveryStages", { duration: "", title: "", description: "", icon: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ Add Recovery Stage</button>
                    {(formData.recoveryTimeline.recoveryStages || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No recovery stages added yet.</p></div>
                    ) : (
                        <div className="space-y-5">
                            {formData.recoveryTimeline.recoveryStages.map((stage, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Recovery Stage {i + 1}</h4><button type="button" onClick={() => deleteFromArray("recoveryTimeline", "recoveryStages", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button></div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div><label className="block text-sm font-semibold">Duration</label><input type="text" value={stage.duration} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", i, "duration", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Day 1-3" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={stage.title} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", i, "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={stage.icon} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", i, "icon", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Order</label><input type="number" value={stage.displayOrder} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div><label className="block text-sm font-semibold mb-2">Description (Rich Text)</label><SunEditor setContents={stage.description} onChange={(val) => updateArrayItem("recoveryTimeline", "recoveryStages", i, "description", val)} setOptions={sunEditorOptions} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── DOCTORS SECTION ─────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Doctors Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Section Heading</label><input type="text" value={formData.doctors.heading} onChange={(e) => handleNestedChange("doctors", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.doctors.description} onChange={(e) => handleNestedChange("doctors", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Top Button Text</label><input type="text" value={formData.doctors.topButtonText} onChange={(e) => handleNestedChange("doctors", "topButtonText", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <button type="button" onClick={() => addToArray("doctors", "doctors", { name: "", designation: "", doctorImage: { image: "", imageAlt: "" }, experience: "", proceduresCount: "", qualifications: [], profileButtonText: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6">+ Add Doctor</button>
                    {(formData.doctors.doctors || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center"><p className="text-gray-500">No doctors added yet.</p></div>
                    ) : (
                        <div className="space-y-6">
                            {formData.doctors.doctors.map((doctor, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold">Doctor {i + 1}</h4><button type="button" onClick={() => deleteFromArray("doctors", "doctors", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete Doctor</button></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-semibold">Name</label><input type="text" value={doctor.name} onChange={(e) => updateArrayItem("doctors", "doctors", i, "name", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Dr. John Doe" /></div>
                                        <div><label className="block text-sm font-semibold">Designation</label><input type="text" value={doctor.designation} onChange={(e) => updateArrayItem("doctors", "doctors", i, "designation", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Experience</label><input type="text" value={doctor.experience} onChange={(e) => updateArrayItem("doctors", "doctors", i, "experience", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="15+ Years" /></div>
                                        <div><label className="block text-sm font-semibold">Procedures Count</label><input type="text" value={doctor.proceduresCount} onChange={(e) => updateArrayItem("doctors", "doctors", i, "proceduresCount", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="5000+" /></div>
                                        <div><label className="block text-sm font-semibold">Profile Button Text</label><input type="text" value={doctor.profileButtonText} onChange={(e) => updateArrayItem("doctors", "doctors", i, "profileButtonText", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Display Order</label><input type="number" value={doctor.displayOrder} onChange={(e) => updateArrayItem("doctors", "doctors", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Image</label>
                                        <ImageUploader initialImage={doctor.doctorImage?.image} onUpload={(url) => updateArrayItem("doctors", "doctors", i, "doctorImage", { ...doctor.doctorImage, image: url })} />
                                        <input type="text" value={doctor.doctorImage?.imageAlt || ""} onChange={(e) => updateArrayItem("doctors", "doctors", i, "doctorImage", { ...doctor.doctorImage, imageAlt: e.target.value })} className="w-full mt-2 p-2 border rounded-md" placeholder="Doctor Image Alt Text" />
                                    </div>
                                    <div className="mt-4 border-t pt-4">
                                        <div className="flex justify-between items-center mb-3"><h5 className="text-md font-semibold text-gray-800">Qualifications</h5><button type="button" onClick={() => addNestedItem("doctors", "doctors", i, "qualifications", "")} className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">+ Add Qualification</button></div>
                                        {(!doctor.qualifications || doctor.qualifications.length === 0) ? (
                                            <p className="text-sm text-gray-500 italic">No qualifications added.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                {doctor.qualifications.map((qual, qi) => (
                                                    <div key={qi} className="flex gap-2">
                                                        <input type="text" value={qual} onChange={(e) => updateNestedItem("doctors", "doctors", i, "qualifications", qi, e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. MBBS, MD" />
                                                        <button type="button" onClick={() => deleteNestedItem("doctors", "doctors", i, "qualifications", qi)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm">Delete</button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── PRICING SECTION ─────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Pricing Section</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.pricing.heading} onChange={(e) => handleNestedChange("pricing", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description (Rich Text)</label><SunEditor setContents={formData.pricing.description} onChange={(val) => handleNestedChange("pricing", "description", val)} setOptions={sunEditorOptions} /></div>
                    <div><label className="block text-sm font-semibold text-gray-700">Warning Text</label><input type="text" value={formData.pricing.warningText} onChange={(e) => handleNestedChange("pricing", "warningText", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    <div>
                        <button type="button" onClick={() => addToArray("pricing", "pricingStats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Pricing Stat</button>
                        {(formData.pricing.pricingStats || []).length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No pricing stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.pricing.pricingStats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3"><h5 className="font-semibold">Stat {i + 1}</h5><button type="button" onClick={() => deleteFromArray("pricing", "pricingStats", i)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("pricing", "pricingStats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("pricing", "pricingStats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <CTABlock label="WhatsApp CTA" value={formData.pricing.ctaTextWhatsApp} onChange={(field, val) => handleNestedChange("pricing", "ctaTextWhatsApp", { ...formData.pricing.ctaTextWhatsApp, [field]: val })} />
                        <CTABlock label="Call CTA" value={formData.pricing.ctaTextCall} onChange={(field, val) => handleNestedChange("pricing", "ctaTextCall", { ...formData.pricing.ctaTextCall, [field]: val })} />
                        <CTABlock label="Guide CTA" value={formData.pricing.ctaTextGuide} onChange={(field, val) => handleNestedChange("pricing", "ctaTextGuide", { ...formData.pricing.ctaTextGuide, [field]: val })} />
                    </div>
                </div>

                {/* ─── VISIT CLINIC SECTION ────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Visit Clinic Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.visitClinic.description} onChange={(e) => handleNestedChange("visitClinic", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <button type="button" onClick={() => addToArray("visitClinic", "informationCards", { icon: "", title: "", description: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Information Card</button>
                    {(formData.visitClinic.informationCards || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center"><p className="text-gray-500">No information cards added yet.</p></div>
                    ) : (
                        <div className="space-y-4">
                            {formData.visitClinic.informationCards.map((card, i) => (
                                <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-center"><h5 className="font-semibold">Card {i + 1}</h5><button type="button" onClick={() => deleteFromArray("visitClinic", "informationCards", i)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={card.icon} onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "icon", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={card.title} onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "title", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Description</label><input type="text" value={card.description} onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "description", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <CTABlock label="Directions Button" value={formData.visitClinic.buttonText} onChange={(field, val) => handleNestedChange("visitClinic", "buttonText", { ...formData.visitClinic.buttonText, [field]: val })} />
                </div>

                {/* ─── CONSULTATION SECTION ────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">Consultation Section</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section Background Image (Ryan Clinic Photo)</label>
                        <ImageUploader
                            initialImage={formData.consultation?.backgroundImage?.image || ""}
                            onUpload={(url) => handleNestedChange("consultation", "backgroundImage", { ...(formData.consultation?.backgroundImage || {}), image: url })}
                        />
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Left Side Heading</label><input type="text" value={formData.consultation.leftSide?.heading || ""} onChange={(e) => handleDeepChange("consultation", "leftSide", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Left Side Description</label><textarea rows={3} value={formData.consultation.leftSide?.description || ""} onChange={(e) => handleDeepChange("consultation", "leftSide", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <button type="button" onClick={() => { const updated = { ...formData.consultation.leftSide, contactCards: [...(formData.consultation.leftSide?.contactCards || []), { icon: "", title: "", description: "", link: "", ext: false, displayOrder: 0 }] }; handleNestedChange("consultation", "leftSide", updated); }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add Contact Card</button>
                    {(formData.consultation.leftSide?.contactCards || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No contact cards added yet.</p></div>
                    ) : (
                        <div className="space-y-4">
                            {formData.consultation.leftSide.contactCards.map((card, i) => (
                                <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                                    <div className="flex justify-between items-center"><h5 className="font-semibold">Contact Card {i + 1}</h5><button type="button" onClick={() => { const updated = { ...formData.consultation.leftSide, contactCards: formData.consultation.leftSide.contactCards.filter((_, idx) => idx !== i) }; handleNestedChange("consultation", "leftSide", updated); }} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        <div><label className="block text-sm font-semibold">Icon</label><input type="text" value={card.icon} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], icon: e.target.value }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Title</label><input type="text" value={card.title} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], title: e.target.value }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Order</label><input type="number" value={card.displayOrder} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], displayOrder: parseInt(e.target.value) || 0 }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Description</label><input type="text" value={card.description} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], description: e.target.value }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        <div><label className="block text-sm font-semibold">Link URL</label><input type="text" value={card.link} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], link: e.target.value }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-full mt-1 p-2 border rounded-md" /></div>
                                    </div>
                                    <div className="flex items-center gap-2"><input type="checkbox" checked={!!card.ext} onChange={(e) => { const c = [...formData.consultation.leftSide.contactCards]; c[i] = { ...c[i], ext: e.target.checked }; handleNestedChange("consultation", "leftSide", { ...formData.consultation.leftSide, contactCards: c }); }} className="w-4 h-4" /><label className="text-sm text-gray-700">External URL</label></div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border rounded-xl p-5 bg-gray-50 space-y-4 mt-4">
                        <h4 className="text-lg font-semibold">Consultation Form Config</h4>
                        <div><label className="block text-sm font-semibold text-gray-700">Form Title</label><input type="text" value={formData.consultation.consultationFormConfig?.title || ""} onChange={(e) => handleDeepChange("consultation", "consultationFormConfig", "title", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div>
                            <div className="flex justify-between items-center mb-2"><label className="block text-sm font-semibold text-gray-700">Service Dropdown Options</label><button type="button" onClick={() => { const updated = { ...formData.consultation.consultationFormConfig, servicesDropdown: [...(formData.consultation.consultationFormConfig?.servicesDropdown || []), ""] }; handleNestedChange("consultation", "consultationFormConfig", updated); }} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">+ Add Service</button></div>
                            {(formData.consultation.consultationFormConfig?.servicesDropdown || []).map((svc, si) => (
                                <div key={si} className="flex gap-2 mb-2">
                                    <input type="text" value={svc} onChange={(e) => { const a = [...formData.consultation.consultationFormConfig.servicesDropdown]; a[si] = e.target.value; handleNestedChange("consultation", "consultationFormConfig", { ...formData.consultation.consultationFormConfig, servicesDropdown: a }); }} className="flex-1 p-2 border rounded-md" placeholder="e.g. FUE Hair Transplant" />
                                    <button type="button" onClick={() => { const a = formData.consultation.consultationFormConfig.servicesDropdown.filter((_, idx) => idx !== si); handleNestedChange("consultation", "consultationFormConfig", { ...formData.consultation.consultationFormConfig, servicesDropdown: a }); }} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Del</button>
                                </div>
                            ))}
                        </div>
                        <CTABlock label="Submit Button" value={formData.consultation.consultationFormConfig?.submitButtonText || {}} onChange={(field, val) => handleNestedChange("consultation", "consultationFormConfig", { ...formData.consultation.consultationFormConfig, submitButtonText: { ...(formData.consultation.consultationFormConfig?.submitButtonText || {}), [field]: val } })} />
                    </div>
                </div>

                {/* ─── FAQ SECTION ─────────────────────────────────── */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">FAQ Section</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 flex-col md:flex-row">
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Heading</label><input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                        <div className="w-full"><label className="block text-sm font-semibold text-gray-700">Description</label><input type="text" value={formData.faq.description} onChange={(e) => handleNestedChange("faq", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" /></div>
                    </div>
                    <div>
                        <button type="button" onClick={() => addToArray("faq", "stats", { value: "", label: "" })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4">+ Add FAQ Stat</button>
                        {(formData.faq.stats || []).length === 0 ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"><p className="text-gray-500">No FAQ stats added yet.</p></div>
                        ) : (
                            <div className="space-y-3">
                                {formData.faq.stats.map((stat, i) => (
                                    <div key={i} className="border rounded-xl p-4 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-3"><h5 className="font-semibold">Stat {i + 1}</h5><button type="button" onClick={() => deleteFromArray("faq", "stats", i)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Delete</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-sm font-semibold">Value</label><input type="text" value={stat.value} onChange={(e) => updateArrayItem("faq", "stats", i, "value", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                            <div><label className="block text-sm font-semibold">Label</label><input type="text" value={stat.label} onChange={(e) => updateArrayItem("faq", "stats", i, "label", e.target.value)} className="w-full mt-1 p-2 border rounded-md" /></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="button" onClick={() => addToArray("faq", "faqs", { question: "", answer: "", displayOrder: 0 })} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6">+ Add FAQ</button>
                    {(formData.faq.faqs || []).length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-6"><h4 className="text-xl font-semibold text-gray-600">No FAQs added yet</h4><p className="text-gray-500 mt-2">Click &quot;+ Add FAQ&quot; to create your first FAQ item.</p></div>
                    ) : (
                        <div className="space-y-6 mt-6">
                            {formData.faq.faqs.map((faq, i) => (
                                <div key={i} className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
                                    <div className="flex justify-between items-center"><h4 className="text-lg font-semibold text-gray-800">FAQ {i + 1}</h4><button type="button" onClick={() => deleteFromArray("faq", "faqs", i)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-semibold">Delete FAQ</button></div>
                                    <div className="space-y-4">
                                        <div><label className="block text-sm font-semibold text-gray-700">Question</label><input type="text" value={faq.question} onChange={(e) => updateArrayItem("faq", "faqs", i, "question", e.target.value)} className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter FAQ Question" required /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700 mb-2">Answer (Rich Text)</label><SunEditor setContents={faq.answer} onChange={(val) => updateArrayItem("faq", "faqs", i, "answer", val)} setOptions={sunEditorOptions} /></div>
                                        <div><label className="block text-sm font-semibold text-gray-700">Display Order</label><input type="number" value={faq.displayOrder} onChange={(e) => updateArrayItem("faq", "faqs", i, "displayOrder", parseInt(e.target.value) || 0)} className="w-full mt-2 p-2 border rounded-md" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <CTABlock label="FAQ Help Button" value={formData.faq.ctaButtonText} onChange={(field, val) => handleNestedChange("faq", "ctaButtonText", { ...formData.faq.ctaButtonText, [field]: val })} />
                </div>

                {/* ─── SUBMIT ──────────────────────────────────────── */}
                <div className="pt-4">
                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                        {submitting ? "Saving..." : "Update Surgery Page"}
                    </button>
                </div>

            </form>
        </section>
    );
}

export default function EditSurgeryPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading form...</p>
            </div>
        }>
            <EditSurgeryForm />
        </Suspense>
    );
}
