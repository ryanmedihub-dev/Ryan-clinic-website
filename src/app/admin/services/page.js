"use client";

import { useRef, useState, useCallback, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });
import "suneditor/dist/css/suneditor.min.css";

// Memoized Input Field Component
const InputField = memo(
  ({ label, value, onChange, placeholder, required, type = "text", error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

// Memoized Editor Field Component
const EditorField = memo(
  ({ label, editorRef, onChange, defaultValue, editorId }) => {
    const [editorError, setEditorError] = useState(null);

    const handleEditorError = useCallback((error) => {
      console.warn("SunEditor error caught:", error);
      setEditorError(error);
    }, []);

    const getSunEditorInstance = useCallback(
      (sunEditor) => {
        if (sunEditor) {
          try {
            editorRef.current = sunEditor;
            if (sunEditor.options) {
              sunEditor.options.enableAutoSize = false;
            }
          } catch (error) {
            console.warn("Error setting up editor instance:", error);
            handleEditorError(error);
          }
        }
      },
      [editorRef, handleEditorError]
    );

    const handleLoad = useCallback(() => {
      try {
        if (editorRef.current && defaultValue) {
          editorRef.current.setContents(defaultValue);
        }
      } catch (error) {
        console.warn("Error loading editor content:", error);
        handleEditorError(error);
      }
    }, [editorRef, defaultValue, handleEditorError]);

    const sunEditorOptions = useMemo(
      () => ({
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
        defaultStyle:
          "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size: 16px;",
        imageUploadUrl: "/api/upload/editor",
      }),
      []
    );

    if (editorError) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <div className="w-full p-4 border border-red-300 rounded-lg bg-red-50">
            <p className="text-red-700 text-sm mb-2">
              Editor temporarily unavailable. Attempting to recover...
            </p>
            <textarea
              value={defaultValue || ""}
              onChange={(e) => onChange(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter content here..."
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="sun-editor-wrapper">
          <SunEditor
            key={editorId}
            getSunEditorInstance={getSunEditorInstance}
            onChange={onChange}
            defaultValue={defaultValue || ""}
            setOptions={sunEditorOptions}
            onLoad={handleLoad}
            onError={handleEditorError}
            disable={false}
            readOnly={false}
            placeholder="Enter content here..."
            autoFocus={false}
            lang="en"
          />
        </div>
      </div>
    );
  }
);

// Memoized Section Component
const Section = memo(({ title, description, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
    {children}
  </div>
));

// Memoized FAQ Item Component
const FAQItem = memo(
  ({ entry, index, onQuestionChange, onAnswerChange, onRemove, canRemove }) => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          FAQ {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        )}
      </div>
      <InputField
        label="Question"
        value={entry.question}
        onChange={onQuestionChange}
        placeholder="Enter FAQ question"
        required={true}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Answer
        </label>
        <textarea
          value={entry.answer}
          onChange={onAnswerChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Enter FAQ answer"
          required
        />
      </div>
    </div>
  )
);

// Memoized Benefit Component Component
const BenefitComponent = memo(
  ({ component, index, onChange, onRemove, canRemove }) => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Benefit {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        )}
      </div>
      <InputField
        label="Title"
        value={component.title}
        onChange={(e) => onChange(index, "title", e.target.value)}
        placeholder="Enter benefit title"
        required={true}
      />
      <InputField
        label="Description"
        value={component.description}
        onChange={(e) => onChange(index, "description", e.target.value)}
        placeholder="Enter benefit description"
        required={true}
      />
      <InputField
        label="Icon URL"
        value={component.icon}
        onChange={(e) => onChange(index, "icon", e.target.value)}
        placeholder="Enter icon URL"
        required={true}
      />
    </div>
  )
);

// Set display names for better debugging
InputField.displayName = "InputField";
EditorField.displayName = "EditorField";
Section.displayName = "Section";
FAQItem.displayName = "FAQItem";
BenefitComponent.displayName = "BenefitComponent";

// ── Shared style tokens for section editors ────────────────────────────────
const FC = "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors";
const LC = "block text-xs font-medium text-gray-600 mb-1";

// Helper: parse JSON string safely
function parseData(val) {
  try { return JSON.parse(val || "{}"); } catch { return {}; }
}

// ── WhyChooseUs section editor ─────────────────────────────────────────────
const WhyChooseUsEditor = memo(({ value, onChange }) => {
  const data = useMemo(() => parseData(value), [value]);
  const set = useCallback((k, v) => {
    const d = { ...data };
    if (v) d[k] = v; else delete d[k];
    onChange(Object.keys(d).length ? JSON.stringify(d) : "");
  }, [data, onChange]);
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 italic">City is auto-detected from the URL slug. Override here only if needed.</p>
      <div>
        <label className={LC}>City Override (optional)</label>
        <input type="text" className={FC} value={data.city || ""} onChange={e => set("city", e.target.value)} placeholder="e.g. Pune (leave blank to auto-detect)" />
      </div>
    </div>
  );
});
WhyChooseUsEditor.displayName = "WhyChooseUsEditor";

// ── CostSection editor ─────────────────────────────────────────────────────
const CostSectionEditor = memo(({ value, onChange }) => {
  const data = useMemo(() => parseData(value), [value]);
  const set = useCallback((k, v) => {
    const d = { ...data };
    if (v) d[k] = v; else delete d[k];
    onChange(Object.keys(d).length ? JSON.stringify(d) : "");
  }, [data, onChange]);
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 italic">All fields optional — blank means use page defaults.</p>
      <div>
        <label className={LC}>City Override</label>
        <input type="text" className={FC} value={data.city || ""} onChange={e => set("city", e.target.value)} placeholder="e.g. Pune" />
      </div>
      <div>
        <label className={LC}>Section Title</label>
        <input type="text" className={FC} value={data.sectionTitle || ""} onChange={e => set("sectionTitle", e.target.value)} placeholder="Hair Transplant Cost" />
      </div>
      <div>
        <label className={LC}>Section Description</label>
        <textarea className={FC + " resize-none"} rows={3} value={data.sectionDescription || ""} onChange={e => set("sectionDescription", e.target.value)} placeholder="Hair transplant cost in [city] at Ryan Clinic starts from ₹40,000..." />
      </div>
    </div>
  );
});
CostSectionEditor.displayName = "CostSectionEditor";

