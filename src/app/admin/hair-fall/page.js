"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ToastContainer from "@/components/admin/Toast";
import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Stethoscope, ExternalLink, Copy } from "lucide-react";

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

function StatusBadge({ status }) {
    const isPublished = status === "published";
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`} />
            {status}
        </span>
    );
}

export default function HairFallListingPage() {
    const router = useRouter();
    const toast = useToast();
    const [hairFallPages, setHairFallPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [duplicatingId, setDuplicatingId] = useState(null);
    const [confirmDuplicatePage, setConfirmDuplicatePage] = useState(null);

    const fetchHairFallPages = async () => {
        try {
            const response = await fetch("/api/hair-fall/list");
            const data = await response.json();

            if (response.ok) {
                setHairFallPages(data.hairFallPages || []);
            } else {
                toast.error("Error", data.message || "Failed to load pages.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Network error while loading treatment pages.");
        } finally {
            setLoading(false);
        }
    };

    const handleDuplicate = async (page) => {
        if (!page) return;
        setDuplicatingId(page._id);
        try {
            const response = await fetch("/api/hair-fall/duplicate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: page._id }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                toast.success("Duplicated", "Treatment page duplicated successfully as draft.");
                setConfirmDuplicatePage(null);
                if (data.data?.editUrl) {
                    router.push(data.data.editUrl);
                } else {
                    fetchHairFallPages();
                }
            } else {
                toast.error("Duplicate Failed", data.message || "Failed to duplicate treatment page.");
            }
        } catch (error) {
            console.error("Duplicate error:", error);
            toast.error("Error", "Server error while duplicating treatment page.");
        } finally {
            setDuplicatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            const response = await fetch(`/api/hair-fall/delete?id=${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Deleted", data.message || "Page deleted successfully.");
                fetchHairFallPages();
            } else {
                toast.error("Error", data.message || "Failed to delete page.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "An error occurred while deleting the page.");
        }
    };

    useEffect(() => {
        fetchHairFallPages();
    }, []);

    return (
        <>
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

            {/* Duplicate Confirmation Modal */}
            {confirmDuplicatePage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <Copy className="w-7 h-7 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Duplicate Treatment Page?</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    A new draft copy of <span className="font-semibold text-gray-700">"{confirmDuplicatePage.pageName}"</span> will be created with a unique slug.
                                </p>
                            </div>
                            <div className="flex gap-3 w-full mt-2">
                                <button
                                    onClick={() => setConfirmDuplicatePage(null)}
                                    disabled={duplicatingId === confirmDuplicatePage._id}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDuplicate(confirmDuplicatePage)}
                                    disabled={duplicatingId === confirmDuplicatePage._id}
                                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                                >
                                    {duplicatingId === confirmDuplicatePage._id ? "Duplicating…" : "Duplicate"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AdminHeader title="Manage Hair Fall Treatment Pages" />

            <div className="px-6 pb-16 max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Hair Fall &amp; Hair Loss Treatment Pages
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {loading ? "Loading..." : `${hairFallPages.length} page${hairFallPages.length === 1 ? "" : "s"}`}
                        </p>
                    </div>

                    <Link
                        href="/admin/hair-fall/create"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Page
                    </Link>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                        <p className="text-sm text-gray-400">Loading pages...</p>
                    </div>
                ) : hairFallPages.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
                        <Stethoscope className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-400 mb-4">No hair fall treatment pages found yet.</p>
                        <Link href="/admin/hair-fall/create" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors">
                            <Plus className="w-4 h-4" /> Create your first page
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60">
                                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Page Name</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Slug</th>
                                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Status</th>
                                    <th className="px-5 py-3 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {hairFallPages.map((page) => (
                                    <tr key={page._id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-gray-900">
                                            {page.pageName}
                                        </td>

                                        <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                                            /treatments/{page.slug}
                                        </td>

                                        <td className="px-5 py-4">
                                            <StatusBadge status={page.status} />
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {page.status === "published" && (
                                                    <a
                                                        href={`/treatments/${page.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="View live page"
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/admin/hair-fall/edit/${page.slug}`}
                                                    title="Edit page"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => setConfirmDuplicatePage(page)}
                                                    disabled={duplicatingId === page._id}
                                                    title="Duplicate page"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-50 cursor-pointer"
                                                >
                                                    <Copy className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(page._id)}
                                                    title="Delete page"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
