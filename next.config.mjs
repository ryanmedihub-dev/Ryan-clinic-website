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
      // ── 1. ROOT & CASE CLEANUP ────────────────────────────────────────
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/costCost",
        destination: "/cost",
        permanent: true,
      },
      {
        source: "/blogBlog",
        destination: "/blog",
        permanent: true,
      },

      // ── 2. PHP EXTENSION CLEANUP ──────────────────────────────────────
      {
        source: "/about.php",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/female-hair-transplant.php",
        destination: "/female-hair-transplant",
        permanent: true,
      },
      {
        source: "/mumbai-branch.php",
        destination: "/hair-transplant-in-mumbai",
        permanent: true,
      },
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },

      // ── 3. TYPOS & MISSPELLED URLS ────────────────────────────────────
      {
        source: "/book-appoinent",
        destination: "/book-appointment",
        permanent: true,
      },
      {
        source: "/hair-transplant-in-banglore",
        destination: "/hair-transplant-in-bangalore",
        permanent: true,
      },
      {
        source: "/blog/hair-trnasplant-in-patna",
        destination: "/hair-transplant-in-patna",
        permanent: true,
      },

      // ── 4. GALLERY & RESULTS URLS ─────────────────────────────────────
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
      {
        source: "/gallery/images",
        destination: "/gallery",
        permanent: true,
      },
      // Gallery city legacy URLs (all consolidate to canonical gallery)
      {
        source: "/gallery/hair-transplant-in-kolkata",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-pune",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-ahmedabad",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-chennai",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-patna",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-jammu",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-bangalore",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/gallery/hair-transplant-in-lucknow",
        destination: "/gallery",
        permanent: true,
      },

      // ── 5. GENERAL & TREATMENT URLS ───────────────────────────────────
      {
        source: "/hair-fall-loss-treatment-in-delhi",
        destination: "/treatments/hair-fall-loss-treatment-in-delhi",
        permanent: true,
      },
      {
        source: "/hair-transplant-in-india",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fut-hair-transplant-delhi",
        destination: "/hair-transplant-in-delhi",
        permanent: true,
      },
      {
        source: "/prp-hair-loss-treatment-in-mumbai",
        destination: "/prp-treatment",
        permanent: true,
      },

      // ── 6. BLOG URLS ──────────────────────────────────────────────────
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
      {
        source: "/blog/using-topical-minoxidil-benefits",
        destination: "/blog/minoxidil-benefits-for-hair",
        permanent: true,
      },
      // NOTE: /blog/doctor-led-vs-technician-hair-transplant NOT redirected
      // (different intent from turkey-india; left as 404 per strict rules)

      // Old city blog URLs → city branch pages
      {
        source: "/blog/hair-transplant-in-bangalore",
        destination: "/hair-transplant-in-bangalore",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-ahmedabad",
        destination: "/hair-transplant-in-ahmedabad",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-patna",
        destination: "/hair-transplant-in-patna",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-chennai",
        destination: "/hair-transplant-in-chennai",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-pune",
        destination: "/hair-transplant-in-pune",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-lucknow",
        destination: "/hair-transplant-in-lucknow",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-jammu",
        destination: "/hair-transplant-in-jammu",
        permanent: true,
      },
      {
        source: "/blog/hair-transplant-in-kolkata",
        destination: "/hair-transplant-in-kolkata",
        permanent: true,
      },

      // ── 7. COST PAGES ─────────────────────────────────────────────────
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
      {
        source: "/cost/hair-transplant-cost-in-mumbai",
        destination: "/hair-transplant-in-mumbai",
        permanent: true,
      },
      // Non-existent city cost pages → /cost listing
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

      // ── 8. SURGERY PAGES ──────────────────────────────────────────────
      // Canonical surgery page renames
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
      // Non-existent city surgery pages → /surgery listing
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

      // ── 9. DOCTOR & SURGEON PAGES ─────────────────────────────────────
      {
        source: "/hair-transplant-doctor-in-delhi",
        destination: "/doctors/hair-transplant-doctor-in-delhi",
        permanent: true,
      },
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
      {
        source: "/about/dr-pranendra-singh",
        destination: "/doctors",
        permanent: true,
      },
      // Non-existent city doctor pages → /doctors listing
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

      // Non-existent city surgeon pages → /surgeon listing
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

      // ── 10. BEST CLINIC MARKETING URLS ────────────────────────────────
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
    ];
  },
};

export default nextConfig;
