"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── Initial Form State ─────────────────────────────────────────────────── */
export const initialSurgeonFormState = {
  title: "",
  slug: "",
  slugManual: false,

  general: {
    shortDescription: "",
    slugHistory: [],
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonical: "",
    ogImage: "",
    robots: "index, follow",
  },

  hero: {
    badge: { text: "" },
    title: "",
    description: "",
    featurePills: [],
    buttons: [],
    stats: [],
    doctorCard: {
      image: { url: "", alt: "" },
      doctorName: "",
      qualification: "",
      designation: "",
      experience: "",
    },
  },

  whySkill: {
    badge: { text: "" },
    heading: "",
    description: "",
    highlightBox: { title: "", description: "", icon: "" },
    cards: [],
  },

  benefits: {
    badge: { text: "" },
    heading: "",
    description: "",
    items: [],
  },

  whyClinic: {
    badge: { text: "" },
    heading: "",
    description: "",
    image: { url: "", alt: "" },
    stats: [],
    accordions: [],
  },

  surgeonRole: {
    badge: { text: "" },
    heading: "",
    description: "",
    steps: [],
    bottomCTA: {
      title: "",
      description: "",
      button: { text: "", link: "", variant: "primary" },
    },
  },

  comparison: {
    badge: { text: "" },
    heading: "",
    description: "",
    surgeonCard: {
      badge: "",
      title: "",
      footer: "",
      items: [],
      button: { text: "", link: "", variant: "primary" },
    },
    technicianCard: {
      badge: "",
      title: "",
      footer: "",
      items: [],
      button: { text: "", link: "", variant: "secondary" },
    },
  },

  leadSurgeon: {
    badge: { text: "" },
    heading: "",
    description: "",
    doctorImage: { url: "", alt: "" },
    gallery: [],
    qualifications: [],
    stats: [],
    buttons: [],
  },

  bookingChecklist: {
    badge: { text: "" },
    heading: "",
    description: "",
    questions: [],
    warningBox: { title: "", description: "", icon: "" },
  },

  procedures: {
    badge: { text: "" },
    heading: "",
    description: "",
    cards: [],
  },

  consultationCTA: {
    badge: { text: "" },
    heading: "",
    description: "",
    image: { url: "", alt: "" },
    stats: [],
    buttons: [],
    featureCard: { icon: "", title: "", description: "" },
  },

  faq: {
    badge: { text: "" },
    heading: "",
    description: "",
    faqs: [],
  },

  experienceSpecialization: {
    badge: { text: "" },
    heading: "",
    description: "",
    items: [],
  },

  skillEvaluation: {
    badge: { text: "" },
    heading: "",
    description: "",
    items: [],
  },

  hairlineArtistry: {
    badge: { text: "" },
    heading: "",
    description: "",
    image: { url: "", alt: "" },
    items: [],
  },

  revisionRepair: {
    badge: { text: "" },
    heading: "",
    description: "",
    items: [],
  },

  costConsultation: {
    badge: { text: "" },
    heading: "",
    description: "",
    disclaimer: "",
    items: [],
  },

  visitSurgeon: {
    badge: { text: "" },
    heading: "",
    description: "",
    address: "",
    phone: "",
    hours: "",
    metro: "",
  },

  settings: {
    status: "draft",
    featured: false,
    displayOrder: 0,
    showInSitemap: true,
    allowIndexing: true,
  },
};

/* ─── Deep Property Helper ───────────────────────────────────────────────── */
function setNestedProperty(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => {
    if (!acc[key] || typeof acc[key] !== "object") {
      acc[key] = {};
    }
    return acc[key];
  }, obj);
  target[lastKey] = value;
  return { ...obj };
}

