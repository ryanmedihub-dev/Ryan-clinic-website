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

            updatedSections[sectionIndex].cases[patientIndex] = {
                ...updatedSections[sectionIndex].cases[patientIndex],
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

        console.log("Button Clicked");

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

    useEffect(() => {
        console.log(formData.gallerySection);
    }, [formData.gallerySection]);

    const fetchGallery = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/gallery/get");
            const data = await response.json();

            console.log("GET Response:", data);

            if (response.ok && data.gallery) {
                console.log("Gallery Found");

                setFormData(data.gallery);
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

        console.log(formData);
    };
    console.log(formData);
    console.log(formData.gallerySection);

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
                    Banner Content
                </h3>

                <div className="space-y-6">

                    {/* Banner Title */}

                    <div>
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
                            required
                        />
                    </div>

                    {/* Banner Description */}

                    <div>
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
                            required
                        />
                    </div>

                    {/* Banner Image */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Banner Image
                        </label>

                        <ImageUploader
                            onUpload={handleBannerUpload}
                            initialImage={formData.banner.bannerImage}
                        />
                    </div>

                    {/* Banner Alt */}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Banner Alt Image
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
                            placeholder="Enter Banner Alt Text"
                            required
                        />
                    </div>

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

                {formData.gallerySection.map((section, index) => (
                    <div
                        key={index}
                        className="border rounded-xl p-6 mt-6 bg-white shadow space-y-5"
                    >

                        <div className="flex justify-between items-center">
                            <h4 className="text-xl font-semibold">
                                Gallery Section {index + 1}
                            </h4>
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
                            /><div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => addPatient(index)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    + Add Patient
                                </button>
                                {section.cases.map((patient, patientIndex) => (
                                    <div
                                        key={patientIndex}
                                        className="border rounded-lg p-5 mt-5 bg-gray-50"
                                    >
                                        <h5 className="text-lg font-semibold mb-4">
                                            Patient {patientIndex + 1}
                                        </h5>

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
                                                <div className="mt-6">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Card Image
                                                    </label>

                                                    <ImageUploader
                                                        initialImage={patient.cardImage}
                                                        onUpload={(url) =>
                                                            handlePatientImageUpload(
                                                                sectionIndex,
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
                                                                sectionIndex,
                                                                patientIndex,
                                                                "beforeImage",
                                                                url
                                                            )
                                                        }
                                                    />
                                                </div>

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
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                ))}




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