"use client";

import Link from "next/link";
import AdminHeader from "@/components/admin/adminHeader";
import { useEffect, useState } from "react";

export default function SurgeryListingPage() {

    const [surgeryPages, setSurgeryPages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSurgeryPages = async () => {
        try {
            const response = await fetch("/api/surgery/list");

            const data = await response.json();

            if (response.ok) {
                setSurgeryPages(data.surgeryPages);
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
            const response = await fetch(`/api/surgery/delete?id=${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || "Page deleted successfully.");
                fetchSurgeryPages();
            } else {
                alert(data.message || "Failed to delete page.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the page.");
        }
    };

    useEffect(() => {
        fetchSurgeryPages();
    }, []);
    return (
        <>
            <AdminHeader title="Manage Surgery Pages" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        Surgery Pages
                    </h1>

                    <Link
                        href="/admin/surgery/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        + Create New Page
                    </Link>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : surgeryPages.length === 0 ? (
                    <p>No Surgery Pages Found</p>
                ) : (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr>
                                <th className="border p-3 text-left">Page Name</th>
                                <th className="border p-3 text-left">Slug</th>
                                <th className="border p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {surgeryPages.map((page) => (
                                <tr key={page._id}>
                                    <td className="border p-3">
                                        {page.pageName}
                                    </td>

                                    <td className="border p-3">
                                        {page.slug}
                                    </td>

                                    <td className="border p-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/surgery/edit?slug=${page.slug}`}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(page._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-700 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}