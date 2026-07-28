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
function buildColumns(onEdit, onDelete) {
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
      className: "w-32",
      tdClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => onEdit(row)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800
                       transition-colors focus:outline-none focus:underline"
            aria-label={`Edit ${row.title}`}
          >
            Edit
          </button>
          <span className="text-gray-200 select-none">|</span>
          <button
            onClick={() => onDelete(row)}
            className="text-xs font-semibold text-red-600 hover:text-red-800
                       transition-colors focus:outline-none focus:underline"
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

  const columns = buildColumns(handleEdit, handleDeleteClick);
  const isEmpty = !loading && pages.length === 0;
  const hasData = !loading && pages.length > 0;

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

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
