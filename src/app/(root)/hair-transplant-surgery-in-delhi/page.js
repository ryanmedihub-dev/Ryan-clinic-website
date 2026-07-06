import SurgeryPageClient from "./SurgeryPageClient";

export const metadata = {
  title: "Best Hair Transplant Surgery in Delhi | Ryan Clinic",
  description:
    "Hair transplant surgery in Delhi at Ryan Clinic — doctor-led FUE & THI in a sterile OT, local anaesthesia, same-day discharge. Free consult. Book your surgery.",
  keywords: [
    "hair transplant surgery in Delhi",
    "best hair transplant surgery in Delhi",
    "Sapphire FUE hair transplant Delhi",
    "THI hair transplant Delhi",
    "safe hair transplant surgery Delhi",
    "doctor-led hair transplant Delhi",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
    description:
      "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
    url: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi/",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1752667815707-fue-banner_ro9ae6.webp",
        width: 1200,
        height: 630,
        alt: "Best Hair Transplant Surgery in Delhi — Ryan Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic",
    description:
      "Safe, minimally-invasive hair transplant surgery in Delhi performed by certified doctors. What it involves, safety, recovery and cost.",
    images: ["https://www.clinicryan.com/uploads/1752667815707-fue-banner_ro9ae6.webp"],
  },
};

export default function HairTransplantSurgeryDelhiPage() {
  return <SurgeryPageClient city="Delhi" />;
}
