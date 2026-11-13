import test from "node:test";
import assert from "node:assert/strict";

// Helper functions mirroring the logic in sitemap.js and surgery/[slug]/page.js

function cleanSlugPath(raw, ...stripPrefixes) {
  let s = raw.replace(/^\/+/, "").replace(/\/+$/, "");
  for (const prefix of stripPrefixes) {
    if (s.startsWith(prefix)) s = s.slice(prefix.length);
  }
  return s;
}

const EXCLUDED_PATTERNS = [
  /^\/hair-transplant-doctor-in-delhi$/,
  /^\/hair-transplant-surgeon-in-delhi$/,
  /^\/surgery\/landing$/,
  /-copy(-\d+)?$/,
];

function isExcluded(url) {
  return EXCLUDED_PATTERNS.some((re) => re.test(url));
}

function getSurgeryCanonicalUrl(rawCanonical, slug) {
  if (
    rawCanonical &&
    typeof rawCanonical === "string" &&
    rawCanonical.includes("/surgery/") &&
    !/-copy(-\d+)?(\/|$)/i.test(rawCanonical)
  ) {
    return rawCanonical.trim();
  }
  return `https://www.clinicryan.com/surgery/${slug}`;
}

function getDoctorCanonicalUrl(rawCanonical, slug) {
  // Doctor landing pages are unique canonical routes matching /doctors/${slug}.
  // Name-based canonicals from MongoDB are ignored.
  return `https://www.clinicryan.com/doctors/${slug}`;
}

function formatHairFallPageUrl(rawSlug) {
  const slug = cleanSlugPath(rawSlug, "treatments/");
  return `/treatments/${slug}/`;
}

function toDate(val) {
  if (!val) return new Date();
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
}

function getLatestTimestamp(entries, fallbackIso) {
  const fallback = toDate(fallbackIso);
  if (!Array.isArray(entries) || !entries.length) return fallback;
  const times = entries
    .map((e) => (e && e.lastModified ? new Date(e.lastModified).getTime() : NaN))
    .filter((t) => !isNaN(t) && t > 0);
  return times.length ? new Date(Math.max(...times)) : fallback;
}

// ─── TEST SUITE ──────────────────────────────────────────────────────────────

test("Doctor Canonical: enforces self-referencing canonical matching resolved slug", () => {
  const testCases = [
    {
      slug: "hair-transplant-doctor-in-pune",
      dbCanonical: "https://www.clinicryan.com/doctors/dr-anaya-patil-pune",
      expected: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-pune",
    },
    {
      slug: "hair-transplant-doctor-in-kolkata",
      dbCanonical: "https://www.clinicryan.com/doctors/dr-jai-kishan-solanki-kolkata",
      expected: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-kolkata",
    },
    {
      slug: "hair-transplant-doctor-in-chennai",
      dbCanonical: "https://www.clinicryan.com/doctors/dr-pranendra-singh-chennai",
      expected: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-chennai",
    },
    {
      slug: "hair-transplant-doctor-in-delhi",
      dbCanonical: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
      expected: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
    },
  ];

  for (const tc of testCases) {
    const result = getDoctorCanonicalUrl(tc.dbCanonical, tc.slug);
    assert.equal(result, tc.expected);
    assert.doesNotMatch(result, /dr-[a-z]+-[a-z]+/i, "Must not contain doctor personal names");
  }
});

test("Surgery Canonical: rejects -copy draft URLs and falls back to clean slug canonical", () => {
  // Case 1: Kolkata surgery page having -copy canonical in DB
  const kolkataCanonical = getSurgeryCanonicalUrl(
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-kolkata-copy",
    "hair-transplant-surgery-in-kolkata"
  );
  assert.equal(
    kolkataCanonical,
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-kolkata"
  );
  assert.doesNotMatch(kolkataCanonical, /-copy/i);

  // Case 2: Numerical copy draft -copy-2
  const copy2Canonical = getSurgeryCanonicalUrl(
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi-copy-2",
    "hair-transplant-surgery-in-delhi"
  );
  assert.equal(
    copy2Canonical,
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi"
  );

  // Case 3: Legitimate custom canonical without -copy
  const legitimateCanonical = getSurgeryCanonicalUrl(
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi",
    "hair-transplant-surgery-in-delhi"
  );
  assert.equal(
    legitimateCanonical,
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-delhi"
  );

  // Case 4: Non-surgery or empty canonical falls back
  const emptyCanonical = getSurgeryCanonicalUrl("", "hair-transplant-surgery-in-mumbai");
  assert.equal(
    emptyCanonical,
    "https://www.clinicryan.com/surgery/hair-transplant-surgery-in-mumbai"
  );
});