// ── OurDoctor editor ───────────────────────────────────────────────────────
const OurDoctorEditor = memo(({ value, onChange }) => {
  const data = useMemo(() => parseData(value), [value]);
  const doctor = data.doctor || {};

  const setTop = useCallback((k, v) => {
    const d = { ...data };
    if (v) d[k] = v; else delete d[k];
    onChange(JSON.stringify(d));
  }, [data, onChange]);

  const setDoctor = useCallback((k, v) => {
    const d = { ...data, doctor: { ...doctor } };
    if (v) d.doctor[k] = v; else delete d.doctor[k];
    if (!Object.keys(d.doctor).length) delete d.doctor;
    onChange(JSON.stringify(d));
  }, [data, doctor, onChange]);

  const setBioLine = useCallback((idx, v) => {
    const lines = [...(doctor.bioLines || ["", ""])];
    lines[idx] = v;
    setDoctor("bioLines", lines.some(Boolean) ? lines : undefined);
  }, [doctor, setDoctor]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 italic">All fields optional — blank means use default doctor info.</p>
      <div>
        <label className={LC}>City Override</label>
        <input type="text" className={FC} value={data.city || ""} onChange={e => setTop("city", e.target.value)} placeholder="e.g. Pune" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LC}>Doctor Name</label>
          <input type="text" className={FC} value={doctor.name || ""} onChange={e => setDoctor("name", e.target.value)} placeholder="Dr. Pranendra Singh" />
        </div>
        <div>
          <label className={LC}>Doctor Title</label>
          <input type="text" className={FC} value={doctor.title || ""} onChange={e => setDoctor("title", e.target.value)} placeholder="Medical Director & Chief Surgeon" />
        </div>
      </div>
      <div>
        <label className={LC}>Doctor Photo URL</label>
        <input type="text" className={FC} value={doctor.image || ""} onChange={e => setDoctor("image", e.target.value)} placeholder="/uploads/doctor-photo.jpg" />
      </div>
      <div>
        <label className={LC}>Bio — Paragraph 1</label>
        <textarea className={FC + " resize-none"} rows={3} value={doctor.bioLines?.[0] || ""} onChange={e => setBioLine(0, e.target.value)} placeholder={`Your hair transplant in [city] is led by Dr. Pranendra Singh...`} />
      </div>
      <div>
        <label className={LC}>Bio — Paragraph 2</label>
        <textarea className={FC + " resize-none"} rows={2} value={doctor.bioLines?.[1] || ""} onChange={e => setBioLine(1, e.target.value)} placeholder="His commitment is simple: every patient receives world-class care..." />
      </div>
    </div>
  );
});
OurDoctorEditor.displayName = "OurDoctorEditor";

