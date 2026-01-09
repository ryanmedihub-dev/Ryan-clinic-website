import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import Script from "next/script";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-baloo",
});

export const metadata = {
  metadataBase: new URL("https://clinicryan.com"),
  title: {
    default: "Best Hair Transplant in India | Ryan Clinic Experts",
    template: "%s | Ryan Clinic",
  },
  description:
    "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
  keywords: [
    "Hair Transplant India",
    "Ryan Clinic",
    "Best Hair Transplant",
    "Hair Restoration",
    "Affordable Hair Transplant",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Ryan Clinic",
    url: "https://clinicryan.com/",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: [
      {
        url: "/uploads/logo.png",
        width: 1200,
        height: 630,
        alt: "Ryan Clinic Hair Transplant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ryan_clinic",
    title: "Best Hair Transplant in India | Ryan Clinic Experts",
    description:
      "Get natural-looking hair with advanced, affordable transplants at Ryan Clinic. Turkey-trained experts. Book your free consultation now!",
    images: ["/uploads/logo.png"],
  },
  icons: {
    icon: "/uploads/r-logo.png",
  },
  alternates: {
    canonical: "https://clinicryan.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={baloo.variable} suppressHydrationWarning>
      <head>
        {/* ✅ Extra Meta Tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msvalidate.01" content="DD718F54C1640669F3FF6B86F0C3BBDF" />
        <meta name="yandex-verification" content="2a66899c829e502a" />
        <meta name="yahooSeeker" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="allow-search" content="yes" />
        <meta name="revisit-after" content="daily" />
        <meta name="distribution" content="global" />
        <meta name="author" content="Ryan Clinic" />
        <meta name="copyright" content="clinicryan.com" />

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EC3DHJNBK5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-EC3DHJNBK5', {
        page_path: window.location.pathname,
      });
    `}
        </Script>
      </head>

      <body className={`${hindSiliguri.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