test("HairFallPage URL formatting: preserves trailing slash matching canonical tag", () => {
  assert.equal(
    formatHairFallPageUrl("hair-fall-loss-treatment-in-delhi"),
    "/treatments/hair-fall-loss-treatment-in-delhi/"
  );
  assert.equal(
    formatHairFallPageUrl("/treatments/hair-fall-loss-treatment-in-delhi"),
    "/treatments/hair-fall-loss-treatment-in-delhi/"
  );
  assert.equal(
    formatHairFallPageUrl("hair-fall-loss-treatment-in-delhi/"),
    "/treatments/hair-fall-loss-treatment-in-delhi/"
  );
});

test("Sitemap Exclusions: blocks draft copy slugs and redirect-only routes", () => {
  assert.equal(isExcluded("/hair-transplant-in-delhi-copy"), true);
  assert.equal(isExcluded("/hair-transplant-in-delhi-copy-2"), true);
  assert.equal(isExcluded("/hair-transplant-doctor-in-delhi"), true);
  assert.equal(isExcluded("/hair-transplant-surgeon-in-delhi"), true);
  assert.equal(isExcluded("/surgery/landing"), true);

  // Valid routes must NOT be excluded
  assert.equal(isExcluded("/hair-transplant-in-delhi"), false);
  assert.equal(isExcluded("/treatments/hair-fall-loss-treatment-in-delhi/"), false);
  assert.equal(isExcluded("/doctors/hair-transplant-doctor-in-pune"), false);
  assert.equal(isExcluded("/surgery/hair-transplant-surgery-in-kolkata"), false);
});

test("Static lastmod accuracy: dynamic listing hubs correctly resolve latest content date", () => {
  const mockBlogs = [
    { lastModified: new Date("2026-10-01T00:00:00.000Z") },
    { lastModified: new Date("2026-11-06T10:13:37.858Z") },
    { lastModified: new Date("2026-11-04T00:00:00.000Z") },
  ];

  const latestBlogDate = getLatestTimestamp(mockBlogs, "2026-01-01T00:00:00.000Z");
  assert.equal(latestBlogDate.toISOString(), "2026-11-06T10:13:37.858Z");

  // Fallback when entries array is empty
  const fallbackDate = getLatestTimestamp([], "2026-11-06T11:00:00.000Z");
  assert.equal(fallbackDate.toISOString(), "2026-11-06T11:00:00.000Z");

  // Safe handling of null, undefined, and non-array entries
  const nullEntries = getLatestTimestamp(null, "2026-11-06T11:00:00.000Z");
  assert.equal(nullEntries.toISOString(), "2026-11-06T11:00:00.000Z");

  const undefinedEntries = getLatestTimestamp(undefined, "2026-11-06T11:00:00.000Z");
  assert.equal(undefinedEntries.toISOString(), "2026-11-06T11:00:00.000Z");

  // Safe handling of dirty array items (null, missing lastModified, invalid dates)
  const dirtyEntries = [
    null,
    undefined,
    {},
    { lastModified: null },
    { lastModified: "not-a-date" },
    { lastModified: new Date("2026-10-15T08:00:00.000Z") },
  ];
  const dirtyResolved = getLatestTimestamp(dirtyEntries, "2026-01-01T00:00:00.000Z");
  assert.equal(dirtyResolved.toISOString(), "2026-10-15T08:00:00.000Z");
});

