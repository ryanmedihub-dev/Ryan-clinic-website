"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* Shared Admin Components */
import AdminHeader from "@/components/admin/adminHeader";
import ToastContainer from "@/components/admin/Toast";

/* Surgeon-module Components */
import SurgeonToolbar from "@/components/admin/surgeon/SurgeonToolbar";
import SurgeonTable from "@/components/admin/surgeon/SurgeonTable";
import PaginationBar from "@/components/admin/surgeon/Pagination";
import DeleteSurgeonModal from "@/components/admin/surgeon/DeleteSurgeonModal";
import LoadingSkeleton from "@/components/admin/surgeon/LoadingSkeleton";
import EmptyState from "@/components/admin/surgeon/EmptyState";
import StatusBadge from "@/components/admin/surgeon/StatusBadge";

/* ─── Toast Hook ────────────────────────────────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((type, title, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);
  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const success = useCallback((title, message) => add("success", title, message), [add]);
  const error   = useCallback((title, message) => add("error",   title, message), [add]);
  const warning = useCallback((title, message) => add("warning", title, message), [add]);
  return { toasts, remove, success, error, warning };
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return "—"; }
}

/* ─── Column Definitions ──────────────────────────────────────────────────── */
function buildColumns(onEdit, onDuplicate, onDelete) {
  return [
    {
      key: "title",
      label: "Title",
      className: "min-w-[220px]",
      render: (row) => (
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-gray-900 text-sm truncate leading-snug">
            {row.title || "Untitled"}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">
            Created {formatDate(row.createdAt)}
          </span>
        </div>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      className: "min-w-[160px]",
      render: (row) => (
        <span className="inline-block font-mono text-xs text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-md max-w-[180px] truncate">
          /{row.slug}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      className: "w-32",
      render: (row) => <StatusBadge status={row.settings?.status} />,
    },
    {
      key: "featured",
      label: "Featured",
      className: "w-24",
      render: (row) =>
        row.settings?.featured ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full whitespace-nowrap">
            ★ Yes
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
    {
      key: "displayOrder",
      label: "Order",
      className: "w-20",
      render: (row) => (
        <span className="text-sm font-mono text-gray-600">
          {row.settings?.displayOrder ?? 0}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      className: "w-36",
      render: (row) => (
        <span className="text-sm text-gray-500">{formatDate(row.updatedAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-44",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={() => onEdit(row)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800
                       transition-colors focus:outline-none focus:underline cursor-pointer"
            aria-label={`Edit ${row.title}`}
          >
            Edit
          </button>
          <span className="text-gray-200 select-none">|</span>
          <button
            onClick={() => onDuplicate(row)}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800
                       transition-colors focus:outline-none focus:underline cursor-pointer"
            aria-label={`Duplicate ${row.title}`}
          >
            Duplicate
          </button>
          <span className="text-gray-200 select-none">|</span>
          <button
            onClick={() => onDelete(row)}
            className="text-xs font-semibold text-red-600 hover:text-red-800
                       transition-colors focus:outline-none focus:underline cursor-pointer"
            aria-label={`Delete ${row.title}`}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
}

/* ─── Page Component ──────────────────────────────────────────────────────── */
export default function SurgeonListingPage() {
  const router = useRouter();
  const toast = useToast();

  /* State */
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawSearch, setRawSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0, page: 1, limit: 10, totalPages: 1,
  });

  /* Delete modal */
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* Duplicate modal */
  const [duplicateRow, setDuplicateRow] = useState(null);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [duplicateLoading, setDuplicateLoading] = useState(false);

  /* Debounce search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(rawSearch);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [rawSearch]);

  /* Fetch surgeon pages */
  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set("page", String(currentPage));
      qs.set("limit", "10");
      if (debouncedSearch) qs.set("search", debouncedSearch);
      if (statusFilter) qs.set("status", statusFilter);

      const res = await fetch(`/api/surgeon/list?${qs.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setPages(data.data ?? []);
        setPagination(
          data.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 1 }
        );
      } else {
        toast.error("Fetch Error", data.message || "Failed to load surgeon pages.");
        setPages([]);
      }
    } catch (err) {
      console.error("[SurgeonListingPage] fetch error:", err);
      toast.error("Network Error", "Could not reach the server. Please try again.");
      setPages([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, statusFilter, currentPage, toast.error]);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  /* Handlers */
  const handleStatusChange = (val) => { setStatusFilter(val); setCurrentPage(1); };
  const handleEdit = (row) => router.push(`/admin/surgeon/edit/${row.slug || row._id}`);
  const handleDuplicateClick = (row) => { setDuplicateRow(row); setDuplicateModalOpen(true); };
  const handleDuplicateCancel = () => {
    if (duplicateLoading) return;
    setDuplicateModalOpen(false);
    setDuplicateRow(null);
  };

  const handleDuplicateConfirm = async () => {
    if (!duplicateRow || duplicateLoading) return;
    setDuplicateLoading(true);
    try {
      const res = await fetch("/api/surgeon/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: duplicateRow._id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Duplicated", "Surgeon page duplicated successfully as draft.");
        setDuplicateModalOpen(false);
        setDuplicateRow(null);
        if (data.data?.editUrl) {
          router.push(data.data.editUrl);
        } else {
          fetchPages();
        }
      } else {
        toast.error("Duplicate Failed", data.message || "Could not duplicate this page.");
      }
    } catch (err) {
      console.error("[SurgeonListingPage] duplicate error:", err);
      toast.error("Network Error", "Failed to duplicate. Please try again.");
    } finally {
      setDuplicateLoading(false);
    }
  };

  const handleDeleteClick = (row) => { setSelectedRow(row); setDeleteModalOpen(true); };
  const handleDeleteCancel = () => {
    if (deleteLoading) return;
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRow || deleteLoading) return;
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/surgeon/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: selectedRow._id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Deleted", `"${selectedRow.title}" was deleted successfully.`);
        setDeleteModalOpen(false);
        setSelectedRow(null);
        if (pages.length === 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        } else {
          fetchPages();
        }
      } else {
        toast.error("Delete Failed", data.message || "Could not delete this page.");
      }
    } catch (err) {
      console.error("[SurgeonListingPage] delete error:", err);
      toast.error("Network Error", "Failed to delete. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = buildColumns(handleEdit, handleDuplicateClick, handleDeleteClick);
  const isEmpty = !loading && pages.length === 0;
  const hasData = !loading && pages.length > 0;

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

      {/* Duplicate Confirmation Modal */}
      {duplicateModalOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleDuplicateCancel}
          />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-[420px] p-6 border border-gray-100">
            <div className="flex flex-col items-center text-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Duplicate Surgeon Page?</h3>
                <p className="text-sm text-gray-500 mt-1">
                  A new draft copy of <span className="font-semibold text-gray-800">"{duplicateRow?.title}"</span> will be created with a unique slug.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={handleDuplicateCancel}
                  disabled={duplicateLoading}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDuplicateConfirm}
                  disabled={duplicateLoading}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {duplicateLoading ? "Duplicating…" : "Duplicate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteSurgeonModal
        isOpen={deleteModalOpen}
        itemName={selectedRow?.title}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
        title="Delete Surgeon Page?"
        description="This will permanently delete the surgeon page. This action cannot be undone."
      />

      <AdminHeader title="Surgeon Pages" />

      <div className="p-5 sm:p-6 max-w-screen-xl mx-auto space-y-5">

        <SurgeonToolbar
          title="Surgeon Pages"
          description="Manage surgeon landing pages for the website"
          search={rawSearch}
          onSearch={setRawSearch}
          status={statusFilter}
          onStatus={handleStatusChange}
          createHref="/admin/surgeon/create"
        />

        {/* Stats row */}
        {!loading && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {pagination.total} surgeon page{pagination.total !== 1 ? "s" : ""} total
            </span>
            {(debouncedSearch || statusFilter) && (
              <>
                <span className="text-gray-300">·</span>
                <button
                  onClick={() => { setRawSearch(""); setStatusFilter(""); setCurrentPage(1); }}
                  className="text-sm text-blue-600 hover:underline font-medium focus:outline-none"
                >
                  Clear filters
                </button>
              </>
            )}
          </div>
        )}

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {loading && <LoadingSkeleton columns={columns} rows={7} />}

          {isEmpty && (
            <EmptyState
              title="No Surgeon Pages Found"
              description={
                debouncedSearch || statusFilter
                  ? "No pages match your current filters. Try adjusting your search or clearing filters."
                  : "Create your first surgeon page to start managing content on the website."
              }
              buttonText={debouncedSearch || statusFilter ? "Clear Filters" : "Create Surgeon Page"}
              onAction={
                debouncedSearch || statusFilter
                  ? () => { setRawSearch(""); setStatusFilter(""); setCurrentPage(1); }
                  : () => router.push("/admin/surgeon/create")
              }
            />
          )}

          {hasData && (
            <>
              <SurgeonTable columns={columns} data={pages} />
              <div className="border-t border-gray-100 px-6 py-4">
                <PaginationBar pagination={pagination} onPageChange={setCurrentPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
