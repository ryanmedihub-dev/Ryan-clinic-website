"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const sunEditorOptions = {
    height: "250px",
    buttonList: [
        ["undo", "redo"],
        ["bold", "underline", "italic", "strike"],
        ["align", "horizontalRule", "list"],
        ["link"],
        ["fullScreen", "codeView"],
    ],
    defaultStyle: "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:15px;",
    imageUploadUrl: "/api/upload",
};

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

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
    seo: { metaTitle: "", metaDescription: "", keywords: "", canonicalUrl: "", robots: "index,follow", openGraphImage: { image: "", imageAlt: "" } },
    hero: { breadcrumb: "", title: "", description: "", heroImage: { image: "", imageAlt: "" }, stats: [], whatsappText: { text: "", link: "" }, callText: { text: "", link: "" } },
    introduction: { smallHeading: "", title: "", description: "", highlightBoxText: "", honestPoints: [], mainImage: { image: "", imageAlt: "" }, floatingImage: { image: "", imageAlt: "" }, bottomStats: [], primaryCTA: { text: "", link: "" }, secondaryCTA: { text: "", link: "" } },
    safetyInfo: { badge: "", heading: "", description: "", safetyPoints: [], safetyCard: { title: "", description: "", icon: "" }, metrics: [] },
    surgeryTypes: { heading: "", description: "", cards: [] },
    bestSurgeryChecklist: { heading: "", description: "", checklistItems: [] },
    candidateSuitability: { heading: "", description: "", suitableList: [], notSuitableList: [], norwoodTable: [] },
    beforeSurgeryTimeline: { heading: "", description: "", timelineItems: [] },
    procedureScience: { mainHeading: "", description: "", cards: [] },
    safety: { heading: "", description: "", safetyCards: [], rightSideHighlightBox: { smallHeading: "", title: "", description: "", metrics: [], bottomNotice: "" } },
    techniques: { heading: "", description: "", techniques: [], bottomCTABlock: { heading: "", description: "", primaryCTA: { text: "", link: "" }, secondaryCTA: { text: "", link: "" } } },
    qualityBenchmarks: { heading: "", description: "", benchmarkCards: [] },
    procedureTimeline: { heading: "", description: "", timelineSteps: [], bottomHighlightMessage: "" },
    recoveryTimeline: { heading: "", description: "", leftHighlightCard: { icon: "", title: "", description: "", statistics: [] }, recoveryStages: [] },
    surgicalRisks: { heading: "", description: "", risks: [], preventionPoints: [] },
    pricing: { heading: "", description: "", warningText: "", pricingFactors: [], notes: "", pricingStats: [], ctaTextWhatsApp: { text: "", link: "" }, ctaTextCall: { text: "", link: "" }, ctaTextGuide: { text: "", link: "" } },
    doctors: { heading: "", description: "", doctors: [], topButtonText: "" },
    patientResults: { heading: "", description: "", cases: [] },
    visitClinic: { heading: "", description: "", address: "", contactPhone: "", mapEmbedUrl: "", nearbyLocations: [], informationCards: [], buttonText: { text: "", link: "" } },
    faq: { heading: "", description: "", stats: [], faqs: [], ctaButtonText: { text: "", link: "" } },
    internalLinks: { heading: "", links: [] },
    whyChooseUs: { heading: "", description: "", points: [] },
};

