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
        keywords: "",
    },

    banner: {
        title: "",
        description: "",
        image: "",
        imageAlt: "",
    },

    stats: [],

    introduction: {
        title: "",
        description: "",
    },

    procedureScience: {
        title: "",
        description: "",
        cards: [],
    },

    safety: {
        title: "",
        description: "",
        cards: [],
    },

    techniques: {
        title: "",
        description: "",
        techniques: [],
    },

    recovery: {
        title: "",
        description: "",
        cards: [],
    },

    doctors: {
        title: "",
        description: "",
        doctors: [],
    },

    faq: {
        title: "",
        subtitle: "",
        faqs: [],
    },
};

export default function SurgeryPage() {
    const toast = useToast();

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCreated, setIsCreated] = useState(false);

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchSurgeryPage();
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



    const handleBannerUpload = (url) => {
        handleNestedChange("banner", "image", url);
    };

    const addStat = () => {
        setFormData((prev) => ({
            ...prev,
            stats: [
                ...prev.stats,
                {
                    value: "",
                    label: "",
                },
            ],
        }));
    };

    const deleteStat = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this stat?"
        );

        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index),
        }));
    };

    const handleStatChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedStats = [...prev.stats];

            updatedStats[index] = {
                ...updatedStats[index],
                [field]: value,
            };

            return {
                ...prev,
                stats: updatedStats,
            };
        });
    };


    const addFaq = () => {
        setFormData((prev) => ({
            ...prev,
            faq: {
                ...prev.faq,
                faqs: [
                    ...prev.faq.faqs,
                    {
                        question: "",
                        answer: "",
                    },
                ],
            },
        }));
    };

    const deleteFaq = (faqIndex) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this FAQ?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            faq: {
                ...prev.faq,
                faqs: (prev.faq.faqs || []).filter(
                    (_, index) => index !== faqIndex
                ),
            },
        }));
    };

    const handleFaqChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedFaqs = [...(prev.faq.faqs || [])];
            updatedFaqs[index] = {
                ...updatedFaqs[index],
                [field]: value,
            };
            return {
                ...prev,
                faq: { ...prev.faq, faqs: updatedFaqs },
            };
        });
    };

    const fetchSurgeryPage = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/surgery/get");
            const data = await response.json();

            if (response.ok && data.surgeryPage) {
                const surgeryData = data.surgeryPage;
                if (!surgeryData.faq) {
                    surgeryData.faq = initialState.faq;
                }

                if (!surgeryData.faq.faqs) {
                    surgeryData.faq.faqs = [];
                }
                if (!surgeryData.stats) {
                    surgeryData.stats = [];
                }
                setFormData(surgeryData);
                setIsCreated(true);
            } else {
                console.log("Surgery Page NOT Found");

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
                ? "/api/surgery/update"
                : "/api/surgery/create";

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
                fetchSurgeryPage();
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

            <AdminHeader title="/ Manage Surgery Page" />

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

                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Keywords
                        </label>

                        <input
                            type="text"
                            value={formData.seo.keywords}
                            onChange={(e) =>
                                handleNestedChange(
                                    "seo",
                                    "keywords",
                                    e.target.value
                                )
                            }
                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
                            placeholder="Enter SEO Keywords"
                        />
                    </div>


                </div>

                {/* Banner Section */}

                {/* Banner Sec  tion */}

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
                        initialImage={formData.banner.image}
                        onUpload={handleBannerUpload}
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Banner Image Alt
                    </label>

                    <input
                        type="text"
                        value={formData.banner.imageAlt}
                        onChange={(e) =>
                            handleNestedChange(
                                "banner",
                                "imageAlt",
                                e.target.value
                            )
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Banner Image Alt"
                    />
                </div>

                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Stats Section
                </h3>
                <button
                    type="button"
                    onClick={addStat}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Stat
                </button>
                {(!formData.stats || formData.stats.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Stats Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click "+ Add Stat" to create your first statistic.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Stat {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteStat(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Stat
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="98%"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Label
                                    </label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) =>
                                            handleStatChange(
                                                index,
                                                "label",
                                                e.target.value
                                            )
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Success Rate"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
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
                {(!formData.faq.faqs || formData.faq.faqs.length === 0) ? (
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
                        {formData.faq.faqs.map((faq, index) => (
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
                                ? "Update Surgery Page"
                                : "Create Surgery Page"}
                    </button>
                </div>

            </form>

        </section>

    );
}