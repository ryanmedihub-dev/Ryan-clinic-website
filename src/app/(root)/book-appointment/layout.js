export const metadata = {
  title: "Book a Hair Transplant Appointment | Ryan Clinic",
  description:
    "Book your appointment at Ryan Clinic — India's only Turkey Sapphire FUE hair transplant clinic. Choose your preferred location, date, and time.",
  alternates: {
    canonical: "https://www.clinicryan.com/book-appointment",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Book a Hair Transplant Appointment | Ryan Clinic",
    description:
      "Schedule your free hair transplant consultation at Ryan Clinic. Expert surgeons, clinics in Delhi, Mumbai, Gurgaon & 20+ cities.",
    url: "https://www.clinicryan.com/book-appointment",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
  },
};

export default function BookAppointmentLayout({ children }) {
  return children;
}

