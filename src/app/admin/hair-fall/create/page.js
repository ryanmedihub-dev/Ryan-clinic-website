"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import {
    Settings2,
    Search,
    Image as ImageIcon,
    GalleryHorizontalEnd,
    Dna,
    AlertTriangle,
    Stethoscope,
    Pill,
    Users,
    Table2,
    TrendingUp,
    UserCheck,
    ShieldCheck,
    DollarSign,
    Scale,
    MapPin,
    PhoneCall,
    HelpCircle,
    ChevronDown,
    Plus,
    Trash2,
    Save,
} from "lucide-react";

// ─── SHARED STYLE CONSTANTS ─────────────────────────────────────────────────

const inputCls = "w-full mt-1.5 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors";
const textareaCls = `${inputCls} resize-y`;
const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide";

// ─── SHARED SUB-COMPONENTS — module level so React never remounts them on re-renders ──

function Section({ icon: Icon, title, subtitle, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50/80 transition-colors"
            >
                <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
                        {subtitle && <p className="text-xs text-gray-400 mt-0.5 truncate">{subtitle}</p>}
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <div className="px-5 pb-6 pt-2 space-y-4 border-t border-gray-100">{children}</div>}
        </div>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <label className={labelCls}>{label}</label>
            {children}
        </div>
    );
}

function AddButton({ onClick, label }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
        >
            <Plus className="w-3.5 h-3.5" /> {label}
        </button>
    );
}

function DeleteIconButton({ onClick, title = "Delete" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
        >
            <Trash2 className="w-3.5 h-3.5" />
        </button>
    );
}

function EmptyState({ text }) {
    return (
        <div className="border-2 border-dashed border-gray-200 rounded-xl py-7 text-center">
            <p className="text-sm text-gray-400">{text}</p>
        </div>
    );
}

function ItemCard({ title, onDelete, children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">{title}</h5>
                <DeleteIconButton onClick={onDelete} />
            </div>
            {children}
        </div>
    );
}

function CTABlock({ label, value, onChange }) {
    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-3">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Button Text">
                    <input type="text" value={value?.text || ""} onChange={(e) => onChange("text", e.target.value)} className={inputCls} placeholder="e.g. Book Consultation" />
                </Field>
                <Field label="Button Link">
                    <input type="text" value={value?.link || ""} onChange={(e) => onChange("link", e.target.value)} className={inputCls} placeholder="e.g. /book-now" />
                </Field>
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" checked={!!value?.external} onChange={(e) => onChange("external", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                Open in new tab (External URL)
            </label>
        </div>
    );
}

function ImageBlock({ label, value, onChange }) {
    return (
        <div>
            <label className={`${labelCls} mb-1.5 block`}>{label}</label>
            <ImageUploader initialImage={value?.image} onUpload={(url) => onChange({ ...value, image: url })} />
            <input type="text" value={value?.imageAlt || ""} onChange={(e) => onChange({ ...value, imageAlt: e.target.value })} className={`${inputCls} mt-2`} placeholder="Alt text (for accessibility & SEO)" />
        </div>
    );
}

