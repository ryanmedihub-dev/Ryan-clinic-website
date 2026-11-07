/**
 * Dynamic Sitemap — src/app/sitemap.js
 *
 * Next.js App Router auto-serves this at /sitemap.xml.
 * Sources of truth for automatic URL discovery:
 *
 *   • Services (services collection)       — all with a valid pageurl slug,
 *                                            excluding internal -copy drafts.
 *   • Blogs (blogs collection)             — all with a valid pageUrl (the
 *                                            blog schema has no draft state;
 *                                            presence == published).
 *   • Cost pages (costpages collection)    — settings.status === "published",
 *                                            settings.isDeleted !== true,
 *                                            settings.showInSitemap !== false,
 *                                            settings.allowIndexing !== false,
 *                                            excluding -copy slugs.
 *   • Surgeon pages (surgeonpages)         — settings.status === "published",
 *                                            settings.isDeleted !== true,
 *                                            settings.showInSitemap !== false.
 *   • Surgery pages (surgerypages)         — top-level status === "published"
 *                                            (the SurgeryPage schema stores
 *                                            publish state at root, not nested
 *                                            inside settings).
 *   • Doctor pages (doctors collection)    — status === "published",
 *                                            deletedAt === null,
 *                                            excluding demo-doctor-* slugs.
 *
 * Adding a new page through the admin panel automatically adds it to the
 * sitemap on the next ISR revalidation (every hour by default).
 *
 * Revalidation: export const revalidate = 3600 (1 h ISR).
 * Fallback: if DB queries fail, the static pages are still returned.
 */

import { DBConnection } from "@/lib/db";

const BASE = "https://www.clinicryan.com";

// ─── URL patterns that must never appear in the sitemap ──────────────────────
// These are redirect-only or canonical-duplicate routes found in the filesystem.
const EXCLUDED_PATTERNS = [
  // Legacy redirect pages (they 301 to /doctors/... and /surgeon/...)
  /^\/hair-transplant-doctor-in-delhi$/,
  /^\/hair-transplant-surgeon-in-delhi$/,
  // surgery/landing has canonical pointing to /surgery
  /^\/surgery\/landing$/,
  // Internal CMS copy/draft slugs
  /-copy(-\d+)?$/,
];

function isExcluded(url) {
  return EXCLUDED_PATTERNS.some((re) => re.test(url));
}

