import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import FloatingCTA from "@/components/layouts/FloatingCTA";
import Script from "next/script";

import { Outfit, DM_Sans } from "next/font/google";

// ✅ Outfit (headings — slim, geometric, professional)
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

// ✅ DM Sans (body — clean, slim, highly readable)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata = {
  metadataBase: new URL("https://clinicryan.com"),
  title: "Hair Transplant in Delhi | Best Sapphire FUE Cost | Ryan Clinic",
  description:
    "Ryan Clinic offers the best hair transplant in Delhi using advanced Turkey Sapphire FUE. Certified surgeons, 95%+ graft survival & affordable cost. Call +91-9217958539. Book free consultation!",
  keywords: [
    "hair transplant in Delhi",
    "best hair transplant in Delhi",
    "hair transplant cost in Delhi",
    "Turkey Sapphire FUE Delhi",
    "Sapphire FUE hair transplant Delhi",
    "hair transplant clinic in Delhi",
    "best hair transplant surgeon Delhi",
    "hair transplant doctor Delhi",
    "FUE hair transplant Delhi NCR",
    "Ryan Clinic Delhi hair transplant",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.clinicryan.com/hair-transplant-in-delhi",
  },
  authors: [{ name: "Dr. Pranendra Singh, Ryan Clinic" }],
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.clinicryan.com/hair-transplant-in-delhi",
    siteName: "Ryan Clinic",
    title: "Best Hair Transplant in Delhi - Sapphire FUE Cost | Ryan Clinic",
    description:
      "Ryan Clinic offers advanced Turkey Sapphire FUE hair transplant in Delhi. Certified surgeons, 95%+ graft survival & transparent pricing. Call +91-9217958539",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Clinic - Best Hair Transplant in Delhi",
      },
    ],
    publishedTime: "2024-01-01T00:00:00+05:30",
    modifiedTime: new Date().toISOString(),
  },
  twitter: {
    card: "summary_large_image",
    site: "@ryan_clinic",
    creator: "@ryan_clinic",
    title: "Best Hair Transplant in Delhi - Sapphire FUE | Ryan Clinic",
    description:
      "Advanced Turkey Sapphire FUE hair transplant in Delhi. Certified surgeons & best cost. Call +91-9217958539.",
    images: ["https://www.clinicryan.com/hair-transplant-in-delhi"],
  },
  verification: {
    google: "PGMWuu_5SSC0Rkyao2LrsHlWiN7bPeQnNaSdY1fgURM",
    yandex: "2a66899c829e502a",
    other: {
      "msvalidate.01": "DD718F54C1640669F3FF6B86F0C3BBDF",
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "New Delhi",
    "geo.position": "28.6139;77.2090",
    ICBM: "28.6139, 77.2090",
    "allow-search": "yes",
    "revisit-after": "7 days",
    Rating: "General",
    distribution: "global",
    yahooSeeker: "index, follow",
    msnbot: "index, follow",
    "article:modified_time": new Date().toISOString(),
    "article:publisher": "https://www.facebook.com/RyanClinic",
    "format-detection": "telephone=no",
    googlebot: "index, follow",
    copyright: "clinicryan.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/uploads/r-logo.png" />
        <link rel="apple-touch-icon" href="/uploads/r-logo.png" />
        <SchemaMarkup />
      </head>

      <body className={`${dmSans.className} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CK1LZXBKPX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CK1LZXBKPX');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qqm8himm4q");
          `}
        </Script>

        <Header />
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}