function StringListEditor({ label, items, onAdd, onUpdate, onDelete, placeholder }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className={labelCls}>{label}</label>
                <AddButton onClick={onAdd} label="Add" />
            </div>
            {(items || []).length === 0 ? (
                <EmptyState text="None added yet." />
            ) : (
                <div className="space-y-2">
                    {items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => onUpdate(i, e.target.value)} className={`${inputCls} mt-0`} placeholder={placeholder} />
                            <DeleteIconButton onClick={() => onDelete(i)} />
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

export const initialHairFallState = {
    city: "",
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
        quickFacts: [],
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
        heroStats: [],
    },
    causes: {
        heading: "",
        description: "",
        featuredCauses: [],
        otherCausesHeading: "",
        otherCauses: [],
    },
    warning: {
        heading: "",
        description: "",
        warningSigns: [],
        calloutImage: { image: "", imageAlt: "" },
        calloutBadge: "",
        calloutTitle: "",
        calloutDescription: "",
        calloutCTA: { text: "", link: "", external: false },
    },
    diagnosis: {
        heading: "",
        description: "",
        sideImage: { image: "", imageAlt: "" },
        steps: [],
    },
    treatments: {
        heading: "",
        description: "",
        treatments: [],
    },
    gender: {
        heading: "",
        menCard: { title: "", description: "", cardImage: { image: "", imageAlt: "" }, ctaText: { text: "", link: "", external: false } },
        womenCard: { title: "", description: "", cardImage: { image: "", imageAlt: "" }, ctaText: { text: "", link: "", external: false } },
    },
    treatmentMap: {
        heading: "",
        description: "",
        rows: [],
    },
    results: {
        heading: "",
        resultImage: { image: "", imageAlt: "" },
        facts: [],
        warningTitle: "",
        warningText: "",
    },
    doctor: {
        heading: "",
        description: "",
        criteria: [],
        teamImage: { image: "", imageAlt: "" },
        imageCaption: "",
        imageSubcaption: "",
    },
    whyChoose: {
        heading: "",
        backgroundImage: { image: "", imageAlt: "" },
        points: [],
        honestNote: "",
    },
    cost: {
        heading: "",
        description: "",
        items: [],
    },
    myths: {
        heading: "",
        myths: [],
    },
    visitClinic: {
        heading: "",
        description: "",
        bannerImage: { image: "", imageAlt: "" },
        bannerTitle: "",
        bannerAddress: "",
        infoCards: [],
        mapEmbedUrl: "",
    },
    consultation: {
        heading: "",
        description: "",
        backgroundImage: { image: "", imageAlt: "" },
        contactCards: [],
        statsRow: [],
    },
    faq: {
        heading: "",
        description: "",
        stats: [],
        faqs: [],
    },
};

export default function CreateHairFallPage() {
    const toast = useToast();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialHairFallState);

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

    // Array-of-object helpers (section-level array)
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

    // Plain string array helpers (section-level array of strings)
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

    // Nested string array inside an array-of-object item (e.g. treatments[i].bulletPoints)
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
            const res = await fetch("/api/hair-fall/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Success", data.message || "Hair fall treatment page created successfully.");
                setTimeout(() => router.push("/admin/hair-fall"), 1500);
            } else {
                toast.error("Error", data.message || "Failed to create page.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network Error", "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="pb-16">
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
            <AdminHeader title="/ Create Hair Fall Treatment Page" />

            {/* Sticky action bar */}
            <div className="sticky top-0 z-20 -mx-6 px-6 py-3 mb-6 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-900">{formData.city ? `New page — ${formData.city}` : "New hair fall treatment page"}</p>
                    <p className="text-xs text-gray-400">Fill in the sections below, then save.</p>
                </div>
                <button
                    type="submit"
                    form="hair-fall-create-form"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                    <Save className="w-4 h-4" />
                    {submitting ? "Saving..." : "Save Page"}
                </button>
            </div>

            <form id="hair-fall-create-form" onSubmit={handleSubmit} className="space-y-5 px-6 mx-auto max-w-5xl">

                {/* ─── GENERAL INFO ────────────────────────────────── */}
                <Section icon={Settings2} title="General Info" subtitle="City & publish status" defaultOpen>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="City *">
                            <input type="text" value={formData.city} onChange={(e) => handleTopLevelChange("city", e.target.value)} className={inputCls} placeholder="e.g. Delhi" required />
                        </Field>
                        <Field label="Status">
                            <select value={formData.status} onChange={(e) => handleTopLevelChange("status", e.target.value)} className={inputCls}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </Field>
                    </div>
                </Section>

                {/* ─── SEO ─────────────────────────────────────────── */}
                <Section icon={Search} title="Meta Details" subtitle="SEO title, description & sharing">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Meta Title *">
                            <input type="text" value={formData.seo.metaTitle} onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)} className={inputCls} placeholder="Best Hair Fall & Hair Loss Treatment in Delhi | Ryan Clinic" required />
                        </Field>
                        <Field label="Meta Description *">
                            <textarea rows={3} value={formData.seo.metaDescription} onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)} className={textareaCls} placeholder="Enter meta description" required />
                        </Field>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="Keywords">
                            <input type="text" value={formData.seo.keywords} onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)} className={inputCls} placeholder="hair fall treatment in delhi, ..." />
                        </Field>
                        <Field label="Canonical URL">
                            <input type="text" value={formData.seo.canonicalUrl} onChange={(e) => handleNestedChange("seo", "canonicalUrl", e.target.value)} className={inputCls} placeholder="https://www.clinicryan.com/..." />
                        </Field>
                        <Field label="Robots">
                            <input type="text" value={formData.seo.robots} onChange={(e) => handleNestedChange("seo", "robots", e.target.value)} className={inputCls} placeholder="index,follow" />
                        </Field>
                    </div>
                    <ImageBlock label="OG Share Image" value={formData.seo.openGraphImage} onChange={(v) => handleNestedChange("seo", "openGraphImage", v)} />
                </Section>

                {/* ─── HERO ────────────────────────────────────────── */}
                <Section icon={ImageIcon} title="Hero / Banner Section" subtitle="Top banner content & stats">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Breadcrumb">
                            <input type="text" value={formData.hero.breadcrumb} onChange={(e) => handleNestedChange("hero", "breadcrumb", e.target.value)} className={inputCls} placeholder="Hair Fall & Hair Loss Treatment" />
                        </Field>
                        <Field label="Hero Title">
                            <input type="text" value={formData.hero.title} onChange={(e) => handleNestedChange("hero", "title", e.target.value)} className={inputCls} placeholder="Best Hair Fall & Hair Loss Treatment in Delhi" />
                        </Field>
                    </div>
                    <Field label="Hero Description">
                        <textarea rows={2} value={formData.hero.description} onChange={(e) => handleNestedChange("hero", "description", e.target.value)} className={textareaCls} placeholder="Diagnosis-First Care · Medical Therapy · PRP · Transplant When Needed" />
                    </Field>
                    <ImageBlock label="Hero Banner Image" value={formData.hero.heroImage} onChange={(v) => handleNestedChange("hero", "heroImage", v)} />

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className={labelCls}>Banner Stats</label>
                            <AddButton onClick={() => addToArray("hero", "stats", { value: "", label: "" })} label="Add Stat" />
                        </div>
                        {formData.hero.stats.length === 0 ? (
                            <EmptyState text="No banner stats added yet." />
                        ) : (
                            <div className="space-y-3">
                                {formData.hero.stats.map((stat, i) => (
                                    <ItemCard key={i} title={`Stat ${i + 1}`} onDelete={() => deleteFromArray("hero", "stats", i)}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Value"><input type="text" value={stat.value} onChange={(e) => updateArrayItem("hero", "stats", i, "value", e.target.value)} className={inputCls} placeholder="e.g. 8+" /></Field>
                                            <Field label="Label"><input type="text" value={stat.label} onChange={(e) => updateArrayItem("hero", "stats", i, "label", e.target.value)} className={inputCls} placeholder="e.g. Causes Diagnosed" /></Field>
                                        </div>
                                    </ItemCard>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CTABlock label="WhatsApp CTA" value={formData.hero.whatsappText} onChange={(field, val) => handleNestedChange("hero", "whatsappText", { ...formData.hero.whatsappText, [field]: val })} />
                        <CTABlock label="Phone Call CTA" value={formData.hero.callText} onChange={(field, val) => handleNestedChange("hero", "callText", { ...formData.hero.callText, [field]: val })} />
                    </div>
                </Section>

                {/* ─── INTRODUCTION ────────────────────────────────── */}
                <Section icon={GalleryHorizontalEnd} title="Introduction Section" subtitle="Image showcase & intro copy">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Small Heading">
                            <input type="text" value={formData.introduction.smallHeading} onChange={(e) => handleNestedChange("introduction", "smallHeading", e.target.value)} className={inputCls} placeholder="Diagnosis-First Care" />
                        </Field>
                        <Field label="Title">
                            <input type="text" value={formData.introduction.title} onChange={(e) => handleNestedChange("introduction", "title", e.target.value)} className={inputCls} placeholder="One Accurate Diagnosis. The Right Treatment." />
                        </Field>
                    </div>
                    <Field label="Description">
                        <textarea rows={3} value={formData.introduction.description} onChange={(e) => handleNestedChange("introduction", "description", e.target.value)} className={textareaCls} placeholder="Short intro paragraph" />
                    </Field>
                    <Field label="Highlight Box Text">
                        <textarea rows={2} value={formData.introduction.highlightBoxText} onChange={(e) => handleNestedChange("introduction", "highlightBoxText", e.target.value)} className={textareaCls} placeholder="Short callout text shown in a highlighted box" />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageBlock label="Main (Back) Image" value={formData.introduction.mainImage} onChange={(v) => handleNestedChange("introduction", "mainImage", v)} />
                        <ImageBlock label="Floating (Front) Image" value={formData.introduction.floatingImage} onChange={(v) => handleNestedChange("introduction", "floatingImage", v)} />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className={labelCls}>Stats</label>
                            <AddButton onClick={() => addToArray("introduction", "heroStats", { value: "", label: "" })} label="Add Stat" />
                        </div>
                        {formData.introduction.heroStats.length === 0 ? (
                            <EmptyState text="No stats added yet." />
                        ) : (
                            <div className="space-y-3">
                                {formData.introduction.heroStats.map((stat, i) => (
                                    <ItemCard key={i} title={`Stat ${i + 1}`} onDelete={() => deleteFromArray("introduction", "heroStats", i)}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Value"><input type="text" value={stat.value} onChange={(e) => updateArrayItem("introduction", "heroStats", i, "value", e.target.value)} className={inputCls} /></Field>
                                            <Field label="Label"><input type="text" value={stat.label} onChange={(e) => updateArrayItem("introduction", "heroStats", i, "label", e.target.value)} className={inputCls} /></Field>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </Section>

                {/* ─── CAUSES ──────────────────────────────────────── */}
                <Section icon={Dna} title="Causes Section" subtitle="Featured causes + quick-scan strip">
                    <Field label="Heading">
                        <input type="text" value={formData.causes.heading} onChange={(e) => handleNestedChange("causes", "heading", e.target.value)} className={inputCls} placeholder="What Causes Hair Fall?" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.causes.description} onChange={(e) => handleNestedChange("causes", "description", e.target.value)} className={textareaCls} />
                    </Field>

                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Featured Causes</label>
                        <AddButton onClick={() => addToArray("causes", "featuredCauses", { tag: "", title: "", subtitle: "", description: "", points: [], cardImage: { image: "", imageAlt: "" }, reverse: false, displayOrder: 0 })} label="Add Featured Cause" />
                    </div>
                    {formData.causes.featuredCauses.length === 0 ? (
                        <EmptyState text="No featured causes added yet." />
                    ) : (
                        <div className="space-y-4">
                            {formData.causes.featuredCauses.map((c, i) => (
                                <ItemCard key={i} title={`Featured Cause ${i + 1}`} onDelete={() => deleteFromArray("causes", "featuredCauses", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <Field label="Tag (e.g. Most Common)"><input type="text" value={c.tag} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "tag", e.target.value)} className={inputCls} /></Field>
                                        <Field label="Title"><input type="text" value={c.title} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "title", e.target.value)} className={inputCls} placeholder="Androgenetic Alopecia" /></Field>
                                        <Field label="Subtitle"><input type="text" value={c.subtitle} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "subtitle", e.target.value)} className={inputCls} placeholder="Pattern Hair Loss" /></Field>
                                    </div>
                                    <Field label="Description"><textarea rows={3} value={c.description} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "description", e.target.value)} className={textareaCls} /></Field>
                                    <ImageBlock label="Card Image" value={c.cardImage} onChange={(v) => updateArrayItem("causes", "featuredCauses", i, "cardImage", v)} />
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className={labelCls}>Bullet Points</label>
                                            <AddButton onClick={() => addNestedItem("causes", "featuredCauses", i, "points")} label="Add Point" />
                                        </div>
                                        {(c.points || []).map((pt, pi) => (
                                            <div key={pi} className="flex gap-2 mt-2">
                                                <input type="text" value={pt} onChange={(e) => updateNestedItem("causes", "featuredCauses", i, "points", pi, e.target.value)} className={`${inputCls} mt-0`} />
                                                <DeleteIconButton onClick={() => deleteNestedItem("causes", "featuredCauses", i, "points", pi)} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <label className="flex items-center gap-2 text-xs text-gray-600">
                                            <input type="checkbox" checked={!!c.reverse} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "reverse", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                                            Reverse layout (image on right)
                                        </label>
                                        <div className="w-32">
                                            <Field label="Order"><input type="number" value={c.displayOrder} onChange={(e) => updateArrayItem("causes", "featuredCauses", i, "displayOrder", parseInt(e.target.value) || 0)} className={inputCls} /></Field>
                                        </div>
                                    </div>
                                </ItemCard>
                            ))}
                        </div>
                    )}

                    <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5 space-y-4">
                        <Field label="Other Causes — Strip Heading">
                            <input type="text" value={formData.causes.otherCausesHeading} onChange={(e) => handleNestedChange("causes", "otherCausesHeading", e.target.value)} className={inputCls} placeholder="Six more causes we screen for" />
                        </Field>
                        <div className="flex justify-between items-center">
                            <label className={labelCls}>Other Causes</label>
                            <AddButton onClick={() => addToArray("causes", "otherCauses", { icon: "", title: "", description: "", displayOrder: 0 })} label="Add Cause" />
                        </div>
                        {formData.causes.otherCauses.length === 0 ? (
                            <EmptyState text="No causes added yet." />
                        ) : (
                            <div className="space-y-3">
                                {formData.causes.otherCauses.map((c, i) => (
                                    <ItemCard key={i} title={`Cause ${i + 1}`} onDelete={() => deleteFromArray("causes", "otherCauses", i)}>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <Field label="Icon (lucide name)"><input type="text" value={c.icon} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "icon", e.target.value)} className={inputCls} placeholder="Utensils" /></Field>
                                            <Field label="Title"><input type="text" value={c.title} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "title", e.target.value)} className={inputCls} /></Field>
                                            <Field label="Order"><input type="number" value={c.displayOrder} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "displayOrder", parseInt(e.target.value) || 0)} className={inputCls} /></Field>
                                        </div>
                                        <Field label="Description"><textarea rows={2} value={c.description} onChange={(e) => updateArrayItem("causes", "otherCauses", i, "description", e.target.value)} className={textareaCls} /></Field>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </Section>

                {/* ─── WARNING / WHEN TO SEE A DOCTOR ─────────────────── */}
                <Section icon={AlertTriangle} title={'"When to See a Doctor" Section'} subtitle="Warning signs + callout panel">
                    <Field label="Heading">
                        <input type="text" value={formData.warning.heading} onChange={(e) => handleNestedChange("warning", "heading", e.target.value)} className={inputCls} placeholder="When to See a Doctor for Hair Fall" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.warning.description} onChange={(e) => handleNestedChange("warning", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <StringListEditor label="Warning Signs" items={formData.warning.warningSigns} onAdd={() => addStringItem("warning", "warningSigns")} onUpdate={(i, v) => updateStringItem("warning", "warningSigns", i, v)} onDelete={(i) => deleteStringItem("warning", "warningSigns", i)} placeholder="e.g. Visible thinning or a receding hairline." />
                    <ImageBlock label="Callout Panel Image" value={formData.warning.calloutImage} onChange={(v) => handleNestedChange("warning", "calloutImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Callout Badge"><input type="text" value={formData.warning.calloutBadge} onChange={(e) => handleNestedChange("warning", "calloutBadge", e.target.value)} className={inputCls} placeholder="Timing Matters" /></Field>
                        <Field label="Callout Title"><input type="text" value={formData.warning.calloutTitle} onChange={(e) => handleNestedChange("warning", "calloutTitle", e.target.value)} className={inputCls} placeholder="Earlier Treatment Works Better" /></Field>
                    </div>
                    <Field label="Callout Description">
                        <textarea rows={2} value={formData.warning.calloutDescription} onChange={(e) => handleNestedChange("warning", "calloutDescription", e.target.value)} className={textareaCls} />
                    </Field>
                    <CTABlock label="Callout CTA" value={formData.warning.calloutCTA} onChange={(field, val) => handleNestedChange("warning", "calloutCTA", { ...formData.warning.calloutCTA, [field]: val })} />
                </Section>

                {/* ─── DIAGNOSIS ───────────────────────────────────── */}
                <Section icon={Stethoscope} title="Diagnosis Section" subtitle="Assessment steps">
                    <Field label="Heading">
                        <input type="text" value={formData.diagnosis.heading} onChange={(e) => handleNestedChange("diagnosis", "heading", e.target.value)} className={inputCls} placeholder="How Hair Loss Is Diagnosed" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.diagnosis.description} onChange={(e) => handleNestedChange("diagnosis", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <ImageBlock label="Side Image" value={formData.diagnosis.sideImage} onChange={(v) => handleNestedChange("diagnosis", "sideImage", v)} />
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Steps</label>
                        <AddButton onClick={() => addToArray("diagnosis", "steps", { icon: "", stepNumber: "", title: "", description: "", displayOrder: 0 })} label="Add Step" />
                    </div>
                    {formData.diagnosis.steps.length === 0 ? (
                        <EmptyState text="No steps added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.diagnosis.steps.map((s, i) => (
                                <ItemCard key={i} title={`Step ${i + 1}`} onDelete={() => deleteFromArray("diagnosis", "steps", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <Field label="Step No."><input type="text" value={s.stepNumber} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "stepNumber", e.target.value)} className={inputCls} placeholder="01" /></Field>
                                        <Field label="Icon (lucide name)"><input type="text" value={s.icon} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "icon", e.target.value)} className={inputCls} placeholder="ClipboardList" /></Field>
                                        <div className="md:col-span-2"><Field label="Title"><input type="text" value={s.title} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "title", e.target.value)} className={inputCls} /></Field></div>
                                    </div>
                                    <Field label="Description"><textarea rows={2} value={s.description} onChange={(e) => updateArrayItem("diagnosis", "steps", i, "description", e.target.value)} className={textareaCls} /></Field>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── TREATMENTS ──────────────────────────────────── */}
                <Section icon={Pill} title="Treatment Options Section" subtitle="Medical, PRP, transplant, etc.">
                    <Field label="Heading">
                        <input type="text" value={formData.treatments.heading} onChange={(e) => handleNestedChange("treatments", "heading", e.target.value)} className={inputCls} placeholder="Hair Fall & Hair Loss Treatment Options" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.treatments.description} onChange={(e) => handleNestedChange("treatments", "description", e.target.value)} className={textareaCls} />
                    </Field>

                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Treatments</label>
                        <AddButton onClick={() => addToArray("treatments", "treatments", { icon: "", title: "", description: "", treatmentImage: { image: "", imageAlt: "" }, bulletPoints: [], featured: false, ctaText: { text: "", link: "", external: false }, displayOrder: 0 })} label="Add Treatment" />
                    </div>
                    {formData.treatments.treatments.length === 0 ? (
                        <EmptyState text="No treatments added yet." />
                    ) : (
                        <div className="space-y-4">
                            {formData.treatments.treatments.map((t, i) => (
                                <ItemCard key={i} title={`Treatment ${i + 1}`} onDelete={() => deleteFromArray("treatments", "treatments", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field label="Icon (lucide name)"><input type="text" value={t.icon} onChange={(e) => updateArrayItem("treatments", "treatments", i, "icon", e.target.value)} className={inputCls} placeholder="Pill" /></Field>
                                        <Field label="Title"><input type="text" value={t.title} onChange={(e) => updateArrayItem("treatments", "treatments", i, "title", e.target.value)} className={inputCls} /></Field>
                                    </div>
                                    <Field label="Description"><textarea rows={3} value={t.description} onChange={(e) => updateArrayItem("treatments", "treatments", i, "description", e.target.value)} className={textareaCls} /></Field>
                                    <ImageBlock label="Treatment Image (optional — leave blank for icon-style card)" value={t.treatmentImage} onChange={(v) => updateArrayItem("treatments", "treatments", i, "treatmentImage", v)} />
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className={labelCls}>Bullet Points</label>
                                            <AddButton onClick={() => addNestedItem("treatments", "treatments", i, "bulletPoints")} label="Add Bullet" />
                                        </div>
                                        {(t.bulletPoints || []).map((b, bi) => (
                                            <div key={bi} className="flex gap-2 mt-2">
                                                <input type="text" value={b} onChange={(e) => updateNestedItem("treatments", "treatments", i, "bulletPoints", bi, e.target.value)} className={`${inputCls} mt-0`} />
                                                <DeleteIconButton onClick={() => deleteNestedItem("treatments", "treatments", i, "bulletPoints", bi)} />
                                            </div>
                                        ))}
                                    </div>
                                    <CTABlock label="Link CTA" value={t.ctaText} onChange={(field, val) => updateArrayItem("treatments", "treatments", i, "ctaText", { ...t.ctaText, [field]: val })} />
                                    <div className="flex items-center justify-between gap-4">
                                        <label className="flex items-center gap-2 text-xs text-gray-600">
                                            <input type="checkbox" checked={!!t.featured} onChange={(e) => updateArrayItem("treatments", "treatments", i, "featured", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                                            Featured (highlighted dark card)
                                        </label>
                                        <div className="w-32">
                                            <Field label="Order"><input type="number" value={t.displayOrder} onChange={(e) => updateArrayItem("treatments", "treatments", i, "displayOrder", parseInt(e.target.value) || 0)} className={inputCls} /></Field>
                                        </div>
                                    </div>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── GENDER (MEN/WOMEN) ──────────────────────────── */}
                <Section icon={Users} title="Men / Women Section" subtitle="Gender-specific treatment cards">
                    <Field label="Heading">
                        <input type="text" value={formData.gender.heading} onChange={(e) => handleNestedChange("gender", "heading", e.target.value)} className={inputCls} placeholder="The Right Plan for Men & Women" />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["menCard", "womenCard"].map((key) => (
                            <div key={key} className="rounded-xl border border-gray-200 bg-gray-50/70 p-5 space-y-3">
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wide">{key === "menCard" ? "Men's Card" : "Women's Card"}</h5>
                                <Field label="Title"><input type="text" value={formData.gender[key].title} onChange={(e) => handleDeepChange("gender", key, "title", e.target.value)} className={inputCls} /></Field>
                                <Field label="Description"><textarea rows={4} value={formData.gender[key].description} onChange={(e) => handleDeepChange("gender", key, "description", e.target.value)} className={textareaCls} /></Field>
                                <ImageBlock label="Card Image" value={formData.gender[key].cardImage} onChange={(v) => handleDeepChange("gender", key, "cardImage", v)} />
                                <CTABlock label="Card CTA (optional)" value={formData.gender[key].ctaText} onChange={(field, val) => handleDeepChange("gender", key, "ctaText", { ...formData.gender[key].ctaText, [field]: val })} />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ─── TREATMENT MAP TABLE ─────────────────────────── */}
                <Section icon={Table2} title="Cause → Treatment Table" subtitle="Quick-reference table rows">
                    <Field label="Heading">
                        <input type="text" value={formData.treatmentMap.heading} onChange={(e) => handleNestedChange("treatmentMap", "heading", e.target.value)} className={inputCls} placeholder="Which Hair Fall Treatment Is Best?" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.treatmentMap.description} onChange={(e) => handleNestedChange("treatmentMap", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Rows</label>
                        <AddButton onClick={() => addToArray("treatmentMap", "rows", { cause: "", approach: "", displayOrder: 0 })} label="Add Row" />
                    </div>
                    {formData.treatmentMap.rows.length === 0 ? (
                        <EmptyState text="No rows added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.treatmentMap.rows.map((r, i) => (
                                <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                                    <Field label="Likely Cause"><input type="text" value={r.cause} onChange={(e) => updateArrayItem("treatmentMap", "rows", i, "cause", e.target.value)} className={inputCls} /></Field>
                                    <Field label="Typical Approach"><input type="text" value={r.approach} onChange={(e) => updateArrayItem("treatmentMap", "rows", i, "approach", e.target.value)} className={inputCls} /></Field>
                                    <DeleteIconButton onClick={() => deleteFromArray("treatmentMap", "rows", i)} />
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── RESULTS & TIMELINES ─────────────────────────── */}
                <Section icon={TrendingUp} title="Results & Timelines Section" subtitle="Honest expectations + result image">
                    <Field label="Heading">
                        <input type="text" value={formData.results.heading} onChange={(e) => handleNestedChange("results", "heading", e.target.value)} className={inputCls} placeholder="Results & Timelines" />
                    </Field>
                    <ImageBlock label="Result Image" value={formData.results.resultImage} onChange={(v) => handleNestedChange("results", "resultImage", v)} />
                    <StringListEditor label="Facts" items={formData.results.facts} onAdd={() => addStringItem("results", "facts")} onUpdate={(i, v) => updateStringItem("results", "facts", i, v)} onDelete={(i) => deleteStringItem("results", "facts", i)} placeholder="e.g. Most treatments take 3–6 months to show visible change." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Warning Box Title"><input type="text" value={formData.results.warningTitle} onChange={(e) => handleNestedChange("results", "warningTitle", e.target.value)} className={inputCls} placeholder="Be wary of instant-regrowth promises" /></Field>
                        <Field label="Warning Box Text"><input type="text" value={formData.results.warningText} onChange={(e) => handleNestedChange("results", "warningText", e.target.value)} className={inputCls} /></Field>
                    </div>
                </Section>

                {/* ─── DOCTOR ──────────────────────────────────────── */}
                <Section icon={UserCheck} title="Best Doctor Section" subtitle="Selection criteria + team image">
                    <Field label="Heading">
                        <input type="text" value={formData.doctor.heading} onChange={(e) => handleNestedChange("doctor", "heading", e.target.value)} className={inputCls} placeholder="Best Doctor for Hair Fall & Hair Loss Treatment in Delhi" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.doctor.description} onChange={(e) => handleNestedChange("doctor", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <StringListEditor label="Criteria" items={formData.doctor.criteria} onAdd={() => addStringItem("doctor", "criteria")} onUpdate={(i, v) => updateStringItem("doctor", "criteria", i, v)} onDelete={(i) => deleteStringItem("doctor", "criteria", i)} placeholder="e.g. Diagnoses the cause first." />
                    <ImageBlock label="Team Image" value={formData.doctor.teamImage} onChange={(v) => handleNestedChange("doctor", "teamImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Image Caption"><input type="text" value={formData.doctor.imageCaption} onChange={(e) => handleNestedChange("doctor", "imageCaption", e.target.value)} className={inputCls} placeholder="Ryan Clinic Medical Team" /></Field>
                        <Field label="Image Subcaption"><input type="text" value={formData.doctor.imageSubcaption} onChange={(e) => handleNestedChange("doctor", "imageSubcaption", e.target.value)} className={inputCls} placeholder="Every case diagnosed before treatment is recommended" /></Field>
                    </div>
                </Section>

                {/* ─── WHY CHOOSE ──────────────────────────────────── */}
                <Section icon={ShieldCheck} title="Why Choose Us Section" subtitle="Dark banner with key points">
                    <Field label="Heading">
                        <input type="text" value={formData.whyChoose.heading} onChange={(e) => handleNestedChange("whyChoose", "heading", e.target.value)} className={inputCls} placeholder="Why Choose Ryan Clinic for Hair Loss Treatment in Delhi" />
                    </Field>
                    <ImageBlock label="Background Image" value={formData.whyChoose.backgroundImage} onChange={(v) => handleNestedChange("whyChoose", "backgroundImage", v)} />
                    <StringListEditor label="Points" items={formData.whyChoose.points} onAdd={() => addStringItem("whyChoose", "points")} onUpdate={(i, v) => updateStringItem("whyChoose", "points", i, v)} onDelete={(i) => deleteStringItem("whyChoose", "points", i)} placeholder="e.g. Diagnosis-first approach." />
                    <Field label="Honest Note">
                        <textarea rows={2} value={formData.whyChoose.honestNote} onChange={(e) => handleNestedChange("whyChoose", "honestNote", e.target.value)} className={textareaCls} />
                    </Field>
                </Section>

                {/* ─── COST ────────────────────────────────────────── */}
                <Section icon={DollarSign} title="Cost Section" subtitle="Transparent pricing cards">
                    <Field label="Heading">
                        <input type="text" value={formData.cost.heading} onChange={(e) => handleNestedChange("cost", "heading", e.target.value)} className={inputCls} placeholder="Cost of Hair Fall & Hair Loss Treatment in Delhi" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.cost.description} onChange={(e) => handleNestedChange("cost", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Cost Items</label>
                        <AddButton onClick={() => addToArray("cost", "items", { icon: "", title: "", description: "", ctaText: { text: "", link: "", external: false }, displayOrder: 0 })} label="Add Cost Item" />
                    </div>
                    {formData.cost.items.length === 0 ? (
                        <EmptyState text="No cost items added yet." />
                    ) : (
                        <div className="space-y-4">
                            {formData.cost.items.map((c, i) => (
                                <ItemCard key={i} title={`Cost Item ${i + 1}`} onDelete={() => deleteFromArray("cost", "items", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Field label="Icon (lucide name)"><input type="text" value={c.icon} onChange={(e) => updateArrayItem("cost", "items", i, "icon", e.target.value)} className={inputCls} placeholder="Pill" /></Field>
                                        <Field label="Title"><input type="text" value={c.title} onChange={(e) => updateArrayItem("cost", "items", i, "title", e.target.value)} className={inputCls} /></Field>
                                    </div>
                                    <Field label="Description"><textarea rows={2} value={c.description} onChange={(e) => updateArrayItem("cost", "items", i, "description", e.target.value)} className={textareaCls} /></Field>
                                    <CTABlock label="Link CTA (optional)" value={c.ctaText} onChange={(field, val) => updateArrayItem("cost", "items", i, "ctaText", { ...c.ctaText, [field]: val })} />
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── MYTHS ───────────────────────────────────────── */}
                <Section icon={Scale} title="Myths vs Facts Section" subtitle="Myth / fact pairs">
                    <Field label="Heading">
                        <input type="text" value={formData.myths.heading} onChange={(e) => handleNestedChange("myths", "heading", e.target.value)} className={inputCls} placeholder="Myths vs Facts About Hair Fall Treatment" />
                    </Field>
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Myth / Fact Pairs</label>
                        <AddButton onClick={() => addToArray("myths", "myths", { myth: "", fact: "", displayOrder: 0 })} label="Add Pair" />
                    </div>
                    {formData.myths.myths.length === 0 ? (
                        <EmptyState text="None added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.myths.myths.map((m, i) => (
                                <ItemCard key={i} title={`Pair ${i + 1}`} onDelete={() => deleteFromArray("myths", "myths", i)}>
                                    <Field label="Myth"><input type="text" value={m.myth} onChange={(e) => updateArrayItem("myths", "myths", i, "myth", e.target.value)} className={inputCls} /></Field>
                                    <Field label="Fact"><input type="text" value={m.fact} onChange={(e) => updateArrayItem("myths", "myths", i, "fact", e.target.value)} className={inputCls} /></Field>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── VISIT CLINIC ────────────────────────────────── */}
                <Section icon={MapPin} title="Visit Clinic Section" subtitle="Address, hours & map">
                    <Field label="Heading">
                        <input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className={inputCls} placeholder="Visiting Ryan Clinic for Hair Loss Treatment in Delhi" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.visitClinic.description} onChange={(e) => handleNestedChange("visitClinic", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <ImageBlock label="Banner Image" value={formData.visitClinic.bannerImage} onChange={(v) => handleNestedChange("visitClinic", "bannerImage", v)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Banner Title"><input type="text" value={formData.visitClinic.bannerTitle} onChange={(e) => handleNestedChange("visitClinic", "bannerTitle", e.target.value)} className={inputCls} placeholder="Ryan Clinic — Pitampura, Delhi" /></Field>
                        <Field label="Banner Address"><input type="text" value={formData.visitClinic.bannerAddress} onChange={(e) => handleNestedChange("visitClinic", "bannerAddress", e.target.value)} className={inputCls} /></Field>
                    </div>
                    <Field label="Google Maps Embed URL">
                        <input type="text" value={formData.visitClinic.mapEmbedUrl} onChange={(e) => handleNestedChange("visitClinic", "mapEmbedUrl", e.target.value)} className={inputCls} placeholder="https://www.google.com/maps/embed?..." />
                    </Field>
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Info Cards</label>
                        <AddButton onClick={() => addToArray("visitClinic", "infoCards", { icon: "", label: "", value: "", displayOrder: 0 })} label="Add Info Card" />
                    </div>
                    {formData.visitClinic.infoCards.length === 0 ? (
                        <EmptyState text="No info cards added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.visitClinic.infoCards.map((c, i) => (
                                <ItemCard key={i} title={`Info Card ${i + 1}`} onDelete={() => deleteFromArray("visitClinic", "infoCards", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <Field label="Icon (lucide name)"><input type="text" value={c.icon} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "icon", e.target.value)} className={inputCls} placeholder="MapPin" /></Field>
                                        <Field label="Label"><input type="text" value={c.label} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "label", e.target.value)} className={inputCls} placeholder="Address" /></Field>
                                        <Field label="Value"><input type="text" value={c.value} onChange={(e) => updateArrayItem("visitClinic", "infoCards", i, "value", e.target.value)} className={inputCls} /></Field>
                                    </div>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── CONSULTATION ────────────────────────────────── */}
                <Section icon={PhoneCall} title="Book Consultation Section" subtitle="Contact channels + form panel">
                    <Field label="Heading">
                        <input type="text" value={formData.consultation.heading} onChange={(e) => handleNestedChange("consultation", "heading", e.target.value)} className={inputCls} placeholder="Find The Cause. Get The Right Care." />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.consultation.description} onChange={(e) => handleNestedChange("consultation", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <ImageBlock label="Background Image" value={formData.consultation.backgroundImage} onChange={(v) => handleNestedChange("consultation", "backgroundImage", v)} />
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>Contact Channels</label>
                        <AddButton onClick={() => addToArray("consultation", "contactCards", { icon: "", title: "", description: "", link: "", ext: false, displayOrder: 0 })} label="Add Channel" />
                    </div>
                    {formData.consultation.contactCards.length === 0 ? (
                        <EmptyState text="No contact channels added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.consultation.contactCards.map((c, i) => (
                                <ItemCard key={i} title={`Channel ${i + 1}`} onDelete={() => deleteFromArray("consultation", "contactCards", i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <Field label="Icon (lucide name)"><input type="text" value={c.icon} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "icon", e.target.value)} className={inputCls} placeholder="Phone" /></Field>
                                        <Field label="Title"><input type="text" value={c.title} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "title", e.target.value)} className={inputCls} /></Field>
                                        <Field label="Value / Text"><input type="text" value={c.description} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "description", e.target.value)} className={inputCls} /></Field>
                                    </div>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1"><Field label="Link"><input type="text" value={c.link} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "link", e.target.value)} className={inputCls} /></Field></div>
                                        <label className="flex items-center gap-2 text-xs text-gray-600 pb-2.5">
                                            <input type="checkbox" checked={!!c.ext} onChange={(e) => updateArrayItem("consultation", "contactCards", i, "ext", e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                                            Opens new tab
                                        </label>
                                    </div>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className={labelCls}>Stats Row</label>
                            <AddButton onClick={() => addToArray("consultation", "statsRow", { value: "", label: "" })} label="Add Stat" />
                        </div>
                        {formData.consultation.statsRow.length === 0 ? (
                            <EmptyState text="No stats added yet." />
                        ) : (
                            <div className="space-y-3">
                                {formData.consultation.statsRow.map((stat, i) => (
                                    <ItemCard key={i} title={`Stat ${i + 1}`} onDelete={() => deleteFromArray("consultation", "statsRow", i)}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Value"><input type="text" value={stat.value} onChange={(e) => updateArrayItem("consultation", "statsRow", i, "value", e.target.value)} className={inputCls} /></Field>
                                            <Field label="Label"><input type="text" value={stat.label} onChange={(e) => updateArrayItem("consultation", "statsRow", i, "label", e.target.value)} className={inputCls} /></Field>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                </Section>

                {/* ─── FAQ ─────────────────────────────────────────── */}
                <Section icon={HelpCircle} title="FAQ Section" subtitle="Questions & answers">
                    <Field label="Heading">
                        <input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className={inputCls} placeholder="Frequently Asked Questions" />
                    </Field>
                    <Field label="Description">
                        <textarea rows={2} value={formData.faq.description} onChange={(e) => handleNestedChange("faq", "description", e.target.value)} className={textareaCls} />
                    </Field>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className={labelCls}>Sidebar Stats</label>
                            <AddButton onClick={() => addToArray("faq", "stats", { value: "", label: "" })} label="Add Stat" />
                        </div>
                        {formData.faq.stats.length === 0 ? (
                            <EmptyState text="No stats added yet." />
                        ) : (
                            <div className="space-y-3">
                                {formData.faq.stats.map((stat, i) => (
                                    <ItemCard key={i} title={`Stat ${i + 1}`} onDelete={() => deleteFromArray("faq", "stats", i)}>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Value"><input type="text" value={stat.value} onChange={(e) => updateArrayItem("faq", "stats", i, "value", e.target.value)} className={inputCls} /></Field>
                                            <Field label="Label"><input type="text" value={stat.label} onChange={(e) => updateArrayItem("faq", "stats", i, "label", e.target.value)} className={inputCls} /></Field>
                                        </div>
                                    </ItemCard>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <label className={labelCls}>FAQs</label>
                        <AddButton onClick={() => addToArray("faq", "faqs", { question: "", answer: "", displayOrder: 0 })} label="Add FAQ" />
                    </div>
                    {formData.faq.faqs.length === 0 ? (
                        <EmptyState text="No FAQs added yet." />
                    ) : (
                        <div className="space-y-3">
                            {formData.faq.faqs.map((f, i) => (
                                <ItemCard key={i} title={`FAQ ${i + 1}`} onDelete={() => deleteFromArray("faq", "faqs", i)}>
                                    <Field label="Question"><input type="text" value={f.question} onChange={(e) => updateArrayItem("faq", "faqs", i, "question", e.target.value)} className={inputCls} /></Field>
                                    <Field label="Answer"><textarea rows={3} value={f.answer} onChange={(e) => updateArrayItem("faq", "faqs", i, "answer", e.target.value)} className={textareaCls} /></Field>
                                </ItemCard>
                            ))}
                        </div>
                    )}
                </Section>

                {/* ─── SUBMIT ──────────────────────────────────────── */}
                <div className="pt-2 pb-4">
                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                        <Save className="w-4 h-4" />
                        {submitting ? "Saving..." : "Create Hair Fall Treatment Page"}
                    </button>
                </div>
            </form>
        </section>
    );
}
