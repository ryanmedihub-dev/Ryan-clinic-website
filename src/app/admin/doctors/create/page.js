"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";

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
  status: "published",
  featured: false,
  isActive: true,
  displayOrder: 0,
  basicInfo: {
    doctorName: "",
    designation: "",
    city: "Delhi",
    yearsExperience: 0,
    proceduresCount: 0,
    successRate: "95%+",
    rating: 5.0,
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    clinicName: "",
    clinicAddress: "",
    languages: [],
    profileImage: { image: "", alt: "" },
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    robots: "index, follow",
    openGraphImage: { image: "", alt: "" },
    useGlobalSEO: false,
  },
  hero: {
    description: "",
    heroImage: { image: "", alt: "" },
    breadcrumbs: [],
    stats: [],
    whatsappCTA: { text: "WhatsApp Us", url: "" },
    callCTA: { text: "Call Now", url: "" },
  },
  whyItMatters: {
    sectionLabel: "Why It Matters",
    heading: "",
    description: "",
    secondaryDescription: "",
    highlightBox: "",
    image: { image: "", alt: "" },
    floatingStats: [],
    bottomCard: { number: "", icon: "", title: "", description: "" },
    primaryCTA: { text: "", url: "" },
    secondaryCTA: { text: "", url: "" },
  },
  doctorStandards: {
    sectionLabel: "Excellence Standards",
    heading: "",
    description: "",
    cards: [],
  },
  credentials: {
    sectionLabel: "Qualifications",
    heading: "",
    description: "",
    tabs: [],
    bottomCTA: { badge: "", heading: "", description: "", buttonText: "", buttonLink: "" },
  },
  verification: {
    sectionLabel: "Verification Steps",
    heading: "",
    description: "",
    steps: [],
    checklist: [],
    progressCard: { title: "", description: "" },
  },
  comparison: {
    sectionLabel: "Doctor vs Technician",
    heading: "",
    description: "",
    leftCard: { title: "Doctor-Led Procedure", badge: "Verified Doctor", image: { image: "", alt: "" } },
    rightCard: { title: "Technician-Led Clinic", badge: "Technician", image: { image: "", alt: "" } },
    rows: [],
  },
  surgeonProfile: {
    sectionLabel: "Your Surgeon",
    heading: "",
    about: "",
    philosophy: "",
    whyChooseDoctor: [],
    achievements: [],
    consultationIncludes: [],
    primaryCTA: { text: "", url: "" },
    secondaryCTA: { text: "", url: "" },
  },
  surgeryTimeline: {
    sectionLabel: "Procedure Timeline",
    heading: "",
    description: "",
    steps: [],
  },
  consultation: {
    sectionLabel: "Book Consultation",
    heading: "",
    description: "",
    contactCards: [],
    form: { title: "", services: [], submitButtonText: "Submit Request" },
  },
  questionsToAsk: {
    sectionLabel: "Questions to Ask",
    heading: "",
    description: "",
    questions: [],
    ctaCard: { badge: "", heading: "", description: "", buttonText: "", buttonLink: "" },
  },
  greatDoctorQualities: {
    sectionLabel: "Doctor Traits",
    heading: "",
    description: "",
    cards: [],
  },
  warningSigns: {
    sectionLabel: "Red Flags",
    heading: "",
    description: "",
    image: { image: "", alt: "" },
    cards: [],
    bottomCTA: { badge: "", heading: "", description: "", buttonText: "", buttonLink: "" },
  },
  surgicalProcess: {
    sectionLabel: "Step-by-Step Process",
    heading: "",
    description: "",
    steps: [],
  },
  pricing: {
    sectionLabel: "Packages & Pricing",
    heading: "",
    description: "",
    packages: [],
    disclaimer: "",
  },
  visitClinic: {
    sectionLabel: "Visit Our Clinic",
    heading: "",
    description: "",
    clinicImage: { image: "", alt: "" },
    gallery: [],
    address: { clinicName: "", address: "", city: "Delhi", state: "Delhi", pincode: "" },
    timings: [],
    mapUrl: "",
    contact: { phone: "", whatsapp: "", email: "" },
  },
  faq: {
    sectionLabel: "Frequently Asked Questions",
    heading: "",
    description: "",
    faqs: [],
  },
  keyFacts: {
    heading: "VERIFIED DOCTOR & CLINIC KEY FACTS",
    qualifications: "",
    registration: "",
    specialisation: "",
    experience: "",
    procedures: "",
    memberships: "",
    location: "",
    consultation: "",
  },
  medicalReviewer: {
    isVerified: false,
    reviewerName: "",
    qualifications: "",
    registration: "",
  },
};

