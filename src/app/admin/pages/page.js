export const dynamic = "force-dynamic";

import Link from "next/link";
import { getAllServices } from "@/lib/serviceData";
import {
  ShieldPlus, SquarePen, Calendar, ExternalLink,
  Search, FileText, RefreshCw,
} from "lucide-react";

function fmtDate(d) {
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return "—"; }
}

export default async function ServicePage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <ShieldPlus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Service Pages</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {services.length} service{services.length !== 1 ? "s" : ""} published
                </p>
              </div>
            </div>
          </div>

          {/* Search — decorative (server-rendered, no state) */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium">No services yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first service page to get started.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-12">#</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Page Title</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Page URL</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider">Created</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-gray-500 text-xs uppercase tracking-wider w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {services.map((service, i) => (
                      <tr key={service._id} className="group hover:bg-blue-50/40 transition-colors">
                        <td className="px-5 py-4 text-gray-400 text-xs font-medium">{i + 1}</td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900 leading-snug line-clamp-1 max-w-[240px]">
                            {service.metadata?.title || <span className="text-gray-400 italic">No Title</span>}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          {service.metadata?.pageurl ? (
                            <a
                              href={`/${service.metadata.pageurl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              /{service.metadata.pageurl}
                            </a>
                          ) : (
                            <span className="text-gray-400 italic text-xs">No URL</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <Calendar className="w-3 h-3 shrink-0" />
                            {fmtDate(service.createdAt)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center">
                            <Link
                              href={`/admin/pages/edit/${service.metadata?.pageurl}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                            >
                              <SquarePen className="w-3.5 h-3.5" />
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {services.map((service, i) => (
                  <div key={service._id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                          {service.metadata?.title || <span className="text-gray-400 italic">No Title</span>}
                        </p>
                        {service.metadata?.pageurl && (
                          <a
                            href={`/${service.metadata.pageurl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-blue-500 text-xs font-medium mt-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            /{service.metadata.pageurl}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        {fmtDate(service.createdAt)}
                      </div>
                      <Link
                        href={`/admin/pages/edit/${service.metadata?.pageurl}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                      >
                        <SquarePen className="w-3.5 h-3.5" /> Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center px-5 py-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{services.length}</span> service{services.length !== 1 ? "s" : ""}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
