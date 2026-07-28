import PRPPageClient from "./PRPPageClient";

export const metadata = {
  title: "Best PRP Hair Loss Treatment in Delhi | Ryan Clinic",
  description:
    "PRP hair loss treatment in Delhi at Ryan Clinic — a safe, doctor-led, injection therapy using your own blood to support thinning hair. See if PRP suits you. Book now.",
  keywords: [
    "PRP hair loss treatment in Delhi",
    "PRP treatment in Delhi",
    "PRP hair treatment in Delhi",
    "PRP in Delhi",
    "platelet rich plasma Delhi",
    "best PRP doctor Delhi",
  ],
  alternates: {
    canonical: "https://www.clinicryan.com/prp-hair-loss-treatment-in-delhi",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Best PRP Hair Loss Treatment in Delhi — Doctor-Led PRP Therapy | Ryan Clinic",
    description:
      "What PRP is, who it helps, the evidence, and what to expect — safe, autologous PRP hair therapy in Delhi at Ryan Clinic.",
    url: "https://www.clinicryan.com/prp-hair-loss-treatment-in-delhi",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/1752746168716-PRP%201.jpg",
        width: 1200,
        height: 630,
        alt: "Best PRP Hair Loss Treatment in Delhi — Ryan Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best PRP Hair Loss Treatment in Delhi | Ryan Clinic",
    description:
      "Safe, doctor-led PRP hair therapy in Delhi. Nourish hair follicles using your own blood growth factors.",
    images: ["https://www.clinicryan.com/uploads/1752746168716-PRP%201.jpg"],
  },
};

export default function PRPHairLossTreatmentDelhiPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is PRP hair loss treatment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PRP (Platelet-Rich Plasma) is a non-surgical therapy that concentrates platelets and growth factors from your own blood and injects them into the scalp to support thinning hair and slow loss. It's used mainly for early-to-moderate pattern hair loss.",
        },
      },
      {
        "@type": "Question",
        name: "Does PRP actually work for hair loss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Research suggests PRP can help improve density and slow loss in pattern hair loss, but evidence quality varies and results differ between people. It works best for early-to-moderate thinning, as part of a plan, with maintenance sessions — it's not a guaranteed cure.",
        },
      },
      {
        "@type": "Question",
        name: "Is PRP painful?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most people tolerate it well. The scalp can be numbed with a topical anaesthetic, and you may feel a brief stinging or tingling during injections. Any tenderness usually settles within a day or two.",
        },
      },
      {
        "@type": "Question",
        name: "How many PRP sessions will I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually a course of several sessions spaced a few weeks apart, followed by periodic maintenance. Your exact plan depends on your hair loss and response.",
        },
      },
      {
        "@type": "Question",
        name: "How long until I see results from PRP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Results are gradual and build over months. Most people need a full course before noticeable change, with maintenance to sustain it.",
        },
      },
      {
        "@type": "Question",
        name: "Are PRP results permanent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. PRP supports and maintains hair rather than permanently curing pattern loss, so benefits are kept up with ongoing maintenance sessions.",
        },
      },
      {
        "@type": "Question",
        name: "Is PRP safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — it has a strong safety profile because it uses your own blood, so allergic reactions are very unlikely. Side effects are usually mild and temporary, such as tenderness, redness, or minor swelling.",
        },
      },
      {
        "@type": "Question",
        name: "Can PRP regrow hair on completely bald areas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. PRP supports existing follicles, so it can't grow hair where follicles are gone. A hair transplant is the option for fully bald areas.",
        },
      },
      {
        "@type": "Question",
        name: "Who is a good candidate for PRP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "People with early-to-moderate thinning and living follicles — men and women — especially those wanting a non-surgical option or an adjunct to other treatments. A diagnosis confirms suitability.",
        },
      },
      {
        "@type": "Question",
        name: "PRP vs hair transplant — which do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "They do different jobs. PRP supports thinning hair; a transplant restores density in bald areas. Many patients use PRP alongside medical therapy or a transplant. A doctor will advise what fits your case.",
        },
      },
      {
        "@type": "Question",
        name: "How much does PRP hair loss treatment cost in Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It's usually priced per session, often with package discounts for a course. Your total depends on the number of sessions. Ryan Clinic gives a transparent plan and cost after assessment.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any downtime after PRP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Little to none — most people return to normal activities the same day, following any aftercare advice (e.g., avoiding vigorous washing or sweating briefly).",
        },
      },
      {
        "@type": "Question",
        name: "Who is the best doctor for PRP treatment in Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A doctor who diagnoses the cause first, has verifiable qualifications, offers the full range of treatments, sets honest expectations, and shows real results.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I get PRP in Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At Ryan Clinic's Pitampura centre (CD 163, Block CD, Dakshini Pitampura, 110034), Mon–Sat, 9 AM–7 PM. Call or WhatsApp +91-9217958539 to book.",
        },
      },
      {
        "@type": "Question",
        name: "Is 'PRP hair treatment' the same as 'PRP hair loss treatment' in Delhi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — 'PRP hair treatment in Delhi' and 'PRP hair loss treatment in Delhi' refer to the same procedure: injecting platelet-rich plasma made from your own blood into the scalp to support thinning hair and slow loss. The two terms are used interchangeably.",
        },
      },
    ],
  };

  const medicalEntitySchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "PRP Hair Loss Treatment in Delhi",
    procedureType: "Non-Surgical Injection Therapy",
    bodyLocation: "Scalp",
    howItWorks: "Injecting concentrated platelet-rich plasma derived from autologous blood into scalp follicles.",
    relevantSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Dermatology & Hair Restoration",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalEntitySchema) }}
      />
      <PRPPageClient />
    </>
  );
}
