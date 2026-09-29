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
              "Doctor-led Sapphire FUE & Turkish Technique Hair Restoration Clinic with centers across Delhi, Mumbai & Hyderabad. Transparent pricing & verified medical expertise.",
            foundingDate: "2012",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              minValue: 10,
              maxValue: 50,
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+91-9911111247",
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
            telephone: "+91-9911111247",
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
            telephone: "+91-9911111247",
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
            telephone: "+91-9911111247",
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
            telephone: "+91-9911111247",
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
    </>
  );
}

