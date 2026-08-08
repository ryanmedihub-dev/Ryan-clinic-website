"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─── Initial Form State ─────────────────────────────────────────────────── */
/* ─── Initial Form State ─────────────────────────────────────────────────── */
export const defaultSectionVisibility = {
  hero: true,
  intro: true,
  services: true,
  pricing: true,
  graftPricing: true,
  priceFactors: true,
  includedSection: true,
  consultation: true,
  faq: true,
  clinic: true,
};

export function getRecommendedSectionVisibility(pageType) {
  switch (pageType) {
    case "prp":
    case "dhi":
    case "beard-transplant":
    case "other":
      return {
        ...defaultSectionVisibility,
        graftPricing: false,
      };
    case "hair-transplant":
    default:
      return {
        ...defaultSectionVisibility,
      };
  }
}

export const initialCostFormState = {
  title: "",
  slug: "",
  slugManual: false,
  pageType: "hair-transplant",
  sectionVisibility: { ...defaultSectionVisibility },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonical: "",
    ogImage: "",
    robots: "index, follow",
  },
  hero: {
    breadcrumbs: [],
    title: "",
    pricingLine: "",
    heroImage: "",
    heroImageAlt: "",
    buttons: [],
    stats: [],
  },
  intro: {
    badge: "",
    heading: "",
    description: "",
    summaryRows: [],
  },
  services: {
    badge: "",
    heading: "",
    description: "",
    cards: [],
  },
  pricing: {
    heading: "",
    description: "",
    cards: [],
  },
  graftPricing: {
    badge: "",
    heading: "",
    description: "",
    cards: [],
  },
  techniqueComparison: {
    badge: "",
    heading: "",
    description: "",
    columns: [],
    rows: [],
  },
  includedSection: {
    badge: "",
    heading: "",
    description: "",
    items: [],
    disclosures: [],
    buttonText: "Get Written Graft Quote",
    buttonLink: "/contact",
  },
  priceFactors: {
    badge: "",
    heading: "",
    description: "",
    factors: [],
    emiPlans: [],
    emiBadge: "",
    emiHeading: "",
  },
  consultation: {
    badge: "",
    heading: "",
    description: "",
    features: [],
    buttonText: "Book Free Consultation",
    buttonLink: "https://wa.me/919911111247",
    image: "",
    imageAlt: "",
  },
  faq: {
    badge: "",
    heading: "",
    description: "",
    items: [],
  },
  /* ─── Generic / Multi-Type Sections ─────────────────────────────────────── */
  pricingOptions: {
    badge: "",
    heading: "",
    description: "",
    items: [],
  },
  contentSections: [],
  mythsFacts: {
    badge: "",
    heading: "",
    description: "",
    pairs: [],
  },
  visitClinic: {
    badge: "",
    heading: "",
    description: "",
    address: "",
    city: "",
    mapEmbedUrl: "",
    phone: "",
    whatsapp: "",
    timings: "",
    landmark: "",
    nearbyAreas: [],
    buttonText: "Get Directions",
    buttonLink: "",
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

export function useCostForm({ mode = "create", id = null, toast }) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialCostFormState);
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const hasUserCustomizedVisibility = useRef(false);

  /* ── Keep a stable ref to toast so useEffect doesn't re-run on every render ── */
  const toastRef = useRef(toast);
  useEffect(() => { toastRef.current = toast; });

  /* ── Auto-slug generator ── */
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  /* ── Reset section visibility to recommended defaults for current pageType ── */
  const resetSectionVisibilityDefaults = useCallback((overridePageType) => {
    setFormData((prev) => {
      const pType = overridePageType || prev.pageType || "hair-transplant";
      const recommended = getRecommendedSectionVisibility(pType);
      return {
        ...prev,
        sectionVisibility: { ...recommended },
      };
    });
  }, []);

  /* ── Field Update Helpers ── */
  const updateField = useCallback((path, value) => {
    setFormData((prev) => {
      const next = setNestedProperty({ ...prev }, path, value);

      // Auto-update slug when title changes unless manually edited
      if (path === "title") {
        const currentSlug = prev.slug;
        const expectedAutoSlug = generateSlug(prev.title || "");
        if (!prev.slugManual || !currentSlug || currentSlug === expectedAutoSlug) {
          next.slug = generateSlug(value);
        }
      }

      if (path === "slug") {
        next.slugManual = true;
      }

      // Track manual visibility changes
      if (path.startsWith("sectionVisibility.")) {
        hasUserCustomizedVisibility.current = true;
      }

      // When pageType changes on a newly created page, apply recommended defaults if user hasn't customized toggles yet
      if (path === "pageType" && mode === "create" && !hasUserCustomizedVisibility.current) {
        next.sectionVisibility = getRecommendedSectionVisibility(value);
      }

      return next;
    });

    // Clear error for field if fixed
    setErrors((prevErrs) => {
      if (prevErrs[path]) {
        const copy = { ...prevErrs };
        delete copy[path];
        return copy;
      }
      return prevErrs;
    });
  }, [mode]);

  const updateArrayItem = useCallback((path, index, itemKeyOrValue, value) => {
    setFormData((prev) => {
      const arr = [...(getNestedProperty(prev, path) || [])];
      if (typeof itemKeyOrValue === "string" && value !== undefined) {
        arr[index] = { ...arr[index], [itemKeyOrValue]: value };
      } else {
        arr[index] = itemKeyOrValue;
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

  /* ── Fetch Data for Edit Mode ── */
  useEffect(() => {
    if (mode !== "edit" || !id) return;

    let isMounted = true;
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/cost/get?slug=${encodeURIComponent(id)}`);
        const data = await res.json();

        if (!isMounted) return;

        if (res.ok && data.success && data.costPage) {
          const p = data.costPage;
          const validTypes = ["hair-transplant", "prp", "dhi", "beard-transplant", "other"];
          const fetchedPageType = validTypes.includes(p.pageType) ? p.pageType : "hair-transplant";

          const fetchedVisibility = {
            ...defaultSectionVisibility,
            ...(p.sectionVisibility || {}),
          };

          setFormData({
            _id: p._id,
            title: p.title || "",
            slug: p.slug || "",
            slugManual: true,
            pageType: fetchedPageType,
            sectionVisibility: fetchedVisibility,
            seo: {
              metaTitle: p.seo?.metaTitle || "",
              metaDescription: p.seo?.metaDescription || "",
              keywords: p.seo?.keywords || [],
              canonical: p.seo?.canonical || "",
              ogImage: p.seo?.ogImage || "",
              robots: p.seo?.robots || "index, follow",
            },
            hero: {
              breadcrumbs: p.hero?.breadcrumbs || [],
              title: p.hero?.title || "",
              pricingLine: p.hero?.pricingLine || "",
              heroImage: p.hero?.heroImage || "",
              heroImageAlt: p.hero?.heroImageAlt || "",
              buttons: p.hero?.buttons || [],
              stats: p.hero?.stats || [],
            },
            intro: {
              badge: p.intro?.badge || "",
              heading: p.intro?.heading || "",
              description: p.intro?.description || "",
              summaryRows: p.intro?.summaryRows || [],
            },
            services: {
              badge: p.services?.badge || "",
              heading: p.services?.heading || "",
              description: p.services?.description || "",
              cards: p.services?.cards || [],
            },
            pricing: {
              heading: p.pricing?.heading || p.pricingOptions?.heading || "",
              description: p.pricing?.description || p.pricingOptions?.description || "",
              cards: p.pricing?.cards?.length ? p.pricing.cards : (p.pricingOptions?.items || []),
            },
            graftPricing: {
              badge: p.graftPricing?.badge || "",
              heading: p.graftPricing?.heading || "",
              description: p.graftPricing?.description || "",
              cards: p.graftPricing?.cards || [],
            },
            techniqueComparison: {
              badge: p.techniqueComparison?.badge || "",
              heading: p.techniqueComparison?.heading || "",
              description: p.techniqueComparison?.description || "",
              columns: p.techniqueComparison?.columns || [],
              rows: p.techniqueComparison?.rows || [],
            },
            includedSection: {
              badge: p.includedSection?.badge || "",
              heading: p.includedSection?.heading || "",
              description: p.includedSection?.description || "",
              items: p.includedSection?.items || p.includedSection?.hiddenCosts || [],
              disclosures: p.includedSection?.disclosures || p.includedSection?.guarantees || [],
              buttonText: p.includedSection?.buttonText || "Get Written Graft Quote",
              buttonLink: p.includedSection?.buttonLink || "/contact",
            },
            priceFactors: {
              badge: p.priceFactors?.badge || "",
              heading: p.priceFactors?.heading || "",
              description: p.priceFactors?.description || "",
              factors: p.priceFactors?.factors || p.priceFactors?.items || [],
              emiPlans: p.priceFactors?.emiPlans || [],
              emiBadge: p.priceFactors?.emiBadge || "",
              emiHeading: p.priceFactors?.emiHeading || "",
            },
            consultation: {
              badge: p.consultation?.badge || "",
              heading: p.consultation?.heading || "",
              description: p.consultation?.description || "",
              features: p.consultation?.features || [],
              buttonText: p.consultation?.buttonText || "Book Free Consultation",
              buttonLink: p.consultation?.buttonLink || "https://wa.me/919911111247",
              image: p.consultation?.image || "",
              imageAlt: p.consultation?.imageAlt || "",
            },
            faq: {
              badge: p.faq?.badge || "",
              heading: p.faq?.heading || "",
              description: p.faq?.description || "",
              items: (p.faq?.items?.length ? p.faq.items : (p.faq?.faqs || [])),
            },
            /* ── Generic / Multi-Type Sections ── */
            pricingOptions: {
              badge: p.pricingOptions?.badge || "",
              heading: p.pricingOptions?.heading || "",
              description: p.pricingOptions?.description || "",
              items: p.pricingOptions?.items || [],
            },
            contentSections: p.contentSections || [],
            mythsFacts: {
              badge: p.mythsFacts?.badge || "",
              heading: p.mythsFacts?.heading || "",
              description: p.mythsFacts?.description || "",
              pairs: p.mythsFacts?.pairs || [],
            },
            visitClinic: {
              badge: p.visitClinic?.badge || "",
              heading: p.visitClinic?.heading || "",
              description: p.visitClinic?.description || "",
              address: p.visitClinic?.address || "",
              city: p.visitClinic?.city || "",
              mapEmbedUrl: p.visitClinic?.mapEmbedUrl || "",
              phone: p.visitClinic?.phone || "",
              whatsapp: p.visitClinic?.whatsapp || "",
              timings: p.visitClinic?.timings || "",
              landmark: p.visitClinic?.landmark || "",
              nearbyAreas: p.visitClinic?.nearbyAreas || [],
              buttonText: p.visitClinic?.buttonText || "Get Directions",
              buttonLink: p.visitClinic?.buttonLink || "",
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
          toastRef.current?.error("Error", data.message || "Could not find cost page.");
        }
      } catch (err) {
        console.error("[useCostForm] Fetch Error:", err);
        toastRef.current?.error("Network Error", "Failed to fetch cost page details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPageData();
    return () => { isMounted = false; };
  }, [mode, id]); // ← toast removed: stored in toastRef to avoid infinite re-fetch loop

  /* ── Form Validation ── */
  const validate = () => {
    const errs = {};
    if (!formData.title?.trim()) {
      errs.title = "Page title is required.";
    }
    if (!formData.slug?.trim()) {
      errs.slug = "Page slug is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Form Submit (Create & Update) ── */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validate()) {
      toast?.error("Validation Error", "Please fix required fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    const endpoint = mode === "edit" ? "/api/cost/update" : "/api/cost/create";
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast?.success("Success!", data.message || `Cost page ${mode === "edit" ? "updated" : "created"} successfully.`);
        setTimeout(() => router.push("/admin/cost"), 1200);
      } else {
        toast?.error("Error", data.message || "Failed to save cost page.");
      }
    } catch (err) {
      console.error("[useCostForm] Submit Error:", err);
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
    resetSectionVisibilityDefaults,
    handleSubmit,
  };
}
