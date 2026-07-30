import GalleryPageClient from "./GalleryPageClient";

import { DBConnection } from "@/lib/db";
import Gallery from "@/models/gallery";

const defaultMetadata = {
  title: "Hair Transplant Before & After Results Gallery | Ryan Clinic",
  description:
    "Real, unedited hair transplant before and after photos at Ryan Clinic. See FUE & Sapphire FUE results by graft count and timeline. Doctor-led, natural results.",
  keywords: [
    "hair transplant before and after",
    "hair transplant results",
    "hair transplant before and after photos",
    "hair transplant before after gallery",
    "3000 grafts hair transplant before and after",
    "2000 grafts hair transplant results",
    "FUE hair transplant before and after",
    "Sapphire FUE hair transplant results",
    "hair transplant growth timeline",
    "real hair transplant results",
  ],
  alternates: {
    canonical:
      "https://www.clinicryan.com/gallery/",
  },
};

export async function generateMetadata() {
  try {
    await DBConnection();
    const gallery = await Gallery.findOne();
    if (gallery && gallery.seo) {
      return {
        ...defaultMetadata,
        title: gallery.seo.metaTitle || defaultMetadata.title,
        description: gallery.seo.metaDescription || defaultMetadata.description,
      };
    }
  } catch (error) {
    console.error("Error generating metadata dynamically:", error);
  }
  return defaultMetadata;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are these hair transplant before and after photos real?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every before and after photo in this gallery is a real, consented patient treated at Ryan Clinic — no stock images, AI, or edited photos. Each is shown in consistent lighting and labelled with the technique, graft count, and timeline.",
      },
    },
    {
      "@type": "Question",
      name: "When will I see my hair transplant results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'New growth usually begins at 3–4 months, noticeable density develops by 6–9 months, and final mature results appear at 12–18 months. The "after" photos in this gallery mostly show results at 12 months or later.',
      },
    },
    {
      "@type": "Question",
      name: "Are hair transplant results permanent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Transplanted follicles are taken from the DHT-resistant donor area, so they resist pattern baldness and grow permanently. Existing native hair can still thin over time, so ongoing maintenance may be advised.",
      },
    },
    {
      "@type": "Question",
      name: "Do hair transplant results look natural?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when the surgeon controls the angle, depth, direction, and density to match your natural growth pattern. A natural, age-appropriate hairline — rather than an artificially low one — is the goal, and is what these results demonstrate.",
      },
    },
    {
      "@type": "Question",
      name: "How many grafts will I need for results like these?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Graft count depends on your degree of hair loss (Norwood grade): roughly 2,000–2,500 for hairline and temples, 3,000–3,500 for frontal and mid-scalp, and 4,000+ for advanced or crown coverage. A free scalp analysis confirms your exact number.",
      },
    },
    {
      "@type": "Question",
      name: "Can women achieve these hair transplant results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Women with female-pattern thinning, traction alopecia, or a high hairline can achieve natural results, with discreet no-shave options available. A scalp assessment confirms suitability and graft requirements.",
      },
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GalleryPageClient />
    </>
  );
}