export default function CreateDoctorPage() {
  const toast = useToast();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleNestedChange = (section, field, value) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDeepChange = (section, subSection, field, value) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: { ...prev[section][subSection], [field]: value },
      },
    }));
  };

  const handleTopLevelChange = (field, value) => {
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addToArray = (section, field, newItem) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] || []), newItem],
      },
    }));
  };

  const deleteFromArray = (section, field, index) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index),
      },
    }));
  };

  const updateArrayItem = (section, field, index, itemField, value) => {
    setIsDirty(true);
    setFormData((prev) => {
      const arr = [...(prev[section][field] || [])];
      arr[index] = { ...arr[index], [itemField]: value };
      return { ...prev, [section]: { ...prev[section], [field]: arr } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pageName.trim()) {
      toast.error("Error", "Page name is required.");
      return;
    }
    if (!formData.basicInfo.doctorName.trim()) {
      toast.error("Error", "Doctor name is required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/doctors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsDirty(false);
        toast.success("Success", data.message || "Doctor page created successfully.");
        setTimeout(() => router.push("/admin/doctors"), 1500);
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

  return (
    <section className="pb-24" suppressHydrationWarning>
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
      <AdminHeader title="/ Create Doctor Page" />

      <form onSubmit={handleSubmit} className="space-y-6 px-6 w-full" suppressHydrationWarning>

        {/* 1. GENERAL INFO */}
        <h3 className="text-2xl font-bold underline mb-5">1. General Info</h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Page Name *</label>
            <input
              type="text"
              value={formData.pageName}
              onChange={(e) => handleTopLevelChange("pageName", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g. Dr. Pranendra Singh - Chief Hair Transplant Surgeon"
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
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Display Order</label>
            <input
              type="number"
              value={formData.displayOrder || 0}
              onChange={(e) => handleTopLevelChange("displayOrder", parseInt(e.target.value) || 0)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g. 1"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Slug (URL) — editing changes the public URL
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                handleTopLevelChange(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                )
              }
              className="w-full mt-2 p-2 border rounded-md font-mono"
              placeholder="e.g. dr-pranendra-singh"
            />
            {formData.slug && (
              <p className="text-xs text-gray-400 mt-1">
                URL preview: <span className="text-blue-600 font-mono">/doctors/{formData.slug}</span>
              </p>
            )}
          </div>
          <div className="w-full flex items-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleTopLevelChange("featured", e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Featured Doctor
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleTopLevelChange("isActive", e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Active
              </label>
            </div>
          </div>
        </div>

        {/* 2. BASIC DOCTOR INFO */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">2. Basic Doctor Info</h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Doctor Full Name *</label>
            <input
              type="text"
              value={formData.basicInfo.doctorName}
              onChange={(e) => handleNestedChange("basicInfo", "doctorName", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Dr. Pranendra Singh"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Designation</label>
            <input
              type="text"
              value={formData.basicInfo.designation}
              onChange={(e) => handleNestedChange("basicInfo", "designation", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Chief Hair Transplant Surgeon"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Clinic Name</label>
            <input
              type="text"
              value={formData.basicInfo.clinicName}
              onChange={(e) => handleNestedChange("basicInfo", "clinicName", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Ryan Clinic"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Clinic Address</label>
            <input
              type="text"
              value={formData.basicInfo.clinicAddress}
              onChange={(e) => handleNestedChange("basicInfo", "clinicAddress", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="CD 163, Block CD, Dakshini Pitampura"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">City / Location</label>
            <input
              type="text"
              value={formData.basicInfo.city}
              onChange={(e) => handleNestedChange("basicInfo", "city", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Delhi"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Years Experience</label>
            <input
              type="number"
              min="0"
              value={formData.basicInfo.yearsExperience}
              onChange={(e) => handleNestedChange("basicInfo", "yearsExperience", parseInt(e.target.value) || 0)}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Procedures Count</label>
            <input
              type="number"
              min="0"
              value={formData.basicInfo.proceduresCount}
              onChange={(e) => handleNestedChange("basicInfo", "proceduresCount", parseInt(e.target.value) || 0)}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Graft Success Rate</label>
            <input
              type="text"
              value={formData.basicInfo.successRate || "95%+"}
              onChange={(e) => handleNestedChange("basicInfo", "successRate", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g. 95%+"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Rating (0 - 5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.basicInfo.rating}
              onChange={(e) => handleNestedChange("basicInfo", "rating", parseFloat(e.target.value) || 5.0)}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              value={formData.basicInfo.phoneNumber}
              onChange={(e) => handleNestedChange("basicInfo", "phoneNumber", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="+91-9911111247"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">WhatsApp Number</label>
            <input
              type="text"
              value={formData.basicInfo.whatsappNumber}
              onChange={(e) => handleNestedChange("basicInfo", "whatsappNumber", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="+91-9911111247"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              value={formData.basicInfo.email}
              onChange={(e) => handleNestedChange("basicInfo", "email", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="info@clinicryan.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Profile Image</label>
          <ImageUploader
            initialImage={formData.basicInfo.profileImage.image}
            onUpload={(url) =>
              handleNestedChange("basicInfo", "profileImage", {
                ...formData.basicInfo.profileImage,
                image: url,
              })
            }
          />
          <input
            type="text"
            value={formData.basicInfo.profileImage.alt}
            onChange={(e) =>
              handleNestedChange("basicInfo", "profileImage", {
                ...formData.basicInfo.profileImage,
                alt: e.target.value,
              })
            }
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Profile Image Alt Text"
          />
        </div>

        {/* 3. META DETAILS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">3. Meta Details</h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
            <input
              type="text"
              value={formData.seo.metaTitle}
              onChange={(e) => handleNestedChange("seo", "metaTitle", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Enter Meta Title"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
            <textarea
              rows={3}
              value={formData.seo.metaDescription}
              onChange={(e) => handleNestedChange("seo", "metaDescription", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Enter Meta Description"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Keywords</label>
            <input
              type="text"
              value={formData.seo.keywords}
              onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="hair transplant doctor, best surgeon delhi"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Canonical URL</label>
            <input
              type="text"
              value={formData.seo.canonicalUrl}
              onChange={(e) => handleNestedChange("seo", "canonicalUrl", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="https://www.clinicryan.com/doctors/dr-pranendra-singh"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Robots</label>
            <select
              value={formData.seo.robots}
              onChange={(e) => handleNestedChange("seo", "robots", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
            >
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Open Graph Image (Social Sharing)</label>
          <ImageUploader
            initialImage={formData.seo.openGraphImage?.image || ""}
            onUpload={(url) =>
              handleNestedChange("seo", "openGraphImage", {
                ...formData.seo.openGraphImage,
                image: url,
              })
            }
          />
          <input
            type="text"
            value={formData.seo.openGraphImage?.alt || ""}
            onChange={(e) =>
              handleNestedChange("seo", "openGraphImage", {
                ...formData.seo.openGraphImage,
                alt: e.target.value,
              })
            }
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Open Graph Image Alt Text"
          />
        </div>

        {/* 4. BANNER SECTION */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">Banner Section</h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Banner Title</label>
          <input
            type="text"
            value={formData.hero.title || ""}
            onChange={(e) => handleNestedChange("hero", "title", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter Banner Title"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700">Banner Description</label>
          <textarea
            rows={4}
            value={formData.hero.description}
            onChange={(e) => handleNestedChange("hero", "description", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter Banner Description"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Image</label>
          <ImageUploader
            initialImage={formData.hero.heroImage?.image || ""}
            onUpload={(url) =>
              handleNestedChange("hero", "heroImage", {
                ...formData.hero.heroImage,
                image: url,
              })
            }
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700">Banner Image Alt</label>
          <input
            type="text"
            value={formData.hero.heroImage?.alt || ""}
            onChange={(e) =>
              handleNestedChange("hero", "heroImage", {
                ...formData.hero.heroImage,
                alt: e.target.value,
              })
            }
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter Banner Image Alt"
          />
        </div>

        <div className="flex gap-6 flex-col md:flex-row mt-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">WhatsApp CTA Text</label>
            <input
              type="text"
              value={formData.hero.whatsappCTA.text}
              onChange={(e) => handleDeepChange("hero", "whatsappCTA", "text", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="WhatsApp Us"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">WhatsApp CTA Link/URL</label>
            <input
              type="text"
              value={formData.hero.whatsappCTA.url}
              onChange={(e) => handleDeepChange("hero", "whatsappCTA", "url", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="https://wa.me/919911111247"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-col md:flex-row mt-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Call CTA Text</label>
            <input
              type="text"
              value={formData.hero.callCTA.text}
              onChange={(e) => handleDeepChange("hero", "callCTA", "text", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Call Now"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Call CTA Link/URL</label>
            <input
              type="text"
              value={formData.hero.callCTA.url}
              onChange={(e) => handleDeepChange("hero", "callCTA", "url", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="tel:+919911111247"
            />
          </div>
        </div>

        {/* 4B. VERIFIED DOCTOR & CLINIC KEY FACTS TABLE */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">4B. Verified Doctor & Clinic Key Facts (Table Grid)</h3>
        <p className="text-sm text-gray-500 mb-4">Edit the 8 Key Fact badges displayed directly below the Hero/Banner section.</p>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
          <input
            type="text"
            value={formData.keyFacts?.heading || ""}
            onChange={(e) => handleNestedChange("keyFacts", "heading", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md font-semibold"
            placeholder="VERIFIED DOCTOR & CLINIC KEY FACTS"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Qualifications</label>
            <input
              type="text"
              value={formData.keyFacts?.qualifications || ""}
              onChange={(e) => handleNestedChange("keyFacts", "qualifications", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. MBBS, MS, MCh (Plastic Surgery), DMC-68492"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Medical Registration</label>
            <input
              type="text"
              value={formData.keyFacts?.registration || ""}
              onChange={(e) => handleNestedChange("keyFacts", "registration", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. DMC-68492"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Specialisation</label>
            <input
              type="text"
              value={formData.keyFacts?.specialisation || ""}
              onChange={(e) => handleNestedChange("keyFacts", "specialisation", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. Sapphire FUE & Direct Implantation Hair Restoration"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Surgical Experience</label>
            <input
              type="text"
              value={formData.keyFacts?.experience || ""}
              onChange={(e) => handleNestedChange("keyFacts", "experience", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. 15+ Years"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Case Volume</label>
            <input
              type="text"
              value={formData.keyFacts?.procedures || ""}
              onChange={(e) => handleNestedChange("keyFacts", "procedures", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. 5,000+ Surgeries"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Council / Memberships</label>
            <input
              type="text"
              value={formData.keyFacts?.memberships || ""}
              onChange={(e) => handleNestedChange("keyFacts", "memberships", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. Delhi Medical Council Registered"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Clinic Location</label>
            <input
              type="text"
              value={formData.keyFacts?.location || ""}
              onChange={(e) => handleNestedChange("keyFacts", "location", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. 2nd Floor, Banjara Hills, Hyderabad – 500034"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Consultation</label>
            <input
              type="text"
              value={formData.keyFacts?.consultation || ""}
              onChange={(e) => handleNestedChange("keyFacts", "consultation", e.target.value)}
              className="w-full mt-1.5 p-2.5 border rounded-md bg-white text-sm"
              placeholder="e.g. Free Scalp Analysis & Custom Hairline Design"
            />
          </div>
        </div>

        {/* 4C. MEDICAL REVIEWER BYLINE */}
        <div className="mt-8 p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              id="medVerifiedCreate"
              checked={formData.medicalReviewer?.isVerified || false}
              onChange={(e) => handleNestedChange("medicalReviewer", "isVerified", e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="medVerifiedCreate" className="text-sm font-bold text-emerald-900 cursor-pointer">
              Display &quot;Medically Reviewed By&quot; Badge in Hero
            </label>
          </div>
          {formData.medicalReviewer?.isVerified && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-emerald-200">
              <div>
                <label className="block text-xs font-semibold text-emerald-800">Reviewer Name</label>
                <input
                  type="text"
                  value={formData.medicalReviewer?.reviewerName || ""}
                  onChange={(e) => handleNestedChange("medicalReviewer", "reviewerName", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-white text-sm"
                  placeholder="e.g. Dr. Pranendra Singh"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-800">Qualifications</label>
                <input
                  type="text"
                  value={formData.medicalReviewer?.qualifications || ""}
                  onChange={(e) => handleNestedChange("medicalReviewer", "qualifications", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-white text-sm"
                  placeholder="e.g. MCh Plastic Surgery"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-800">Registration</label>
                <input
                  type="text"
                  value={formData.medicalReviewer?.registration || ""}
                  onChange={(e) => handleNestedChange("medicalReviewer", "registration", e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md bg-white text-sm"
                  placeholder="e.g. DMC-68492"
                />
              </div>
            </div>
          )}
        </div>

        {/* 5. WHY DOCTOR MATTERS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">5. Why Doctor-Led Hair Transplant Matters</h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input
              type="text"
              value={formData.whyItMatters.sectionLabel}
              onChange={(e) => handleNestedChange("whyItMatters", "sectionLabel", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading</label>
            <input
              type="text"
              value={formData.whyItMatters.heading}
              onChange={(e) => handleNestedChange("whyItMatters", "heading", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            rows={2}
            value={formData.whyItMatters.description}
            onChange={(e) => handleNestedChange("whyItMatters", "description", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Secondary Description</label>
          <textarea
            rows={2}
            value={formData.whyItMatters.secondaryDescription}
            onChange={(e) => handleNestedChange("whyItMatters", "secondaryDescription", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Secondary description..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Highlight Box Text</label>
          <input
            type="text"
            value={formData.whyItMatters.highlightBox}
            onChange={(e) => handleNestedChange("whyItMatters", "highlightBox", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="100% Doctor Performed..."
          />
        </div>

        {/* 6. DOCTOR STANDARDS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">6. Doctor Standards &amp; Excellence</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.doctorStandards.sectionLabel} onChange={(e) => handleNestedChange("doctorStandards", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. The Standard" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.doctorStandards.heading} onChange={(e) => handleNestedChange("doctorStandards", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. What makes a good hair transplant doctor in Delhi?" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.doctorStandards.description} onChange={(e) => handleNestedChange("doctorStandards", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. These are the non-negotiables." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("doctorStandards", "cards", { title: "", description: "", icon: "Award" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Excellence Standard
        </button>
        {formData.doctorStandards.cards.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No excellence standards added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.doctorStandards.cards.map((card, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Standard Card #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("doctorStandards", "cards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Standard
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={card.title} onChange={(e) => updateArrayItem("doctorStandards", "cards", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. 100% Doctor-Performed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={card.description} onChange={(e) => updateArrayItem("doctorStandards", "cards", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Standard description..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. CREDENTIALS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">7. Qualifications &amp; Credentials</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.credentials.sectionLabel} onChange={(e) => handleNestedChange("credentials", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Verification & Credentials" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.credentials.heading} onChange={(e) => handleNestedChange("credentials", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Credentials to look for in a hair transplant doctor in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.credentials.description} onChange={(e) => handleNestedChange("credentials", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="What matters is genuine hair-restoration training." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("credentials", "tabs", { title: "", description: "", icon: "GraduationCap" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Credential Tab
        </button>
        {formData.credentials.tabs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No credential tabs added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.credentials.tabs.map((tab, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Credential Tab #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("credentials", "tabs", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Tab
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Degree / Certification Title</label>
                    <input type="text" value={tab.title} onChange={(e) => updateArrayItem("credentials", "tabs", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. MBBS, MD - Dermatology" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Institution / Detail</label>
                    <input type="text" value={tab.description} onChange={(e) => updateArrayItem("credentials", "tabs", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Recognized Medical Council" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 8. VERIFICATION */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">8. Verification &amp; Safety Steps</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.verification.sectionLabel} onChange={(e) => handleNestedChange("verification", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Doctor Verification" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.verification.heading} onChange={(e) => handleNestedChange("verification", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. How to verify a hair transplant doctor's credentials in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.verification.description} onChange={(e) => handleNestedChange("verification", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Tick off each item before booking your hair transplant procedure." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("verification", "steps", { title: "", description: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Verification Step
        </button>
        {formData.verification.steps.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No verification steps added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.verification.steps.map((step, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Verification Step #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("verification", "steps", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Step
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={step.title} onChange={(e) => updateArrayItem("verification", "steps", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Check Medical Registration" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={step.description} onChange={(e) => updateArrayItem("verification", "steps", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Verify details online..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 9. DOCTOR VS TECHNICIAN COMPARISON */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">9. Doctor vs Technician Comparison Matrix</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.comparison.sectionLabel} onChange={(e) => handleNestedChange("comparison", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. The Critical Difference" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.comparison.heading} onChange={(e) => handleNestedChange("comparison", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Doctor-led vs technician-led surgery in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.comparison.description} onChange={(e) => handleNestedChange("comparison", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="The person performing each step is what determines your result." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("comparison", "rows", { parameter: "", doctorValue: "", technicianValue: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Comparison Row
        </button>
        {formData.comparison.rows.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No comparison matrix rows added yet. Click "+ Add Comparison Row" above to add one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.comparison.rows.map((row, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Comparison Row #{i + 1}</h4>
                  <button
                    type="button"
                    onClick={() => deleteFromArray("comparison", "rows", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Delete Row
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Parameter</label>
                    <input
                      type="text"
                      placeholder="e.g. Graft Extraction"
                      value={row.parameter}
                      onChange={(e) => updateArrayItem("comparison", "rows", i, "parameter", e.target.value)}
                      className="w-full mt-1.5 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Doctor Value</label>
                    <input
                      type="text"
                      placeholder="e.g. Doctor / Senior Specialist"
                      value={row.doctorValue}
                      onChange={(e) => updateArrayItem("comparison", "rows", i, "doctorValue", e.target.value)}
                      className="w-full mt-1.5 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Technician Value</label>
                    <input
                      type="text"
                      placeholder="e.g. Technician / Assistant"
                      value={row.technicianValue}
                      onChange={(e) => updateArrayItem("comparison", "rows", i, "technicianValue", e.target.value)}
                      className="w-full mt-1.5 p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 10. SURGEON PROFILE & BIO */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">10. Surgeon Profile &amp; Bio</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.surgeonProfile.sectionLabel} onChange={(e) => handleNestedChange("surgeonProfile", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Your Surgeon" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.surgeonProfile.heading} onChange={(e) => handleNestedChange("surgeonProfile", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Meet Dr. Pranendra Singh — Hair Restoration Surgeon in Delhi" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Detailed Biography / About</label>
            <textarea
              rows={4}
              value={formData.surgeonProfile.about}
              onChange={(e) => handleNestedChange("surgeonProfile", "about", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Doctor biography details..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Surgical Philosophy</label>
            <textarea
              rows={2}
              value={formData.surgeonProfile.philosophy}
              onChange={(e) => handleNestedChange("surgeonProfile", "philosophy", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Doctor's surgical approach..."
            />
          </div>
        </div>

        {/* 11. SURGERY TIMELINE */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">11. Surgery Timeline</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.surgeryTimeline.sectionLabel} onChange={(e) => handleNestedChange("surgeryTimeline", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Procedure Timeline" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.surgeryTimeline.heading} onChange={(e) => handleNestedChange("surgeryTimeline", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Your Hair Transplant Timeline" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.surgeryTimeline.description} onChange={(e) => handleNestedChange("surgeryTimeline", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Overview of the procedure timeline." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("surgeryTimeline", "steps", { stepNumber: "", title: "", description: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Timeline Step
        </button>
        {formData.surgeryTimeline.steps.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No timeline steps added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.surgeryTimeline.steps.map((step, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Timeline Step #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("surgeryTimeline", "steps", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Step
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Step #</label>
                    <input type="text" value={step.stepNumber} onChange={(e) => updateArrayItem("surgeryTimeline", "steps", i, "stepNumber", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Step 1" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={step.title} onChange={(e) => updateArrayItem("surgeryTimeline", "steps", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Scalp Analysis" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={step.description} onChange={(e) => updateArrayItem("surgeryTimeline", "steps", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Step description..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 12. CONSULTATION */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">12. Consultation Section</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.consultation.sectionLabel} onChange={(e) => handleNestedChange("consultation", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Book Consultation" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.consultation.heading} onChange={(e) => handleNestedChange("consultation", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Book a consultation with our hair transplant doctor in Delhi" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Description (left card body)</label>
          <textarea rows={2} value={formData.consultation.description} onChange={(e) => handleNestedChange("consultation", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Doctor-led Sapphire FUE & Turkish Technique hair restoration..." />
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6 space-y-4">
          <h4 className="text-base font-bold text-red-800">Right Card (Why Ryan Clinic?)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Right Card Badge</label>
              <input type="text" value={formData.consultation.rightCardBadge || ""} onChange={(e) => handleNestedChange("consultation", "rightCardBadge", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. WHY RYAN CLINIC?" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Right Card Heading</label>
              <input type="text" value={formData.consultation.rightCardHeading || ""} onChange={(e) => handleNestedChange("consultation", "rightCardHeading", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Results So Natural — Nobody Will Know" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Right Card Description</label>
            <textarea rows={2} value={formData.consultation.rightCardDescription || ""} onChange={(e) => handleNestedChange("consultation", "rightCardDescription", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Every graft is placed with precise control over angle, depth & direction..." />
          </div>
        </div>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Form Title</label>
            <input
              type="text"
              value={formData.consultation.form.title}
              onChange={(e) => handleDeepChange("consultation", "form", "title", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Book Free Consultation"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Submit Button Text</label>
            <input
              type="text"
              value={formData.consultation.form.submitButtonText}
              onChange={(e) => handleDeepChange("consultation", "form", "submitButtonText", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Submit Request"
            />
          </div>
        </div>

        {/* 13. QUESTIONS TO ASK */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">13. Questions to Ask Your Surgeon</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.questionsToAsk.sectionLabel} onChange={(e) => handleNestedChange("questionsToAsk", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Questions to Ask" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.questionsToAsk.heading} onChange={(e) => handleNestedChange("questionsToAsk", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Questions to ask your hair transplant doctor in Delhi before booking" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.questionsToAsk.description} onChange={(e) => handleNestedChange("questionsToAsk", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="The quality of a doctor's answers tells you almost everything." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("questionsToAsk", "questions", { question: "", answer: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Question
        </button>
        {formData.questionsToAsk.questions.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No questions to ask added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.questionsToAsk.questions.map((qItem, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Question #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("questionsToAsk", "questions", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Question
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Question</label>
                  <input type="text" value={qItem.question} onChange={(e) => updateArrayItem("questionsToAsk", "questions", i, "question", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Will the doctor perform the surgery?" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Answer / Key Point</label>
                  <textarea rows={2} value={qItem.answer} onChange={(e) => updateArrayItem("questionsToAsk", "questions", i, "answer", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Explanation..." />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 14. GREAT DOCTOR QUALITIES */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">14. Great Doctor Qualities</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.greatDoctorQualities.sectionLabel} onChange={(e) => handleNestedChange("greatDoctorQualities", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Excellence Standard" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.greatDoctorQualities.heading} onChange={(e) => handleNestedChange("greatDoctorQualities", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. What a great hair transplant doctor in Delhi does differently" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.greatDoctorQualities.description} onChange={(e) => handleNestedChange("greatDoctorQualities", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Every stage of your treatment is personally performed with high medical rigor..." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("greatDoctorQualities", "cards", { title: "", description: "", icon: "Sparkles" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Doctor Quality
        </button>
        {formData.greatDoctorQualities.cards.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No doctor qualities added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.greatDoctorQualities.cards.map((card, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Quality #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("greatDoctorQualities", "cards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Quality
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={card.title} onChange={(e) => updateArrayItem("greatDoctorQualities", "cards", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Surgical Precision" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={card.description} onChange={(e) => updateArrayItem("greatDoctorQualities", "cards", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Quality details..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 15. WARNING SIGNS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">15. Warning Signs &amp; Red Flags</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.warningSigns.sectionLabel} onChange={(e) => handleNestedChange("warningSigns", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Warning Signs" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.warningSigns.heading} onChange={(e) => handleNestedChange("warningSigns", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Red flags when choosing a hair transplant doctor in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.warningSigns.description} onChange={(e) => handleNestedChange("warningSigns", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="If you encounter any of the following at a clinic, walk away." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("warningSigns", "cards", { title: "", description: "", icon: "AlertTriangle" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Red Flag
        </button>
        {formData.warningSigns.cards.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No warning signs added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.warningSigns.cards.map((card, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Red Flag #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("warningSigns", "cards", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Flag
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={card.title} onChange={(e) => updateArrayItem("warningSigns", "cards", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Extremely Low Prices" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={card.description} onChange={(e) => updateArrayItem("warningSigns", "cards", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Warning sign detail..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 16. SURGICAL PROCESS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">16. Surgical Process Steps</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.surgicalProcess.sectionLabel} onChange={(e) => handleNestedChange("surgicalProcess", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Surgical Process" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.surgicalProcess.heading} onChange={(e) => handleNestedChange("surgicalProcess", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. What your hair transplant doctor in Delhi does at every stage" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.surgicalProcess.description} onChange={(e) => handleNestedChange("surgicalProcess", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Every stage of your hair restoration procedure is personally performed..." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("surgicalProcess", "steps", { number: "", title: "", description: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add Surgical Step
        </button>
        {formData.surgicalProcess.steps.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No surgical process steps added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.surgicalProcess.steps.map((step, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Process Step #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("surgicalProcess", "steps", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Step
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Step #</label>
                    <input type="text" value={step.number} onChange={(e) => updateArrayItem("surgicalProcess", "steps", i, "number", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. 01" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Title</label>
                    <input type="text" value={step.title} onChange={(e) => updateArrayItem("surgicalProcess", "steps", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Local Anesthesia" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Description</label>
                    <input type="text" value={step.description} onChange={(e) => updateArrayItem("surgicalProcess", "steps", i, "description", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="Step description..." />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 17. PRICING */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">17. Pricing &amp; Packages</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.pricing.sectionLabel} onChange={(e) => handleNestedChange("pricing", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Cost & Consultation" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.pricing.heading} onChange={(e) => handleNestedChange("pricing", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Cost of consulting a hair transplant doctor in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Section Description</label>
          <textarea rows={2} value={formData.pricing.description} onChange={(e) => handleNestedChange("pricing", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Consultation at Ryan Clinic includes a free scalp analysis..." />
        </div>
        <div className="flex gap-4 flex-col md:flex-row mb-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Package Section Heading</label>
            <input type="text" value={formData.pricing.packageSectionHeading || ""} onChange={(e) => handleNestedChange("pricing", "packageSectionHeading", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Hair Transplant Cost in Delhi" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Package Section Description</label>
            <input type="text" value={formData.pricing.packageSectionDescription || ""} onChange={(e) => handleNestedChange("pricing", "packageSectionDescription", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Per-graft pricing — confirmed in writing at your free consultation." />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Pricing Disclaimer</label>
          <input
            type="text"
            value={formData.pricing.disclaimer}
            onChange={(e) => handleNestedChange("pricing", "disclaimer", e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="*Prices may vary based on graft count"
          />
        </div>
        <button
          type="button"
          onClick={() => addToArray("pricing", "packages", { title: "", price: "", subtitle: "", buttonText: "Book Now" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-4 mb-4 cursor-pointer"
        >
          + Add Package
        </button>
        {formData.pricing.packages.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No pricing packages added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.pricing.packages.map((pkg, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-800">Package #{i + 1}</h4>
                  <button type="button" onClick={() => deleteFromArray("pricing", "packages", i)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
                    Delete Package
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Package Title</label>
                    <input type="text" value={pkg.title} onChange={(e) => updateArrayItem("pricing", "packages", i, "title", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Standard FUE" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Price</label>
                    <input type="text" value={pkg.price} onChange={(e) => updateArrayItem("pricing", "packages", i, "price", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. ₹45,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Subtitle / Badge</label>
                    <input type="text" value={pkg.subtitle} onChange={(e) => updateArrayItem("pricing", "packages", i, "subtitle", e.target.value)} className="w-full mt-1.5 p-2 border rounded-md" placeholder="e.g. Recommended" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 18. VISIT CLINIC */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">18. Visit Clinic Information</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.visitClinic.sectionLabel} onChange={(e) => handleNestedChange("visitClinic", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Visit Us" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.visitClinic.heading} onChange={(e) => handleNestedChange("visitClinic", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Visiting Ryan Clinic in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.visitClinic.description} onChange={(e) => handleNestedChange("visitClinic", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Our Delhi centre is convenient from across the city." />
        </div>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Clinic Address Line</label>
            <input
              type="text"
              value={formData.visitClinic.address.address}
              onChange={(e) => handleDeepChange("visitClinic", "address", "address", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="CD 163, Block CD, Dakshini Pitampura"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Google Map Embed URL</label>
            <input
              type="text"
              value={formData.visitClinic.mapUrl}
              onChange={(e) => handleNestedChange("visitClinic", "mapUrl", e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        {/* Nearby Locations */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Nearby Locations Served</h4>
          <p className="text-xs text-gray-500 mb-3">Add key areas served near this clinic branch.</p>
          {(formData.visitClinic.nearbyLocations || []).map((loc, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={loc}
                onChange={(e) => {
                  const list = [...(formData.visitClinic.nearbyLocations || [])];
                  list[idx] = e.target.value;
                  setFormData((prev) => ({ ...prev, visitClinic: { ...prev.visitClinic, nearbyLocations: list } }));
                  setIsDirty(true);
                }}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="e.g. Rohini, Pitampura, Shalimar Bagh"
              />
              <button
                type="button"
                onClick={() => {
                  const list = (formData.visitClinic.nearbyLocations || []).filter((_, i) => i !== idx);
                  setFormData((prev) => ({ ...prev, visitClinic: { ...prev.visitClinic, nearbyLocations: list } }));
                  setIsDirty(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                ✕ Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                visitClinic: {
                  ...prev.visitClinic,
                  nearbyLocations: [...(prev.visitClinic.nearbyLocations || []), ""],
                },
              }));
              setIsDirty(true);
            }}
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-semibold mt-1"
          >
            + Add Nearby Location
          </button>
        </div>

        {/* Information Cards */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Information Cards</h4>
          <p className="text-xs text-gray-500 mb-3">Add feature cards displayed under Visit Clinic (e.g. Metro station, Parking, Timings).</p>
          <button
            type="button"
            onClick={() => addToArray("visitClinic", "informationCards", { title: "", description: "", subtext: "", icon: "" })}
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-semibold mb-3"
          >
            + Add Information Card
          </button>
          {(formData.visitClinic.informationCards || []).map((card, i) => (
            <div key={i} className="border rounded-xl p-4 bg-white shadow-sm space-y-3 mb-3">
              <div className="flex justify-between items-center">
                <h5 className="font-semibold text-xs text-gray-800">Card #{i + 1}</h5>
                <button
                  type="button"
                  onClick={() => deleteFromArray("visitClinic", "informationCards", i)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-md text-xs"
                >
                  Delete Card
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Title</label>
                  <input
                    type="text"
                    value={card.title || ""}
                    onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "title", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-xs"
                    placeholder="e.g. Nearest Metro"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Description</label>
                  <input
                    type="text"
                    value={card.description || ""}
                    onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "description", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-xs"
                    placeholder="e.g. Pitampura Metro Station"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Subtext</label>
                  <input
                    type="text"
                    value={card.subtext || ""}
                    onChange={(e) => updateArrayItem("visitClinic", "informationCards", i, "subtext", e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md text-xs"
                    placeholder="e.g. Red Line (5 min auto)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 19. FREQUENTLY ASKED QUESTIONS */}
        <h3 className="text-2xl font-bold underline mt-10 mb-5">19. Frequently Asked Questions</h3>
        <div className="flex gap-4 flex-col md:flex-row mb-4">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Label</label>
            <input type="text" value={formData.faq.sectionLabel} onChange={(e) => handleNestedChange("faq", "sectionLabel", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="e.g. Frequently Asked Questions" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">Section Heading (H2) *</label>
            <input type="text" value={formData.faq.heading} onChange={(e) => handleNestedChange("faq", "heading", e.target.value)} className="w-full mt-2 p-2 border rounded-md font-semibold" placeholder="e.g. Frequently asked questions about hair transplant doctors in Delhi" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea rows={2} value={formData.faq.description} onChange={(e) => handleNestedChange("faq", "description", e.target.value)} className="w-full mt-2 p-2 border rounded-md" placeholder="Common questions about our hair transplant doctors and process." />
        </div>
        <button
          type="button"
          onClick={() => addToArray("faq", "faqs", { question: "", answer: "" })}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4 cursor-pointer"
        >
          + Add FAQ Item
        </button>
        {formData.faq.faqs.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center my-3">
            <p className="text-gray-500">No FAQ items added yet. Click "+ Add FAQ Item" above to add one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.faq.faqs.map((faq, i) => (
              <div key={i} className="border rounded-xl p-5 bg-white shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-gray-800">FAQ Item #{i + 1}</h4>
                  <button
                    type="button"
                    onClick={() => deleteFromArray("faq", "faqs", i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Delete FAQ
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Question</label>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={faq.question}
                    onChange={(e) => updateArrayItem("faq", "faqs", i, "question", e.target.value)}
                    className="w-full mt-1.5 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Answer</label>
                  <textarea
                    rows={2}
                    placeholder="Enter answer"
                    value={faq.answer}
                    onChange={(e) => updateArrayItem("faq", "faqs", i, "answer", e.target.value)}
                    className="w-full mt-1.5 p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-all cursor-pointer"
          >
            {submitting ? "Saving..." : "Create Doctor Page"}
          </button>
        </div>
      </form>
    </section>
  );
}
