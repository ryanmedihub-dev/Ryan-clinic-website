export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { DBConnection } from "@/lib/db";
import Leads from "@/models/leads";
import { resendLead } from "@/lib/leads";
import {
  Users, ExternalLink, Search, Phone, Mail, MapPin, CheckCircle2, AlertTriangle, RefreshCw,
} from "lucide-react";

const CRM_URL = "https://www.ryanmedihub.com";
const PER_PAGE = 50;

async function resendAction(formData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  await resendLead(String(formData.get("id")));
  revalidatePath("/admin/customer");
}

function fmtDate(d) {
  try {
    return new Date(d).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return "—"; }
}

export default async function LeadsPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/login");

  const sp = await searchParams;
  const q = (sp?.q || "").trim();
  const status = sp?.status || "";
  const page = Math.max(1, parseInt(sp?.page) || 1);

  const filter = {};
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { location: rx }];
  }
  if (status) filter.crmStatus = status;

  await DBConnection();
  const [leads, total, failedCount] = await Promise.all([
    Leads.find(filter).sort({ createdAt: -1 }).skip((page - 1) * PER_PAGE).limit(PER_PAGE).lean(),
    Leads.countDocuments(filter),
    Leads.countDocuments({ crmStatus: "failed" }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const qs = (over) =>
    "?" + new URLSearchParams({ q, status, page: String(page), ...over }).toString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Leads</h1>
              <p className="text-xs text-gray-500">
                {total} lead{total === 1 ? "" : "s"} stored on this website
              </p>
            </div>
          </div>
          <a
            href={CRM_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open CRM
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-4">
        {failedCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {failedCount} lead{failedCount === 1 ? "" : "s"} never reached the CRM — the data is safe here.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <form className="flex items-center gap-2 grow sm:grow-0">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Name, phone, email, city…"
                className="pl-9 pr-3 py-2.5 w-full sm:w-72 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-purple-300"
              />
            </div>
            {status && <input type="hidden" name="status" value={status} />}
            <button className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
              Search
            </button>
          </form>
          <div className="flex gap-2 ml-auto">
            {[["", "All"], ["sent", "Sent"], ["failed", "Failed"], ["pending", "Pending"]].map(
              ([val, label]) => (
                <a
                  key={label}
                  href={qs({ status: val, page: "1" })}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    status === val
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </a>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {["Received", "Name", "Contact", "Location", "Details", "Source", "CRM"].map((h) => (
                  <th key={h} className="text-left font-semibold px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((l) => (
                <tr key={String(l._id)} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmtDate(l.createdAt)}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{l.name}</td>
                  <td className="px-4 py-3 space-y-1">
                    {l.phone && (
                      <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 text-gray-700 hover:text-purple-700">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />{l.phone}
                      </a>
                    )}
                    {l.email && (
                      <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 text-gray-500 hover:text-purple-700 break-all">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />{l.email}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {l.location ? (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />{l.location}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs">
                    {l.serviceType && <div className="font-medium text-gray-800">{l.serviceType}</div>}
                    {(l.visitPlan || l.visitDate) && (
                      <div className="text-xs text-gray-500">
                        {[l.visitPlan, l.visitDate].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    {l.remarks && <div className="text-xs text-gray-500">{l.remarks}</div>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-semibold">
                      {l.tag || l.source || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {l.crmStatus === "sent" ? (
                      <span className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />Sent
                      </span>
                    ) : (
                      <div className="space-y-1.5">
                        <span
                          title={l.crmError || ""}
                          className={`block text-xs font-semibold ${l.crmStatus === "failed" ? "text-red-600" : "text-amber-600"}`}
                        >
                          {l.crmStatus === "failed" ? "Failed" : "Pending"}
                        </span>
                        <form action={resendAction}>
                          <input type="hidden" name="id" value={String(l._id)} />
                          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors">
                            <RefreshCw className="w-3 h-3" />
                            Resend
                          </button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    No leads {q || status ? "match this filter" : "yet"}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Page {page} of {pages}</span>
            <div className="flex gap-2">
              {page > 1 && (
                <a href={qs({ page: String(page - 1) })} className="px-4 py-2 rounded-xl border border-gray-200 bg-white font-semibold hover:bg-gray-50">
                  Previous
                </a>
              )}
              {page < pages && (
                <a href={qs({ page: String(page + 1) })} className="px-4 py-2 rounded-xl border border-gray-200 bg-white font-semibold hover:bg-gray-50">
                  Next
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
