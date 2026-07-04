"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { sunEditorOptions } from "@/lib/sunEditorConfig";

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
    slug: "",
    seo: { metaTitle: "", metaDescription: "", keywords: "" },
    banner: { title: "", description: "", image: "", imageAlt: "" },
    stats: [],
    introduction: { title: "", description: "" },
    procedureScience: { title: "", description: "", cards: [] },
    safety: { title: "", description: "", cards: [] },
    techniques: { title: "", description: "", techniques: [] },
    recovery: { title: "", description: "", cards: [] },
    doctors: { title: "", description: "", doctors: [] },
    faq: { title: "", subtitle: "", faqs: [] },
};

export default function CreateSurgeryPage() {
    const toast = useToast();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const handleBannerUpload = (url) => { handleNestedChange("banner", "image", url); };

    const addStat = () => { setFormData((prev) => ({ ...prev, stats: [...prev.stats, { value: "", label: "" }] })); };
    const deleteStat = (index) => {
        if (!window.confirm("Are you sure you want to delete this stat?")) return;
        setFormData((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
    };
    const handleStatChange = (index, field, value) => {
        setFormData((prev) => { const s = [...prev.stats]; s[index] = { ...s[index], [field]: value }; return { ...prev, stats: s }; });
    };

    const addProcedureCard = () => { setFormData((prev) => ({ ...prev, procedureScience: { ...prev.procedureScience, cards: [...prev.procedureScience.cards, { title: "", description: "" }] } })); };
    const deleteProcedureCard = (index) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;
        setFormData((prev) => ({ ...prev, procedureScience: { ...prev.procedureScience, cards: prev.procedureScience.cards.filter((_, i) => i !== index) } }));
    };
    const handleProcedureCardChange = (index, field, value) => {
        setFormData((prev) => { const c = [...prev.procedureScience.cards]; c[index] = { ...c[index], [field]: value }; return { ...prev, procedureScience: { ...prev.procedureScience, cards: c } }; });
    };

    const addFaq = () => { setFormData((prev) => ({ ...prev, faq: { ...prev.faq, faqs: [...prev.faq.faqs, { question: "", answer: "" }] } })); };
    const deleteFaq = (faqIndex) => {
        if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
        setFormData((prev) => ({ ...prev, faq: { ...prev.faq, faqs: (prev.faq.faqs || []).filter((_, index) => index !== faqIndex) } }));
    };
    const handleFaqChange = (index, field, value) => {
        setFormData((prev) => { const f = [...(prev.faq.faqs || [])]; f[index] = { ...f[index], [field]: value }; return { ...prev, faq: { ...prev.faq, faqs: f } }; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch("/api/surgery/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
            const data = await response.json();
            if (response.ok) { toast.success("Success", data.message); setTimeout(() => { router.push("/admin/surgery"); }, 1500); }
            else { toast.error("Error", data.message); }
        } catch (error) { console.error(error); toast.error("Error", "Something went wrong."); }
        finally { setSubmitting(false); }
    };

    const addSafetyCard = () => { setFormData((prev) => ({ ...prev, safety: { ...prev.safety, cards: [...prev.safety.cards, { title: "", description: "" }] } })); };
    const deleteSafetyCard = (index) => {
        if (!window.confirm("Are you sure you want to delete this safety card?")) return;
        setFormData((prev) => ({ ...prev, safety: { ...prev.safety, cards: prev.safety.cards.filter((_, i) => i !== index) } }));
    };
    const handleSafetyCardChange = (index, field, value) => {
        setFormData((prev) => { const c = [...prev.safety.cards]; c[index] = { ...c[index], [field]: value }; return { ...prev, safety: { ...prev.safety, cards: c } }; });
    };

    const addTechnique = () => { setFormData((prev) => ({ ...prev, techniques: { ...prev.techniques, techniques: [...prev.techniques.techniques, { title: "", badge: "", description: "" }] } })); };
    const deleteTechnique = (index) => {
        if (!window.confirm("Are you sure you want to delete this technique?")) return;
        setFormData((prev) => ({ ...prev, techniques: { ...prev.techniques, techniques: prev.techniques.techniques.filter((_, i) => i !== index) } }));
    };
    const handleTechniqueChange = (index, field, value) => {
        setFormData((prev) => { const t = [...prev.techniques.techniques]; t[index] = { ...t[index], [field]: value }; return { ...prev, techniques: { ...prev.techniques, techniques: t } }; });
    };

    const addRecoveryCard = () => { setFormData((prev) => ({ ...prev, recovery: { ...prev.recovery, cards: [...prev.recovery.cards, { timeline: "", title: "", description: "" }] } })); };
    const deleteRecoveryCard = (index) => {
        if (!window.confirm("Are you sure you want to delete this recovery card?")) return;
        setFormData((prev) => ({ ...prev, recovery: { ...prev.recovery, cards: prev.recovery.cards.filter((_, i) => i !== index) } }));
    };
    const handleRecoveryCardChange = (index, field, value) => {
        setFormData((prev) => { const c = [...prev.recovery.cards]; c[index] = { ...c[index], [field]: value }; return { ...prev, recovery: { ...prev.recovery, cards: c } }; });
    };

    const addDoctor = () => { setFormData((prev) => ({ ...prev, doctors: { ...prev.doctors, doctors: [...prev.doctors.doctors, { name: "", designation: "", image: "", imageAlt: "", qualifications: [] }] } })); };
    const deleteDoctor = (index) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;
        setFormData((prev) => ({ ...prev, doctors: { ...prev.doctors, doctors: prev.doctors.doctors.filter((_, i) => i !== index) } }));
    };
    const handleDoctorChange = (index, field, value) => {
        setFormData((prev) => { const d = [...prev.doctors.doctors]; d[index] = { ...d[index], [field]: value }; return { ...prev, doctors: { ...prev.doctors, doctors: d } }; });
    };
    const addQualification = (doctorIndex) => {
        setFormData((prev) => { const d = [...prev.doctors.doctors]; d[doctorIndex] = { ...d[doctorIndex], qualifications: [...(d[doctorIndex].qualifications || []), ""] }; return { ...prev, doctors: { ...prev.doctors, doctors: d } }; });
    };
    const deleteQualification = (doctorIndex, qualificationIndex) => {
        if (!window.confirm("Are you sure you want to delete this qualification?")) return;
        setFormData((prev) => { const d = [...prev.doctors.doctors]; d[doctorIndex] = { ...d[doctorIndex], qualifications: (d[doctorIndex].qualifications || []).filter((_, i) => i !== qualificationIndex) }; return { ...prev, doctors: { ...prev.doctors, doctors: d } }; });
    };
    const handleQualificationChange = (doctorIndex, qualificationIndex, value) => {
        setFormData((prev) => { const d = [...prev.doctors.doctors]; const q = [...(d[doctorIndex].qualifications || [])]; q[qualificationIndex] = value; d[doctorIndex] = { ...d[doctorIndex], qualifications: q }; return { ...prev, doctors: { ...prev.doctors, doctors: d } }; });
    };

    // ─── Premium UI primitives (no logic) ────────────────────────────────────

    // Shared input / textarea / label styles
    const fieldInput = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-150";
    const fieldTextarea = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-150 resize-none";
    const fieldLabel = "block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5";
    const fieldHint = "text-xs text-gray-400 mt-1.5 leading-relaxed";

    // ── Premium Section Card ──────────────────────────────────────────────────
    const SectionCard = ({ icon, color = "blue", title, description, action, children }) => {
        const colors = {
            blue:   { dot: "bg-blue-500",   ring: "ring-blue-100",  iconBg: "bg-blue-50",   iconText: "text-blue-600" },
            purple: { dot: "bg-purple-500", ring: "ring-purple-100",iconBg: "bg-purple-50", iconText: "text-purple-600" },
            green:  { dot: "bg-green-500",  ring: "ring-green-100", iconBg: "bg-green-50",  iconText: "text-green-600" },
            amber:  { dot: "bg-amber-500",  ring: "ring-amber-100", iconBg: "bg-amber-50",  iconText: "text-amber-600" },
            rose:   { dot: "bg-rose-500",   ring: "ring-rose-100",  iconBg: "bg-rose-50",   iconText: "text-rose-600" },
            teal:   { dot: "bg-teal-500",   ring: "ring-teal-100",  iconBg: "bg-teal-50",   iconText: "text-teal-600" },
            indigo: { dot: "bg-indigo-500", ring: "ring-indigo-100",iconBg: "bg-indigo-50", iconText: "text-indigo-600" },
            cyan:   { dot: "bg-cyan-500",   ring: "ring-cyan-100",  iconBg: "bg-cyan-50",   iconText: "text-cyan-600" },
            orange: { dot: "bg-orange-500", ring: "ring-orange-100",iconBg: "bg-orange-50", iconText: "text-orange-600" },
        };
        const c = colors[color] || colors.blue;
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl ${c.iconBg} ${c.iconText} flex items-center justify-center text-lg ring-1 ${c.ring} flex-shrink-0`}>
                            {icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{title}</h3>
                            {description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>}
                        </div>
                    </div>
                    {action && <div className="flex-shrink-0 ml-4">{action}</div>}
                </div>
                {/* Section Body */}
                <div className="p-6 space-y-5">{children}</div>
            </div>
        );
    };

    // ── Dynamic Item Card (for arrays) ────────────────────────────────────────
    const ItemCard = ({ label, number, badge, onDelete, children }) => (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {number}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                    {badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full border border-blue-100">{badge}</span>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onDelete}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-red-500 border border-gray-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all duration-150 group-hover:border-red-200 group-hover:text-red-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </div>
    );

    // ── Premium Empty State ───────────────────────────────────────────────────
    const EmptyState = ({ emoji, title, hint, onAdd, addLabel }) => (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-3xl mb-4">
                {emoji}
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-5">{hint}</p>
            {onAdd && (
                <PrimaryBtn onClick={onAdd} label={addLabel} />
            )}
        </div>
    );

    // ── Buttons ───────────────────────────────────────────────────────────────
    const PrimaryBtn = ({ onClick, label, type = "button" }) => (
        <button
            type={type}
            onClick={onClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200 transition-all duration-150"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {label}
        </button>
    );

    const OutlineBtn = ({ onClick, label }) => (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-400 px-4 py-2.5 rounded-xl transition-all duration-150"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {label}
        </button>
    );

    const MiniAddBtn = ({ onClick, label }) => (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {label}
        </button>
    );

    // ── Section divider with add button row ───────────────────────────────────
    const ListHeader = ({ title, count, noun, onAdd, addLabel }) => (
        <div className="flex items-center justify-between pt-1 pb-3 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-500 rounded-full">
                    {count} {noun}{count !== 1 ? "s" : ""}
                </span>
            </div>
            <OutlineBtn onClick={onAdd} label={addLabel} />
        </div>
    );

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

            {/* ── Sticky Top Bar ───────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-sm">
                <AdminHeader title="/ Create Surgery Page" />
                <button
                    form="surgery-form"
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
                >
                    {submitting ? (
                        <>
                            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Saving…
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Create Surgery Page
                        </>
                    )}
                </button>
            </div>

            {/* ── Form ────────────────────────────────────────────────────── */}
            <form id="surgery-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8 space-y-6">

                {/* ══ 1. PAGE DETAILS ═══════════════════════════════════════ */}
                <SectionCard
                    icon="📄"
                    color="blue"
                    title="Page Details"
                    description="The name and URL slug that identify this surgery page in the system."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>
                                Page Name <span className="text-red-400 normal-case font-normal">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.pageName}
                                onChange={(e) => setFormData((prev) => ({ ...prev, pageName: e.target.value }))}
                                className={fieldInput}
                                placeholder="e.g. Hair Transplant Delhi"
                                required
                            />
                            <p className={fieldHint}>Used as the display title in the admin panel.</p>
                        </div>
                        <div>
                            <label className={fieldLabel}>
                                URL Slug <span className="text-red-400 normal-case font-normal">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono select-none">/</span>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            slug: e.target.value.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
                                        }))
                                    }
                                    className={`${fieldInput} pl-6`}
                                    placeholder="hair-transplant-delhi"
                                    required
                                />
                            </div>
                            <p className={fieldHint}>Auto-formatted · lowercase, hyphens only.</p>
                        </div>
                    </div>
                </SectionCard>

                {/* ══ 2. SEO & META ═════════════════════════════════════════ */}
                <SectionCard
                    icon="🔍"
                    color="purple"
                    title="SEO & Meta Settings"
                    description="Control how this page appears in Google and other search engines."
                >
                    <div>
                        <label className={fieldLabel}>
                            Meta Title <span className="text-red-400 normal-case font-normal">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.seo.metaTitle}
                            onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)}
                            className={fieldInput}
                            placeholder="Best Hair Transplant in Delhi | Ryan Clinic"
                            required
                        />
                    </div>
                    <div>
                        <label className={fieldLabel}>
                            Meta Description <span className="text-red-400 normal-case font-normal">*</span>
                        </label>
                        <textarea
                            rows={3}
                            value={formData.seo.metaDescription}
                            onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)}
                            className={fieldTextarea}
                            placeholder="Write a compelling description that appears in search results (150–160 characters recommended)."
                            required
                        />
                        <p className={fieldHint}>Aim for 150–160 characters for best search display.</p>
                    </div>
                    <div>
                        <label className={fieldLabel}>Keywords</label>
                        <input
                            type="text"
                            value={formData.seo.keywords}
                            onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
                            className={fieldInput}
                            placeholder="hair transplant, FUE, FUT, hair loss treatment"
                        />
                        <p className={fieldHint}>Comma-separated keywords relevant to this page.</p>
                    </div>
                </SectionCard>

                {/* ══ 3. BANNER ═════════════════════════════════════════════ */}
                <SectionCard
                    icon="🖼️"
                    color="amber"
                    title="Banner Section"
                    description="The hero banner displayed at the very top of this surgery page."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>Banner Title</label>
                            <input
                                type="text"
                                value={formData.banner.title}
                                onChange={(e) => handleNestedChange("banner", "title", e.target.value)}
                                className={fieldInput}
                                placeholder="Advanced Hair Restoration"
                            />
                        </div>
                        <div>
                            <label className={fieldLabel}>Image Alt Text</label>
                            <input
                                type="text"
                                value={formData.banner.imageAlt}
                                onChange={(e) => handleNestedChange("banner", "imageAlt", e.target.value)}
                                className={fieldInput}
                                placeholder="Patient after hair transplant surgery"
                            />
                        </div>
                    </div>
                    <div>
                        <label className={fieldLabel}>Banner Description</label>
                        <textarea
                            rows={3}
                            value={formData.banner.description}
                            onChange={(e) => handleNestedChange("banner", "description", e.target.value)}
                            className={fieldTextarea}
                            placeholder="Write a short, impactful tagline shown below the banner title."
                        />
                    </div>
                    {/* Premium image upload card */}
                    <div>
                        <label className={fieldLabel}>Banner Image</label>
                        <div className="mt-1.5 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl p-4 bg-gray-50 hover:bg-blue-50/30 transition-all duration-200">
                            <ImageUploader initialImage={formData.banner.image} onUpload={handleBannerUpload} />
                        </div>
                        <p className={fieldHint}>Recommended: 1920×600px, JPG or WebP, under 2MB.</p>
                    </div>
                </SectionCard>

                {/* ══ 4. STATS ══════════════════════════════════════════════ */}
                <SectionCard
                    icon="📊"
                    color="teal"
                    title="Stats Section"
                    description="Key numbers and achievements shown as highlight widgets on the page."
                    action={<OutlineBtn onClick={addStat} label="Add Stat" />}
                >
                    {(!formData.stats || formData.stats.length === 0) ? (
                        <EmptyState
                            emoji="📈"
                            title="No Stats Added Yet"
                            hint="Stats appear as bold highlight numbers on the page — e.g. 98% Success Rate, 10,000+ patients."
                            onAdd={addStat}
                            addLabel="Add First Stat"
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {formData.stats.map((stat, index) => (
                                <div key={index} className="relative border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 group">
                                    {/* Delete button top-right */}
                                    <button
                                        type="button"
                                        onClick={() => deleteStat(index)}
                                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-500 transition-all duration-150 opacity-0 group-hover:opacity-100"
                                        title="Delete stat"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    {/* Stat number badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-600 text-xs font-bold flex items-center justify-center">{index + 1}</span>
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Stat</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className={fieldLabel}>Value</label>
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => handleStatChange(index, "value", e.target.value)}
                                            className={fieldInput}
                                            placeholder="98%"
                                        />
                                    </div>
                                    <div>
                                        <label className={fieldLabel}>Label</label>
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => handleStatChange(index, "label", e.target.value)}
                                            className={fieldInput}
                                            placeholder="Success Rate"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Ghost add tile */}
                            <button
                                type="button"
                                onClick={addStat}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-200 min-h-[120px]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-xs font-semibold">Add Stat</span>
                            </button>
                        </div>
                    )}
                </SectionCard>

                {/* ══ 5. INTRODUCTION ═══════════════════════════════════════ */}
                <SectionCard
                    icon="📝"
                    color="indigo"
                    title="Introduction Section"
                    description="The opening content block that introduces the surgery to the visitor."
                >
                    <div>
                        <label className={fieldLabel}>Introduction Title</label>
                        <input
                            type="text"
                            value={formData.introduction.title}
                            onChange={(e) => handleNestedChange("introduction", "title", e.target.value)}
                            className={fieldInput}
                            placeholder="What is Hair Transplant Surgery?"
                        />
                    </div>
                    <div>
                        <label className={fieldLabel}>Introduction Body</label>
                        <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <SunEditor
                                setContents={formData.introduction.description}
                                onChange={(content) => handleNestedChange("introduction", "description", content)}
                                setOptions={sunEditorOptions}
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ══ 6. PROCEDURE SCIENCE ══════════════════════════════════ */}
                <SectionCard
                    icon="🔬"
                    color="cyan"
                    title="Procedure Science Section"
                    description="Scientific details about the procedure, paired with expandable feature cards."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>Section Title</label>
                            <input
                                type="text"
                                value={formData.procedureScience.title}
                                onChange={(e) => handleNestedChange("procedureScience", "title", e.target.value)}
                                className={fieldInput}
                                placeholder="The Science Behind the Procedure"
                            />
                        </div>
                    </div>
                    <div>
                        <label className={fieldLabel}>Section Description</label>
                        <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <SunEditor
                                setContents={formData.procedureScience.description}
                                onChange={(content) => handleNestedChange("procedureScience", "description", content)}
                                setOptions={sunEditorOptions}
                            />
                        </div>
                    </div>
                    {/* Procedure Cards */}
                    <div className="pt-2">
                        <ListHeader
                            title="Procedure Cards"
                            count={formData.procedureScience.cards.length}
                            noun="card"
                            onAdd={addProcedureCard}
                            addLabel="Add Procedure Card"
                        />
                        {(!formData.procedureScience.cards || formData.procedureScience.cards.length === 0) ? (
                            <EmptyState
                                emoji="🗂️"
                                title="No Procedure Cards Yet"
                                hint="Each card highlights a key aspect of the procedure — e.g. technique, equipment, or step-by-step breakdown."
                                onAdd={addProcedureCard}
                                addLabel="Add First Card"
                            />
                        ) : (
                            <div className="space-y-3">
                                {formData.procedureScience.cards.map((card, index) => (
                                    <ItemCard key={index} label="Procedure Card" number={index + 1} onDelete={() => deleteProcedureCard(index)}>
                                        <div>
                                            <label className={fieldLabel}>Card Title</label>
                                            <input type="text" value={card.title} onChange={(e) => handleProcedureCardChange(index, "title", e.target.value)} className={fieldInput} placeholder="e.g. Follicle Extraction Phase" />
                                        </div>
                                        <div>
                                            <label className={fieldLabel}>Card Description</label>
                                            <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <SunEditor setContents={card.description} onChange={(content) => handleProcedureCardChange(index, "description", content)} setOptions={sunEditorOptions} />
                                            </div>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionCard>

                {/* ══ 7. SAFETY ═════════════════════════════════════════════ */}
                <SectionCard
                    icon="🛡️"
                    color="green"
                    title="Safety Section"
                    description="Reassure patients with safety protocols, standards, and quality assurances."
                >
                    <div>
                        <label className={fieldLabel}>Section Title</label>
                        <input
                            type="text"
                            value={formData.safety.title}
                            onChange={(e) => handleNestedChange("safety", "title", e.target.value)}
                            className={fieldInput}
                            placeholder="Your Safety is Our Priority"
                        />
                    </div>
                    <div>
                        <label className={fieldLabel}>Section Description</label>
                        <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <SunEditor
                                setContents={formData.safety.description}
                                onChange={(content) => handleNestedChange("safety", "description", content)}
                                setOptions={sunEditorOptions}
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <ListHeader
                            title="Safety Cards"
                            count={formData.safety.cards.length}
                            noun="card"
                            onAdd={addSafetyCard}
                            addLabel="Add Safety Card"
                        />
                        {(!formData.safety.cards || formData.safety.cards.length === 0) ? (
                            <EmptyState
                                emoji="✅"
                                title="No Safety Cards Yet"
                                hint="Add cards for sterilization, certifications, anesthesia safety, and post-care protocols."
                                onAdd={addSafetyCard}
                                addLabel="Add First Safety Card"
                            />
                        ) : (
                            <div className="space-y-3">
                                {formData.safety.cards.map((card, index) => (
                                    <ItemCard key={index} label="Safety Card" number={index + 1} onDelete={() => deleteSafetyCard(index)}>
                                        <div>
                                            <label className={fieldLabel}>Card Title</label>
                                            <input type="text" value={card.title} onChange={(e) => handleSafetyCardChange(index, "title", e.target.value)} className={fieldInput} placeholder="e.g. Sterile OT Environment" />
                                        </div>
                                        <div>
                                            <label className={fieldLabel}>Card Description</label>
                                            <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <SunEditor setContents={card.description} onChange={(content) => handleSafetyCardChange(index, "description", content)} setOptions={sunEditorOptions} />
                                            </div>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionCard>

                {/* ══ 8. TECHNIQUES ═════════════════════════════════════════ */}
                <SectionCard
                    icon="⚙️"
                    color="orange"
                    title="Techniques Section"
                    description="Showcase the surgical techniques and methodologies used in this procedure."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>Section Title</label>
                            <input
                                type="text"
                                value={formData.techniques.title}
                                onChange={(e) => handleNestedChange("techniques", "title", e.target.value)}
                                className={fieldInput}
                                placeholder="Our Advanced Techniques"
                            />
                        </div>
                        <div>
                            <label className={fieldLabel}>Section Description</label>
                            <textarea
                                rows={3}
                                value={formData.techniques.description}
                                onChange={(e) => handleNestedChange("techniques", "description", e.target.value)}
                                className={fieldTextarea}
                                placeholder="Brief overview of the techniques we offer and why they stand out."
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <ListHeader
                            title="Technique Items"
                            count={formData.techniques.techniques.length}
                            noun="technique"
                            onAdd={addTechnique}
                            addLabel="Add Technique"
                        />
                        {(!formData.techniques.techniques || formData.techniques.techniques.length === 0) ? (
                            <EmptyState
                                emoji="🧬"
                                title="No Techniques Added Yet"
                                hint="Add techniques like FUE, FUT, DHI, or Sapphire FUE with descriptions and a badge label."
                                onAdd={addTechnique}
                                addLabel="Add First Technique"
                            />
                        ) : (
                            <div className="space-y-3">
                                {formData.techniques.techniques.map((tech, index) => (
                                    <ItemCard key={index} label={tech.title || `Technique ${index + 1}`} number={index + 1} badge={tech.badge || null} onDelete={() => deleteTechnique(index)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={fieldLabel}>Technique Title</label>
                                                <input type="text" value={tech.title} onChange={(e) => handleTechniqueChange(index, "title", e.target.value)} className={fieldInput} placeholder="e.g. FUE Technique" />
                                            </div>
                                            <div>
                                                <label className={fieldLabel}>Badge / Tag</label>
                                                <input type="text" value={tech.badge} onChange={(e) => handleTechniqueChange(index, "badge", e.target.value)} className={fieldInput} placeholder="e.g. Most Popular, Advanced" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={fieldLabel}>Technique Description</label>
                                            <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <SunEditor setContents={tech.description} onChange={(content) => handleTechniqueChange(index, "description", content)} setOptions={sunEditorOptions} />
                                            </div>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionCard>

                {/* ══ 9. RECOVERY ═══════════════════════════════════════════ */}
                <SectionCard
                    icon="🩹"
                    color="rose"
                    title="Recovery Section"
                    description="Guide patients through their post-surgery recovery with a clear timeline."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>Section Title</label>
                            <input
                                type="text"
                                value={formData.recovery.title}
                                onChange={(e) => handleNestedChange("recovery", "title", e.target.value)}
                                className={fieldInput}
                                placeholder="Your Recovery Journey"
                            />
                        </div>
                        <div>
                            <label className={fieldLabel}>Section Description</label>
                            <textarea
                                rows={3}
                                value={formData.recovery.description}
                                onChange={(e) => handleNestedChange("recovery", "description", e.target.value)}
                                className={fieldTextarea}
                                placeholder="Brief overview of what patients can expect during recovery."
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <ListHeader
                            title="Recovery Timeline Cards"
                            count={formData.recovery.cards.length}
                            noun="card"
                            onAdd={addRecoveryCard}
                            addLabel="Add Recovery Card"
                        />
                        {(!formData.recovery.cards || formData.recovery.cards.length === 0) ? (
                            <EmptyState
                                emoji="🗓️"
                                title="No Recovery Cards Yet"
                                hint="Add timeline milestones like Day 1, Week 1, Month 3, Month 6 to guide patients through recovery."
                                onAdd={addRecoveryCard}
                                addLabel="Add First Recovery Card"
                            />
                        ) : (
                            <div className="space-y-3">
                                {formData.recovery.cards.map((card, index) => (
                                    <ItemCard key={index} label={card.timeline || `Recovery Card ${index + 1}`} number={index + 1} badge={card.timeline || null} onDelete={() => deleteRecoveryCard(index)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={fieldLabel}>Timeline Label</label>
                                                <input type="text" value={card.timeline} onChange={(e) => handleRecoveryCardChange(index, "timeline", e.target.value)} className={fieldInput} placeholder="e.g. Day 1, Week 2, Month 6" />
                                            </div>
                                            <div>
                                                <label className={fieldLabel}>Card Title</label>
                                                <input type="text" value={card.title} onChange={(e) => handleRecoveryCardChange(index, "title", e.target.value)} className={fieldInput} placeholder="e.g. Initial Healing Phase" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={fieldLabel}>What to Expect</label>
                                            <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <SunEditor setContents={card.description} onChange={(content) => handleRecoveryCardChange(index, "description", content)} setOptions={sunEditorOptions} />
                                            </div>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionCard>

                {/* ══ 10. DOCTORS ═══════════════════════════════════════════ */}
                <SectionCard
                    icon="👨‍⚕️"
                    color="indigo"
                    title="Doctors Section"
                    description="Introduce the medical team performing this surgery to build patient trust."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={fieldLabel}>Section Title</label>
                            <input
                                type="text"
                                value={formData.doctors.title}
                                onChange={(e) => handleNestedChange("doctors", "title", e.target.value)}
                                className={fieldInput}
                                placeholder="Meet Our Expert Surgeons"
                            />
                        </div>
                        <div>
                            <label className={fieldLabel}>Section Description</label>
                            <textarea
                                rows={3}
                                value={formData.doctors.description}
                                onChange={(e) => handleNestedChange("doctors", "description", e.target.value)}
                                className={fieldTextarea}
                                placeholder="A brief introduction to your surgical team."
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <ListHeader
                            title="Doctor Profiles"
                            count={formData.doctors.doctors.length}
                            noun="doctor"
                            onAdd={addDoctor}
                            addLabel="Add Doctor"
                        />
                        {(!formData.doctors.doctors || formData.doctors.doctors.length === 0) ? (
                            <EmptyState
                                emoji="🩺"
                                title="No Doctor Profiles Added"
                                hint="Add surgeon profiles with their photo, name, designation, and qualifications to build credibility."
                                onAdd={addDoctor}
                                addLabel="Add First Doctor"
                            />
                        ) : (
                            <div className="space-y-4">
                                {formData.doctors.doctors.map((doctor, index) => (
                                    <ItemCard key={index} label={doctor.name || `Doctor ${index + 1}`} number={index + 1} badge={doctor.designation ? "Active" : null} onDelete={() => deleteDoctor(index)}>
                                        {/* Doctor profile layout */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            {/* Photo */}
                                            <div className="md:col-span-1">
                                                <label className={fieldLabel}>Profile Photo</label>
                                                <div className="mt-1.5 border-2 border-dashed border-gray-200 hover:border-indigo-400 rounded-xl p-3 bg-gray-50 hover:bg-indigo-50/30 transition-all duration-200">
                                                    <ImageUploader initialImage={doctor.image} onUpload={(url) => handleDoctorChange(index, "image", url)} />
                                                </div>
                                            </div>
                                            {/* Info */}
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <label className={fieldLabel}>Full Name</label>
                                                    <input type="text" value={doctor.name} onChange={(e) => handleDoctorChange(index, "name", e.target.value)} className={fieldInput} placeholder="Dr. Rajesh Kumar" />
                                                </div>
                                                <div>
                                                    <label className={fieldLabel}>Designation</label>
                                                    <input type="text" value={doctor.designation} onChange={(e) => handleDoctorChange(index, "designation", e.target.value)} className={fieldInput} placeholder="Senior Hair Transplant Surgeon" />
                                                </div>
                                                <div>
                                                    <label className={fieldLabel}>Image Alt Text</label>
                                                    <input type="text" value={doctor.imageAlt} onChange={(e) => handleDoctorChange(index, "imageAlt", e.target.value)} className={fieldInput} placeholder="Dr. Rajesh Kumar – Hair Surgeon" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Qualifications sub-section */}
                                        <div className="border border-gray-100 rounded-xl bg-gray-50 p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Qualifications</span>
                                                    <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full font-bold">
                                                        {(doctor.qualifications || []).length}
                                                    </span>
                                                </div>
                                                <MiniAddBtn onClick={() => addQualification(index)} label="Add Qualification" />
                                            </div>
                                            {(!doctor.qualifications || doctor.qualifications.length === 0) ? (
                                                <p className="text-xs text-gray-400 italic text-center py-3">No qualifications added — click &quot;Add Qualification&quot; above.</p>
                                            ) : (
                                                <div className="space-y-2">
                                                    {doctor.qualifications.map((qual, qualIndex) => (
                                                        <div key={qualIndex} className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                                                {qualIndex + 1}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={qual}
                                                                onChange={(e) => handleQualificationChange(index, qualIndex, e.target.value)}
                                                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-150 shadow-sm"
                                                                placeholder="e.g. MBBS, MD – AIIMS Delhi"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteQualification(index, qualIndex)}
                                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all duration-150 flex-shrink-0"
                                                                title="Remove"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </SectionCard>

                {/* ══ 11. FAQ ═══════════════════════════════════════════════ */}
                <SectionCard
                    icon="❓"
                    color="purple"
                    title="FAQ Section"
                    description="Answer common patient questions to reduce hesitation and build confidence."
                    action={<OutlineBtn onClick={addFaq} label="Add FAQ" />}
                >
                    {(!formData.faq.faqs || formData.faq.faqs.length === 0) ? (
                        <EmptyState
                            emoji="💬"
                            title="No FAQs Added Yet"
                            hint="Add frequently asked questions to address common patient concerns and improve SEO."
                            onAdd={addFaq}
                            addLabel="Add First FAQ"
                        />
                    ) : (
                        <div className="space-y-3">
                            {formData.faq.faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200 group">
                                    {/* FAQ Header bar */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center">Q{index + 1}</span>
                                            <span className="text-sm font-semibold text-gray-700 truncate max-w-xs">
                                                {faq.question || <span className="italic text-gray-400">Untitled question</span>}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => deleteFaq(index)}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-red-500 border border-gray-200 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all duration-150"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <label className={fieldLabel}>
                                                Question <span className="text-red-400 normal-case font-normal">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={faq.question}
                                                onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                                className={fieldInput}
                                                placeholder="e.g. Is hair transplant surgery painful?"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className={fieldLabel}>Answer</label>
                                            <div className="mt-1.5 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                                <SunEditor
                                                    setContents={faq.answer}
                                                    onChange={(content) => handleFaqChange(index, "answer", content)}
                                                    setOptions={sunEditorOptions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Add more FAQ inline */}
                            <button
                                type="button"
                                onClick={addFaq}
                                className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-gray-200 rounded-xl text-sm font-semibold text-gray-400 hover:text-purple-600 hover:border-purple-400 hover:bg-purple-50/30 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Another FAQ
                            </button>
                        </div>
                    )}
                </SectionCard>

                {/* ══ SUBMIT FOOTER ══════════════════════════════════════════ */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h3 className="text-base font-bold text-white">Publish Surgery Page</h3>
                            <p className="text-xs text-blue-100 mt-0.5">Review all sections above, then click publish.</p>
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2.5 bg-white hover:bg-blue-50 disabled:bg-white/60 disabled:cursor-not-allowed text-blue-700 font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all duration-200"
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Saving…
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Create Surgery Page
                                </>
                            )}
                        </button>
                    </div>
                    <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-xs text-amber-700">This action will immediately publish the page. Make sure all required fields are filled.</p>
                    </div>
                </div>

            </form>
        </div>
    );
}
