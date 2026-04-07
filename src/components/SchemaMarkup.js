export default function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalBusiness", "LocalBusiness"],
            "@id": "https://clinicryan.com/#organization",
            name: "Ryan Clinic",
            alternateName: "Ryan Hair Transplant Clinic Delhi",
            url: "https://clinicryan.com",
            logo: "https://clinicryan.com/uploads/logo.png",
            image: "https://www.clinicryan.com/uploads/1757745417011-1752733322451-Hair%20Transplant%204.jpg",
            description:
              "Ryan Clinic is Delhi's premier hair transplant centre specialising in Turkey Sapphire FUE technique. Certified surgeons, 95%+ graft survival rate and transparent pricing.",
            telephone: "+91-9217958539",
            email: "clinicryanofficial@gmail.com",
            priceRange: "₹₹",
            medicalSpecialty: "Dermatology",
            address: {
              "@type": "PostalAddress",
              streetAddress: "CD 163, Block CD, Dakshini Pitampura,Pitampura",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              addressCountry: "IN",
              postalCode: "110034",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.6139,
              longitude: 77.209,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                opens: "09:00",
                closes: "19:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/RyanClinic",
              "https://www.instagram.com/RyanClinic",
              "https://www.youtube.com/@RyanClinic",
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Ryan Clinic Hair Transplant Delhi",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "500",
              reviewCount: "450",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.clinicryan.com/hair-transplant-in-delhi/",
            url: "https://clinicryan.com/hair-transplant-delhi/",
            name: "Hair Transplant in Delhi | Best Sapphire FUE Cost | Ryan Clinic",
            isPartOf: { "@id": "https://clinicryan.com/#website" },
            about: { "@id": "https://clinicryan.com/#organization" },
            dateModified: new Date().toISOString(),
            description:
              "Ryan Clinic offers the best hair transplant in Delhi using Turkey Sapphire FUE. Expert surgeons, natural results & best cost.",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://clinicryan.com" },
                { "@type": "ListItem", position: 2, name: "Hair Transplant Delhi", item: "https://clinicryan.com/hair-transplant-delhi/" },
              ],
            },
          }),
        }}
      />

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
                acceptedAnswer: { "@type": "Answer", text: "Hair transplant cost in Delhi ranges from ₹40,000 to ₹1,50,000 depending on the number of grafts. At Ryan Clinic we offer transparent per-graft pricing with zero hidden charges. Contact us for a free personalised cost estimate." },
              },
              {
                "@type": "Question",
                name: "What is Turkey Sapphire FUE hair transplant?",
                acceptedAnswer: { "@type": "Answer", text: "Turkey Sapphire FUE is an advanced hair transplant technique using sapphire-tipped blades instead of steel. This results in smaller precise incisions, minimal tissue trauma, faster healing, denser graft packing and significantly more natural results." },
              },
              {
                "@type": "Question",
                name: "Why is Ryan Clinic the best hair transplant clinic in Delhi?",
                acceptedAnswer: { "@type": "Answer", text: "Ryan Clinic exclusively specialises in Turkey Sapphire FUE — Delhi's most advanced hair transplant technique. We offer 95%+ graft survival rates, natural hairline design by certified surgeons, and complete pricing transparency." },
              },
              {
                "@type": "Question",
                name: "How many grafts do I need for a hair transplant?",
                acceptedAnswer: { "@type": "Answer", text: "Graft count depends on your Norwood baldness grade. Grade 2-3 needs 1000-2000 grafts, Grade 4-5 needs 2000-3500 grafts, and Grade 6-7 may need 4000+ grafts. Our doctors assess your donor density during a free consultation." },
              },
              {
                "@type": "Question",
                name: "Is hair transplant permanent in Delhi?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, hair transplant results are permanent. Grafts are taken from the DHT-resistant donor area meaning they will not fall out due to pattern baldness. The transplanted hair grows naturally for life." },
              },
              {
                "@type": "Question",
                name: "What is the recovery time after hair transplant at Ryan Clinic?",
                acceptedAnswer: { "@type": "Answer", text: "With Sapphire FUE most patients return to work within 5-7 days. Scabs fall off by day 10. Shock shedding at 3-4 weeks is normal. New growth begins at 3-4 months, significant density at 6-9 months, and final results at 12-18 months." },
              },
              {
                "@type": "Question",
                name: "Is hair transplant painful?",
                acceptedAnswer: { "@type": "Answer", text: "The procedure is done under local anaesthesia so you feel minimal discomfort. Only the initial injections cause a brief sting. The procedure itself is completely painless. Post-procedure mild soreness is managed with prescribed medication." },
              },
              {
                "@type": "Question",
                name: "What is the success rate of hair transplant at Ryan Clinic Delhi?",
                acceptedAnswer: { "@type": "Answer", text: "Ryan Clinic consistently achieves over 95% graft survival rate using Turkey Sapphire FUE due to precise extraction, minimal out-of-body time for grafts, and expert implantation by certified hair restoration surgeons." },
              },
              {
                "@type": "Question",
                name: "Can women get hair transplant at Ryan Clinic in Delhi?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. Ryan Clinic offers hair transplant for women with female pattern hair loss, traction alopecia or high hairline concerns. We offer no-shave and partial-shave options for complete discretion." },
              },
              {
                "@type": "Question",
                name: "How is Sapphire FUE better than regular FUE?",
                acceptedAnswer: { "@type": "Answer", text: "Sapphire FUE uses precious sapphire stone blades creating V-shaped micro incisions. This means less scalp trauma, faster healing, higher graft density per session and far more natural-looking results — the gold standard in modern hair transplantation." },
              },
            ],
          }),
        }}
      />
    </>
  );
}