function EditSurgeryContent() {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const querySlug = searchParams.get("slug");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!querySlug) return;
        const fetchPage = async () => {
            try {
                const res = await fetch(`/api/surgery/get?slug=${querySlug}`);
                const data = await res.json();
                if (res.ok && data.surgeryPage) {
                    setFormData((prev) => ({
                        ...initialState,
                        ...data.surgeryPage,
                        seo: { ...initialState.seo, ...(data.surgeryPage.seo || {}) },
                        hero: { ...initialState.hero, ...(data.surgeryPage.hero || {}) },
                        introduction: { ...initialState.introduction, ...(data.surgeryPage.introduction || {}) },
                        safetyInfo: { ...initialState.safetyInfo, ...(data.surgeryPage.safetyInfo || {}) },
                        surgeryTypes: { ...initialState.surgeryTypes, ...(data.surgeryPage.surgeryTypes || {}) },
                        bestSurgeryChecklist: { ...initialState.bestSurgeryChecklist, ...(data.surgeryPage.bestSurgeryChecklist || {}) },
                        candidateSuitability: { ...initialState.candidateSuitability, ...(data.surgeryPage.candidateSuitability || {}) },
                        beforeSurgeryTimeline: { ...initialState.beforeSurgeryTimeline, ...(data.surgeryPage.beforeSurgeryTimeline || {}) },
                        procedureScience: { ...initialState.procedureScience, ...(data.surgeryPage.procedureScience || {}) },
                        safety: { ...initialState.safety, ...(data.surgeryPage.safety || {}) },
                        techniques: { ...initialState.techniques, ...(data.surgeryPage.techniques || {}) },
                        qualityBenchmarks: { ...initialState.qualityBenchmarks, ...(data.surgeryPage.qualityBenchmarks || {}) },
                        procedureTimeline: { ...initialState.procedureTimeline, ...(data.surgeryPage.procedureTimeline || {}) },
                        recoveryTimeline: { ...initialState.recoveryTimeline, ...(data.surgeryPage.recoveryTimeline || {}) },
                        surgicalRisks: { ...initialState.surgicalRisks, ...(data.surgeryPage.surgicalRisks || {}) },
                        pricing: { ...initialState.pricing, ...(data.surgeryPage.pricing || {}) },
                        doctors: { ...initialState.doctors, ...(data.surgeryPage.doctors || {}) },
                        patientResults: { ...initialState.patientResults, ...(data.surgeryPage.patientResults || {}) },
                        visitClinic: { ...initialState.visitClinic, ...(data.surgeryPage.visitClinic || {}) },
                        faq: { ...initialState.faq, ...(data.surgeryPage.faq || {}) },
                        internalLinks: { ...initialState.internalLinks, ...(data.surgeryPage.internalLinks || {}) },
                        whyChooseUs: { ...initialState.whyChooseUs, ...(data.surgeryPage.whyChooseUs || {}) },
                    }));
                } else {
                    toast.error("Not Found", data.message || "Failed to load page");
                }
            } catch (err) {
                toast.error("Error", err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [querySlug]);

    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({ ...prev, [section]: { ...(prev[section] || {}), [field]: value } }));
    };

    const handleDeepChange = (section, subSection, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...(prev[section] || {}), [subSection]: { ...((prev[section] || {})[subSection] || {}), [field]: value } },
        }));
    };

    const handleTopLevelChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addToArray = (section, field, newItem) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...(prev[section] || {}), [field]: [...((prev[section] || {})[field] || []), newItem] },
        }));
    };

    const updateArrayItem = (section, field, index, itemField, value) => {
        setFormData((prev) => {
            const arr = [...((prev[section] || {})[field] || [])];
            if (typeof arr[index] === "object") {
                arr[index] = { ...arr[index], [itemField]: value };
            } else {
                arr[index] = value;
            }
            return { ...prev, [section]: { ...(prev[section] || {}), [field]: arr } };
        });
    };

    const removeFromArray = (section, field, index) => {
        setFormData((prev) => {
            const arr = [...((prev[section] || {})[field] || [])];
            arr.splice(index, 1);
            return { ...prev, [section]: { ...(prev[section] || {}), [field]: arr } };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/surgery/update?slug=${querySlug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Updated", "Surgery page updated successfully.");
                setTimeout(() => router.push("/admin/surgery"), 1200);
            } else {
                toast.error("Update Failed", data.message || "Failed to update page");
            }
        } catch (err) {
            toast.error("Error", err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center p-12"><p className="text-lg font-semibold text-gray-600">Loading surgery page content...</p></div>;
    }

    const inputCls = "w-full mt-2 p-2 border rounded-md";
    const labelCls = "block text-sm font-semibold text-gray-700";
    const sectionHeadingCls = "text-2xl font-bold underline mt-10 mb-5";
    const rowCls = "flex gap-6 flex-col md:flex-row";
    const addBtnCls = "mt-2 px-4 py-1.5 bg-[#e30a17] text-white text-sm font-semibold rounded-md hover:bg-red-700";
    const removeBtnCls = "ml-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded hover:bg-red-200";

    return (
        <section className="pb-24" suppressHydrationWarning>
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
            <AdminHeader title={`/ Edit Surgery Page: ${formData.pageName}`} />

            <form onSubmit={handleSubmit} className="space-y-6 px-6 w-full" suppressHydrationWarning>

                {/* Sticky Save Bar */}
                <div className="sticky top-4 z-40 flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-gray-700">Slug: <span className="font-mono text-blue-600">/{formData.slug}</span></p>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => router.push("/admin/surgery")} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
                        <button type="submit" disabled={submitting} className="px-6 py-2 text-sm font-bold text-white bg-[#e30a17] hover:bg-red-700 rounded-md disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
                    </div>
                </div>

                {/* 1. GENERAL INFO */}
                <h3 className={sectionHeadingCls}>1. General Info</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Page Name *</label>
                        <input type="text" required value={formData.pageName} onChange={(e) => handleTopLevelChange("pageName", e.target.value)} className={inputCls} placeholder="e.g. Hair Transplant Surgery in Delhi" />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Status</label>
                        <select value={formData.status} onChange={(e) => handleTopLevelChange("status", e.target.value)} className={inputCls}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>City / Branch</label>
                        <input type="text" value={formData.city} onChange={(e) => handleTopLevelChange("city", e.target.value)} className={inputCls} placeholder="e.g. Delhi" />
                    </div>
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Slug (URL) — editing changes the public URL</label>
                        <input type="text" value={formData.slug} onChange={(e) => handleTopLevelChange("slug", e.target.value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"))} className={inputCls + " font-mono"} placeholder="e.g. hair-transplant-surgery-in-delhi" />
                        {formData.slug && <p className="text-xs text-gray-400 mt-1">URL preview: <span className="text-blue-600 font-mono">/surgery/{formData.slug}</span></p>}
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Landing Card Image (Shown on Surgery Listing / Landing Page Cards)</label>
                    <ImageUploader value={formData.landingCardImage?.image || ""} onChange={(url) => handleDeepChange("landingCardImage", "image", null, url) || handleTopLevelChange("landingCardImage", { ...(formData.landingCardImage || {}), image: url })} />
                </div>

                {/* 2. SEO */}
                <h3 className={sectionHeadingCls}>2. SEO &amp; Meta</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Meta Title</label>
                        <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Canonical URL</label>
                        <input type="text" value={formData.seo.canonicalUrl} onChange={(e) => handleNestedChange("seo", "canonicalUrl", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Meta Description</label>
                    <textarea rows={3} value={formData.seo.metaDescription} onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Keywords</label>
                    <input type="text" value={formData.seo.keywords} onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>OG Image</label>
                    <ImageUploader value={formData.seo.openGraphImage?.image || ""} onChange={(url) => handleDeepChange("seo", "openGraphImage", "image", url)} />
                </div>

                {/* 3. HERO */}
                <h3 className={sectionHeadingCls}>3. Hero Banner</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Hero Title</label>
                        <input type="text" value={formData.hero.title} onChange={(e) => handleNestedChange("hero", "title", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Breadcrumb</label>
                        <input type="text" value={formData.hero.breadcrumb} onChange={(e) => handleNestedChange("hero", "breadcrumb", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Hero Description</label>
                    <textarea rows={3} value={formData.hero.description} onChange={(e) => handleNestedChange("hero", "description", e.target.value)} className={inputCls} />
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>WhatsApp Button Text</label>
                        <input type="text" value={formData.hero.whatsappText?.text || ""} onChange={(e) => handleDeepChange("hero", "whatsappText", "text", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>WhatsApp Link</label>
                        <input type="text" value={formData.hero.whatsappText?.link || ""} onChange={(e) => handleDeepChange("hero", "whatsappText", "link", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Call Button Text</label>
                        <input type="text" value={formData.hero.callText?.text || ""} onChange={(e) => handleDeepChange("hero", "callText", "text", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Call Link</label>
                        <input type="text" value={formData.hero.callText?.link || ""} onChange={(e) => handleDeepChange("hero", "callText", "link", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Hero Background Image</label>
                    <ImageUploader value={formData.hero.heroImage?.image || ""} onChange={(url) => handleDeepChange("hero", "heroImage", "image", url)} />
                </div>

                {/* 4. INTRODUCTION */}
                <h3 className={sectionHeadingCls}>4. Introduction (What is Hair Transplant Surgery?)</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Small Heading / Badge</label>
                        <input type="text" value={formData.introduction.smallHeading} onChange={(e) => handleNestedChange("introduction", "smallHeading", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Section Title</label>
                        <input type="text" value={formData.introduction.title} onChange={(e) => handleNestedChange("introduction", "title", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description (HTML supported)</label>
                    <SunEditor setContents={formData.introduction.description} onChange={(c) => handleNestedChange("introduction", "description", c)} setOptions={sunEditorOptions} />
                </div>
                <div>
                    <label className={labelCls}>Highlight Box Text</label>
                    <textarea rows={2} value={formData.introduction.highlightBoxText} onChange={(e) => handleNestedChange("introduction", "highlightBoxText", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Honest Points (one per line)</label>
                    <textarea rows={4} value={(formData.introduction.honestPoints || []).join("\n")} onChange={(e) => handleNestedChange("introduction", "honestPoints", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Main Image</label>
                        <ImageUploader value={formData.introduction.mainImage?.image || ""} onChange={(url) => handleDeepChange("introduction", "mainImage", "image", url)} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Main Image Alt</label>
                        <input type="text" value={formData.introduction.mainImage?.imageAlt || ""} onChange={(e) => handleDeepChange("introduction", "mainImage", "imageAlt", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Primary CTA Text</label>
                        <input type="text" value={formData.introduction.primaryCTA?.text || ""} onChange={(e) => handleDeepChange("introduction", "primaryCTA", "text", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Primary CTA Link</label>
                        <input type="text" value={formData.introduction.primaryCTA?.link || ""} onChange={(e) => handleDeepChange("introduction", "primaryCTA", "link", e.target.value)} className={inputCls} />
                    </div>
                </div>

                {/* 5. SAFETY INFO */}
                <h3 className={sectionHeadingCls}>5. Safety Info (Is Hair Transplant Surgery Safe?)</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.safetyInfo.heading} onChange={(e) => handleNestedChange("safetyInfo", "heading", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Badge</label>
                        <input type="text" value={formData.safetyInfo.badge} onChange={(e) => handleNestedChange("safetyInfo", "badge", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={3} value={formData.safetyInfo.description} onChange={(e) => handleNestedChange("safetyInfo", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Safety Points (one per line)</label>
                    <textarea rows={5} value={(formData.safetyInfo.safetyPoints || []).join("\n")} onChange={(e) => handleNestedChange("safetyInfo", "safetyPoints", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
                </div>

                {/* 6. BEST SURGERY CHECKLIST */}
                <h3 className={sectionHeadingCls}>6. Best Surgery Checklist</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.bestSurgeryChecklist.heading} onChange={(e) => handleNestedChange("bestSurgeryChecklist", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.bestSurgeryChecklist.description} onChange={(e) => handleNestedChange("bestSurgeryChecklist", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Checklist Items</label>
                    {(formData.bestSurgeryChecklist.checklistItems || []).map((item, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-start">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <input type="text" placeholder="Title" value={item.title || ""} onChange={(e) => updateArrayItem("bestSurgeryChecklist", "checklistItems", idx, "title", e.target.value)} className={inputCls} />
                                <input type="text" placeholder="Description" value={item.description || ""} onChange={(e) => updateArrayItem("bestSurgeryChecklist", "checklistItems", idx, "description", e.target.value)} className={inputCls} />
                            </div>
                            <button type="button" onClick={() => removeFromArray("bestSurgeryChecklist", "checklistItems", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("bestSurgeryChecklist", "checklistItems", { title: "", description: "" })} className={addBtnCls}>+ Add Item</button>
                </div>

                {/* 7. CANDIDATE SUITABILITY & NORWOOD */}
                <h3 className={sectionHeadingCls}>7. Candidate Suitability &amp; Norwood Scale</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.candidateSuitability.heading} onChange={(e) => handleNestedChange("candidateSuitability", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.candidateSuitability.description} onChange={(e) => handleNestedChange("candidateSuitability", "description", e.target.value)} className={inputCls} />
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Suitable Candidates (one per line)</label>
                        <textarea rows={5} value={(formData.candidateSuitability.suitableList || []).join("\n")} onChange={(e) => handleNestedChange("candidateSuitability", "suitableList", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Not Suitable If (one per line)</label>
                        <textarea rows={5} value={(formData.candidateSuitability.notSuitableList || []).join("\n")} onChange={(e) => handleNestedChange("candidateSuitability", "notSuitableList", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Norwood Table Rows</label>
                    {(formData.candidateSuitability.norwoodTable || []).map((row, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Stage" value={row.stage || ""} onChange={(e) => updateArrayItem("candidateSuitability", "norwoodTable", idx, "stage", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={row.description || ""} onChange={(e) => updateArrayItem("candidateSuitability", "norwoodTable", idx, "description", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Grafts" value={row.grafts || ""} onChange={(e) => updateArrayItem("candidateSuitability", "norwoodTable", idx, "grafts", e.target.value)} className={inputCls} />
                            <button type="button" onClick={() => removeFromArray("candidateSuitability", "norwoodTable", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("candidateSuitability", "norwoodTable", { stage: "", description: "", grafts: "" })} className={addBtnCls}>+ Add Row</button>
                </div>

                {/* 8. BEFORE SURGERY TIMELINE */}
                <h3 className={sectionHeadingCls}>8. Before Surgery Preparation</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.beforeSurgeryTimeline.heading} onChange={(e) => handleNestedChange("beforeSurgeryTimeline", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.beforeSurgeryTimeline.description} onChange={(e) => handleNestedChange("beforeSurgeryTimeline", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Timeline Steps</label>
                    {(formData.beforeSurgeryTimeline.timelineItems || []).map((item, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-start">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                                <input type="text" placeholder="Badge" value={item.badge || ""} onChange={(e) => updateArrayItem("beforeSurgeryTimeline", "timelineItems", idx, "badge", e.target.value)} className={inputCls} />
                                <input type="text" placeholder="Title" value={item.title || ""} onChange={(e) => updateArrayItem("beforeSurgeryTimeline", "timelineItems", idx, "title", e.target.value)} className={inputCls} />
                                <input type="text" placeholder="Description" value={item.description || ""} onChange={(e) => updateArrayItem("beforeSurgeryTimeline", "timelineItems", idx, "description", e.target.value)} className={inputCls} />
                            </div>
                            <button type="button" onClick={() => removeFromArray("beforeSurgeryTimeline", "timelineItems", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("beforeSurgeryTimeline", "timelineItems", { badge: "", title: "", description: "" })} className={addBtnCls}>+ Add Step</button>
                </div>

                {/* 9. PROCEDURE SCIENCE */}
                <h3 className={sectionHeadingCls}>9. Procedure Science</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Main Heading</label>
                        <input type="text" value={formData.procedureScience.mainHeading} onChange={(e) => handleNestedChange("procedureScience", "mainHeading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.procedureScience.description} onChange={(e) => handleNestedChange("procedureScience", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Science Cards</label>
                    {(formData.procedureScience.cards || []).map((card, idx) => (
                        <div key={idx} className="border rounded-md p-4 mb-3 bg-gray-50 relative">
                            <button type="button" onClick={() => removeFromArray("procedureScience", "cards", idx)} className={removeBtnCls + " absolute top-2 right-2"}>✕ Remove</button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Title</label><input type="text" value={card.title || ""} onChange={(e) => updateArrayItem("procedureScience", "cards", idx, "title", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Badge</label><input type="text" value={card.badge || ""} onChange={(e) => updateArrayItem("procedureScience", "cards", idx, "badge", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Description</label><textarea rows={3} value={card.description || ""} onChange={(e) => updateArrayItem("procedureScience", "cards", idx, "description", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Bullet Points (one per line)</label><textarea rows={3} value={(card.bulletPoints || []).join("\n")} onChange={(e) => updateArrayItem("procedureScience", "cards", idx, "bulletPoints", e.target.value.split("\n").filter(Boolean))} className={inputCls} /></div>
                                <div><label className={labelCls}>Card Image</label><ImageUploader value={card.cardImage?.image || ""} onChange={(url) => updateArrayItem("procedureScience", "cards", idx, "cardImage", { ...(card.cardImage || {}), image: url })} /></div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("procedureScience", "cards", { title: "", badge: "", description: "", bulletPoints: [], cardImage: { image: "", imageAlt: "" } })} className={addBtnCls}>+ Add Card</button>
                </div>

                {/* 10. SAFETY STANDARDS */}
                <h3 className={sectionHeadingCls}>10. Safety Standards</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.safety.heading} onChange={(e) => handleNestedChange("safety", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.safety.description} onChange={(e) => handleNestedChange("safety", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Safety Cards</label>
                    {(formData.safety.safetyCards || []).map((card, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-start">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                                <input type="text" placeholder="Title" value={card.title || ""} onChange={(e) => updateArrayItem("safety", "safetyCards", idx, "title", e.target.value)} className={inputCls} />
                                <input type="text" placeholder="Description" value={card.description || ""} onChange={(e) => updateArrayItem("safety", "safetyCards", idx, "description", e.target.value)} className={inputCls} />
                                <input type="text" placeholder="Icon name" value={card.icon || ""} onChange={(e) => updateArrayItem("safety", "safetyCards", idx, "icon", e.target.value)} className={inputCls} />
                            </div>
                            <button type="button" onClick={() => removeFromArray("safety", "safetyCards", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("safety", "safetyCards", { title: "", description: "", icon: "" })} className={addBtnCls}>+ Add Card</button>
                </div>

                {/* 11. TECHNIQUES */}
                <h3 className={sectionHeadingCls}>11. Surgical Techniques</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.techniques.heading} onChange={(e) => handleNestedChange("techniques", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.techniques.description} onChange={(e) => handleNestedChange("techniques", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Techniques</label>
                    {(formData.techniques.techniques || []).map((tech, idx) => (
                        <div key={idx} className="border rounded-md p-4 mb-3 bg-gray-50 relative">
                            <button type="button" onClick={() => removeFromArray("techniques", "techniques", idx)} className={removeBtnCls + " absolute top-2 right-2"}>✕ Remove</button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Name</label><input type="text" value={tech.name || ""} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "name", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Subtitle</label><input type="text" value={tech.subtitle || ""} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "subtitle", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Badge</label><input type="text" value={tech.badge || ""} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "badge", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Featured</label><select value={tech.featured ? "true" : "false"} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "featured", e.target.value === "true")} className={inputCls}><option value="false">No</option><option value="true">Yes</option></select></div>
                                <div className="col-span-2"><label className={labelCls}>Description</label><textarea rows={3} value={tech.description || ""} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "description", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Bullet Points (one per line)</label><textarea rows={3} value={(tech.bulletPoints || []).join("\n")} onChange={(e) => updateArrayItem("techniques", "techniques", idx, "bulletPoints", e.target.value.split("\n").filter(Boolean))} className={inputCls} /></div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("techniques", "techniques", { name: "", subtitle: "", badge: "", featured: false, description: "", bulletPoints: [] })} className={addBtnCls}>+ Add Technique</button>
                </div>

                {/* 12. QUALITY BENCHMARKS */}
                <h3 className={sectionHeadingCls}>12. Quality Benchmarks</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.qualityBenchmarks.heading} onChange={(e) => handleNestedChange("qualityBenchmarks", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.qualityBenchmarks.description} onChange={(e) => handleNestedChange("qualityBenchmarks", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Benchmark Cards</label>
                    {(formData.qualityBenchmarks.benchmarkCards || []).map((card, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Number / Label" value={card.number || ""} onChange={(e) => updateArrayItem("qualityBenchmarks", "benchmarkCards", idx, "number", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={card.description || ""} onChange={(e) => updateArrayItem("qualityBenchmarks", "benchmarkCards", idx, "description", e.target.value)} className={inputCls} />
                            <button type="button" onClick={() => removeFromArray("qualityBenchmarks", "benchmarkCards", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("qualityBenchmarks", "benchmarkCards", { number: "", description: "" })} className={addBtnCls}>+ Add Card</button>
                </div>

                {/* 13. DAY OF SURGERY */}
                <h3 className={sectionHeadingCls}>13. Day of Surgery Timeline</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.procedureTimeline.heading} onChange={(e) => handleNestedChange("procedureTimeline", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.procedureTimeline.description} onChange={(e) => handleNestedChange("procedureTimeline", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Steps</label>
                    {(formData.procedureTimeline.timelineSteps || []).map((step, idx) => (
                        <div key={idx} className="border rounded-md p-4 mb-3 bg-gray-50 relative">
                            <button type="button" onClick={() => removeFromArray("procedureTimeline", "timelineSteps", idx)} className={removeBtnCls + " absolute top-2 right-2"}>✕</button>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label className={labelCls}>Num</label><input type="text" value={step.num || ""} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", idx, "num", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Title</label><input type="text" value={step.title || ""} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", idx, "title", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Tag</label><input type="text" value={step.tag || ""} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", idx, "tag", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-3"><label className={labelCls}>Description</label><textarea rows={2} value={step.desc || ""} onChange={(e) => updateArrayItem("procedureTimeline", "timelineSteps", idx, "desc", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Image</label><ImageUploader value={step.image || ""} onChange={(url) => updateArrayItem("procedureTimeline", "timelineSteps", idx, "image", url)} /></div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("procedureTimeline", "timelineSteps", { num: "", title: "", tag: "", desc: "", image: "" })} className={addBtnCls}>+ Add Step</button>
                </div>

                {/* 14. RECOVERY TIMELINE */}
                <h3 className={sectionHeadingCls}>14. Recovery Timeline</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.recoveryTimeline.heading} onChange={(e) => handleNestedChange("recoveryTimeline", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.recoveryTimeline.description} onChange={(e) => handleNestedChange("recoveryTimeline", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Recovery Stages</label>
                    {(formData.recoveryTimeline.recoveryStages || []).map((stage, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Time" value={stage.time || ""} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", idx, "time", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Title" value={stage.label || ""} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", idx, "label", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={stage.desc || ""} onChange={(e) => updateArrayItem("recoveryTimeline", "recoveryStages", idx, "desc", e.target.value)} className={inputCls} />
                            <button type="button" onClick={() => removeFromArray("recoveryTimeline", "recoveryStages", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("recoveryTimeline", "recoveryStages", { time: "", label: "", desc: "" })} className={addBtnCls}>+ Add Stage</button>
                </div>

                {/* 15. SURGICAL RISKS */}
                <h3 className={sectionHeadingCls}>15. Surgical Risks &amp; Prevention</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.surgicalRisks.heading} onChange={(e) => handleNestedChange("surgicalRisks", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.surgicalRisks.description} onChange={(e) => handleNestedChange("surgicalRisks", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Risks</label>
                    {(formData.surgicalRisks.risks || []).map((r, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Title" value={r.riskTitle || ""} onChange={(e) => updateArrayItem("surgicalRisks", "risks", idx, "riskTitle", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={r.riskDescription || ""} onChange={(e) => updateArrayItem("surgicalRisks", "risks", idx, "riskDescription", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Severity" value={r.severity || ""} onChange={(e) => updateArrayItem("surgicalRisks", "risks", idx, "severity", e.target.value)} className={inputCls + " max-w-[120px]"} />
                            <button type="button" onClick={() => removeFromArray("surgicalRisks", "risks", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("surgicalRisks", "risks", { riskTitle: "", riskDescription: "", severity: "" })} className={addBtnCls}>+ Add Risk</button>
                </div>
                <div>
                    <label className={labelCls}>Prevention Points</label>
                    {(formData.surgicalRisks.preventionPoints || []).map((p, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Title" value={p.title || ""} onChange={(e) => updateArrayItem("surgicalRisks", "preventionPoints", idx, "title", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={p.description || ""} onChange={(e) => updateArrayItem("surgicalRisks", "preventionPoints", idx, "description", e.target.value)} className={inputCls} />
                            <button type="button" onClick={() => removeFromArray("surgicalRisks", "preventionPoints", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("surgicalRisks", "preventionPoints", { title: "", description: "" })} className={addBtnCls}>+ Add Prevention Point</button>
                </div>

                {/* 16. PRICING */}
                <h3 className={sectionHeadingCls}>16. Pricing</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.pricing.heading} onChange={(e) => handleNestedChange("pricing", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.pricing.description} onChange={(e) => handleNestedChange("pricing", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Pricing Packages</label>
                    {(formData.pricing.pricingFactors || []).map((f, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="ID" value={f.id || ""} onChange={(e) => updateArrayItem("pricing", "pricingFactors", idx, "id", e.target.value)} className={inputCls + " max-w-[80px]"} />
                            <input type="text" placeholder="Title" value={f.title || ""} onChange={(e) => updateArrayItem("pricing", "pricingFactors", idx, "title", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Price" value={f.price || ""} onChange={(e) => updateArrayItem("pricing", "pricingFactors", idx, "price", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Duration" value={f.duration || ""} onChange={(e) => updateArrayItem("pricing", "pricingFactors", idx, "duration", e.target.value)} className={inputCls + " max-w-[100px]"} />
                            <button type="button" onClick={() => removeFromArray("pricing", "pricingFactors", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("pricing", "pricingFactors", { id: "", title: "", price: "", duration: "" })} className={addBtnCls}>+ Add Package</button>
                </div>

                {/* 17. SURGEONS */}
                <h3 className={sectionHeadingCls}>17. Surgeons</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.doctors.heading} onChange={(e) => handleNestedChange("doctors", "heading", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Top Button Text</label>
                        <input type="text" value={formData.doctors.topButtonText} onChange={(e) => handleNestedChange("doctors", "topButtonText", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.doctors.description} onChange={(e) => handleNestedChange("doctors", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Doctors List</label>
                    {(formData.doctors.doctors || []).map((doc, idx) => (
                        <div key={idx} className="border rounded-md p-4 mb-3 bg-gray-50 relative">
                            <button type="button" onClick={() => removeFromArray("doctors", "doctors", idx)} className={removeBtnCls + " absolute top-2 right-2"}>✕ Remove</button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Name</label><input type="text" value={doc.name || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "name", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Role</label><input type="text" value={doc.role || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "role", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Experience</label><input type="text" value={doc.exp || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "exp", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Procedures</label><input type="text" value={doc.procedures || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "procedures", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Survival Rate</label><input type="text" value={doc.survivalRate || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "survivalRate", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Rating</label><input type="text" value={doc.rating || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "rating", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Slug</label><input type="text" value={doc.slug || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "slug", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Location</label><input type="text" value={doc.location || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "location", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Bio</label><textarea rows={3} value={doc.bio || ""} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "bio", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Qualifications (one per line)</label><textarea rows={3} value={(doc.quals || []).join("\n")} onChange={(e) => updateArrayItem("doctors", "doctors", idx, "quals", e.target.value.split("\n").filter(Boolean))} className={inputCls} /></div>
                                <div><label className={labelCls}>Image</label><ImageUploader value={doc.image || ""} onChange={(url) => updateArrayItem("doctors", "doctors", idx, "image", url)} /></div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("doctors", "doctors", { name: "", role: "", bio: "", exp: "", procedures: "", survivalRate: "", rating: "", quals: [], slug: "", image: "", location: "" })} className={addBtnCls}>+ Add Doctor</button>
                </div>

                {/* 18. PATIENT RESULTS */}
                <h3 className={sectionHeadingCls}>18. Patient Results</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.patientResults.heading} onChange={(e) => handleNestedChange("patientResults", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.patientResults.description} onChange={(e) => handleNestedChange("patientResults", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Patient Cases</label>
                    {(formData.patientResults.cases || []).map((c, idx) => (
                        <div key={idx} className="border rounded-md p-4 mb-3 bg-gray-50 relative">
                            <button type="button" onClick={() => removeFromArray("patientResults", "cases", idx)} className={removeBtnCls + " absolute top-2 right-2"}>✕ Remove</button>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Patient Name</label><input type="text" value={c.patientName || ""} onChange={(e) => updateArrayItem("patientResults", "cases", idx, "patientName", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Technique</label><input type="text" value={c.technique || ""} onChange={(e) => updateArrayItem("patientResults", "cases", idx, "technique", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Graft Count</label><input type="text" value={c.graftCount || ""} onChange={(e) => updateArrayItem("patientResults", "cases", idx, "graftCount", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Recovery Time</label><input type="text" value={c.recoveryTime || ""} onChange={(e) => updateArrayItem("patientResults", "cases", idx, "recoveryTime", e.target.value)} className={inputCls} /></div>
                                <div className="col-span-2"><label className={labelCls}>Description</label><textarea rows={2} value={c.description || ""} onChange={(e) => updateArrayItem("patientResults", "cases", idx, "description", e.target.value)} className={inputCls} /></div>
                                <div><label className={labelCls}>Before Image</label><ImageUploader value={c.beforeImage?.image || ""} onChange={(url) => updateArrayItem("patientResults", "cases", idx, "beforeImage", { ...(c.beforeImage || {}), image: url })} /></div>
                                <div><label className={labelCls}>After Image</label><ImageUploader value={c.afterImage?.image || ""} onChange={(url) => updateArrayItem("patientResults", "cases", idx, "afterImage", { ...(c.afterImage || {}), image: url })} /></div>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("patientResults", "cases", { patientName: "", technique: "", graftCount: "", recoveryTime: "", description: "", beforeImage: { image: "" }, afterImage: { image: "" } })} className={addBtnCls}>+ Add Case</button>
                </div>

                {/* 19. VISIT CLINIC */}
                <h3 className={sectionHeadingCls}>19. Visit Clinic</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.visitClinic.description} onChange={(e) => handleNestedChange("visitClinic", "description", e.target.value)} className={inputCls} />
                </div>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Address</label>
                        <input type="text" value={formData.visitClinic.address} onChange={(e) => handleNestedChange("visitClinic", "address", e.target.value)} className={inputCls} />
                    </div>
                    <div className="w-full">
                        <label className={labelCls}>Contact Phone</label>
                        <input type="text" value={formData.visitClinic.contactPhone} onChange={(e) => handleNestedChange("visitClinic", "contactPhone", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Map Embed URL</label>
                    <input type="text" value={formData.visitClinic.mapEmbedUrl} onChange={(e) => handleNestedChange("visitClinic", "mapEmbedUrl", e.target.value)} className={inputCls} placeholder="https://maps.google.com/maps?..." />
                </div>

                {/* 20. FAQs */}
                <h3 className={sectionHeadingCls}>20. FAQs</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.faq.description} onChange={(e) => handleNestedChange("faq", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>FAQs</label>
                    {(formData.faq.faqs || []).map((faqItem, idx) => (
                        <div key={idx} className="flex gap-2 mb-3 items-start">
                            <div className="flex-1 grid grid-cols-1 gap-2">
                                <input type="text" placeholder="Question" value={faqItem.question || ""} onChange={(e) => updateArrayItem("faq", "faqs", idx, "question", e.target.value)} className={inputCls} />
                                <textarea rows={2} placeholder="Answer" value={faqItem.answer || ""} onChange={(e) => updateArrayItem("faq", "faqs", idx, "answer", e.target.value)} className={inputCls} />
                            </div>
                            <button type="button" onClick={() => removeFromArray("faq", "faqs", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("faq", "faqs", { question: "", answer: "" })} className={addBtnCls}>+ Add FAQ</button>
                </div>

                {/* 21. WHY CHOOSE US */}
                <h3 className={sectionHeadingCls}>21. Why Choose Ryan Clinic</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.whyChooseUs.heading} onChange={(e) => handleNestedChange("whyChooseUs", "heading", e.target.value)} className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.whyChooseUs.description} onChange={(e) => handleNestedChange("whyChooseUs", "description", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Points</label>
                    {(formData.whyChooseUs.points || []).map((pt, idx) => (
                        <div key={idx} className="flex gap-2 mb-2 items-center">
                            <input type="text" placeholder="Title" value={pt.title || ""} onChange={(e) => updateArrayItem("whyChooseUs", "points", idx, "title", e.target.value)} className={inputCls} />
                            <input type="text" placeholder="Description" value={pt.description || ""} onChange={(e) => updateArrayItem("whyChooseUs", "points", idx, "description", e.target.value)} className={inputCls} />
                            <button type="button" onClick={() => removeFromArray("whyChooseUs", "points", idx)} className={removeBtnCls}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addToArray("whyChooseUs", "points", { title: "", description: "" })} className={addBtnCls}>+ Add Point</button>
                </div>

                {/* Bottom Save */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button type="button" onClick={() => router.push("/admin/surgery")} className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
                    <button type="submit" disabled={submitting} className="px-8 py-2 text-sm font-bold text-white bg-[#e30a17] hover:bg-red-700 rounded-md disabled:opacity-50">{submitting ? "Saving..." : "Save Changes"}</button>
                </div>

            </form>
        </section>
    );
}

export default function EditSurgeryPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-12"><p className="text-lg font-semibold text-gray-600">Loading...</p></div>}>
            <EditSurgeryContent />
        </Suspense>
    );
}
