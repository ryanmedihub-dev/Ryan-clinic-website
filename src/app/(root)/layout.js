import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import FloatingCTA from "@/components/layouts/FloatingCTA";
import PopupForm from "@/components/common/PopupForm";
import Script from "next/script";

import { Outfit, DM_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://www.clinicryan.com"),
  title: "Hair Transplant in Delhi | Best Sapphire FUE Cost | Ryan Clinic",
  description:
    "Ryan Clinic — India's only Turkey Sapphire FUE hair transplant clinic. Certified surgeons, 95%+ graft survival. Clinics in Delhi, Mumbai & Hyderabad.",
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
  authors: [{ name: "Dr. Pranendra Singh, Ryan Clinic" }],
  openGraph: {
    type: "article",
    locale: "en_IN",
    url: "https://www.clinicryan.com/hair-transplant-in-delhi",
    siteName: "Ryan Clinic",
    title: "Best Hair Transplant in Delhi - Sapphire FUE Cost | Ryan Clinic",
    description:
      "Ryan Clinic offers advanced Turkey Sapphire FUE hair transplant in Delhi. Certified surgeons, 95%+ graft survival & transparent pricing. Call +91-9911111247",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
        width: 1200,
        height: 630,
        alt: "Ryan Clinic - Best Hair Transplant in Delhi",
      },
    ],
    publishedTime: "2024-01-01T00:00:00+05:30",
    modifiedTime: "2026-01-01T00:00:00+05:30",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ryan_clinic",
    creator: "@ryan_clinic",
    title: "Best Hair Transplant in Delhi - Sapphire FUE | Ryan Clinic",
    description:
      "Advanced Turkey Sapphire FUE hair transplant in Delhi. Certified surgeons & best cost. Call +91-9911111247.",
    images: ["https://www.clinicryan.com/hair-transplant-in-delhi"],
  },
  verification: {
    google: "PGMWuu_5SSC0Rkyao2LrsHlWiN7bPeQnNaSdY1fgURM",
    yandex: "2a66899c829e502a",
    other: {
      "msvalidate.01": "DD718F54C1640669F3FF6B86F0C3BBDF",
    },
  },
  icons: {
    icon: [
      { url: "/uploads/r-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/uploads/r-logo.png", type: "image/png" },
    ],
    shortcut: "/uploads/r-logo.png",
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
    "article:modified_time": "2026-01-01T00:00:00+05:30",
    "article:publisher": "https://www.facebook.com/RyanClinic",
    "format-detection": "telephone=no",
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
        <meta name="google-site-verification" content="RmcpqkeTYROyZYT_Jid5Wzve1EbG6zwvB3yN7AwbeWQ" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>

      <body className={`${dmSans.className} antialiased`} suppressHydrationWarning>
        {/* Structured data — in body for performance (keeps <head> small so LCP preload is discovered faster) */}
        <SchemaMarkup />
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

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2269767733845458');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2269767733845458&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Header />
        {children}
        <Footer />
        <FloatingCTA />
        <PopupForm />
      </body>
    </html>
  );
}