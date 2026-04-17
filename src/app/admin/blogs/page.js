export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllBlogs } from "@/lib/blogData";
import {
  FilePlus, Eye, FileText, ArrowRight, Calendar, TrendingUp,
} from "lucide-react";

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return "—"; }
}

export default async function BlogsHubPage() {
  const blogs = await getAllBlogs();
  const recent = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Blog Management</h1>
            <p className="text-xs text-gray-500">{blogs.length} published article{blogs.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/blogs/create"
            className="group bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-blue-200 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <FilePlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold mb-1">Create New Blog</h2>
            <p className="text-blue-200 text-sm mb-4">Write and publish a new article to your website.</p>
            <div className="flex items-center gap-2 text-sm font-semibold">
              Get started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/admin/blogs/view"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">View All Blogs</h2>
            <p className="text-gray-500 text-sm mb-4">Manage, edit, or delete your existing blog posts.</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              Browse posts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{blogs.length}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Total Posts</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{recent.length}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">This Week</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Growing</p>
          </div>
        </div>

        {/* Recent Posts */}
        {recent.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Recent Posts</h3>
              <Link href="/admin/blogs/view" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recent.map((blog) => (
                <div key={blog._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 group transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{blog.pageTitle || blog.blogTitle}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{fmtDate(blog.createdAt)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/blogs/edit/${blog.pageUrl}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-blue-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
