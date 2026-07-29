"use client";

import Link from "next/link";
import AdminHeader from "@/components/admin/adminHeader";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Stethoscope, ExternalLink } from "lucide-react";

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

    const [hairFallPages, setHairFallPages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHairFallPages = async () => {
        try {
            const response = await fetch("/api/hair-fall/list");

            const data = await response.json();

            if (response.ok) {
                setHairFallPages(data.hairFallPages);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                alert(data.message || "Page deleted successfully.");
                fetchHairFallPages();
            } else {
                alert(data.message || "Failed to delete page.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the page.");
        }
    };

    useEffect(() => {
        fetchHairFallPages();
    }, []);

    return (
        <>
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
                                                    href={`/admin/hair-fall/edit?slug=${page.slug}`}
                                                    title="Edit page"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(page._id)}
                                                    title="Delete page"
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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
