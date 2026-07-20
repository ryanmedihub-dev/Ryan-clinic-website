"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import ToastContainer from "@/components/admin/Toast";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

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

function EditSurgeryForm() {
    const toast = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(initialState);

    const fetchSurgeryPage = useCallback(async () => {
        if (!slug) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/surgery/get?slug=${slug}`);
            const data = await response.json();

            if (response.ok && data.surgeryPage) {
                const surgeryData = data.surgeryPage;

                if (!surgeryData.faq) surgeryData.faq = initialState.faq;
                if (!surgeryData.faq.faqs) surgeryData.faq.faqs = [];
                if (!surgeryData.stats) surgeryData.stats = [];
                if (!surgeryData.procedureScience)
                    surgeryData.procedureScience = initialState.procedureScience;
                if (!surgeryData.procedureScience.cards)
                    surgeryData.procedureScience.cards = [];

                setFormData(surgeryData);
            } else {
                toast.error("Error", data.message || "Surgery Page NOT Found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Failed to load page data.");
        } finally {
            setLoading(false);
        }
    }, [slug, toast]);

    useEffect(() => {
        fetchSurgeryPage();
    }, [fetchSurgeryPage]);

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
                { value: "", label: "" },
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
            updatedStats[index] = { ...updatedStats[index], [field]: value };
            return { ...prev, stats: updatedStats };
        });
    };

    const addProcedureCard = () => {
        setFormData((prev) => ({
            ...prev,
            procedureScience: {
                ...prev.procedureScience,
                cards: [
                    ...prev.procedureScience.cards,
                    { title: "", description: "" },
                ],
            },
        }));
    };

    const deleteProcedureCard = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this card?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            procedureScience: {
                ...prev.procedureScience,
                cards: prev.procedureScience.cards.filter((_, i) => i !== index),
            },
        }));
    };

    const handleProcedureCardChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedCards = [...prev.procedureScience.cards];
            updatedCards[index] = { ...updatedCards[index], [field]: value };
            return {
                ...prev,
                procedureScience: {
                    ...prev.procedureScience,
                    cards: updatedCards,
                },
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
                    { question: "", answer: "" },
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
                faqs: (prev.faq.faqs || []).filter((_, index) => index !== faqIndex),
            },
        }));
    };

    const handleFaqChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedFaqs = [...(prev.faq.faqs || [])];
            updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
            return {
                ...prev,
                faq: { ...prev.faq, faqs: updatedFaqs },
            };
        });
    };

    const addSafetyCard = () => {
        setFormData((prev) => ({
            ...prev,
            safety: {
                ...prev.safety,
                cards: [
                    ...prev.safety.cards,
                    {
                        title: "",
                        description: "",
                    },
                ],
            },
        }));
    };

    const deleteSafetyCard = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this safety card?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            safety: {
                ...prev.safety,
                cards: prev.safety.cards.filter((_, i) => i !== index),
            },
        }));
    };

    const handleSafetyCardChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedCards = [...prev.safety.cards];
            updatedCards[index] = {
                ...updatedCards[index],
                [field]: value,
            };
            return {
                ...prev,
                safety: {
                    ...prev.safety,
                    cards: updatedCards,
                },
            };
        });
    };

    const addTechnique = () => {
        setFormData((prev) => ({
            ...prev,
            techniques: {
                ...prev.techniques,
                techniques: [
                    ...prev.techniques.techniques,
                    { title: "", badge: "", description: "" },
                ],
            },
        }));
    };

    const deleteTechnique = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this technique?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            techniques: {
                ...prev.techniques,
                techniques: prev.techniques.techniques.filter((_, i) => i !== index),
            },
        }));
    };

    const handleTechniqueChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedTechniques = [...prev.techniques.techniques];
            updatedTechniques[index] = { ...updatedTechniques[index], [field]: value };
            return {
                ...prev,
                techniques: {
                    ...prev.techniques,
                    techniques: updatedTechniques,
                },
            };
        });
    };

    const addRecoveryCard = () => {
        setFormData((prev) => ({
            ...prev,
            recovery: {
                ...prev.recovery,
                cards: [
                    ...prev.recovery.cards,
                    { timeline: "", title: "", description: "" },
                ],
            },
        }));
    };

    const deleteRecoveryCard = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this recovery card?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            recovery: {
                ...prev.recovery,
                cards: prev.recovery.cards.filter((_, i) => i !== index),
            },
        }));
    };

    const handleRecoveryCardChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedCards = [...prev.recovery.cards];
            updatedCards[index] = { ...updatedCards[index], [field]: value };
            return {
                ...prev,
                recovery: {
                    ...prev.recovery,
                    cards: updatedCards,
                },
            };
        });
    };

    const addDoctor = () => {
        setFormData((prev) => ({
            ...prev,
            doctors: {
                ...prev.doctors,
                doctors: [
                    ...prev.doctors.doctors,
                    { name: "", designation: "", image: "", imageAlt: "", qualifications: [] },
                ],
            },
        }));
    };

    const deleteDoctor = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => ({
            ...prev,
            doctors: {
                ...prev.doctors,
                doctors: prev.doctors.doctors.filter((_, i) => i !== index),
            },
        }));
    };

    const handleDoctorChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedDoctors = [...prev.doctors.doctors];
            updatedDoctors[index] = { ...updatedDoctors[index], [field]: value };
            return {
                ...prev,
                doctors: {
                    ...prev.doctors,
                    doctors: updatedDoctors,
                },
            };
        });
    };

    const addQualification = (doctorIndex) => {
        setFormData((prev) => {
            const updatedDoctors = [...prev.doctors.doctors];
            updatedDoctors[doctorIndex] = {
                ...updatedDoctors[doctorIndex],
                qualifications: [...(updatedDoctors[doctorIndex].qualifications || []), ""],
            };
            return {
                ...prev,
                doctors: {
                    ...prev.doctors,
                    doctors: updatedDoctors,
                },
            };
        });
    };

    const deleteQualification = (doctorIndex, qualificationIndex) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this qualification?"
        );
        if (!confirmDelete) return;

        setFormData((prev) => {
            const updatedDoctors = [...prev.doctors.doctors];
            updatedDoctors[doctorIndex] = {
                ...updatedDoctors[doctorIndex],
                qualifications: (updatedDoctors[doctorIndex].qualifications || []).filter(
                    (_, i) => i !== qualificationIndex
                ),
            };
            return {
                ...prev,
                doctors: {
                    ...prev.doctors,
                    doctors: updatedDoctors,
                },
            };
        });
    };

    const handleQualificationChange = (doctorIndex, qualificationIndex, value) => {
        setFormData((prev) => {
            const updatedDoctors = [...prev.doctors.doctors];
            const updatedQualifications = [...(updatedDoctors[doctorIndex].qualifications || [])];
            updatedQualifications[qualificationIndex] = value;
            updatedDoctors[doctorIndex] = {
                ...updatedDoctors[doctorIndex],
                qualifications: updatedQualifications,
            };
            return {
                ...prev,
                doctors: {
                    ...prev.doctors,
                    doctors: updatedDoctors,
                },
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/surgery/update?slug=${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Success", data.message);
                setTimeout(() => {
                    router.push("/admin/surgery");
                }, 1500);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading page content...</p>
            </div>
        );
    }

    return (
        <section className="p-4">
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

            <AdminHeader title={`/ Edit Surgery Page: ${formData.pageName}`} />

            <form onSubmit={handleSubmit} className="space-y-6 px-6 mx-auto">

                {/* Page Details */}
                <h3 className="text-2xl font-bold underline mb-5">
                    Page Details
                </h3>

                <div className="flex gap-6 flex-col md:flex-row">

                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Page Name
                        </label>
                        <input
                            type="text"
                            value={formData.pageName}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    pageName: e.target.value,
                                }))
                            }
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="Hair Transplant Delhi"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-semibold text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    slug: e.target.value
                                        .toLowerCase()
                                        .replace(/\s+/g, "-"),
                                }))
                            }
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="hair-transplant-delhi"
                            required
                            disabled
                        />
                    </div>

                </div>

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
                                handleNestedChange("seo", "metaTitle", e.target.value)
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
                                handleNestedChange("seo", "metaDescription", e.target.value)
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
                                handleNestedChange("seo", "keywords", e.target.value)
                            }
                            className="w-full mt-2 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-md"
                            placeholder="Enter SEO Keywords"
                        />
                    </div>

                </div>

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
                            handleNestedChange("banner", "title", e.target.value)
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
                            handleNestedChange("banner", "description", e.target.value)
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
                            handleNestedChange("banner", "imageAlt", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Banner Image Alt"
                    />
                </div>

                {/* Stats Section */}
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
                            Click &quot;+ Add Stat&quot; to create your first statistic.
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
                                            handleStatChange(index, "value", e.target.value)
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
                                            handleStatChange(index, "label", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Success Rate"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Introduction Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Introduction Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Introduction Title
                    </label>
                    <input
                        type="text"
                        value={formData.introduction.title}
                        onChange={(e) =>
                            handleNestedChange("introduction", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Introduction Title"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Introduction Description
                    </label>
                    <SunEditor
                        setContents={formData.introduction.description}
                        onChange={(content) =>
                            handleNestedChange("introduction", "description", content)
                        }
                        setOptions={{
                            height: "400px",
                            buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize", "formatBlock"],
                                [
                                    "bold",
                                    "underline",
                                    "italic",
                                    "strike",
                                    "subscript",
                                    "superscript",
                                ],
                                ["fontColor", "hiliteColor"],
                                ["align", "horizontalRule", "list", "table"],
                                ["link", "image", "video"],
                                ["fullScreen", "showBlocks", "codeView"],
                                ["preview", "print"],
                            ],
                            defaultStyle:
                                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
                            imageUploadUrl: "/api/upload",
                        }}
                    />
                </div>

                {/* Procedure Science Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Procedure Science Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={formData.procedureScience.title}
                        onChange={(e) =>
                            handleNestedChange("procedureScience", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Section Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.procedureScience.description}
                        onChange={(e) =>
                            handleNestedChange("procedureScience", "description", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Section Description"
                    />
                </div>

                <button
                    type="button"
                    onClick={addProcedureCard}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Procedure Card
                </button>

                {(!formData.procedureScience.cards || formData.procedureScience.cards.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Cards Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click &quot;+ Add Procedure Card&quot; to create your first card.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.procedureScience.cards.map((card, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Card {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteProcedureCard(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Card
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) =>
                                            handleProcedureCardChange(index, "title", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Card Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Card Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={card.description}
                                        onChange={(e) =>
                                            handleProcedureCardChange(index, "description", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Card Description"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Safety Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Safety Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Safety Title
                    </label>
                    <input
                        type="text"
                        value={formData.safety.title}
                        onChange={(e) =>
                            handleNestedChange("safety", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Safety Section Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Safety Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.safety.description}
                        onChange={(e) =>
                            handleNestedChange("safety", "description", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Safety Section Description"
                    />
                </div>

                <button
                    type="button"
                    onClick={addSafetyCard}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Safety Card
                </button>

                {(!formData.safety.cards || formData.safety.cards.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Safety Cards Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click &quot;+ Add Safety Card&quot; to create your first safety card.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.safety.cards.map((card, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Safety Card {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteSafetyCard(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Safety Card
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) =>
                                            handleSafetyCardChange(index, "title", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Card Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Card Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={card.description}
                                        onChange={(e) =>
                                            handleSafetyCardChange(index, "description", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Card Description"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Techniques Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Techniques Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={formData.techniques.title}
                        onChange={(e) =>
                            handleNestedChange("techniques", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Techniques Section Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.techniques.description}
                        onChange={(e) =>
                            handleNestedChange("techniques", "description", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Techniques Section Description"
                    />
                </div>

                <button
                    type="button"
                    onClick={addTechnique}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Technique
                </button>

                {(!formData.techniques.techniques || formData.techniques.techniques.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Techniques Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click &quot;+ Add Technique&quot; to create your first technique.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.techniques.techniques.map((tech, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Technique {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteTechnique(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Technique
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Technique Title
                                    </label>
                                    <input
                                        type="text"
                                        value={tech.title}
                                        onChange={(e) =>
                                            handleTechniqueChange(index, "title", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Technique Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Badge
                                    </label>
                                    <input
                                        type="text"
                                        value={tech.badge}
                                        onChange={(e) =>
                                            handleTechniqueChange(index, "badge", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="e.g. Advanced, Popular"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Description (Rich Text)
                                    </label>
                                    <SunEditor
                                        setContents={tech.description}
                                        onChange={(content) =>
                                            handleTechniqueChange(index, "description", content)
                                        }
                                        setOptions={{
                                            height: "400px",
                                            buttonList: [
                                                ["undo", "redo"],
                                                ["font", "fontSize", "formatBlock"],
                                                [
                                                    "bold",
                                                    "underline",
                                                    "italic",
                                                    "strike",
                                                    "subscript",
                                                    "superscript",
                                                ],
                                                ["fontColor", "hiliteColor"],
                                                ["align", "horizontalRule", "list", "table"],
                                                ["link", "image", "video"],
                                                ["fullScreen", "showBlocks", "codeView"],
                                                ["preview", "print"],
                                            ],
                                            defaultStyle:
                                                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
                                            imageUploadUrl: "/api/upload",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recovery Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Recovery Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Recovery Title
                    </label>
                    <input
                        type="text"
                        value={formData.recovery.title}
                        onChange={(e) =>
                            handleNestedChange("recovery", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Recovery Section Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Recovery Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.recovery.description}
                        onChange={(e) =>
                            handleNestedChange("recovery", "description", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Recovery Section Description"
                    />
                </div>

                <button
                    type="button"
                    onClick={addRecoveryCard}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Recovery Card
                </button>

                {(!formData.recovery.cards || formData.recovery.cards.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Recovery Cards Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click &quot;+ Add Recovery Card&quot; to create your first recovery card.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.recovery.cards.map((card, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Recovery Card {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteRecoveryCard(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Recovery Card
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Timeline
                                    </label>
                                    <input
                                        type="text"
                                        value={card.timeline}
                                        onChange={(e) =>
                                            handleRecoveryCardChange(index, "timeline", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="e.g. Day 1, Week 2, Month 6"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={card.title}
                                        onChange={(e) =>
                                            handleRecoveryCardChange(index, "title", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Enter Card Title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">
                                        Description (Rich Text)
                                    </label>
                                    <SunEditor
                                        setContents={card.description}
                                        onChange={(content) =>
                                            handleRecoveryCardChange(index, "description", content)
                                        }
                                        setOptions={{
                                            height: "400px",
                                            buttonList: [
                                                ["undo", "redo"],
                                                ["font", "fontSize", "formatBlock"],
                                                [
                                                    "bold",
                                                    "underline",
                                                    "italic",
                                                    "strike",
                                                    "subscript",
                                                    "superscript",
                                                ],
                                                ["fontColor", "hiliteColor"],
                                                ["align", "horizontalRule", "list", "table"],
                                                ["link", "image", "video"],
                                                ["fullScreen", "showBlocks", "codeView"],
                                                ["preview", "print"],
                                            ],
                                            defaultStyle:
                                                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:16px;",
                                            imageUploadUrl: "/api/upload",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Doctors Section */}
                <h3 className="text-2xl font-bold underline mt-10 mb-5">
                    Doctors Section
                </h3>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Title
                    </label>
                    <input
                        type="text"
                        value={formData.doctors.title}
                        onChange={(e) =>
                            handleNestedChange("doctors", "title", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Doctors Section Title"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700">
                        Section Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.doctors.description}
                        onChange={(e) =>
                            handleNestedChange("doctors", "description", e.target.value)
                        }
                        className="w-full mt-2 p-2 border rounded-md"
                        placeholder="Enter Doctors Section Description"
                    />
                </div>

                <button
                    type="button"
                    onClick={addDoctor}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6"
                >
                    + Add Doctor
                </button>

                {(!formData.doctors.doctors || formData.doctors.doctors.length === 0) ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
                        <h4 className="text-xl font-semibold text-gray-600">
                            No Doctors Added
                        </h4>
                        <p className="text-gray-500 mt-2">
                            Click &quot;+ Add Doctor&quot; to add a doctor profile.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6 mt-6">
                        {formData.doctors.doctors.map((doctor, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">
                                        Doctor {index + 1}
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => deleteDoctor(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete Doctor
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={doctor.name}
                                        onChange={(e) =>
                                            handleDoctorChange(index, "name", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Dr. John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        value={doctor.designation}
                                        onChange={(e) =>
                                            handleDoctorChange(index, "designation", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Senior Hair Transplant Surgeon"
                                    />
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Doctor Image
                                    </label>
                                    <ImageUploader
                                        initialImage={doctor.image}
                                        onUpload={(url) => handleDoctorChange(index, "image", url)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Image Alt
                                    </label>
                                    <input
                                        type="text"
                                        value={doctor.imageAlt}
                                        onChange={(e) =>
                                            handleDoctorChange(index, "imageAlt", e.target.value)
                                        }
                                        className="w-full mt-2 p-2 border rounded-md"
                                        placeholder="Dr. John Doe profile picture"
                                    />
                                </div>

                                {/* Qualifications Section for Doctor */}
                                <div className="mt-4 border-t pt-4">
                                    <h5 className="text-md font-semibold text-gray-800 mb-2">
                                        Qualifications
                                    </h5>
                                    <button
                                        type="button"
                                        onClick={() => addQualification(index)}
                                        className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm mb-3"
                                    >
                                        + Add Qualification
                                    </button>

                                    {(!doctor.qualifications || doctor.qualifications.length === 0) ? (
                                        <p className="text-sm text-gray-500 italic">No qualifications added.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {doctor.qualifications.map((qual, qualIndex) => (
                                                <div key={qualIndex} className="flex gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        value={qual}
                                                        onChange={(e) =>
                                                            handleQualificationChange(index, qualIndex, e.target.value)
                                                        }
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="e.g. MBBS, MD, FISHRS"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteQualification(index, qualIndex)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
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
                            Click &quot;+ Add FAQ&quot; to create your first FAQ item.
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
                                                handleFaqChange(index, "question", e.target.value)
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
                                                handleFaqChange(index, "answer", e.target.value)
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
                        {submitting ? "Saving..." : "Update Surgery Page"}
                    </button>
                </div>

            </form>

        </section>
    );
}

export default function EditSurgeryPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-12">
                <p className="text-lg font-semibold text-gray-600">Loading form...</p>
            </div>
        }>
            <EditSurgeryForm />
        </Suspense>
    );
}
