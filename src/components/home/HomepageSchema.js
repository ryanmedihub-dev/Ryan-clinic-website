export default function HomepageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.clinicryan.com/#medicalclinic",
        name: "Ryan Clinic",
        url: "https://www.clinicryan.com/",
        description:
          "Ryan Clinic is a hair transplant clinic in Delhi offering hair restoration treatments including FUE hair transplant, hairline restoration, beard transplant, female hair transplant and PRP treatment.",
        medicalSpecialty: "Dermatology",
        areaServed: {
          "@type": "City",
          name: "Delhi",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Hair Restoration Treatments",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "FUE Hair Transplant",
                url: "https://www.clinicryan.com/fue-hair-transplant",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Hairline Transplant",
                url: "https://www.clinicryan.com/hairline-transplant",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Beard Transplant",
                url: "https://www.clinicryan.com/beard-transplant",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Female Hair Transplant",
                url: "https://www.clinicryan.com/female-hair-transplant",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalTherapy",
                name: "PRP Hair Treatment",
                url: "https://www.clinicryan.com/prp-treatment",
              },
            },
          ],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.clinicryan.com/#localbusiness",
        name: "Ryan Clinic",
        url: "https://www.clinicryan.com/",
        telephone: "+919911111247",
        openingHours: "Mo-Su 09:00-23:00",
        image:
          "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "CD - 163, Block CD, Dakshini Pitampura",
          addressLocality: "Pitampura",
          addressRegion: "Delhi",
          postalCode: "110034",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "28.7037",
          longitude: "77.1376",
        },
        sameAs: [
          "https://www.google.com/maps?q=Ryan+Clinic+CD+163+Block+CD+Dakshini+Pitampura+Delhi+110034",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.clinicryan.com/#website",
        url: "https://www.clinicryan.com/",
        name: "Ryan Clinic",
        publisher: {
          "@id": "https://www.clinicryan.com/#medicalclinic",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.clinicryan.com/#webpage",
        url: "https://www.clinicryan.com/",
        name: "Ryan Clinic - Hair Transplant in Delhi | Hair Transplant Cost in Delhi",
        description:
          "Get advanced hair transplant in Delhi at Ryan Clinic with doctor-led care and modern FUE techniques. Explore hair transplant cost, procedure, recovery and results.",
        isPartOf: {
          "@id": "https://www.clinicryan.com/#website",
        },
        about: {
          "@id": "https://www.clinicryan.com/#medicalclinic",
        },
        mainEntity: {
          "@id": "https://www.clinicryan.com/#medicalclinic",
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.clinicryan.com/#hair-transplant-delhi",
        name: "Hair Transplant in Delhi",
        serviceType: "Hair Transplant",
        url: "https://www.clinicryan.com/",
        provider: {
          "@id": "https://www.clinicryan.com/#medicalclinic",
        },
        areaServed: {
          "@type": "City",
          name: "Delhi",
        },
        subjectOf: [
          {
            "@type": "WebPage",
            name: "Hair Transplant in Delhi",
            url: "https://www.clinicryan.com/hair-transplant-in-delhi",
          },
          {
            "@type": "WebPage",
            name: "FUE Hair Transplant Cost in Delhi",
            url: "https://www.clinicryan.com/cost/fue-hair-transplant-cost-in-delhi",
          },
          {
            "@type": "WebPage",
            name: "Hair Transplant Doctor in Delhi",
            url: "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi",
          },
          {
            "@type": "WebPage",
            name: "Hair Transplant Surgeon in Delhi",
            url: "https://www.clinicryan.com/surgeon/hair-transplant-surgeon-in-delhi",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.clinicryan.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the cost of a hair transplant in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The cost of a hair transplant in Delhi varies according to the number of grafts required, the extent of hair loss, donor-area quality, technique and treatment complexity. A scalp and graft assessment is the best way to obtain an individual estimate. For detailed pricing, see the Hair Transplant Cost in Delhi page.",
            },
          },
          {
            "@type": "Question",
            name: "How many grafts do I need for a hair transplant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The required graft count depends on the size of the thinning or bald area, donor density, hair characteristics, hairline design and desired coverage. A doctor can estimate the graft requirement after examining the scalp and donor area.",
            },
          },
          {
            "@type": "Question",
            name: "What is Sapphire FUE hair transplant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sapphire FUE is an FUE-based hair transplant approach in which sapphire blades are used to create recipient channels for transplanted follicular units. Suitability depends on the individual treatment plan and should be assessed by a qualified clinician.",
            },
          },
          {
            "@type": "Question",
            name: "Is a hair transplant permanent?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Transplanted follicles are generally selected from donor areas that are more resistant to pattern hair loss. Long-term growth can be durable, but individual outcomes vary and existing non-transplanted hair may continue to thin over time.",
            },
          },
          {
            "@type": "Question",
            name: "Is a hair transplant painful?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Hair transplant procedures are usually performed under local anaesthesia. Patients may experience pressure, mild discomfort or temporary soreness, and individual experiences vary. Your doctor can explain pain control and aftercare before treatment.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a hair transplant procedure take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Procedure time depends on the number of grafts, technique and complexity of the case. Larger sessions generally take longer. The clinic should provide an estimated session duration after graft planning.",
            },
          },
          {
            "@type": "Question",
            name: "How long is the recovery after a hair transplant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Early redness, swelling, scabbing or tenderness can occur after a hair transplant. Many patients resume routine non-strenuous activities within several days, but recovery varies. Follow the treating doctor's aftercare instructions for washing, exercise, sun exposure and medication.",
            },
          },
          {
            "@type": "Question",
            name: "When will I see hair transplant results?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Transplanted hair commonly goes through shedding and regrowth phases. Visible growth develops gradually over several months, while maturation can continue for a year or longer. Timelines vary between patients.",
            },
          },
          {
            "@type": "Question",
            name: "How do I choose a hair transplant clinic in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Compare the treating doctor's qualifications and role in the procedure, donor assessment, hairline planning, hygiene standards, technique, transparent pricing, documented results and follow-up care. Ask who performs each surgical step before booking.",
            },
          },
          {
            "@type": "Question",
            name: "Can women get a hair transplant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Some women with suitable donor hair and specific patterns of hair loss may be candidates for hair transplantation. Because female hair loss has multiple possible causes, clinical assessment is important before deciding on surgery.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between FUE and Sapphire FUE?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "FUE describes the individual extraction of follicular units from the donor area. Sapphire FUE commonly refers to using sapphire blades during recipient-channel creation. The appropriate technique depends on the treatment plan and the clinician's assessment.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Ryan Clinic located in Delhi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ryan Clinic's Delhi centre is located at CD - 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi - 110034. Phone: 099111 11247. Opening hours: 9 am – 11 pm, 7 days a week.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