// ── AreasWeServe editor ────────────────────────────────────────────────────
const AreasWeServeEditor = memo(({ value, onChange }) => {
  const data = useMemo(() => parseData(value), [value]);
  const bd = data.branchData || {};
  const initialAreas = useMemo(() => (bd.areas || []).join(", "), [bd.areas]);

  const setTop = useCallback((k, v) => {
    const d = { ...data };
    if (v) d[k] = v; else delete d[k];
    onChange(JSON.stringify(d));
  }, [data, onChange]);

  const setBranch = useCallback((k, v) => {
    const d = { ...data, branchData: { ...bd } };
    if (v) d.branchData[k] = v; else delete d.branchData[k];
    if (!Object.keys(d.branchData).length) delete d.branchData;
    onChange(JSON.stringify(d));
  }, [data, bd, onChange]);

  const handleAreas = useCallback((text) => {
    const areas = text.split(",").map(a => a.trim()).filter(Boolean);
    setBranch("areas", areas.length ? areas : undefined);
  }, [setBranch]);

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400 italic">Leave blank to use built-in branch data from AreasWeServe.js. Filled fields override defaults.</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LC}>City Override</label>
          <input type="text" className={FC} value={data.city || ""} onChange={e => setTop("city", e.target.value)} placeholder="e.g. Pune" />
        </div>
        <div>
          <label className={LC}>Branch Name Override</label>
          <input type="text" className={FC} value={data.branch || ""} onChange={e => setTop("branch", e.target.value)} placeholder="e.g. Pune" />
        </div>
      </div>
      <div>
        <label className={LC}>Clinic Address</label>
        <input type="text" className={FC} value={bd.address || ""} onChange={e => setBranch("address", e.target.value)} placeholder="Full clinic address" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LC}>Phone</label>
          <input type="text" className={FC} value={bd.phone || ""} onChange={e => setBranch("phone", e.target.value)} placeholder="+91-9911111247" />
        </div>
        <div>
          <label className={LC}>Hours</label>
          <input type="text" className={FC} value={bd.hours || ""} onChange={e => setBranch("hours", e.target.value)} placeholder="Mon–Sat: 9:00 AM – 7:00 PM" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LC}>Nearest Metro / Transit</label>
          <input type="text" className={FC} value={bd.metro || ""} onChange={e => setBranch("metro", e.target.value)} placeholder="Station name" />
        </div>
        <div>
          <label className={LC}>Google Maps URL</label>
          <input type="text" className={FC} value={bd.mapUrl || ""} onChange={e => setBranch("mapUrl", e.target.value)} placeholder="https://maps.google.com/?q=..." />
        </div>
      </div>
      <div>
        <label className={LC}>Areas Served (comma-separated)</label>
        <textarea
          key={initialAreas}
          className={FC + " resize-none"}
          rows={3}
          defaultValue={initialAreas}
          onBlur={e => handleAreas(e.target.value)}
          placeholder="Baner, Balewadi, Wakad, Hinjewadi, Kothrud..."
        />
        <p className="text-[11px] text-gray-400 mt-1">Click away (blur) to save the areas list.</p>
      </div>
    </div>
  );
});
AreasWeServeEditor.displayName = "AreasWeServeEditor";

