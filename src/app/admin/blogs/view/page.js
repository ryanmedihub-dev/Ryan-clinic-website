"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Search, SquarePen, Trash2, Plus, RefreshCw,
  FileText, Calendar, ExternalLink, Eye,
} from "lucide-react";
import ToastContainer from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

// ─── Toast hook ───────────────────────────────────────────────────────────────

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((type, title, message, duration) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, type, title, message, duration }]);
  }, []);
  const remove = useCallback((id) => setToasts((p) => p.filter((t) => t.id !== id)), []);
  return { toasts, remove, success: (t, m) => add("success", t, m), error: (t, m) => add("error", t, m) };
}

// ─── Format helpers ───────────────────────────────────────────────────────────

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
  } catch { return "—"; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogViewPage() {
  const [blogs, setBlogs]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [query, setQuery]       = useState("");
  const [confirm, setConfirm]   = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/blog/get-blog");
      const json = await res.json();
      setBlogs(json.data || []);
    } catch {
      toast.error("Failed to load", "Could not fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!confirm) return;
    setDeleting(true);
    try {
      const res  = await fetch(`/api/blog/delete/${confirm.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");
      setBlogs((p) => p.filter((b) => b._id !== confirm.id));
      toast.success("Deleted!", `"${confirm.title}" was removed successfully.`);
    } catch (err) {
      toast.error("Delete failed", err.message || "Something went wrong.");
    } finally {
      setDeleting(false);
      setConfirm(null);
    }
  };

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = blogs.filter(
    (b) =>
      b.pageTitle?.toLowerCase().includes(query.toLowerCase()) ||
      b.blogTitle?.toLowerCase().includes(query.toLowerCase()) ||
      b.pageUrl?.toLowerCase().includes(query.toLowerCase())
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <ToastContainer toasts={toast.toasts} removeToast={toast.remove} />
      <ConfirmModal
        open={!!confirm}
        title="Delete Blog"
        message={`Are you sure you want to delete "${confirm?.title}"? This action cannot be undone.`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirm(null)}
      />

      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── Header card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {blogs.length} total article{blogs.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={fetchBlogs}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <Link
                href="/admin/blogs/create"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Blog
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or URL…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* ── Table card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Loading skeleton */}
          {loading ? (
            <div className="divide-y divide-gray-100">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
                  <div className="w-8 h-4 bg-gray-100 rounded" />
                  <div className="flex-1 h-4 bg-gray-100 rounded max-w-xs" />
                  <div className="w-24 h-4 bg-gray-100 rounded" />
                  <div className="w-24 h-4 bg-gray-100 rounded" />
                  <div className="w-20 h-8 bg-gray-100 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">
                {query ? "No blogs match your search" : "No blogs yet"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {query ? "Try a different keyword." : "Create your first blog post to get started."}
              </p>
              {!query && (
                <Link
                  href="/admin/blogs/create"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Create Blog
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-12">#</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Title</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Blog Title</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Live URL</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Created</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-36">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((blog, i) => (
                      <tr key={blog._id} className="group hover:bg-blue-50/40 transition-colors">
                        <td className="px-5 py-4 text-gray-400 text-xs font-medium">{i + 1}</td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900 leading-snug line-clamp-1 max-w-[220px]">
                            {blog.pageTitle}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-gray-600 line-clamp-1 max-w-[220px]">{blog.blogTitle}</p>
                        </td>
                        <td className="px-5 py-4">
                          <a
                            href={`/blog/${blog.pageUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View live
                          </a>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <Calendar className="w-3 h-3 shrink-0" />
                            {fmtDate(blog.createdAt)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <Link
                              href={`/admin/blogs/edit/${blog.pageUrl}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                            >
                              <SquarePen className="w-3.5 h-3.5" />
                              Edit
                            </Link>
                            <button
                              onClick={() => setConfirm({ id: blog._id, title: blog.pageTitle })}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map((blog, i) => (
                  <div key={blog._id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">#{i + 1}</span>
                        <p className="font-semibold text-gray-900 text-sm leading-snug mt-0.5 line-clamp-2">
                          {blog.pageTitle}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-1">{blog.blogTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        {fmtDate(blog.createdAt)}
                      </div>
                      <a
                        href={`/blog/${blog.pageUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-blue-500 text-xs font-medium"
                      >
                        <Eye className="w-3 h-3" /> Live
                      </a>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        href={`/admin/blogs/edit/${blog.pageUrl}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                      >
                        <SquarePen className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => setConfirm({ id: blog._id, title: blog.pageTitle })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of <span className="font-semibold text-gray-700">{blogs.length}</span> posts
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
