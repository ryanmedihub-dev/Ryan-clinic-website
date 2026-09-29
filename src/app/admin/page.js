export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllBlogs } from "@/lib/blogData";
import { getAllServices } from "@/lib/serviceData";
import {
  LayoutDashboard, FileText, ShieldPlus, Users,
  Plus, Eye, ArrowRight, Calendar, ExternalLink,
  TrendingUp, Activity,
} from "lucide-react";

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return "—"; }
}

export default async function AdminDashboard() {
  const [blogs, services] = await Promise.all([
    getAllBlogs(),
    getAllServices(),
  ]);

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      label: "Total Blogs",
      value: blogs.length,
      icon: FileText,
      color: "blue",
      href: "/admin/blogs/view",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Total Services",
      value: services.length,
      icon: ShieldPlus,
      color: "green",
      href: "/admin/pages",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-600",
    },
    {
      label: "Customers",
      value: "CRM",
      icon: Users,
      color: "purple",
      href: "/admin/customer",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-600",
    },
    {
      label: "Total Pages",
      value: services.length + blogs.length,
      icon: Activity,
      color: "orange",
      href: "/admin/pages",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-600",
    },
  ];

  const quickActions = [
    { label: "New Blog", icon: Plus, href: "/admin/blogs/create", style: "bg-blue-600 hover:bg-blue-700 text-white" },
    { label: "View Blogs", icon: Eye, href: "/admin/blogs/view", style: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200" },
    { label: "Manage Services", icon: ShieldPlus, href: "/admin/pages", style: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200" },
    { label: "Visit Site", icon: ExternalLink, href: "/", style: "bg-gray-900 hover:bg-gray-800 text-white", target: "_blank" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">Ryan Clinic Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500 font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className={`${stat.bg} rounded-2xl p-5 border border-white hover:shadow-md transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.iconBg} w-10 h-10 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <ArrowRight className={`w-4 h-4 ${stat.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <p className="text-sm text-gray-600 mt-0.5 font-medium">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  target={a.target}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${a.style}`}
                >
                  <Icon className="w-4 h-4" />
                  {a.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Blogs + Summary side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Blogs */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Recent Blogs</h2>
              <Link
                href="/admin/blogs/view"
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {recentBlogs.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No blogs yet</p>
                <Link
                  href="/admin/blogs/create"
                  className="mt-3 text-xs text-blue-600 hover:underline font-semibold"
                >
                  Create your first blog →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentBlogs.map((blog) => (
                  <div key={blog._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition-colors group">
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
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/blogs/edit/${blog.pageUrl}`}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-lg hover:bg-blue-50"
                      >
                        Edit
                      </Link>
                      <a
                        href={`/blog/${blog.pageUrl}`}
                        target="_blank"
                        className="text-xs text-gray-500 hover:text-gray-700 font-semibold px-2 py-1 rounded-lg hover:bg-gray-100 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <h2 className="font-bold text-gray-900 text-sm">Content Summary</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Published Blogs</span>
                  <span className="text-sm font-bold text-gray-900 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">{blogs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service Pages</span>
                  <span className="text-sm font-bold bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full">{services.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Live Pages</span>
                  <span className="text-sm font-bold bg-orange-50 text-orange-700 px-2.5 py-0.5 rounded-full">{blogs.length + services.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-sm mb-1">Publish New Content</h3>
              <p className="text-blue-200 text-xs mb-4">Keep your website fresh with new blogs and service updates.</p>
              <Link
                href="/admin/blogs/create"
                className="flex items-center gap-2 bg-white text-blue-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors w-full justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
                Write New Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