const ALL_SECTIONS = [
  { key: "overview",           label: "Overview + Contact Form",       hasData: false },
  { key: "ourResults",         label: "Our Results Gallery",            hasData: false },
  { key: "typesSection",       label: "Service Types / Images",         hasData: false },
  { key: "whyChooseUs",        label: "Why Choose Ryan Clinic",         hasData: true,  dataHelp: '{"city":"Pune"}' },
  { key: "costSection",        label: "Cost / Pricing",                 hasData: true,  dataHelp: '{"city":"Delhi","sectionTitle":"Hair Transplant Cost","sectionDescription":"Custom description","pricing":[{"num":"01","grafts":"Up to 1,000 Grafts","min":"Rs. 30,000/-","max":"Rs. 40,000/-","time":"4–5 hrs"}]}' },
  { key: "ourDoctor",          label: "Our Doctor Profile",             hasData: true,  dataHelp: '{"city":"Delhi","doctor":{"name":"Dr. Name","title":"Surgeon","image":"/uploads/photo.jpg","bioLines":["Bio line 1","Bio line 2"],"stats":[{"num":"12+","label":"Years Exp"}],"qualifications":[{"degree":"MBBS","institute":"AIIMS"}],"certifications":["Cert 1"],"specializations":["FUE"]}}' },
  { key: "differencesSection", label: "Technique Comparison (FUT/FUE)", hasData: true,  dataHelp: '{"features":[{"label":"Scarring","fut":{"value":"Linear scar","bad":true},"fue":{"value":"Tiny dots"},"sapphire":{"value":"Minimal dots"}}]}' },
  { key: "pleoFeatures",       label: "Benefits / Features",            hasData: false },
  { key: "whyDoctorMatters",   label: "Why Doctor Matters",             hasData: true,  dataHelp: '{"risks":[{"number":"01","title":"Confirm who operates","body":"Body text","type":"check"}],"comparison":[{"aspect":"Who operates","doctorLed":"Certified doctor","techLed":"Technician"}]}' },
  { key: "recoveryTimeline",   label: "Recovery Timeline",              hasData: true,  dataHelp: '{"phases":[{"period":"Day 1–10","phase":"Initial Healing","color":"#D32F2F","progress":15,"points":["Point 1"],"tip":"Tip text"}]}' },
  { key: "extraFields",        label: "Additional Fields (Detail 1 & 2)", hasData: false },
  { key: "areasWeServe",       label: "Areas We Serve",                 hasData: true,  dataHelp: '{"city":"Delhi","branch":"Delhi","branchData":{"address":"Full address","mapUrl":"https://maps.google.com/?q=...","phone":"+91-9911111247","hours":"Mon–Sun: 9AM–7PM","metro":"Metro Station","areas":["Area 1","Area 2"]}}' },
  { key: "testimonials",       label: "Testimonials",                   hasData: false },
  { key: "faq",                label: "FAQ Section",                    hasData: false },
];

const DEFAULT_PAGE_SECTIONS = ALL_SECTIONS.map((s, i) => ({
  key: s.key,
  label: s.label,
  hasData: s.hasData,
  dataHelp: s.dataHelp || "",
  enabled: !["costSection", "ourDoctor", "differencesSection", "whyDoctorMatters", "recoveryTimeline", "areasWeServe"].includes(s.key),
  order: i,
}));

