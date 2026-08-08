"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* Shared Admin Components */
import AdminHeader from "@/components/admin/adminHeader";
import ToastContainer from "@/components/admin/Toast";

/* Cost-module Reusable Components */
import CostToolbar from "@/components/admin/cost/CostToolbar";
import CostTable from "@/components/admin/cost/CostTable";
import PaginationBar from "@/components/admin/cost/Pagination";
import DeleteCostModal from "@/components/admin/cost/DeleteCostModal";
import LoadingSkeleton from "@/components/admin/cost/LoadingSkeleton";
import EmptyState from "@/components/admin/cost/EmptyState";
import StatusBadge from "@/components/admin/cost/StatusBadge";

/* ─── Toast Hook ─────────────────────────────────────────────────────────────
   Mirrors the pattern used in admin/doctors/page.js and admin/surgery/page.js
   ─────────────────────────────────────────────────────────────────────────── */
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
  const error = useCallback((title, message) => add("error", title, message), [add]);
  const warning = useCallback((title, message) => add("warning", title, message), [add]);

  return { toasts, remove, success, error, warning };
}

/* ─── Helpers ──────────────────────────────────────────────────────────────── */
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

/* ─── Column Definitions (cost-specific) ───────────────────────────────────
   Columns are built as a function so the action handlers (onEdit, onDelete)
   can be injected via closure — keeping CostTable fully generic.
   ─────────────────────────────────────────────────────────────────────────── */
function buildColumns(onEdit, onDelete) {
  return [
    /* Title + created-at sub-label */
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

    /* Slug — monospace code style */
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

    /* Page Type badge */
    {
      key: "pageType",
      label: "Page Type",
      className: "w-36",
      render: (row) => {
        const type = row.pageType || "hair-transplant";
        const map = {
          "hair-transplant": { label: "Hair Transplant", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
          prp: { label: "PRP Hair", color: "bg-purple-50 text-purple-700 border-purple-200" },
          dhi: { label: "DHI Treatment", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          "beard-transplant": { label: "Beard Transplant", color: "bg-amber-50 text-amber-700 border-amber-200" },
          other: { label: "Other", color: "bg-gray-100 text-gray-700 border-gray-200" },
        };
        const cfg = map[type] || map["hair-transplant"];
        return (
          <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.color}`}>
            {cfg.label}
          </span>
        );
      },
    },

    /* Status badge */
    {
      key: "status",
      label: "Status",
      className: "w-32",
      render: (row) => <StatusBadge status={row.settings?.status} />,
    },

    /* Featured flag */
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

    /* Display order */
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

    /* Last updated */
    {
      key: "updatedAt",
      label: "Updated",
      className: "w-36",
      render: (row) => (
        <span className="text-sm text-gray-500">{formatDate(row.updatedAt)}</span>
      ),
    },

    /* Row actions */
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

/* ─── Page Component ─────────────────────────────────────────────────────────
   This component ONLY manages:
     • state (pages, loading, search, status, pagination, delete modal)
     • API calls (fetchPages, handleDeleteConfirm)
     • handlers (edit, delete click, page change, search, status)
   All rendering is delegated to child components.
   ─────────────────────────────────────────────────────────────────────────── */
export default function CostListingPage() {
  const router = useRouter();
  const toast = useToast();

  /* ── State ── */
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Search: rawSearch drives the input; debouncedSearch triggers the API */
  const [rawSearch, setRawSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  /* Delete modal */
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ── Debounce search (500 ms) ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(rawSearch);
      setCurrentPage(1); // reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [rawSearch]);

  /* ── Fetch cost pages ── */
  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set("page", String(currentPage));
      qs.set("limit", "10");
      if (debouncedSearch) qs.set("search", debouncedSearch);
      if (statusFilter) qs.set("status", statusFilter);

      const res = await fetch(`/api/cost/list?${qs.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setPages(data.costPages ?? []);
        setPagination(
          data.pagination ?? { total: 0, page: 1, limit: 10, totalPages: 1 }
        );
      } else {
        toast.error("Fetch Error", data.message || "Failed to load cost pages.");
        setPages([]);
      }
    } catch (err) {
      console.error("[CostListingPage] fetch error:", err);
      toast.error("Network Error", "Could not reach the server. Please try again.");
      setPages([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, statusFilter, currentPage, toast.error]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  /* ── Handlers ── */
  const handleStatusChange = (val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleEdit = (row) => {
    router.push(`/admin/cost/edit/${row.slug || row._id}`);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    if (deleteLoading) return; // block cancel while request is in flight
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRow || deleteLoading) return;

    setDeleteLoading(true);
    try {
      const res = await fetch("/api/cost/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: selectedRow._id }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Deleted", `"${selectedRow.title}" was deleted successfully.`);
        setDeleteModalOpen(false);
        const deletedId = selectedRow._id;
        setSelectedRow(null);
        setPages((prev) => prev.filter((p) => p._id !== deletedId));
        // If this was the last item on the current page, go back one page
        if (pages.length === 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        } else {
          fetchPages();
        }
      } else {
        toast.error("Delete Failed", data.message || "Could not delete this page.");
      }
    } catch (err) {
      console.error("[CostListingPage] delete error:", err);
      toast.error("Network Error", "Failed to delete. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  /* ── Derived values ── */
  const columns = buildColumns(handleEdit, handleDeleteClick);
  const isEmpty = !loading && pages.length === 0;
  const hasData = !loading && pages.length > 0;

  /* ── Render ── */
  return (
    <>
      {/* Toast notifications */}
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />

      {/* Delete confirmation modal */}
      <DeleteCostModal
        isOpen={deleteModalOpen}
        itemName={selectedRow?.title}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
        title="Delete Cost Page?"
        description="This will permanently delete the cost page. This action cannot be undone."
      />

      {/* Page header */}
      <AdminHeader title="Cost Pages" />

      {/* Main content area */}
      <div className="p-5 sm:p-6 max-w-screen-xl mx-auto space-y-5">

        {/* Toolbar: title, search, status filter, create button */}
        <CostToolbar
          title="Cost Pages"
          description="Manage pricing and cost breakdown pages for the website"
          search={rawSearch}
          onSearch={setRawSearch}
          status={statusFilter}
          onStatus={handleStatusChange}
          createHref="/admin/cost/create"
        />

        {/* Stats row (total count) */}
        {!loading && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {pagination.total} cost page{pagination.total !== 1 ? "s" : ""} total
            </span>
            {(debouncedSearch || statusFilter) && (
              <>
                <span className="text-gray-300">·</span>
                <button
                  onClick={() => {
                    setRawSearch("");
                    setStatusFilter("");
                    setCurrentPage(1);
                  }}
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

          {/* Loading skeleton */}
          {loading && <LoadingSkeleton columns={columns} rows={7} />}

          {/* Empty state */}
          {isEmpty && (
            <EmptyState
              title="No Cost Pages Found"
              description={
                debouncedSearch || statusFilter
                  ? "No pages match your current filters. Try adjusting your search or clearing filters."
                  : "Create your first cost page to start managing pricing content on the website."
              }
              buttonText={debouncedSearch || statusFilter ? "Clear Filters" : "Create Cost Page"}
              onAction={
                debouncedSearch || statusFilter
                  ? () => { setRawSearch(""); setStatusFilter(""); setCurrentPage(1); }
                  : () => router.push("/admin/cost/create")
              }
            />
          )}

          {/* Data table */}
          {hasData && (
            <>
              <CostTable columns={columns} data={pages} />

              {/* Pagination footer */}
              <div className="border-t border-gray-100 px-6 py-4">
                <PaginationBar
                  pagination={pagination}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
