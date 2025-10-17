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
        const res = await fetch("/api/service/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
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