export default function CreateServicePage() {
  // Editor refs
  const overviewEditorRef = useRef(null);
  const typesEditorRef = useRef(null);
  const additionalDetail1EditorRef = useRef(null);
  const additionalDetail2EditorRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    bannerData: {
      title: "",
      description: "",
      imageurl: "",
      imagealt: "" // Added imagealt field
    },
    benefitsData: {
      title: "",
      description: "",
      component: [{
        title: "",
        description: "",
        icon: ""
      }]
    },
    extraFields: {
      detail1: "",
      detail2: ""
    },
    faq: [{
      question: "",
      answer: ""
    }],
    metadata: {
      pageName: "",
      pageType: "transplant",
      description: "",
      pageurl: "",
      title: "",
      overviewData: "",
      keywords: [] // Added keywords array
    },
    typesData: {
      details: "",
      images: [] // Changed to array of objects
    }
  });
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [keywordInput, setKeywordInput] = useState("");
  const [pageSections, setPageSections] = useState(DEFAULT_PAGE_SECTIONS);
  const [expandedSections, setExpandedSections] = useState({});
  const [sectionDataInputs, setSectionDataInputs] = useState({});

  // Optimized form update helper with batch updates
  const updateForm = useCallback((updates) => {
    setForm((prev) => {
      const next = { ...prev };

      // Handle multiple updates in a single setState call
      if (Array.isArray(updates)) {
        updates.forEach(({ path, value }) => {
          path.reduce((obj, key, idx) => {
            if (idx === path.length - 1) obj[key] = value;
            else obj[key] = { ...obj[key] };
            return obj[key];
          }, next);
        });
      } else {
        const { path, value } = updates;
        path.reduce((obj, key, idx) => {
          if (idx === path.length - 1) obj[key] = value;
          else obj[key] = { ...obj[key] };
          return obj[key];
        }, next);
      }

      return next;
    });
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleMetadataChange = useCallback(
    (field) => (e) => {
      updateForm({ path: ["metadata", field], value: e.target.value });
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }));
      }
    },
    [updateForm, errors]
  );

  const handleBannerDataChange = useCallback(
    (field) => (e) => {
      updateForm({ path: ["bannerData", field], value: e.target.value });
    },
    [updateForm]
  );

  const handleBenefitsDataChange = useCallback(
    (field) => (e) => {
      updateForm({ path: ["benefitsData", field], value: e.target.value });
    },
    [updateForm]
  );

  // Editor change handlers
  const handleOverviewChange = useCallback(
    (content) => {
      updateForm({ path: ["metadata", "overviewData"], value: content });
    },
    [updateForm]
  );

  const handleTypesChange = useCallback(
    (content) => {
      updateForm({ path: ["typesData", "details"], value: content });
    },
    [updateForm]
  );

  const handleAdditionalDetail1Change = useCallback(
    (content) => {
      updateForm({ path: ["extraFields", "detail1"], value: content });
    },
    [updateForm]
  );

  const handleAdditionalDetail2Change = useCallback(
    (content) => {
      updateForm({ path: ["extraFields", "detail2"], value: content });
    },
    [updateForm]
  );

  // Image upload handlers
  const handleBannerImageUpload = useCallback(
    (url) => {
      updateForm({ path: ["bannerData", "imageurl"], value: url });
    },
    [updateForm]
  );

  const handleServiceImageUpload = useCallback(
    (index) => (url) => {
      const newImages = [...form.typesData.images];
      if (!newImages[index]) {
        newImages[index] = { url: "", alt: "" };
      }
      newImages[index] = { ...newImages[index], url };
      updateForm({ path: ["typesData", "images"], value: newImages });
    },
    [form.typesData.images, updateForm]
  );

  const handleImageAltChange = useCallback(
    (index, alt) => {
      const newImages = [...form.typesData.images];
      if (!newImages[index]) {
        newImages[index] = { url: "", alt: "" };
      }
      newImages[index] = { ...newImages[index], alt };
      updateForm({ path: ["typesData", "images"], value: newImages });
    },
    [form.typesData.images, updateForm]
  );

  // FAQ management
  const addFAQItem = useCallback(() => {
    const newFaqs = [...form.faq, { question: "", answer: "" }];
    updateForm({ path: ["faq"], value: newFaqs });
  }, [form.faq, updateForm]);

  const updateFAQItem = useCallback(
    (index, field) => (e) => {
      const newFaqs = [...form.faq];
      newFaqs[index][field] = e.target.value;
      updateForm({ path: ["faq"], value: newFaqs });
    },
    [form.faq, updateForm]
  );

  const removeFAQItem = useCallback(
    (index) => () => {
      const newFaqs = form.faq.filter((_, idx) => idx !== index);
      updateForm({
        path: ["faq"],
        value: newFaqs.length ? newFaqs : [{ question: "", answer: "" }],
      });
    },
    [form.faq, updateForm]
  );

  // Benefit components management
  const addBenefitComponent = useCallback(() => {
    const newComponents = [...form.benefitsData.component, { 
      title: "", 
      description: "", 
      icon: "" 
    }];
    updateForm({ path: ["benefitsData", "component"], value: newComponents });
  }, [form.benefitsData.component, updateForm]);

  const updateBenefitComponent = useCallback(
    (index, field, value) => {
      const newComponents = [...form.benefitsData.component];
      newComponents[index][field] = value;
      updateForm({ path: ["benefitsData", "component"], value: newComponents });
    },
    [form.benefitsData.component, updateForm]
  );

  const removeBenefitComponent = useCallback(
    (index) => () => {
      const newComponents = form.benefitsData.component.filter((_, idx) => idx !== index);
      updateForm({
        path: ["benefitsData", "component"],
        value: newComponents.length ? newComponents : [{ title: "", description: "", icon: "" }],
      });
    },
    [form.benefitsData.component, updateForm]
  );

  // Keywords management
  const handleAddKeyword = useCallback(() => {
    if (keywordInput.trim() && !form.metadata.keywords.includes(keywordInput.trim())) {
      const newKeywords = [...form.metadata.keywords, keywordInput.trim()];
      updateForm({ path: ["metadata", "keywords"], value: newKeywords });
      setKeywordInput("");
    }
  }, [keywordInput, form.metadata.keywords, updateForm]);

  const handleRemoveKeyword = useCallback((index) => {
    const newKeywords = form.metadata.keywords.filter((_, i) => i !== index);
    updateForm({ path: ["metadata", "keywords"], value: newKeywords });
  }, [form.metadata.keywords, updateForm]);

  const handleKeywordInputKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  }, [handleAddKeyword]);

  // Page sections management
  const toggleSectionEnabled = useCallback((idx) => {
    setPageSections((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, enabled: !s.enabled } : s))
    );
  }, []);

  const moveSectionUp = useCallback((idx) => {
    if (idx === 0) return;
    setPageSections((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const moveSectionDown = useCallback((idx) => {
    setPageSections((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const toggleSectionExpand = useCallback((key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const updateSectionDataInput = useCallback((key, value) => {
    setSectionDataInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const parseSectionData = useCallback(
    (key) => {
      const raw = sectionDataInputs[key];
      if (!raw?.trim()) return {};
      try {
        return JSON.parse(raw);
      } catch {
        return {};
      }
    },
    [sectionDataInputs]
  );

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!form.metadata.pageName?.trim()) newErrors.pageName = "Page name is required";
    if (!form.metadata.title?.trim()) newErrors.serviceTitle = "Service title is required";
    if (!form.metadata.pageurl?.trim()) newErrors.pageUrl = "Page URL is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.metadata]);

  // Reset form after successful submission
  const resetForm = useCallback(() => {
    const initialForm = {
      bannerData: {
        title: "",
        description: "",
        imageurl: "",
        imagealt: ""
      },
      benefitsData: {
        title: "",
        description: "",
        component: [{
          title: "",
          description: "",
          icon: ""
        }]
      },
      extraFields: {
        detail1: "",
        detail2: ""
      },
      faq: [{
        question: "",
        answer: ""
      }],
      metadata: {
        pageName: "",
        pageType: "transplant",
        description: "",
        pageurl: "",
        title: "",
        overviewData: "",
        keywords: []
      },
      typesData: {
        details: "",
        images: []
      }
    };

    setForm(initialForm);
    setKeywordInput("");
    setErrors({});
    setPageSections(DEFAULT_PAGE_SECTIONS);
    setExpandedSections({});
    setSectionDataInputs({});

    // Reset editors with proper error handling
    setTimeout(() => {
      [
        overviewEditorRef,
        typesEditorRef,
        additionalDetail1EditorRef,
        additionalDetail2EditorRef,
      ].forEach((ref) => {
        try {
          if (ref.current && typeof ref.current.setContents === "function") {
            ref.current.setContents("");
          }
        } catch (error) {
          console.warn("Error resetting editor:", error);
        }
      });
    }, 100);
  }, []);

  // Form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setServerMsg("");

      if (!validateForm()) {
        setServerMsg("Please fix the validation errors before submitting.");
        setLoading(false);
        return;
      }

      try {
        const sectionsPayload = pageSections.map((s) => ({
          key: s.key,
          enabled: s.enabled,
          order: s.order,
          data: s.hasData ? parseSectionData(s.key) : {},
        }));

        const res = await fetch("/api/service/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, pageSections: sectionsPayload }),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to create service");
        }

        const data = await res.json();
        setServerMsg("Service created successfully!");

        if (data.ok) {
          resetForm();
        }
      } catch (err) {
        console.error("Error creating service:", err);
        setServerMsg(`Error creating service: ${err.message}`);
      } finally {
        setLoading(false);
      }
    },
    [form, validateForm, resetForm]
  );

  // Render the right editor for each section's data panel
  const renderSectionDataEditor = useCallback((section) => {
    const val = sectionDataInputs[section.key] || "";
    const onChangeFn = (v) => updateSectionDataInput(section.key, v);

    switch (section.key) {
      case "whyChooseUs":
        return <WhyChooseUsEditor value={val} onChange={onChangeFn} />;
      case "costSection":
        return <CostSectionEditor value={val} onChange={onChangeFn} />;
      case "ourDoctor":
        return <OurDoctorEditor value={val} onChange={onChangeFn} />;
      case "areasWeServe":
        return <AreasWeServeEditor value={val} onChange={onChangeFn} />;
      default:
        // JSON textarea fallback for differencesSection, whyDoctorMatters, recoveryTimeline
        return (
          <>
            <details className="text-xs">
              <summary className="cursor-pointer text-blue-600 hover:underline">Show expected JSON format</summary>
              <pre className="mt-2 p-3 bg-white border border-gray-200 rounded-md text-[11px] text-gray-600 overflow-x-auto whitespace-pre-wrap break-all">
                {section.dataHelp}
              </pre>
            </details>
            <textarea
              value={val}
              onChange={(e) => updateSectionDataInput(section.key, e.target.value)}
              rows={6}
              placeholder='{ ... }'
              className={`w-full px-3 py-2 text-xs font-mono border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y ${
                val && (() => { try { JSON.parse(val); return false; } catch { return true; } })()
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
            />
            {val && (() => { try { JSON.parse(val); return false; } catch { return true; } })() && (
              <p className="text-xs text-red-600">Invalid JSON — fix before saving.</p>
            )}
          </>
        );
    }
  }, [sectionDataInputs, updateSectionDataInput]);

  // Memoized FAQ items to prevent unnecessary re-renders
  const faqItems = useMemo(() => {
    return form.faq.map((entry, index) => (
      <FAQItem
        key={index}
        entry={entry}
        index={index}
        onQuestionChange={updateFAQItem(index, "question")}
        onAnswerChange={updateFAQItem(index, "answer")}
        onRemove={removeFAQItem(index)}
        canRemove={form.faq.length > 1}
      />
    ));
  }, [form.faq, updateFAQItem, removeFAQItem]);

  // Memoized benefit components
  const benefitComponents = useMemo(() => {
    return form.benefitsData.component.map((component, index) => (
      <BenefitComponent
        key={index}
        component={component}
        index={index}
        onChange={updateBenefitComponent}
        onRemove={removeBenefitComponent(index)}
        canRemove={form.benefitsData.component.length > 1}
      />
    ));
  }, [form.benefitsData.component, updateBenefitComponent, removeBenefitComponent]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Service
          </h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to create a new service for your platform.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Metadata Section */}
          <Section
            title="Service Metadata"
            description="Basic information about your service"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Page Name*"
                value={form.metadata.pageName}
                onChange={handleMetadataChange("pageName")}
                placeholder="Enter page name"
                required={true}
                error={errors.pageName}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Type
                </label>
                <select
                  value={form.metadata.pageType}
                  onChange={(e) => updateForm({ path: ["metadata", "pageType"], value: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="transplant">Transplant</option>
                  <option value="surgery">Surgery</option>
                  <option value="treatment">Treatment</option>
                </select>
              </div>
              <InputField
                label="Service Title*"
                value={form.metadata.title}
                onChange={handleMetadataChange("title")}
                placeholder="Enter service title"
                required={true}
                error={errors.serviceTitle}
              />
              <InputField
                label="Description"
                value={form.metadata.description}
                onChange={handleMetadataChange("description")}
                placeholder="Brief description"
              />
              <div className="lg:col-span-2">
                <InputField
                  label="Page URL*"
                  value={form.metadata.pageurl}
                  onChange={handleMetadataChange("pageurl")}
                  placeholder="https://example.com/service-page"
                  required={true}
                  error={errors.pageUrl}
                />
              </div>

              {/* Keywords Section */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={handleKeywordInputKeyPress}
                    placeholder="Add a keyword"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.metadata.keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Banner Section */}
          <Section
            title="Banner Configuration"
            description="Set up the main banner for your service page"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InputField
                label="Banner Title"
                value={form.bannerData.title}
                onChange={handleBannerDataChange("title")}
                placeholder="Main banner title"
              />
              <InputField
                label="Banner Description"
                value={form.bannerData.description}
                onChange={handleBannerDataChange("description")}
                placeholder="Banner subtitle or description"
              />
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image URL
                </label>
                <div>
                  <ImageUploader onUpload={handleBannerImageUpload} />
                  {form.bannerData.imageurl && (
                    <a
                      className="text-xs text-blue-500 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={form.bannerData.imageurl}
                    >
                      {form.bannerData.imageurl}
                    </a>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2">
                <InputField
                  label="Banner Image Alt Text"
                  value={form.bannerData.imagealt}
                  onChange={handleBannerDataChange("imagealt")}
                  placeholder="Alternative text for banner image"
                />
              </div>
            </div>
          </Section>

          {/* Overview Section */}
          <Section
            title="Service Overview"
            description="Detailed overview of your service"
          >
            <EditorField
              label="Overview Content"
              editorRef={overviewEditorRef}
              onChange={handleOverviewChange}
              defaultValue={form.metadata.overviewData}
              editorId="overview-editor"
            />
          </Section>

          {/* Types Section */}
          <Section
            title="Service Types"
            description="Define your service type and add representative images"
          >
            <div className="space-y-8">
              <EditorField
                label="Type Description"
                editorRef={typesEditorRef}
                onChange={handleTypesChange}
                defaultValue={form.typesData.details}
                editorId="types-editor"
              />

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Service Images
                </h3>
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image {index + 1}
                      </label>
                      <div className="space-y-2">
                        <ImageUploader
                          onUpload={handleServiceImageUpload(index)}
                        />
                        {form.typesData.images[index]?.url && (
                          <a
                            className="text-xs text-blue-500 cursor-pointer"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={form.typesData.images[index]?.url}
                          >
                            {form.typesData.images[index]?.url}
                          </a>
                        )}
                        <input
                          type="text"
                          value={form.typesData.images[index]?.alt || ""}
                          onChange={(e) => handleImageAltChange(index, e.target.value)}
                          placeholder="Image alt text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Benefits Section */}
          <Section
            title="Service Benefits"
            description="Highlight the key benefits of your service"
          >
            <div className="space-y-6">
              <InputField
                label="Benefits Title"
                value={form.benefitsData.title}
                onChange={handleBenefitsDataChange("title")}
                placeholder="Enter benefits title"
              />
              <InputField
                label="Benefits Description"
                value={form.benefitsData.description}
                onChange={handleBenefitsDataChange("description")}
                placeholder="Enter benefits description"
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Benefit Components
                  </h3>
                  <button
                    type="button"
                    onClick={addBenefitComponent}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Component
                  </button>
                </div>  
                <div className="space-y-6">{benefitComponents}</div>
              </div>
            </div>
          </Section>

          {/* FAQ Section */}
          <Section
            title="Frequently Asked Questions"
            description="Add common questions and answers about your service"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  FAQ Entries
                </h3>
                <button
                  type="button"
                  onClick={addFAQItem}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </button>
              </div>
              <div className="space-y-6">{faqItems}</div>
            </div>
          </Section>

          {/* Additional Information Section */}
          <Section
            title="Additional Information"
            description="Any additional details or custom fields"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EditorField
                label="Additional Detail 1"
                editorRef={additionalDetail1EditorRef}
                onChange={handleAdditionalDetail1Change}
                defaultValue={form.extraFields.detail1}
                editorId="detail1-editor"
              />
              <EditorField
                label="Additional Detail 2"
                editorRef={additionalDetail2EditorRef}
                onChange={handleAdditionalDetail2Change}
                defaultValue={form.extraFields.detail2}
                editorId="detail2-editor"
              />
            </div>
          </Section>

          {/* Page Sections Configuration */}
          <Section
            title="Page Sections"
            description="Control which sections appear on this page, in what order, and with what data. Drag-free: use ↑↓ to reorder."
          >
            <div className="space-y-2">
              {pageSections.map((section, idx) => (
                <div key={section.key} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white">
                    {/* Order controls */}
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveSectionUp(idx)}
                        disabled={idx === 0}
                        className="w-6 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 rounded text-xs leading-none"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSectionDown(idx)}
                        disabled={idx === pageSections.length - 1}
                        className="w-6 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-25 rounded text-xs leading-none"
                      >
                        ↓
                      </button>
                    </div>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={() => toggleSectionEnabled(idx)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>

                    {/* Label */}
                    <span className={`flex-1 text-sm font-medium ${section.enabled ? "text-gray-900" : "text-gray-400"}`}>
                      <span className="text-[10px] text-gray-300 mr-2 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                      {section.label}
                    </span>

                    {/* Configure button for data sections */}
                    {section.hasData && (
                      <button
                        type="button"
                        onClick={() => toggleSectionExpand(section.key)}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        Configure {expandedSections[section.key] ? "▲" : "▼"}
                      </button>
                    )}
                  </div>

                  {/* Data editor panel */}
                  {section.hasData && expandedSections[section.key] && (
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-3">
                      {renderSectionDataEditor(section)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Submit Section */}
          <Section
            title="Ready to Create Service?"
            description="Review all information before submitting"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Service
                  </>
                )}
              </button>
            </div>

            {serverMsg && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  serverMsg.includes("Error") || serverMsg.includes("failed")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {serverMsg}
              </div>
            )}
          </Section>
        </form>
      </div>
    </div>
  );
}