"use client";

import { useEffect, useState, useCallback } from "react";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";

function useToast() {
    const [toasts, setToasts] = useState([]);

    const add = useCallback((type, title, message) => {
        const id = Date.now() + Math.random();

        setToasts((prev) => [
            ...prev,
            { id, type, title, message },
        ]);
    }, []);

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return {
        toasts,
        remove,
        success: (title, message) =>
            add("success", title, message),

        error: (title, message) =>
            add("error", title, message),
    };
}

const initialState = {
    seo: {
        metaTitle: "",
        metaDescription: "",
    },

    banner: {
        title: "",
        description: "",
        bannerImage: "",
        bannerAltImage: "",
    },

    heroSection: {
        title: "",
        description: "",
        beforeImage: "",
        afterImage: "",
        altImage: "",
    },

    gallerySection: [],
    faqSection: [],
};

export default function GalleryPage() {
    const toast = useToast();

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCreated, setIsCreated] = useState(false);

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleNestedChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,

            [section]: {
                ...prev[section],

                [field]: value,
            },
        }));
    };

    const handlePatientChange = (
        index,
        patientIndex,
        field,
        value
    ) => {
        setFormData((prev) => {
            const updatedSections = [...prev.gallerySection];
            updatedSections[index].cases[patientIndex] = {
                ...updatedSections[index].cases[patientIndex],
                [field]: value,
            };

            return {
                ...prev,
                gallerySection: updatedSections,
            };
        });
    };
    const handlePatientImageUpload = (
        sectionIndex,
        patientIndex,
        field,
        imageUrl
    ) => {
        setFormData((prev) => {
            const updatedSections = [...prev.gallerySection];

            updatedSections[sectionIndex].cases[patientIndex] = {
                ...updatedSections[sectionIndex].cases[patientIndex],
                [field]: imageUrl,
            };

            return {
                ...prev,
                gallerySection: updatedSections,
            };
        });
    };

    const handleBannerUpload = (url) => {
        handleNestedChange("banner", "bannerImage", url);
    };

    const handleBeforeUpload = (url) => {
        handleNestedChange("heroSection", "beforeImage", url);
    };

    const handleAfterUpload = (url) => {
        handleNestedChange("heroSection", "afterImage", url);
    };
    const addGallerySection = () => {


        setFormData((prev) => ({
            ...prev,

            gallerySection: [
                ...prev.gallerySection,
                {
                    category: "",
                    title: "",
                    subTitle: "",
                    cases: [],
                },
            ],
        }));
    };
    const addPatient = (sectionIndex) => {
        setFormData((prev) => {
            const updatedSections = [...prev.gallerySection];

            updatedSections[sectionIndex] = {
                ...updatedSections[sectionIndex],
                cases: [
                    ...updatedSections[sectionIndex].cases,
                    {
                        cardImage: "",
                        beforeImage: "",
                        afterImage: "",
                        altImage: "",
                        clinicLocation: "",
                        graftCount: "",
                        techniqueUsed: "",
                        timeline: "",
                    },
                ],
            };

            return {
                ...prev,
                gallerySection: updatedSections,
            };
        });
    };
    const deletePatient = (sectionIndex, patientIndex) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmDelete) return;

        setFormData((prev) => {
            const updatedSections = [...prev.gallerySection];

            updatedSections[sectionIndex] = {
                ...updatedSections[sectionIndex],
                cases: updatedSections[sectionIndex].cases.filter(
                    (_, index) => index !== patientIndex
                ),
            };

            return {
                ...prev,
                gallerySection: updatedSections,
            };
        });
    };
    const deleteGallerySection = (sectionIndex) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this gallery section?"
        );

        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            gallerySection: prev.gallerySection.filter(
                (_, index) => index !== sectionIndex
            ),
        }));
    };

    const handleGallerySectionChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedSections = [...prev.gallerySection];

            updatedSections[index] = {
                ...updatedSections[index],
                [field]: value,
            };

            return {
                ...prev,
                gallerySection: updatedSections,
            };
        });
    };

    const addFaq = () => {
        setFormData((prev) => ({
            ...prev,
            faqSection: [
                ...(prev.faqSection || []),
                {
                    question: "",
                    answer: "",
                },
            ],
        }));
    };

    const deleteFaq = (faqIndex) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this FAQ?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            faqSection: (prev.faqSection || []).filter(
                (_, index) => index !== faqIndex
            ),
        }));
    };

    const handleFaqChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedFaqs = [...(prev.faqSection || [])];
            updatedFaqs[index] = {
                ...updatedFaqs[index],
                [field]: value,
            };
            return {
                ...prev,
                faqSection: updatedFaqs,
            };
        });
    };

    useEffect(() => {
        console.log(formData.gallerySection);
    }, [formData.gallerySection]);

    const fetchGallery = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/gallery/get");
            const data = await response.json();

            if (response.ok && data.gallery) {
                const galleryData = data.gallery;
                if (!galleryData.faqSection) {
                    galleryData.faqSection = [];
                }
                setFormData(galleryData);
                setIsCreated(true);
            } else {
                console.log("Gallery NOT Found");

                setFormData(initialState);
                setIsCreated(false);
            }
        } finally {
            setLoading(false);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const endpoint = isCreated
                ? "/api/gallery/update"
                : "/api/gallery/create";

            const method = isCreated ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Success", data.message);
                fetchGallery();
            } else {
                toast.error("Error", data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Something went wrong.");
        } finally {
            setSubmitting(false);
        }

    };


    return (
        <section className="p-4">
            <ToastContainer
                toasts={toast.toasts}
                removeToast={toast.remove}
            />

            <AdminHeader title="/ Manage Gallery" />

            <form
                onSubmit={handleSubmit}
                className="space-y-6 px-6 mx-auto"
            >

                {/* SEO Section */}

                <h3 className="text-2xl font-bold underline mb-5">
                    Meta Details
                </h3>

                <div className="flex gap-6 flex-col md:flex-row">

                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Meta Title
                        </label>

                        <input
                            type="text"
                            value={formData.seo.metaTitle}
                            onChange={(e) =>
                                handleNestedChange(
                                    "seo",
                                    "metaTitle",
                                    e.target.value
                                )
                            }
                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
                            placeholder="Enter Meta Title"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Meta Description
                        </label>

                        <textarea
                            rows={4}
                            value={formData.seo.metaDescription}
                            onChange={(e) =>
                                handleNestedChange(
                                    "seo",
                                    "metaDescription",
                                    e.target.value
                                )
                            }
                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
                            placeholder="Enter Meta Description"
                            required
                        />
                    </div>

                </div>

                {/* Banner Section */}

                {/* Banner Section */}

                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Banner Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Banner Title
                    </label>

                    <input
                        type="text"
                        value={formData.banner.title}
                        onChange={(e) =>
                            handleNestedChange(
                                "banner",
                                "title",
                                e.target.value
                            )
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Banner Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Banner Description
                    </label>

                    <textarea
                        rows={4}
                        value={formData.banner.description}
                        onChange={(e) =>
                            handleNestedChange(
                                "banner",
                                "description",
                                e.target.value
                            )
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Banner Description"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Banner Image
                    </label>

                    <ImageUploader
                        initialImage={formData.banner.bannerImage}
                        onUpload={handleBannerUpload}
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Banner Image Alt
                    </label>

                    <input
                        type="text"
                        value={formData.banner.bannerAltImage}
                        onChange={(e) =>
                            handleNestedChange(
                                "banner",
                                "bannerAltImage",
                                e.target.value
                            )
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Banner Image Alt"
                    />
                </div>






                {/* Hero Section */}

                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Hero Section
                </h3>
                <div className="space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Hero Title
                        </label>

                        <input
                            type="text"
                            value={formData.heroSection.title}
                            onChange={(e) =>
                                handleNestedChange(
                                    "heroSection",
                                    "title",
                                    e.target.value
                                )
                            }
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="Enter Hero Title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Hero Description
                        </label>

                        <textarea
                            rows={4}
                            value={formData.heroSection.description}
                            onChange={(e) =>
                                handleNestedChange(
                                    "heroSection",
                                    "description",
                                    e.target.value
                                )
                            }
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="Enter Hero Description"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Before Image
                    </label>

                    <ImageUploader
                        onUpload={handleBeforeUpload}
                        initialImage={formData.heroSection.beforeImage}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        After Image
                    </label>

                    <ImageUploader
                        onUpload={handleAfterUpload}
                        initialImage={formData.heroSection.afterImage}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">
                        Hero Alt Image
                    </label>

                    <input
                        type="text"
                        value={formData.heroSection.altImage}
                        onChange={(e) =>
                            handleNestedChange(
                                "heroSection",
                                "altImage",
                                e.target.value
                            )
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Hero Alt Text"
                        required
                    />
                </div>






                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Gallery Sections
                </h3>

                <button
                    type="button"
                    onClick={addGallerySection}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    + Add Gallery Section
                </button>

                {/* Gallery Sections */}

                {formData.gallerySection.length === 0 ? (

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-6">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Gallery Sections
                        </h4>

                        <p className="text-gray-500 mt-2">
                            Click "Add Gallery Section" to create your first section.
                        </p>
                    </div>

                ) : (


                    formData.gallerySection.map((section, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-6 mt-6 bg-white shadow space-y-5"
                        >

                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-2xl font-semibold">
                                    Gallery Section {index + 1}
                                </h4>

                                <button
                                    type="button"
                                    onClick={() => deleteGallerySection(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Delete Section
                                </button>
                            </div>

                            {/* Category */}

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Category
                                </label>

                                <select
                                    value={section.category}
                                    onChange={(e) =>
                                        handleGallerySectionChange(
                                            index,
                                            "category",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-md p-2"
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="graft">
                                        Graft
                                    </option>

                                    <option value="technique">
                                        Technique
                                    </option>
                                </select>
                            </div>

                            {/* Title */}

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Section Title
                                </label>

                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) =>
                                        handleGallerySectionChange(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-md p-2"
                                    placeholder="Enter Section Title"
                                />
                            </div>

                            {/* Subtitle */}

                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Subtitle
                                </label>

                                <input
                                    type="text"
                                    value={section.subTitle}
                                    onChange={(e) =>
                                        handleGallerySectionChange(
                                            index,
                                            "subTitle",
                                            e.target.value
                                        )
                                    }
                                    className="w-full border rounded-md p-2"
                                    placeholder="Enter Subtitle"
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => addPatient(index)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    + Add Patient
                                </button>
                                {section.cases.length === 0 ? (

                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 mt-5 text-center">
                                        <p className="text-gray-500">
                                            No patients added yet.
                                        </p>
                                    </div>

                                ) : (
                                    section.cases.map((patient, patientIndex) => (
                                        <div
                                            key={patientIndex}
                                            className="border rounded-lg p-5 mt-5 bg-gray-50"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <h5 className="text-lg font-semibold">
                                                    Patient {patientIndex + 1}
                                                </h5>

                                                <button
                                                    type="button"
                                                    onClick={() => deletePatient(index, patientIndex)}
                                                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                                                >
                                                    Delete Patient
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                {/* Clinic Location */}

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Clinic Location
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={patient.clinicLocation}
                                                        onChange={(e) =>
                                                            handlePatientChange(
                                                                index,
                                                                patientIndex,
                                                                "clinicLocation",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Enter Clinic Location"
                                                    />
                                                </div>

                                                {/* Graft Count */}

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Graft Count
                                                    </label>

                                                    <input
                                                        type="number"
                                                        value={patient.graftCount}
                                                        onChange={(e) =>
                                                            handlePatientChange(
                                                                index,
                                                                patientIndex,
                                                                "graftCount",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Enter Graft Count"
                                                    />
                                                </div>

                                                {/* Technique */}

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Technique Used
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={patient.techniqueUsed}
                                                        onChange={(e) =>
                                                            handlePatientChange(
                                                                index,
                                                                patientIndex,
                                                                "techniqueUsed",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Enter Technique"
                                                    />
                                                </div>

                                                {/* Timeline */}

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Timeline
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={patient.timeline}
                                                        onChange={(e) =>
                                                            handlePatientChange(
                                                                index,
                                                                patientIndex,
                                                                "timeline",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="6 Months"
                                                    />
                                                </div>

                                                {/* Alt Text */}

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Image Alt Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={patient.altImage}
                                                        onChange={(e) =>
                                                            handlePatientChange(
                                                                index,
                                                                patientIndex,
                                                                "altImage",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-md p-2"
                                                        placeholder="Enter Image Alt Text"
                                                    />
                                                    <div className="mt-6">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Card Image
                                                        </label>

                                                        <ImageUploader
                                                            initialImage={patient.cardImage}
                                                            onUpload={(url) =>
                                                                handlePatientImageUpload(
                                                                    index,
                                                                    patientIndex,
                                                                    "cardImage",
                                                                    url
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-6">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Before Image
                                                        </label>

                                                        <ImageUploader
                                                            initialImage={patient.beforeImage}
                                                            onUpload={(url) =>
                                                                handlePatientImageUpload(
                                                                    index,
                                                                    patientIndex,
                                                                    "beforeImage",
                                                                    url
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-6">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            After Image
                                                        </label>

                                                        <ImageUploader
                                                            initialImage={patient.afterImage}
                                                            onUpload={(url) =>
                                                                handlePatientImageUpload(
                                                                    index,
                                                                    patientIndex,
                                                                    "afterImage",
                                                                    url
                                                                )
                                                            }
                                                        />
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>

                    ))
                )}


                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    FAQ Section
                </h3>

                <button
                    type="button"
                    onClick={addFaq}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add FAQ
                </button>

                {/* FAQ List */}
                {(!formData.faqSection || formData.faqSection.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mt-6">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No FAQs added yet
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click "+ Add FAQ" to create your first FAQ item.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.faqSection.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        FAQ {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteFaq(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm font-semibold"
                                    >
                                        Delete FAQ
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Question
                                        </label>
                                        <input
                                            type="text"
                                            value={faq.question}
                                            onChange={(e) =>
                                                handleFaqChange(
                                                    index,
                                                    "question",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter FAQ Question"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Answer
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={faq.answer}
                                            onChange={(e) =>
                                                handleFaqChange(
                                                    index,
                                                    "answer",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter FAQ Answer"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}



                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting
                            ? "Saving..."
                            : isCreated
                                ? "Update Gallery"
                                : "Create Gallery"}
                    </button>

                </div>

            </form>

        </section >

    );
}