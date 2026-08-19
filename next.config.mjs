/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  turbopack: {},

  // Prevent the dev-server file watcher from triggering HMR when you create
  // new folders / files in directories that aren't part of your source code.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        // Ignore directories that are NOT source code.
        // This stops re-renders every time you create a file or folder.
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          "**/public/uploads/**",
          "**/scripts/**",
        ],
        // Debounce: wait 300ms after the last change before triggering HMR.
        aggregateTimeout: 300,
      };
    }
    return config;
  },


  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "lh7-rt.googleusercontent.com" },
    ],
  },

  async headers() {
    return [
      // 1-day cache for uploads folder (images, logo, etc.)
      {
        source: "/uploads/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // Security + performance headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' is required by React/Turbopack in dev mode for stack trace reconstruction
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://connect.facebook.net https://api.whatsapp.com`,
              "img-src 'self' data: https: blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.google.com https://api.cloudinary.com",
              "frame-src 'self' https://www.google.com https://maps.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ── PHP extension cleanup ─────────────────────────────────────────
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },

      // ── Gallery: old slugs → /gallery ─────────────────────────────────
      // VERIFIED: /gallery returns 200. Both are semantic equivalents of the gallery page.
      {
        source: "/results",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/hair-transplant-results-before-after-gallery",
        destination: "/gallery",
        permanent: true,
      },

      // ── General / Treatment ───────────────────────────────────────────
      // VERIFIED: exact slug namespace move (/treatments/... exists, returns 200)
      {
        source: "/hair-fall-loss-treatment-in-delhi",
        destination: "/treatments/hair-fall-loss-treatment-in-delhi",
        permanent: true,
      },
      // VERIFIED: generic India page → homepage (no dedicated India page exists)
      {
        source: "/hair-transplant-in-india",
        destination: "/",
        permanent: true,
      },
      // VERIFIED: no FUT-specific page exists. /fue-hair-transplant (200) is the
      // closest treatment-level equivalent (same technique category, same section).
      {
        source: "/fut-hair-transplant-delhi",
        destination: "/fue-hair-transplant",
        permanent: true,
      },
      // VERIFIED: old URL was a PRP treatment page; /prp-treatment (200) is the
      // canonical PRP service page — same intent. NOT a cost page.
      {
        source: "/prp-hair-loss-treatment-in-mumbai",
        destination: "/prp-treatment",
        permanent: true,
      },

      // ── Blog: slug encoding fix ───────────────────────────────────────
      // VERIFIED: same article in DB — only slug encoding changed (& → and)
      {
        source: "/blog/smoking-:amp(amp;|%26|&)-hair-transplant",
        destination: "/blog/smoking-and-hair-transplant",
        permanent: true,
      },
      {
        source: "/blog/smoking-&-hair-transplant",
        destination: "/blog/smoking-and-hair-transplant",
        permanent: true,
      },
      // NOTE: /blog/doctor-led-vs-technician-hair-transplant NOT redirected.
      // REASON: /blog/turkey-india-which-is-best is a DIFFERENT article
      // (different DB _id, different title). The old URL never existed in DB.
      // → intentional 404 — no content was lost, no equivalent exists.

      // ── Blog: city landing pages that never existed as blog articles ───
      // VERIFIED: None of these 8 slugs exist in the Blog collection (DB confirmed).
      // They were thin city landing pages incorrectly placed under /blog/.
      // The canonical city branch page is the semantically correct destination.
      {
        source: "/blog/hair-transplant-in-patna",
        destination: "/hair-transplant-in-patna",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-ahmedabad",
        destination: "/hair-transplant-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-lucknow",
        destination: "/hair-transplant-in-lucknow",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-chennai",
        destination: "/hair-transplant-in-chennai",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-bangalore",
        destination: "/hair-transplant-in-bangalore",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-kolkata",
        destination: "/hair-transplant-in-kolkata",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-jammu",
        destination: "/hair-transplant-in-jammu",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-pune",
        destination: "/hair-transplant-in-pune",
        permanent: true,
      },

      // ── Cost pages: verified slug renames ─────────────────────────────
      // VERIFIED: same CostPage record — slug was renamed to /cost/fue-*
      {
        source: "/hair-transplant-cost-in-delhi",
        destination: "/cost/fue-hair-transplant-cost-in-delhi",
        permanent: true,
      },
      {
        source: "/fue-hair-transplant-cost-in-delhi",
        destination: "/cost/fue-hair-transplant-cost-in-delhi",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-cost-in-delhi",
        destination: "/cost/fue-hair-transplant-cost-in-delhi",
        permanent: true,
      },
      // NOTE: /cost/hair-transplant-cost-in-mumbai NOT redirected.
      // REASON: Hair transplant cost ≠ PRP cost. Entirely different treatments.
      // No HT cost page for Mumbai exists in DB. → intentional 404.

      // ── Cost pages: cities with no CostPage → /cost listing ───────────
      // VERIFIED: /cost returns 200. No CostPage record for any of these cities.
      // /cost listing is semantically defensible (same section, broader scope).
      // NOT redirected to city branch pages (cost intent ≠ branch intent).
      {
        source: "/cost/hair-transplant-cost-in-hyderabad",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-bangalore",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-lucknow",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-ahmedabad",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-pune",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-kolkata",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-chennai",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-jammu",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/cost/hair-transplant-in-patna",
        destination: "/cost",
        permanent: true,
      },

      // ── Surgery pages: verified canonical slug renames ─────────────────
      // VERIFIED: these two SurgeryPage records exist in DB and return 200
      {
        source: "/hair-transplant-surgery-in-delhi",
        destination: "/surgery/hair-transplant-surgery-in-delhi",
        permanent: true,
      },
      {
        source: "/hair-transplant-surgery-in-mumbai",
        destination: "/surgery/hair-transplant-surgery-in-mumbai",
        permanent: true,
      },

      // ── Surgery pages: cities with no SurgeryPage → /surgery listing ───
      // VERIFIED: /surgery returns 200. No SurgeryPage for these cities in DB.
      // /surgery listing is semantically appropriate: same content section.
      // NOT redirected to city branch pages (surgery intent ≠ branch intent).
      {
        source: "/surgery/hair-transplant-surgery-in-hyderabad",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/hair-transplant-surgery-in-hyderabad",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-ahmedabad",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-chennai",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-kolkata",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-jammu",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-patna",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-pune",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-lucknow",
        destination: "/surgery",
        permanent: true,
      },
      {
        source: "/surgery/hair-transplant-in-bangalore",
        destination: "/surgery",
        permanent: true,
      },

      // ── Doctor pages: verified canonical renames ───────────────────────
      // VERIFIED: Doctor records exist in DB (not deleted) and pages return 200
      {
        source: "/hair-transplant-doctor-in-delhi",
        destination: "/doctors/hair-transplant-doctor-in-delhi",
        permanent: true,
      },
      // VERIFIED: moved from /doctors/ namespace to /surgeon/ namespace
      {
        source: "/doctors/hair-transplant-surgeon-in-delhi",
        destination: "/surgeon/hair-transplant-surgeon-in-delhi",
        permanent: true,
      },
      {
        source: "/hair-transplant-surgeon-in-delhi",
        destination: "/surgeon/hair-transplant-surgeon-in-delhi",
        permanent: true,
      },

      // ── Doctor pages: cities with no Doctor record → /doctors listing ──
      // VERIFIED: /doctors returns 200. No active Doctor record for these cities.
      // /doctors listing is semantically defensible (same section, broader scope).
      // NOT redirected to city branch pages (doctor intent ≠ branch intent).
      {
        source: "/doctors/hair-transplant-in-jammu",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-kolkata",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-patna",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-chennai",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-ahmedabad",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-bangalore",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-lucknow",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/doctors/hair-transplant-in-pune",
        destination: "/doctors",
        permanent: true,
      },

      // ── Surgeon pages: cities with no SurgeonPage → /surgeon listing ───
      // VERIFIED: /surgeon returns 200. No SurgeonPage for these cities in DB.
      // /surgeon listing is semantically appropriate.
      // NOT redirected to city branch pages (surgeon intent ≠ branch intent).
      {
        source: "/surgeon/hair-transplant-in-jammu",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-kolkata",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-patna",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-ahmedabad",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-chennai",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-bangalore",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-lucknow",
        destination: "/surgeon",
        permanent: true,
      },
      {
        source: "/surgeon/hair-transplant-in-pune",
        destination: "/surgeon",
        permanent: true,
      },

      // ── Best Clinic marketing URLs → canonical city branch pages ───────
      // VERIFIED: "best clinic in X" intent = Ryan Clinic's city branch page
      {
        source: "/best-hair-transplant-clinic-in-delhi",
        destination: "/hair-transplant-in-delhi",
        permanent: true,
      },
      {
        source: "/best-hair-transplant-clinic-in-mumbai",
        destination: "/hair-transplant-in-mumbai",
        permanent: true,
      },
      {
        source: "/best-hair-transplant-clinic-in-hyderabad",
        destination: "/hair-transplant-in-hyderabad",
        permanent: true,
      },

      // ── Doctor profile: soft-deleted → /doctors listing ────────────────
      // VERIFIED: dr-pranendra-singh has deletedAt set in DB → page returns 404.
      // /doctors listing (200) is the semantically safest landing point.
      {
        source: "/about/dr-pranendra-singh",
        destination: "/doctors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
