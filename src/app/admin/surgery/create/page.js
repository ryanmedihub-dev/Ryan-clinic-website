"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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

export default function CreateSurgeryPage() {
    const toast = useToast();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);

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
            const res = await fetch("/api/surgery/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Created", "Surgery page created successfully.");
                setTimeout(() => router.push("/admin/surgery"), 1200);
            } else {
                toast.error("Creation Failed", data.message || "Failed to create page");
            }
        } catch (err) {
            toast.error("Error", err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls = "w-full mt-2 p-2 border rounded-md";
    const labelCls = "block text-sm font-semibold text-gray-700";
    const sectionHeadingCls = "text-2xl font-bold underline mt-10 mb-5";
    const rowCls = "flex gap-6 flex-col md:flex-row";
    const addBtnCls = "mt-2 px-4 py-1.5 bg-[#e30a17] text-white text-sm font-semibold rounded-md hover:bg-red-700";
    const removeBtnCls = "ml-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded hover:bg-red-200";

    return (
        <section className="pb-24" suppressHydrationWarning>
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
            <AdminHeader title="/ Create New Surgery Page" />

            <form onSubmit={handleSubmit} className="space-y-6 px-6 w-full" suppressHydrationWarning>

                {/* Sticky Action Bar */}
                <div className="sticky top-4 z-40 flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-gray-700">Create Surgery CMS Page</p>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => router.push("/admin/surgery")} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
                        <button type="submit" disabled={submitting} className="px-6 py-2 text-sm font-bold text-white bg-[#e30a17] hover:bg-red-700 rounded-md disabled:opacity-50">{submitting ? "Saving..." : "Create Page"}</button>
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
                        <label className={labelCls}>Slug (URL) — public URL path</label>
                        <input type="text" value={formData.slug} onChange={(e) => handleTopLevelChange("slug", e.target.value.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"))} className={inputCls + " font-mono"} placeholder="e.g. hair-transplant-surgery-in-delhi" />
                        {formData.slug && <p className="text-xs text-gray-400 mt-1">URL preview: <span className="text-blue-600 font-mono">/surgery/{formData.slug}</span></p>}
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Landing Card Image (Shown on Surgery Listing / Landing Page Cards)</label>
                    <ImageUploader value={formData.landingCardImage?.image || ""} onChange={(url) => handleTopLevelChange("landingCardImage", { ...(formData.landingCardImage || {}), image: url })} />
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
                    <label className={labelCls}>Honest Points (one per line)</label>
                    <textarea rows={4} value={(formData.introduction.honestPoints || []).join("\n")} onChange={(e) => handleNestedChange("introduction", "honestPoints", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
                </div>

                {/* 5. SAFETY INFO */}
                <h3 className={sectionHeadingCls}>5. Safety Info (Is Hair Transplant Surgery Safe?)</h3>
                <div className={rowCls}>
                    <div className="w-full">
                        <label className={labelCls}>Heading</label>
                        <input type="text" value={formData.safetyInfo.heading} onChange={(e) => handleNestedChange("safetyInfo", "heading", e.target.value)} className={inputCls} />
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
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.bestSurgeryChecklist.heading} onChange={(e) => handleNestedChange("bestSurgeryChecklist", "heading", e.target.value)} className={inputCls} />
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

                {/* 7. CANDIDATE SUITABILITY */}
                <h3 className={sectionHeadingCls}>7. Candidate Suitability &amp; Norwood Scale</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.candidateSuitability.heading} onChange={(e) => handleNestedChange("candidateSuitability", "heading", e.target.value)} className={inputCls} />
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

                {/* 8. SURGICAL TECHNIQUES */}
                <h3 className={sectionHeadingCls}>8. Surgical Techniques</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.techniques.heading} onChange={(e) => handleNestedChange("techniques", "heading", e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Description</label>
                    <textarea rows={2} value={formData.techniques.description} onChange={(e) => handleNestedChange("techniques", "description", e.target.value)} className={inputCls} />
                </div>

                {/* 9. QUALITY BENCHMARKS */}
                <h3 className={sectionHeadingCls}>9. Quality Benchmarks</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.qualityBenchmarks.heading} onChange={(e) => handleNestedChange("qualityBenchmarks", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 10. SURGICAL RISKS */}
                <h3 className={sectionHeadingCls}>10. Surgical Risks &amp; Prevention</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.surgicalRisks.heading} onChange={(e) => handleNestedChange("surgicalRisks", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 11. PRICING */}
                <h3 className={sectionHeadingCls}>11. Pricing</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.pricing.heading} onChange={(e) => handleNestedChange("pricing", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 12. SURGEONS */}
                <h3 className={sectionHeadingCls}>12. Surgeons</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.doctors.heading} onChange={(e) => handleNestedChange("doctors", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 13. PATIENT RESULTS */}
                <h3 className={sectionHeadingCls}>13. Patient Results</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.patientResults.heading} onChange={(e) => handleNestedChange("patientResults", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 14. VISIT CLINIC */}
                <h3 className={sectionHeadingCls}>14. Visit Clinic</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 15. FAQs */}
                <h3 className={sectionHeadingCls}>15. FAQs</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* 16. WHY CHOOSE US */}
                <h3 className={sectionHeadingCls}>16. Why Choose Ryan Clinic</h3>
                <div>
                    <label className={labelCls}>Heading</label>
                    <input type="text" value={formData.whyChooseUs.heading} onChange={(e) => handleNestedChange("whyChooseUs", "heading", e.target.value)} className={inputCls} />
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button type="button" onClick={() => router.push("/admin/surgery")} className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
                    <button type="submit" disabled={submitting} className="px-8 py-2 text-sm font-bold text-white bg-[#e30a17] hover:bg-red-700 rounded-md disabled:opacity-50">{submitting ? "Saving..." : "Create Page"}</button>
                </div>

            </form>
        </section>
    );
}
