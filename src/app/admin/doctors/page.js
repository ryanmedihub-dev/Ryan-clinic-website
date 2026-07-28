"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminHeader from "@/components/admin/adminHeader";
import ToastContainer from "@/components/admin/Toast";

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

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const toast = useToast();

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.set("page", page);
      query.set("limit", 10);
      if (search) query.set("search", search);
      if (status) query.set("status", status);
      if (featured !== "") query.set("featured", featured);

      const res = await fetch(`/api/doctors/list?${query.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setDoctors(data.doctors || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      } else {
        toast.error("Error", data.message || "Failed to load doctors.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error", "Server error while fetching doctors.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status, featured]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDelete = async (id, doctorName) => {
    if (!confirm(`Are you sure you want to delete "${doctorName || "this doctor"}"?`)) return;
    try {
      const res = await fetch(`/api/doctors/delete?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Deleted", data.message || "Doctor page deleted successfully.");
        setDoctors((prev) => prev.filter((d) => d._id !== id));
        setTotal((prev) => Math.max(0, prev - 1));
      } else {
        toast.error("Delete Failed", data.message || "Failed to delete doctor.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error", "Server error during delete.");
    }
  };

  return (
    <>
      <AdminHeader title="Manage Doctor CMS Pages" />
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor CMS Pages</h1>
            <p className="text-sm text-gray-500 mt-1">Total pages: {total}</p>
          </div>

          <Link
            href="/admin/doctors/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all text-sm flex items-center gap-2"
          >
            + Create New Doctor Page
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-xs flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center flex-1">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by doctor name, city, designation..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-72 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Status Filter */}
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Featured Filter */}
            <select
              value={featured}
              onChange={(e) => {
                setFeatured(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Featured</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
          </div>

          <button
            onClick={fetchDoctors}
            className="px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 font-medium">
            Loading doctor pages...
          </div>
        ) : doctors.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-600 font-semibold mb-2">No Doctor CMS Pages Found</p>
            <p className="text-sm text-gray-400 mb-6">Create a doctor page to start managing your surgeon profiles.</p>
            <Link
              href="/admin/doctors/create"
              className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              + Create First Doctor Page
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider text-xs font-bold">
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Slug &amp; Page Name</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map((doc) => {
                    const profileImg = doc.basicInfo?.profileImage?.image || "/uploads/turkey-doctor.jpg";
                    const doctorName = doc.basicInfo?.doctorName || doc.pageName || "Doctor";
                    const designation = doc.basicInfo?.designation || "Surgeon";
                    const city = doc.basicInfo?.city || "Delhi";

                    return (
                      <tr key={doc._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                              <Image
                                src={profileImg}
                                alt={doctorName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 leading-tight">{doctorName}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{designation}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-medium text-gray-700">
                          <p className="text-gray-900 font-semibold">{doc.pageName}</p>
                          <code className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
                            /doctors/{doc.slug}
                          </code>
                        </td>

                        <td className="p-4 text-gray-600 font-medium">
                          {city}
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                              doc.status === "published"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-amber-100 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {doc.status || "draft"}
                          </span>
                        </td>

                        <td className="p-4">
                          {doc.featured ? (
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                              ★ Featured
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">No</span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/doctors/${doc.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold transition-all"
                            >
                              View
                            </a>

                            <Link
                              href={`/admin/doctors/edit?slug=${doc.slug}`}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(doc._id, doctorName)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
