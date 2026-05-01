export default function SchemaMarkup() {
  return (
    <>
      {/* Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.clinicryan.com/#organization",
            name: "Ryan Clinic",
            legalName: "Ryan Clinic",
            url: "https://www.clinicryan.com",
            logo: {
              "@type": "ImageObject",
              url: "https://www.clinicryan.com/uploads/logo-2.png",
              width: 512,
              height: 512,
            },
            description:
              "India's only Turkey Sapphire FUE Hair Transplant Clinic. Certified doctors, 95%+ graft survival, transparent pricing across Delhi, Mumbai & Hyderabad. Trusted by 10,000+ patients since 2012.",
            foundingDate: "2012",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              minValue: 10,
              maxValue: 50,
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-9217958539",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
                contactOption: "TollFree",
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "09:00",
                  closes: "19:00",
                },
              },
            ],
            email: "clinicryanofficial@gmail.com",
            telephone: "+91-9217958539",
            sameAs: [
              "https://www.youtube.com/@RyanTranplant",
              "https://www.instagram.com/ryan_clinic",
              "https://www.facebook.com/RyanClinic3210",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Hair Restoration Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sapphire FUE Hair Transplant" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hairline Transplant" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Beard Transplant" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Female Hair Transplant" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Eyebrow Transplant" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "PRP Treatment" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chemical Skin Peels" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Alopecia Treatment" } },
              ],
            },
          }),
        }}
      />

      {/* LocalBusiness — Delhi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "LocalBusiness"],
            "@id": "https://www.clinicryan.com/hair-transplant-in-delhi#localbusiness",
            name: "Ryan Clinic — Delhi",
            image: "https://www.clinicryan.com/uploads/logo-2.png",
            url: "https://www.clinicryan.com/hair-transplant-in-delhi",
            telephone: "+91-9217958539",
            email: "clinicryanofficial@gmail.com",
            priceRange: "₹₹",
            currenciesAccepted: "INR",
            paymentAccepted: "Cash, Credit Card, Debit Card, EMI",
            address: {
              "@type": "PostalAddress",
              streetAddress: "CD 163, Block CD, Dakshini Pitampura",
              addressLocality: "Pitampura",
              addressRegion: "Delhi",
              postalCode: "110034",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.6996,
              longitude: 77.1308,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            medicalSpecialty: "Dermatology",
            availableService: [
              { "@type": "MedicalProcedure", name: "Sapphire FUE Hair Transplant" },
              { "@type": "MedicalProcedure", name: "Hairline Transplant" },
              { "@type": "MedicalProcedure", name: "Beard Transplant" },
              { "@type": "MedicalProcedure", name: "Female Hair Transplant" },
              { "@type": "MedicalProcedure", name: "PRP Treatment" },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1000",
              bestRating: "5",
              worstRating: "1",
            },
            parentOrganization: {
              "@id": "https://www.clinicryan.com/#organization",
            },
          }),
        }}
      />

      {/* LocalBusiness — Mumbai */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "LocalBusiness"],
            "@id": "https://www.clinicryan.com/hair-transplant-in-mumbai#localbusiness",
            name: "Ryan Clinic — Mumbai",
            image: "https://www.clinicryan.com/uploads/logo-2.png",
            url: "https://www.clinicryan.com/hair-transplant-in-mumbai",
            telephone: "+91-9217958539",
            email: "clinicryanofficial@gmail.com",
            priceRange: "₹₹",
            currenciesAccepted: "INR",
            paymentAccepted: "Cash, Credit Card, Debit Card, EMI",
            address: {
              "@type": "PostalAddress",
              streetAddress: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West",
              addressLocality: "Mumbai",
              addressRegion: "Maharashtra",
              postalCode: "400053",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 19.1366,
              longitude: 72.8296,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            medicalSpecialty: "Dermatology",
            availableService: [
              { "@type": "MedicalProcedure", name: "Sapphire FUE Hair Transplant" },
              { "@type": "MedicalProcedure", name: "Beard Transplant" },
              { "@type": "MedicalProcedure", name: "Female Hair Transplant" },
              { "@type": "MedicalProcedure", name: "PRP Treatment" },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "500",
              bestRating: "5",
              worstRating: "1",
            },
            parentOrganization: {
              "@id": "https://www.clinicryan.com/#organization",
            },
          }),
        }}
      />

      {/* LocalBusiness — Hyderabad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "LocalBusiness"],
            "@id": "https://www.clinicryan.com/hair-transplant-in-hyderabad#localbusiness",
            name: "Ryan Clinic — Hyderabad",
            image: "https://www.clinicryan.com/uploads/logo-2.png",
            url: "https://www.clinicryan.com/hair-transplant-in-hyderabad",
            telephone: "+91-9217958539",
            email: "clinicryanofficial@gmail.com",
            priceRange: "₹₹",
            currenciesAccepted: "INR",
            paymentAccepted: "Cash, Credit Card, Debit Card, EMI",
            address: {
              "@type": "PostalAddress",
              streetAddress: "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Above SBI Bank, Banjara Hills",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              postalCode: "500034",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 17.4126,
              longitude: 78.4477,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            medicalSpecialty: "Dermatology",
            availableService: [
              { "@type": "MedicalProcedure", name: "Sapphire FUE Hair Transplant" },
              { "@type": "MedicalProcedure", name: "Beard Transplant" },
              { "@type": "MedicalProcedure", name: "Female Hair Transplant" },
              { "@type": "MedicalProcedure", name: "PRP Treatment" },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "300",
              bestRating: "5",
              worstRating: "1",
            },
            parentOrganization: {
              "@id": "https://www.clinicryan.com/#organization",
            },
          }),
        }}
      />

      {/* Service Catalog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Hair Restoration",
            name: "Hair Transplant & Hair Restoration Services",
            provider: {
              "@id": "https://www.clinicryan.com/#organization",
            },
            areaServed: [
              { "@type": "City", name: "Delhi" },
              { "@type": "City", name: "Mumbai" },
              { "@type": "City", name: "Hyderabad" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Ryan Clinic Hair Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Sapphire FUE Hair Transplant",
                    url: "https://www.clinicryan.com/fue-hair-transplant",
                    description: "Turkey's most advanced hair transplant using sapphire-tipped blades. 90%+ graft survival.",
                  },
                  price: "35000",
                  priceCurrency: "INR",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: 35000,
                    maxPrice: 150000,
                    priceCurrency: "INR",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Hairline Transplant",
                    url: "https://www.clinicryan.com/hairline-transplant",
                    description: "Natural hairline design and restoration using Sapphire FUE technique.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Beard Transplant",
                    url: "https://www.clinicryan.com/beard-transplant",
                    description: "Full, natural beard restoration using follicular unit extraction.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Female Hair Transplant",
                    url: "https://www.clinicryan.com/female-hair-transplant",
                    description: "No-shave hair transplant for women with female pattern hair loss.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Eyebrow Transplant",
                    url: "https://www.clinicryan.com/eyebrow-transplant",
                    description: "Permanent eyebrow restoration using precise FUE technique.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "PRP Treatment",
                    url: "https://www.clinicryan.com/prp-treatment",
                    description: "Platelet-Rich Plasma therapy to stimulate natural hair growth.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Chemical Skin Peels",
                    url: "https://www.clinicryan.com/chemical-skin-peels",
                    description: "Professional chemical peels for skin rejuvenation and texture improvement.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Alopecia Treatment",
                    url: "https://www.clinicryan.com/alopecia-treatments",
                    description: "Comprehensive alopecia management and treatment solutions.",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the cost of hair transplant in Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hair transplant cost in Delhi at Ryan Clinic ranges from ₹40,000 to ₹1,50,000 depending on the number of grafts required. We offer fully transparent per-graft pricing with zero hidden charges. Book a free consultation to get your personalised cost estimate.",
                },
              },
              {
                "@type": "Question",
                name: "What is Turkey Sapphire FUE hair transplant?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Turkey Sapphire FUE is an advanced hair transplant technique using sapphire-tipped blades instead of conventional steel. This creates smaller, more precise incisions — resulting in minimal tissue trauma, faster healing, denser graft packing, and significantly more natural-looking results.",
                },
              },
              {
                "@type": "Question",
                name: "Why is Ryan Clinic the best hair transplant clinic in Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ryan Clinic is India's only clinic exclusively specialising in Turkey Sapphire FUE — Delhi's most advanced hair transplant technique. Every surgery is performed by certified doctors (never technicians), with 95%+ graft survival rates, natural hairline design, and complete pricing transparency.",
                },
              },
              {
                "@type": "Question",
                name: "How many grafts do I need for a hair transplant?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Graft count depends on your Norwood baldness grade. Grade 2–3 typically needs 1,000–2,000 grafts; Grade 4–5 needs 2,000–3,500 grafts; Grade 6–7 may need 4,000+ grafts. Our doctors assess your donor density and scalp condition during a free consultation before recommending a count.",
                },
              },
              {
                "@type": "Question",
                name: "Is hair transplant permanent?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Transplanted grafts are taken from the DHT-resistant donor area at the back and sides of the scalp, meaning they will not fall out due to pattern baldness. The transplanted hair grows naturally and permanently for life.",
                },
              },
              {
                "@type": "Question",
                name: "What is the recovery time after hair transplant at Ryan Clinic?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "With Sapphire FUE, most patients return to desk work within 5–7 days. Scabs fall off by day 10. Shock shedding at 3–4 weeks is completely normal. New growth begins at 3–4 months, significant density at 6–9 months, and final results are visible at 12–18 months.",
                },
              },
              {
                "@type": "Question",
                name: "Is the hair transplant procedure painful?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The procedure is performed under local anaesthesia — only the initial injections cause a brief sting. The surgery itself is completely painless. Most patients watch movies or listen to music throughout. Post-procedure mild soreness is easily managed with prescribed medication.",
                },
              },
              {
                "@type": "Question",
                name: "Can women get hair transplant at Ryan Clinic?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. Ryan Clinic offers hair transplant for women with female pattern hair loss, traction alopecia, or high hairline concerns. We offer no-shave and partial-shave options for complete discretion — you can resume normal life almost immediately.",
                },
              },
              {
                "@type": "Question",
                name: "How is Sapphire FUE better than regular FUE?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sapphire FUE uses precious sapphire-stone blades to create V-shaped micro incisions instead of conventional steel punches. This means less scalp trauma, faster healing, higher graft density per session, and far more natural-looking results — the gold standard in modern hair transplantation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the success rate of hair transplant at Ryan Clinic?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ryan Clinic consistently achieves over 95% graft survival rate — well above the industry average of 60–70%. This is due to precise extraction, minimal out-of-body time for grafts, the original Turkey Choi Pen technique, and expert implantation by certified hair restoration doctors.",
                },
              },
            ],
          }),
        }}
      />

      {/* MedicalOrganization with Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Ryan Clinic",
            url: "https://www.clinicryan.com",
            image: "https://www.clinicryan.com/uploads/logo-2.png",
            telephone: "+91-9217958539",
            address: {
              "@type": "PostalAddress",
              streetAddress: "CD 163, Block CD, Dakshini Pitampura, Pitampura",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              postalCode: "110034",
              addressCountry: "IN",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "1000",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Satisfied Patient" },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
                reviewBody:
                  "Best hair transplant clinic in Delhi. Turkey Sapphire FUE technique is amazing. Natural results, pain-free procedure, and excellent aftercare support.",
                datePublished: "2025-01-15",
              },
            ],
          }),
        }}
      />
    </>
  );
}
