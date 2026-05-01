import GalleryPageClient from "./GalleryPageClient";

export const metadata = {
  title: "Hair Transplant Gallery | Before & After Results | Ryan Clinic",
  description:
    "Browse real hair transplant before & after photos from Ryan Clinic's Delhi, Mumbai, and Hyderabad branches. See actual patient results with Turkey Sapphire FUE.",
  alternates: {
    canonical: "https://www.clinicryan.com/gallery/images",
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
