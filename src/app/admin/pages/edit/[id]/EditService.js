"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash, Save } from "lucide-react";

const Editor = dynamic(() => import("@/components/textEditor"), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />,
});

const FileUpload = dynamic(() => import("@/components/admin/ImageUploader"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />,
});

const initialFormState = {
  pageName: "",
  pageType: "",
  serviceTitle: "",
  description: "",
  pageUrl: "",
  bannerTitle: "",
  bannerDescription: "",
  bannerImage: "",
  bannerAlt: "",
  overviewContent: "",
  typesDetails: "",
  typeImages: [],
  benefitsTitle: "",
  benefitsDescription: "",
  benefitComponents: [],
  faqs: [],
  extraDetail1: "",
  extraDetail2: "",
  keywords: [],
};

export default function EditService({ initialData }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // editor instance refs
  const editorRefs = useRef({
    overviewContent: null,
    typesDetails: null,
    extraDetail1: null,
    extraDetail2: null,
  });

  // track readiness of each editor
  const [editorReady, setEditorReady] = useState({
    overviewContent: false,
    typesDetails: false,
    extraDetail1: false,
    extraDetail2: false,
  });

  // track one-time injection per editor
  const injectedRef = useRef({
    overviewContent: false,
    typesDetails: false,
    extraDetail1: false,
    extraDetail2: false,
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const handleEditorLoad = (name, instance) => {
    editorRefs.current[name] = instance;
    setEditorReady((prev) => ({ ...prev, [name]: true }));
  };

  // mount + hydrate from initialData
  useEffect(() => {
    setIsMounted(true);
    if (initialData) {
      setFormData({
        id: initialData._id || "",
        pageName: initialData.metadata?.pageName || "",
        pageType: initialData.metadata?.pageType || "",
        serviceTitle: initialData.metadata?.title || "",
        description: initialData.metadata?.description || "",
        pageUrl: initialData.metadata?.pageurl || "",
        bannerTitle: initialData.bannerData?.title || "",
        bannerDescription: initialData.bannerData?.description || "",
        bannerImage: initialData.bannerData?.imageurl || "",
        bannerAlt: initialData.bannerData?.imagealt || "", // Fixed: imagealt instead of imageAlt
        overviewContent: initialData.metadata?.overviewData || "",
        typesDetails: initialData.typesData?.details || "",
        typeImages: initialData.typesData?.images || [],
        benefitsTitle: initialData.benefitsData?.title || "",
        benefitsDescription: initialData.benefitsData?.description || "",
        benefitComponents: initialData.benefitsData?.component || [],
        faqs: initialData.faq || [],
        extraDetail1: initialData.extraFields?.detail1 || "",
        extraDetail2: initialData.extraFields?.detail2 || "",
        keywords: initialData.metadata?.keywords || [],
      });
      setDataLoaded(true);

      // reset one-time injection flags if record changes
      injectedRef.current = {
        overviewContent: false,
        typesDetails: false,
        extraDetail1: false,
        extraDetail2: false,
      };
    }
  }, [initialData]);

  // After each editor is ready AND data is loaded, inject initial HTML ONCE
  useEffect(() => {
    if (!dataLoaded) return;

    ["overviewContent", "typesDetails", "extraDetail1", "extraDetail2"].forEach(
      (name) => {
        if (editorReady[name] && !injectedRef.current[name]) {
          try {
            const inst = editorRefs.current[name];
            if (inst && inst.setContents) {
              inst.setContents(formData[name] || "");
              injectedRef.current[name] = true;
            }
          } catch (err) {
            console.error(`Error setting ${name} contents:`, err);
          }
        }
      }
    );
  }, [dataLoaded, editorReady, formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pageName.trim()) newErrors.pageName = "Page name is required";
    if (!formData.serviceTitle.trim())
      newErrors.serviceTitle = "Service title is required";
    if (!formData.pageUrl.trim()) newErrors.pageUrl = "Page URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditorChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (index, url) => {
    const updatedImages = [...formData.typeImages];
    if (!updatedImages[index]) {
      updatedImages[index] = { url: "", alt: "" };
    }
    updatedImages[index] = { ...updatedImages[index], url };
    setFormData((prev) => ({ ...prev, typeImages: updatedImages }));
  };

  const handleImageAltChange = (index, alt) => {
    const updatedImages = [...formData.typeImages];
    if (!updatedImages[index]) {
      updatedImages[index] = { url: "", alt: "" };
    }
    updatedImages[index] = { ...updatedImages[index], alt };
    setFormData((prev) => ({ ...prev, typeImages: updatedImages }));
  };

  const handleBenefitChange = (index, field, value) => {
    const updated = [...formData.benefitComponents];
    updated[index] = { ...(updated[index] || {}), [field]: value };
    setFormData((prev) => ({ ...prev, benefitComponents: updated }));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefitComponents: [
        ...prev.benefitComponents,
        { title: "", description: "", icon: "" },
      ],
    }));
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefitComponents: prev.benefitComponents.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index] = { ...(updated[index] || {}), [field]: value };
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, bannerImage: url }));
  };

  const handleAddKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords.includes(keywordInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index),
    }));
  };

  const handleKeywordInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setServerMsg("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setServerMsg("");
    try {
      // Send the flat formData structure that the API expects
      const response = await fetch("/api/service/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send formData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update service");
      }

      const result = await response.json();
      setServerMsg("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      setServerMsg(`Error updating service: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
          <p className="mt-2 text-gray-600">
            Update the service details below.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Metadata */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Metadata
              </h2>
              <p className="text-gray-600">
                Basic information about your service
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Name*
                </label>
                <input
                  name="pageName"
                  value={formData.pageName}
                  onChange={handleChange}
                  placeholder="Page Name"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.pageName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pageName && (
                  <p className="mt-1 text-sm text-red-600">{errors.pageName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Type
                </label>
                <select
                  name="pageType"
                  value={formData.pageType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="transplant">Transplant</option>
                  <option value="surgery">Surgery</option>
                  <option value="treatment">Treatment</option>
                  <option value="branch">Branch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title*
                </label>
                <input
                  name="serviceTitle"
                  value={formData.serviceTitle}
                  onChange={handleChange}
                  placeholder="Service Title"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.serviceTitle ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.serviceTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.serviceTitle}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page URL*
                </label>
                <input
                  name="pageUrl"
                  value={formData.pageUrl}
                  onChange={handleChange}
                  placeholder="Page URL"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                    errors.pageUrl ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pageUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.pageUrl}</p>
                )}
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
                  {formData.keywords.map((keyword, index) => (
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
          </div>

          {/* Banner Configuration */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Banner Configuration
              </h2>
              <p className="text-gray-600">
                Set up the main banner for your service page
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  name="bannerTitle"
                  value={formData.bannerTitle}
                  onChange={handleChange}
                  placeholder="Banner Title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Description
                </label>
                <input
                  name="bannerDescription"
                  value={formData.bannerDescription}
                  onChange={handleChange}
                  placeholder="Banner Description"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
                </label>
                <FileUpload
                  onUpload={handleImageUpload}
                  initialImage={formData.bannerImage}
                  accept="image/*"
                  maxSize={5 * 1024 * 1024}
                />
                <a
                  href={formData.bannerImage}
                  target="_blank"
                  className="text-xs cursor-pointer text-blue-500"
                >
                  {formData.bannerImage}
                </a>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Tag
                </label>
                <input
                  name="bannerAlt"
                  value={formData.bannerAlt}
                  onChange={handleChange}
                  placeholder="Image Alt"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Service Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Overview
              </h2>
              <p className="text-gray-600">Detailed overview of your service</p>
            </div>
            <div className="min-h-50">
              <Editor
                value={formData.overviewContent || ""}
                onChange={(val) => handleEditorChange("overviewContent", val)}
                onReady={(inst) => handleEditorLoad("overviewContent", inst)}
                placeholder="Enter service overview content..."
                imageUploadUrl="/api/upload"
              />
            </div>
          </div>

          {/* Service Types */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Types
              </h2>
              <p className="text-gray-600">
                Define your service type and add representative images
              </p>
            </div>
            <div className="space-y-8">
              <div className="min-h-50">
                <Editor
                  value={formData.typesDetails || ""}
                  onChange={(val) => handleEditorChange("typesDetails", val)}
                  onReady={(inst) => handleEditorLoad("typesDetails", inst)}
                  placeholder="Enter service types details..."
                  imageUploadUrl="/api/upload"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-5">
                  Service Images
                </h3>
                <div className="space-y-4">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="my-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type Image {idx + 1}
                      </label>
                      <FileUpload
                        onUpload={(url) => handleFileUpload(idx, url)}
                        initialImage={formData.typeImages[idx]?.url || ""}
                        accept="image/*"
                        maxSize={5 * 1024 * 1024}
                      />
                      <a
                        href={formData.typeImages[idx]?.url}
                        target="_blank"
                        className="text-xs cursor-pointer text-blue-500"
                      >
                        {formData.typeImages[idx]?.url}
                      </a>
                      <input
                        type="text"
                        value={formData.typeImages[idx]?.alt || ""}
                        onChange={(e) =>
                          handleImageAltChange(idx, e.target.value)
                        }
                        placeholder="Image alt text"
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Benefits */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Service Benefits
              </h2>
              <p className="text-gray-600">
                Highlight the key benefits of your service
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits Title
                </label>
                <input
                  name="benefitsTitle"
                  value={formData.benefitsTitle}
                  onChange={handleChange}
                  placeholder="Benefits Title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits Description
                </label>
                <input
                  name="benefitsDescription"
                  value={formData.benefitsDescription}
                  onChange={handleChange}
                  placeholder="Benefits Description"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Benefit Components
                  </h3>
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Component
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.benefitComponents.map((b, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Benefit {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          value={b.title}
                          onChange={(e) =>
                            handleBenefitChange(index, "title", e.target.value)
                          }
                          placeholder="Title"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          value={b.description}
                          onChange={(e) =>
                            handleBenefitChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Description"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon URL
                        </label>
                        <input
                          value={b.icon}
                          onChange={(e) =>
                            handleBenefitChange(index, "icon", e.target.value)
                          }
                          placeholder="Icon URL"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  FAQ Entries
                </h3>
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </button>
              </div>

              <div className="space-y-6">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        FAQ {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <input
                        value={faq.question}
                        onChange={(e) =>
                          handleFaqChange(index, "question", e.target.value)
                        }
                        placeholder="FAQ Question"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) =>
                          handleFaqChange(index, "answer", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                        placeholder="Enter FAQ answer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Additional Information
              </h2>
              <p className="text-gray-600">
                Any additional details or custom fields
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Detail 1
                </label>
                <Editor
                  value={formData.extraDetail1 || ""}
                  onChange={(val) => handleEditorChange("extraDetail1", val)}
                  onReady={(inst) => handleEditorLoad("extraDetail1", inst)}
                  placeholder="Enter additional information..."
                  imageUploadUrl="/api/upload"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Detail 2
                </label>
                <Editor
                  value={formData.extraDetail2 || ""}
                  onChange={(val) => handleEditorChange("extraDetail2", val)}
                  onReady={(inst) => handleEditorLoad("extraDetail2", inst)}
                  placeholder="Enter additional information..."
                  imageUploadUrl="/api/upload"
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Update Service?
              </h2>
              <p className="text-gray-600">
                Review all information before submitting
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Service
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
          </div>
        </form>
      </div>
    </div>
  );
}
