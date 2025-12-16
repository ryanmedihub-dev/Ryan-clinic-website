/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*.php',
        destination: '/:path*',
        permanent: true, // 308 SEO-friendly redirect
      },
    ];
  },
};

export default nextConfig;