function getNestedProperty(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

/* ─── Hook ───────────────────────────────────────────────────────────────── */
export function useSurgeonForm({ mode = "create", id = null, toast }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialSurgeonFormState);
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const toastRef = useRef(toast);
  useEffect(() => { toastRef.current = toast; });

  /* ── Auto-slug ── */
  const generateSlug = (title) =>
    title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  /* ── Field Update Helpers ── */
  const updateField = useCallback((path, value) => {
    setFormData((prev) => {
      const next = setNestedProperty({ ...prev }, path, value);
      if (path === "title") {
        const expected = generateSlug(prev.title || "");
        if (!prev.slugManual || !prev.slug || prev.slug === expected) {
          next.slug = generateSlug(value);
        }
      }
      if (path === "slug") next.slugManual = true;
      return next;
    });
    setErrors((prev) => {
      if (prev[path]) { const c = { ...prev }; delete c[path]; return c; }
      return prev;
    });
  }, []);

  const updateArrayItem = useCallback((path, index, keyOrValue, value) => {
    setFormData((prev) => {
      const arr = [...(getNestedProperty(prev, path) || [])];
      if (typeof keyOrValue === "string" && value !== undefined) {
        arr[index] = { ...arr[index], [keyOrValue]: value };
      } else {
        arr[index] = keyOrValue;
      }
      return setNestedProperty({ ...prev }, path, arr);
    });
  }, []);

  const addItem = useCallback((path, defaultItem = {}) => {
    setFormData((prev) => {
      const arr = [...(getNestedProperty(prev, path) || [])];
      arr.push(defaultItem);
      return setNestedProperty({ ...prev }, path, arr);
    });
  }, []);

  const removeItem = useCallback((path, index) => {
    setFormData((prev) => {
      const arr = [...(getNestedProperty(prev, path) || [])];
      arr.splice(index, 1);
      return setNestedProperty({ ...prev }, path, arr);
    });
  }, []);

  const moveItem = useCallback((path, fromIndex, toIndex) => {
    setFormData((prev) => {
      const arr = [...(getNestedProperty(prev, path) || [])];
      if (toIndex < 0 || toIndex >= arr.length) return prev;
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return setNestedProperty({ ...prev }, path, arr);
    });
  }, []);

  /* ── Fetch for Edit Mode ── */
  useEffect(() => {
    if (mode !== "edit" || !id) return;
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/surgeon/get?slug=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (!isMounted) return;

        if (res.ok && data.success && data.surgeonPage) {
          const p = data.surgeonPage;
          setFormData({
            _id: p._id,
            title: p.title || "",
            slug: p.slug || "",
            slugManual: true,

            general: {
              shortDescription: p.general?.shortDescription || "",
              slugHistory: p.general?.slugHistory || [],
            },

            seo: {
              metaTitle: p.seo?.metaTitle || "",
              metaDescription: p.seo?.metaDescription || "",
              keywords: p.seo?.keywords || [],
              canonical: p.seo?.canonical || "",
              ogImage: p.seo?.ogImage || "",
              robots: p.seo?.robots || "index, follow",
            },

            hero: {
              badge: { text: p.hero?.badge?.text || "" },
              title: p.hero?.title || "",
              description: p.hero?.description || "",
              featurePills: p.hero?.featurePills || [],
              buttons: p.hero?.buttons || [],
              stats: p.hero?.stats || [],
              doctorCard: {
                image: { url: p.hero?.doctorCard?.image?.url || "", alt: p.hero?.doctorCard?.image?.alt || "" },
                doctorName: p.hero?.doctorCard?.doctorName || "",
                qualification: p.hero?.doctorCard?.qualification || "",
                designation: p.hero?.doctorCard?.designation || "",
                experience: p.hero?.doctorCard?.experience || "",
              },
            },

            whySkill: {
              badge: { text: p.whySkill?.badge?.text || "" },
              heading: p.whySkill?.heading || "",
              description: p.whySkill?.description || "",
              highlightBox: {
                title: p.whySkill?.highlightBox?.title || "",
                description: p.whySkill?.highlightBox?.description || "",
                icon: p.whySkill?.highlightBox?.icon || "",
              },
              cards: p.whySkill?.cards || [],
            },

            benefits: {
              badge: { text: p.benefits?.badge?.text || "" },
              heading: p.benefits?.heading || "",
              description: p.benefits?.description || "",
              items: p.benefits?.items || [],
            },

            whyClinic: {
              badge: { text: p.whyClinic?.badge?.text || "" },
              heading: p.whyClinic?.heading || "",
              description: p.whyClinic?.description || "",
              image: { url: p.whyClinic?.image?.url || "", alt: p.whyClinic?.image?.alt || "" },
              stats: p.whyClinic?.stats || [],
              accordions: p.whyClinic?.accordions || [],
            },

            surgeonRole: {
              badge: { text: p.surgeonRole?.badge?.text || "" },
              heading: p.surgeonRole?.heading || "",
              description: p.surgeonRole?.description || "",
              steps: p.surgeonRole?.steps || [],
              bottomCTA: {
                title: p.surgeonRole?.bottomCTA?.title || "",
                description: p.surgeonRole?.bottomCTA?.description || "",
                button: {
                  text: p.surgeonRole?.bottomCTA?.button?.text || "",
                  link: p.surgeonRole?.bottomCTA?.button?.link || "",
                  variant: p.surgeonRole?.bottomCTA?.button?.variant || "primary",
                },
              },
            },

            comparison: {
              badge: { text: p.comparison?.badge?.text || "" },
              heading: p.comparison?.heading || "",
              description: p.comparison?.description || "",
              surgeonCard: {
                badge: p.comparison?.surgeonCard?.badge || "",
                title: p.comparison?.surgeonCard?.title || "",
                footer: p.comparison?.surgeonCard?.footer || "",
                items: p.comparison?.surgeonCard?.items || [],
                button: {
                  text: p.comparison?.surgeonCard?.button?.text || "",
                  link: p.comparison?.surgeonCard?.button?.link || "",
                  variant: p.comparison?.surgeonCard?.button?.variant || "primary",
                },
              },
              technicianCard: {
                badge: p.comparison?.technicianCard?.badge || "",
                title: p.comparison?.technicianCard?.title || "",
                footer: p.comparison?.technicianCard?.footer || "",
                items: p.comparison?.technicianCard?.items || [],
                button: {
                  text: p.comparison?.technicianCard?.button?.text || "",
                  link: p.comparison?.technicianCard?.button?.link || "",
                  variant: p.comparison?.technicianCard?.button?.variant || "secondary",
                },
              },
            },

            leadSurgeon: {
              badge: { text: p.leadSurgeon?.badge?.text || "" },
              heading: p.leadSurgeon?.heading || "",
              description: p.leadSurgeon?.description || "",
              doctorImage: { url: p.leadSurgeon?.doctorImage?.url || "", alt: p.leadSurgeon?.doctorImage?.alt || "" },
              gallery: p.leadSurgeon?.gallery || [],
              qualifications: p.leadSurgeon?.qualifications || [],
              stats: p.leadSurgeon?.stats || [],
              buttons: p.leadSurgeon?.buttons || [],
            },

            bookingChecklist: {
              badge: { text: p.bookingChecklist?.badge?.text || "" },
              heading: p.bookingChecklist?.heading || "",
              description: p.bookingChecklist?.description || "",
              questions: p.bookingChecklist?.questions || [],
              warningBox: {
                title: p.bookingChecklist?.warningBox?.title || "",
                description: p.bookingChecklist?.warningBox?.description || "",
                icon: p.bookingChecklist?.warningBox?.icon || "",
              },
            },

            procedures: {
              badge: { text: p.procedures?.badge?.text || "" },
              heading: p.procedures?.heading || "",
              description: p.procedures?.description || "",
              cards: p.procedures?.cards || [],
            },

            consultationCTA: {
              badge: { text: p.consultationCTA?.badge?.text || "" },
              heading: p.consultationCTA?.heading || "",
              description: p.consultationCTA?.description || "",
              image: { url: p.consultationCTA?.image?.url || "", alt: p.consultationCTA?.image?.alt || "" },
              stats: p.consultationCTA?.stats || [],
              buttons: p.consultationCTA?.buttons || [],
              featureCard: {
                icon: p.consultationCTA?.featureCard?.icon || "",
                title: p.consultationCTA?.featureCard?.title || "",
                description: p.consultationCTA?.featureCard?.description || "",
              },
            },

            faq: {
              badge: { text: p.faq?.badge?.text || "" },
              heading: p.faq?.heading || "",
              description: p.faq?.description || "",
              faqs: p.faq?.faqs || [],
            },

            experienceSpecialization: {
              badge: { text: p.experienceSpecialization?.badge?.text || "" },
              heading: p.experienceSpecialization?.heading || "",
              description: p.experienceSpecialization?.description || "",
              items: p.experienceSpecialization?.items || [],
            },

            skillEvaluation: {
              badge: { text: p.skillEvaluation?.badge?.text || "" },
              heading: p.skillEvaluation?.heading || "",
              description: p.skillEvaluation?.description || "",
              items: p.skillEvaluation?.items || [],
            },

            hairlineArtistry: {
              badge: { text: p.hairlineArtistry?.badge?.text || "" },
              heading: p.hairlineArtistry?.heading || "",
              description: p.hairlineArtistry?.description || "",
              image: { url: p.hairlineArtistry?.image?.url || "", alt: p.hairlineArtistry?.image?.alt || "" },
              items: p.hairlineArtistry?.items || [],
            },

            revisionRepair: {
              badge: { text: p.revisionRepair?.badge?.text || "" },
              heading: p.revisionRepair?.heading || "",
              description: p.revisionRepair?.description || "",
              items: p.revisionRepair?.items || [],
            },

            costConsultation: {
              badge: { text: p.costConsultation?.badge?.text || "" },
              heading: p.costConsultation?.heading || "",
              description: p.costConsultation?.description || "",
              disclaimer: p.costConsultation?.disclaimer || "",
              items: p.costConsultation?.items || [],
            },

            visitSurgeon: {
              badge: { text: p.visitSurgeon?.badge?.text || "" },
              heading: p.visitSurgeon?.heading || "",
              description: p.visitSurgeon?.description || "",
              address: p.visitSurgeon?.address || "",
              phone: p.visitSurgeon?.phone || "",
              hours: p.visitSurgeon?.hours || "",
              metro: p.visitSurgeon?.metro || "",
            },

            settings: {
              status: p.settings?.status || "draft",
              featured: !!p.settings?.featured,
              displayOrder: p.settings?.displayOrder ?? 0,
              showInSitemap: p.settings?.showInSitemap !== false,
              allowIndexing: p.settings?.allowIndexing !== false,
            },
          });
        } else {
          toastRef.current?.error("Error", data.message || "Could not find surgeon page.");
        }
      } catch (err) {
        console.error("[useSurgeonForm] Fetch Error:", err);
        toastRef.current?.error("Network Error", "Failed to fetch surgeon page details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [mode, id]);

  /* ── Validate ── */
  const validate = () => {
    const errs = {};
    if (!formData.title?.trim()) errs.title = "Page title is required.";
    if (!formData.slug?.trim()) errs.slug = "Page slug is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) {
      toast?.error("Validation Error", "Please fix required fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    const endpoint = mode === "edit" ? "/api/surgeon/update" : "/api/surgeon/create";
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast?.success("Success!", data.message || `Surgeon page ${mode === "edit" ? "updated" : "created"} successfully.`);
        setTimeout(() => router.push("/admin/surgeon"), 1200);
      } else {
        toast?.error("Error", data.message || "Failed to save surgeon page.");
      }
    } catch (err) {
      console.error("[useSurgeonForm] Submit Error:", err);
      toast?.error("Network Error", "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    submitting,
    errors,
    updateField,
    updateArrayItem,
    addItem,
    removeItem,
    moveItem,
    handleSubmit,
  };
}
