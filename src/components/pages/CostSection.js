// CostSection.js
// Premium Hair Transplant Pricing Section
// Usage: <CostSection city="Delhi" />

export default function CostSection({ city = "Delhi" }) {
  const pricingData = [
    {
      grafts: "1,000 – 1,500",
      norwood: "NW 2–3",
      cost: "₹40,000 – ₹1,00,000",
      best: "Hairline / Temple Restoration",
    },
    {
      grafts: "1,500 – 2,500",
      norwood: "NW 3–4",
      cost: "₹75,000 – ₹1,75,000",
      best: "Most Common Male Pattern",
      featured: true,
    },
    {
      grafts: "2,500 – 3,500",
      norwood: "NW 4–5",
      cost: "₹1,20,000 – ₹2,50,000",
      best: "Frontal + Crown Coverage",
    },
    {
      grafts: "3,500 – 5,000+",
      norwood: "NW 6–7",
      cost: "₹2,00,000 – ₹3,50,000+",
      best: "Advanced Baldness Cases",
    },
  ];

  const stats = [
    {
      value: "₹40",
      label: "Starting Per Graft",
    },
    {
      value: "₹40K",
      label: "Starting Procedure",
    },
    {
      value: "0%",
      label: "EMI Available",
    },
    {
      value: "Free",
      label: "Scalp Analysis",
    },
  ];

  const factors = [
    "Baldness Stage",
    "Required Density",
    "Donor Area Quality",
    "Number of Grafts",
  ];

  const trustItems = [
    "Doctor Performed Surgery",
    "0% EMI Available",
    "Free Scalp Analysis",
    "Transparent Pricing",
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F5F2]">
      <div className="containerFull px-4 md:px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-[2px] bg-[#D32F2F]" />
          <span className="text-[#D32F2F] uppercase tracking-[0.25em] text-xs font-bold">
            Transparent Pricing
          </span>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-5">
            <span className="w-2 h-2 bg-[#D32F2F] rounded-full" />
            <span className="text-sm font-medium text-[#D32F2F]">
              Free Consultation Included
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Hair Transplant Pricing
            <span className="block text-[#D32F2F]">in {city}</span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg max-w-2xl leading-relaxed">
            Transparent pricing with no hidden charges. Get your exact graft
            requirement and treatment cost after a free scalp analysis with our
            specialists.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                {item.value}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Package */}
        <div className="bg-white rounded-[32px] border border-red-100 shadow-lg overflow-hidden mb-14">
          <div className="bg-[#D32F2F] px-6 py-3">
            <span className="text-white uppercase tracking-widest text-xs font-bold">
              Most Popular Package
            </span>
          </div>

          <div className="p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-3">
                  1,500 – 2,500 Grafts
                </h3>

                <p className="text-5xl font-extrabold text-[#D32F2F] mb-5">
                  ₹75K – ₹1.75L
                </p>

                <p className="text-gray-600 text-lg">
                  Ideal for most male hair transplant cases involving hairline
                  reconstruction and density enhancement.
                </p>
              </div>

              <div>
                <div className="space-y-4">
                  {[
                    "Natural Hairline Design",
                    "Density Improvement",
                    "Doctor-Led Procedure",
                    "Free Scalp Analysis",
                    "0% EMI Available",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                        <span className="text-[#D32F2F] text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Factors */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What Determines Your Cost?
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            {factors.map((factor) => (
              <div
                key={factor}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm"
              >
                <p className="font-semibold text-gray-800">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Pricing Breakdown
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {pricingData.map((item, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  item.featured
                    ? "bg-white border-[#D32F2F] shadow-md"
                    : "bg-white border-gray-100"
                }`}
              >
                {item.featured && (
                  <span className="inline-flex bg-[#D32F2F] text-white px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                    Most Common
                  </span>
                )}

                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Graft Count
                    </p>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {item.grafts}
                    </h4>
                  </div>

                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {item.norwood}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Estimated Cost
                  </p>
                  <p className="text-3xl font-bold text-[#D32F2F]">
                    {item.cost}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-600">{item.best}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-14">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              ⚠️
            </div>

            <div>
              <h4 className="font-bold text-amber-900 mb-2">
                Beware of Extremely Cheap Quotes
              </h4>

              <p className="text-amber-800 leading-relaxed">
                Prices as low as ₹15–25 per graft often indicate
                technician-performed procedures. A hair transplant is permanent,
                so always verify that a qualified surgeon is directly involved
                in your treatment.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="grid md:grid-cols-4 gap-4 mb-14">
          {trustItems.map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-center font-medium text-gray-700 shadow-sm"
            >
              ✓ {item}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#D32F2F] rounded-[32px] p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Exact Hair Transplant Cost
          </h3>

          <p className="text-red-100 text-lg max-w-2xl mx-auto mb-8">
            Receive a free scalp analysis, personalized graft estimate, and
            complete treatment plan with no hidden charges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20scalp%20analysis%20in%20${city}`}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-[#D32F2F] px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              WhatsApp Consultation
            </a>

            <a
              href="/hair-transplant-cost-in-delhi/"
              className="border border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Full Cost Breakdown
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}