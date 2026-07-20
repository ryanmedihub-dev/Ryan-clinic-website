"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Activity } from "lucide-react";
import TrackerStatsCards from "@/components/admin/tracker/TrackerStatsCards";
import TrackerFilters from "@/components/admin/tracker/TrackerFilters";
import TrackerTable from "@/components/admin/tracker/TrackerTable";
import TrackerPagination from "@/components/admin/tracker/TrackerPagination";
import TrackerEmptyState from "@/components/admin/tracker/TrackerEmptyState";
import TrackerSkeleton from "@/components/admin/tracker/TrackerSkeleton";
import TrackerViewModal from "@/components/admin/tracker/TrackerViewModal";

const PAGE_SIZE = 10;

/* ── helpers ─────────────────────────────────────────────────── */

function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isYesterday(date) {
  const d = new Date(date);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
}

function isWithinDays(date, days) {
  const d = new Date(date);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return d >= cutoff;
}

function exportCSV(leads) {
  const headers = ["Type", "Page Name", "CTA Name", "Slug", "Date", "Time"];
  const rows = leads.map((l) => {
    const d = new Date(l.createdAt);
    return [
      l.type || "",
      l.pageName || "",
      l.ctaName || "",
      l.slug || "",
      d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }),
    ].map((v) => `"${v}"`).join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── page component ──────────────────────────────────────────── */

export default function TrackerPage() {
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  /* Fetch from backend */
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tracker/get");
      const data = await res.json();
      if (data.success) {
        setAllLeads(data.trackers || []);
      }
    } catch (err) {
      console.error("TrackerPage fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  /* Reset to page 1 whenever any filter changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, dateFilter]);

  /* ── Stats ───────────────────────────────────────────────── */
  const stats = useMemo(
    () => ({
      total: allLeads.length,
      whatsapp: allLeads.filter((l) => l.type?.toLowerCase() === "whatsapp").length,
      call: allLeads.filter((l) => l.type?.toLowerCase() === "call").length,
      form: allLeads.filter((l) => l.type?.toLowerCase() === "form").length,
    }),
    [allLeads]
  );

  /* ── Filtered leads ──────────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...allLeads];

    // Search
    if (search.trim()) {
      const kw = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.pageName?.toLowerCase().includes(kw) ||
          l.slug?.toLowerCase().includes(kw) ||
          l.ctaName?.toLowerCase().includes(kw)
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      list = list.filter((l) => l.type?.toLowerCase() === typeFilter);
    }

    // Date filter
    if (dateFilter === "today") {
      list = list.filter((l) => isToday(l.createdAt));
    } else if (dateFilter === "yesterday") {
      list = list.filter((l) => isYesterday(l.createdAt));
    } else if (dateFilter === "7days") {
      list = list.filter((l) => isWithinDays(l.createdAt, 7));
    } else if (dateFilter === "30days") {
      list = list.filter((l) => isWithinDays(l.createdAt, 30));
    }

    return list;
  }, [allLeads, search, typeFilter, dateFilter]);

  /* ── Pagination ──────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* View modal */}
      {selectedLead && (
        <TrackerViewModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Lead Tracker</h1>
              <p className="text-xs text-gray-500">
                Monitor all WhatsApp, Call and Form interactions from the website.
              </p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto p-6 space-y-4">
        {loading ? (
          <TrackerSkeleton />
        ) : (
          <>
            {/* Stats cards */}
            <TrackerStatsCards stats={stats} />

            {/* Filters */}
            <TrackerFilters
              search={search}
              setSearch={setSearch}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              onRefresh={fetchLeads}
              onExport={() => exportCSV(filtered)}
              loading={loading}
            />

            {/* Table or empty state */}
            {filtered.length === 0 ? (
              <TrackerEmptyState onRefresh={fetchLeads} loading={loading} />
            ) : (
              <>
                <TrackerTable
                  leads={paginated}
                  onView={(lead) => setSelectedLead(lead)}
                />

                {/* Pagination — only show if there's more than one page */}
                {totalPages > 1 && (
                  <TrackerPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={filtered.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}