// ─── Static pages that never come from the DB ────────────────────────────────
// Keep this list minimal — only pages that have no DB record and are not
// covered by any dynamic fetcher below.
const STATIC_PAGES = [
  { url: "/",                               priority: 1.0, changeFrequency: "weekly"  },
  { url: "/about",                          priority: 0.8, changeFrequency: "monthly" },
  { url: "/contact",                        priority: 0.8, changeFrequency: "monthly" },
  { url: "/gallery",                        priority: 0.8, changeFrequency: "weekly"  },
  { url: "/blog",                           priority: 0.9, changeFrequency: "daily"   },
  { url: "/doctors",                        priority: 0.8, changeFrequency: "weekly"  },
  { url: "/surgeon",                        priority: 0.8, changeFrequency: "weekly"  },
  { url: "/surgery",                        priority: 0.8, changeFrequency: "weekly"  },
  { url: "/cost",                           priority: 0.8, changeFrequency: "weekly"  },
  // Legal / policy pages
  { url: "/privacy-policy",                 priority: 0.3, changeFrequency: "yearly"  },
  { url: "/terms-and-conditions",           priority: 0.3, changeFrequency: "yearly"  },
  { url: "/refund-policy",                  priority: 0.3, changeFrequency: "yearly"  },
  // Standalone treatment pages not stored as CMS services
  { url: "/prp-hair-loss-treatment-in-delhi", priority: 0.8, changeFrequency: "monthly" },
  // Public lead-generation page (must be indexed — high conversion page)
  { url: "/book-appointment",               priority: 0.9, changeFrequency: "monthly" },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function toDate(val) {
  if (!val) return new Date();
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
}

function cleanSlugPath(raw, ...stripPrefixes) {
  let s = raw.replace(/^\/+/, "").replace(/\/+$/, "");
  for (const prefix of stripPrefixes) {
    if (s.startsWith(prefix)) s = s.slice(prefix.length);
  }
  return s;
}

// ─── Data fetchers ────────────────────────────────────────────────────────────
// Each fetcher is independently try/caught so a failure in one collection
// never silently drops the entire sitemap.

/**
 * Services — all CMS service pages (branch + treatment + transplant types).
 * No publish flag in the services schema; every document with a pageurl is
 * a live published page.
 * Excludes: internal -copy draft slugs.
 */
async function fetchServiceSlugs() {
  try {
    const Services = (await import("@/models/services")).default;
    const rows = await Services.find({})
      .select("metadata.pageurl updatedAt")
      .lean();
    return rows
      .filter((r) => {
        const slug = r?.metadata?.pageurl;
        if (!slug) return false;
        // Exclude internal copy/draft entries
        if (/-copy(-\d+)?$/.test(slug)) return false;
        return true;
      })
      .map((r) => ({
        url: `/${cleanSlugPath(r.metadata.pageurl)}`,
        lastModified: toDate(r.updatedAt),
        priority: r.metadata?.pageType === "branch" ? 0.9 : 0.85,
        changeFrequency: "weekly",
      }));
  } catch (err) {
    console.error("[sitemap] services fetch failed:", err.message);
    return [];
  }
}

/**
 * Blogs — all blog posts with a valid pageUrl.
 * The Blog schema has no draft/publish state flag; a document being saved
 * to the collection means it is published (admin create/edit triggers this).
 * Sorting newest-first is irrelevant for the sitemap, but lastModified
 * reflects actual DB update timestamps.
 */
async function fetchBlogSlugs() {
  try {
    const Blog = (await import("@/models/blog")).default;
    const rows = await Blog.find({})
      .select("pageUrl updatedAt publishedAt")
      .lean();
    return rows
      .filter((r) => r?.pageUrl)
      .map((r) => ({
        url: `/blog/${cleanSlugPath(r.pageUrl)}`,
        // Use publishedAt when available; fall back to updatedAt / createdAt
        lastModified: toDate(r.publishedAt || r.updatedAt),
        priority: 0.65,
        changeFrequency: "monthly",
      }));
  } catch (err) {
    console.error("[sitemap] blogs fetch failed:", err.message);
    return [];
  }
}

/**
 * Cost pages — only published, non-deleted, non-excluded entries.
 * Respects settings.showInSitemap and settings.allowIndexing flags.
 * Excludes -copy slugs (internal drafts created by the admin duplicate action).
 */
async function fetchCostPageSlugs() {
  try {
    const CostPage = (await import("@/models/CostPage")).default;
    const rows = await CostPage.find({
      "settings.status": "published",
      "settings.isDeleted": { $ne: true },
      // Respect admin-controlled sitemap and indexing toggles
      "settings.showInSitemap": { $ne: false },
      "settings.allowIndexing": { $ne: false },
    })
      .select("slug updatedAt")
      .lean();
    return rows
      .filter((r) => {
        if (!r?.slug) return false;
        // Exclude internal copy entries
        if (/-copy(-\d+)?$/.test(r.slug)) return false;
        return true;
      })
      .map((r) => {
        const slug = cleanSlugPath(r.slug, "cost/");
        return {
          url: `/cost/${slug}`,
          lastModified: toDate(r.updatedAt),
          priority: 0.75,
          changeFrequency: "weekly",
        };
      });
  } catch (err) {
    console.error("[sitemap] cost pages fetch failed:", err.message);
    return [];
  }
}

/**
 * Surgeon pages — published and not deleted.
 * Respects settings.showInSitemap flag.
 */
async function fetchSurgeonPageSlugs() {
  try {
    const SurgeonPage = (await import("@/models/SurgeonPage")).default;
    const rows = await SurgeonPage.find({
      "settings.status": "published",
      "settings.isDeleted": { $ne: true },
      "settings.showInSitemap": { $ne: false },
    })
      .select("slug updatedAt")
      .lean();
    return rows
      .filter((r) => r?.slug)
      .map((r) => ({
        url: `/surgeon/${cleanSlugPath(r.slug)}`,
        lastModified: toDate(r.updatedAt),
        priority: 0.8,
        changeFrequency: "weekly",
      }));
  } catch (err) {
    console.error("[sitemap] surgeon pages fetch failed:", err.message);
    return [];
  }
}

/**
 * Surgery pages — published only.
 *
 * IMPORTANT: The SurgeryPage schema stores publish state in the TOP-LEVEL
 * `status` field (enum: ["draft", "published"]), NOT inside `settings.status`.
 * The settings sub-document exists but does not contain a status field.
 * Filtering on `settings.status` would silently return all documents
 * (since the field is undefined and $ne "draft" is always true for undefined).
 * This was a bug in the previous implementation.
 */
async function fetchSurgeryPageSlugs() {
  try {
    const SurgeryPage = (await import("@/models/surgeryPage")).default;
    const rows = await SurgeryPage.find({
      // Correct field: top-level status, not settings.status
      status: "published",
    })
      .select("slug updatedAt")
      .lean();
    return rows
      .filter((r) => r?.slug)
      .map((r) => ({
        url: `/surgery/${cleanSlugPath(r.slug)}`,
        lastModified: toDate(r.updatedAt),
        priority: 0.75,
        changeFrequency: "weekly",
      }));
  } catch (err) {
    console.error("[sitemap] surgery pages fetch failed:", err.message);
    return [];
  }
}

/**
 * Doctor pages — published, not soft-deleted, not demo accounts.
 * Uses the enterprise Doctors model (src/models/Doctors.js) which stores
 * publish state in the top-level `status` field and soft-delete in `deletedAt`.
 */
async function fetchDoctorPageSlugs() {
  try {
    const Doctor = (await import("@/models/Doctors")).default;
    const rows = await Doctor.find({
      deletedAt: null,
      status: "published",
      slug: { $not: /^demo-doctor-/i },
    })
      .select("slug updatedAt")
      .lean();
    return rows
      .filter((r) => r?.slug)
      .map((r) => ({
        url: `/doctors/${cleanSlugPath(r.slug)}`,
        lastModified: toDate(r.updatedAt),
        priority: 0.75,
        changeFrequency: "monthly",
      }));
  } catch (err) {
    console.error("[sitemap] doctor pages fetch failed:", err.message);
    return [];
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export const revalidate = 3600; // ISR: regenerate at most once per hour

export default async function sitemap() {
  // Establish DB connection once; individual fetchers handle their own errors.
  try {
    await DBConnection();
  } catch (err) {
    console.error("[sitemap] DB connection failed — returning static pages only:", err.message);
  }

  // Fetch all dynamic content in parallel for performance
  const [services, blogs, costPages, surgeonPages, surgeryPages, doctorPages] =
    await Promise.all([
      fetchServiceSlugs(),
      fetchBlogSlugs(),
      fetchCostPageSlugs(),
      fetchSurgeonPageSlugs(),
      fetchSurgeryPageSlugs(),
      fetchDoctorPageSlugs(),
    ]);

  // Build static entries.
  // lastModified uses current date for static pages (no DB timestamp available).
  const staticEntries = STATIC_PAGES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    priority,
    changeFrequency,
  }));

  // Collect the set of static URLs for deduplication below
  const staticUrls = new Set(STATIC_PAGES.map((p) => `${BASE}${p.url}`));

  // Build and deduplicate dynamic entries
  const dynamic = [
    ...services,
    ...blogs,
    ...costPages,
    ...surgeonPages,
    ...surgeryPages,
    ...doctorPages,
  ];

  const seen = new Set(staticUrls); // pre-seed with static URLs
  const deduped = [];

  for (const entry of dynamic) {
    if (!entry?.url) continue;
    const full = `${BASE}${entry.url}`;

    // Skip redirect-only routes, canonical duplicates, and copy slugs
    if (isExcluded(entry.url)) continue;
    // Skip duplicates (static pages take precedence)
    if (seen.has(full)) continue;

    seen.add(full);
    deduped.push({
      url: full,
      lastModified: entry.lastModified ?? new Date(),
      priority: entry.priority ?? 0.6,
      changeFrequency: entry.changeFrequency ?? "monthly",
    });
  }

  return [...staticEntries, ...deduped];
}
