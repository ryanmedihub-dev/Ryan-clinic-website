"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/adminHeader";
import ToastContainer from "@/components/admin/Toast";
import StatusBadge from "@/components/admin/surgeon/StatusBadge";

// ─── Toast Hook ───────────────────────────────────────────────────────────────
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
        toasts, remove,
        success: (title, message) => add("success", title, message),
        error: (title, message) => add("error", title, message),
    };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "—";
    }
}

export default function SurgeryListingPage() {
    const router = useRouter();
    const toast = useToast();
    const [surgeryPages, setSurgeryPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);
    const [duplicatingId, setDuplicatingId] = useState(null);
    const [confirmDuplicatePage, setConfirmDuplicatePage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSurgeryPages = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/surgery/list");
            const data = await response.json();
            if (response.ok) {
                setSurgeryPages(data.surgeryPages || []);
            } else {
                toast.error("Error", data.message || "Failed to load surgery pages.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "Network error while loading surgery pages.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDuplicate = async (page) => {
        if (!page) return;
        setDuplicatingId(page._id);
        try {
            const response = await fetch("/api/surgery/duplicate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: page._id }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                toast.success("Duplicated", "Page duplicated successfully as draft.");
                setConfirmDuplicatePage(null);
                if (data.data?.editUrl) {
                    router.push(data.data.editUrl);
                } else {
                    fetchSurgeryPages();
                }
            } else {
                toast.error("Error", data.message || "Failed to duplicate surgery page.");
            }
        } catch (error) {
            console.error("Duplicate error:", error);
            toast.error("Error", "An error occurred while duplicating the page.");
        } finally {
            setDuplicatingId(null);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/surgery/delete?id=${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                // Optimistic update — remove from state immediately
                setSurgeryPages((prev) => prev.filter((p) => p._id !== id));
                toast.success("Deleted", data.message || "Page deleted successfully.");
            } else {
                toast.error("Error", data.message || "Failed to delete page.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", "An error occurred while deleting the page.");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    useEffect(() => {
        fetchSurgeryPages();
    }, [fetchSurgeryPages]);

    const filtered = surgeryPages.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
            !q ||
            (p.pageName || "").toLowerCase().includes(q) ||
            (p.slug || "").toLowerCase().includes(q) ||
            (p.city || "").toLowerCase().includes(q)
        );
    });

    return (
        <>
            <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

            {/* ── Confirm Duplicate Modal ───────────────────────────────── */}
            {confirmDuplicatePage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Duplicate Surgery Page?</h3>
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

            {/* ── Confirm Delete Modal ──────────────────────────────────── */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-200">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Surgery Page?</h3>
                                <p className="text-sm text-gray-500 mt-1">This action cannot be undone. The page will be permanently removed.</p>
                            </div>
                            <div className="flex gap-3 w-full mt-2">
                                <button
                                    onClick={() => setConfirmId(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(confirmId)}
                                    disabled={deletingId === confirmId}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                                >
                                    {deletingId === confirmId ? "Deleting…" : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AdminHeader title="Manage Surgery Pages" />

            <div className="p-6 max-w-7xl mx-auto">
                {/* ── Page Header ──────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Surgery Pages</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {surgeryPages.length} page{surgeryPages.length !== 1 ? "s" : ""} total
                        </p>
                    </div>
                    <Link
                        href="/admin/surgery/create"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Page
                    </Link>
                </div>

                {/* ── Search Bar ────────────────────────────────────────── */}
                <div className="mb-5">
                    <div className="relative max-w-sm">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, slug or city…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>
                </div>

                {/* ── Content ───────────────────────────────────────────── */}
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.586V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-700">
                            {searchQuery ? "No pages match your search" : "No Surgery Pages Found"}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            {searchQuery ? "Try a different search term." : "Create your first surgery page to get started."}
                        </p>
                        {!searchQuery && (
                            <Link href="/admin/surgery/create" className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                                + Create New Page
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide min-w-[200px]">Page Name</th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide min-w-[160px]">Slug</th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide w-28">City</th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide w-28">Status</th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide w-28">Created</th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide w-64">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filtered.map((page) => (
                                        <tr key={page._id} className="hover:bg-gray-50/60 transition-colors group">
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-semibold text-gray-900 truncate leading-snug">
                                                        {page.pageName || "Untitled"}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-0.5">
                                                        Updated {formatDate(page.updatedAt)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="inline-block font-mono text-xs text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-md max-w-[200px] truncate">
                                                    /{page.slug}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm text-gray-700 font-medium">
                                                    {page.city || "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge status={page.status} />
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(page.createdAt || page.updatedAt)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/surgery/${page.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 bg-white px-2.5 py-1.5 rounded-lg transition-colors"
                                                        title="View live page"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/admin/surgery/edit/${page.slug}`}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition-colors"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => setConfirmDuplicatePage(page)}
                                                        disabled={duplicatingId === page._id}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                                        title="Duplicate this page"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        {duplicatingId === page._id ? "Duplicating…" : "Duplicate"}
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmId(page._id)}
                                                        disabled={deletingId === page._id}
                                                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        {deletingId === page._id ? "…" : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}