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
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },
      // /results was linked from CTAs but the page lives at /hair-transplant-results-before-after-gallery
      {
        source: "/results",
        destination: "/hair-transplant-results-before-after-gallery",
        permanent: true,
      },
      // Treatment content pages moved to the shared /treatments/[slug] dynamic route
      {
        source: "/hair-fall-loss-treatment-in-delhi",
        destination: "/treatments/hair-fall-loss-treatment-in-delhi",
        permanent: true,
      },
      // The old static surgery page has been consolidated into the dynamic CMS route.
      // Permanent 301 preserves SEO equity and existing backlinks.
      {
        source: "/hair-transplant-surgery-in-delhi",
        destination: "/surgery/hair-transplant-surgery-in-delhi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
