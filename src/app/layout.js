import "../styles/globals.css";
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
  verification: {
    google: "PGMWuu_5SSC0Rkyao2LrsHlWiN7bPeQnNaSdY1fgURM",
    yandex: "2a66899c829e502a",
    other: {
      "msvalidate.01": "DD718F54C1640669F3FF6B86F0C3BBDF",
    },
  },
  icons: {
    icon: [{ url: "/uploads/r-logo.png", type: "image/png" }],
    apple: [{ url: "/uploads/r-logo.png", type: "image/png" }],
    shortcut: "/uploads/r-logo.png",
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
        {children}
      </body>
    </html>
  );
}
