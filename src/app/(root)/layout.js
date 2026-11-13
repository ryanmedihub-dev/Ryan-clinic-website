import "../../styles/globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import FloatingCTA from "@/components/layouts/FloatingCTA";
import dynamic from "next/dynamic";
const PopupForm = dynamic(() => import("@/components/common/PopupForm"), {
  loading: () => null,
});
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.clinicryan.com"),
  title: "Hair Transplant in Delhi | Best Sapphire FUE Cost | Ryan Clinic",
  description:
    "Ryan Clinic — India's only Turkey Sapphire FUE hair transplant clinic. Certified surgeons, 97% graft survival. Clinics in Delhi, Mumbai & Hyderabad.",
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
    type: "website",
    locale: "en_IN",
    url: "https://www.clinicryan.com/hair-transplant-in-delhi",
    siteName: "Ryan Clinic",
    title: "Best Hair Transplant in Delhi - Sapphire FUE Cost | Ryan Clinic",
    description:
      "Ryan Clinic offers advanced Turkey Sapphire FUE hair transplant in Delhi. Certified surgeons, 97% graft survival & transparent pricing. Call +91-9911111247",
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
    images: ["https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg"],
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

export default function PublicLayout({ children }) {
  return (
    <>
      {/* Structured data — in body for performance (keeps <head> small so LCP preload is discovered faster) */}
      <SchemaMarkup />
      {/* Deferred Google Analytics (GA4) & Meta Pixel */}
      <script
        id="deferred-analytics-scheduler"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Define stubs immediately so early tracking calls buffer safely
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              if (!window.gtag) window.gtag = gtag;

              if (!window.fbq) {
                var n = function(){n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);};
                n.push = n; n.loaded = false; n.version = '2.0'; n.queue = [];
                window.fbq = n;
                if (!window._fbq) window._fbq = n;
              }

              var loaded = false;
              function loadAnalytics() {
                if (loaded) return;
                loaded = true;

                // Clean up interaction triggers
                window.removeEventListener('scroll', loadAnalytics, { passive: true });
                window.removeEventListener('touchstart', loadAnalytics, { passive: true });
                window.removeEventListener('click', loadAnalytics, { passive: true });

                // 1. Google Analytics (GA4)
                gtag('js', new Date());
                gtag('config', 'G-CK1LZXBKPX');

                var ga = document.createElement('script');
                ga.async = true;
                ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-CK1LZXBKPX';
                document.head.appendChild(ga);

                // 2. Meta Pixel
                !function(f,b,e,v,n,t,s)
                {if(f.fbq && f.fbq.loaded)return;
                t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1781962566312448');
                fbq('track', 'PageView');
              }

              // User interaction triggers (load immediately if user begins interacting)
              window.addEventListener('scroll', loadAnalytics, { once: true, passive: true });
              window.addEventListener('touchstart', loadAnalytics, { once: true, passive: true });
              window.addEventListener('click', loadAnalytics, { once: true, passive: true });

              // Post-LCP / Idle scheduling: defer until after hero paint window
              function scheduleDeferred() {
                if ('requestIdleCallback' in window) {
                  setTimeout(function() {
                    requestIdleCallback(loadAnalytics, { timeout: 2000 });
                  }, 2500);
                } else {
                  setTimeout(loadAnalytics, 3500);
                }
              }

              if (document.readyState === 'complete') {
                scheduleDeferred();
              } else {
                window.addEventListener('load', scheduleDeferred, { once: true });
              }
            })();
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1781962566312448&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <Header />
      {children}
      <Footer />
      <FloatingCTA />
      <PopupForm />
    </>
  );
}