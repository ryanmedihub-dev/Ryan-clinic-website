// AreasWeServe.js
// Usage: <AreasWeServe city="Delhi" branch="Delhi" />

const BRANCHES = {
  Delhi: {
    address: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Pitampura+Delhi",
    phone: "+91-9217958539",
    hours: "Mon – Sun: 9:00 AM – 7:00 PM",
    metro: "Kohat Enclave / Pitampura Metro Station",
    areas: [
      "Pitampura", "Rohini", "Shalimar Bagh", "Model Town", "Karol Bagh",
      "Connaught Place", "Dwarka", "Janakpuri", "Rajouri Garden", "Saket",
      "South Delhi", "West Delhi", "Noida", "Gurgaon", "Ghaziabad",
      "Faridabad", "Greater Noida", "Indirapuram", "Vasundhara", "Vaishali",
    ],
  },
  Mumbai: {
    address: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Andheri+Mumbai",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Andheri Metro Station",
    areas: [
      "Andheri", "Bandra", "Juhu", "Vile Parle", "Santacruz",
      "Goregaon", "Malad", "Borivali", "Kandivali", "Thane",
      "Navi Mumbai", "Pune", "Nashik", "Vasai", "Virar",
    ],
  },
  Hyderabad: {
    address: "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Banjara+Hills+Hyderabad",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Jubilee Hills / Banjara Hills",
    areas: [
      "Banjara Hills", "Jubilee Hills", "Kondapur", "Gachibowli", "Hitech City",
      "Madhapur", "Kukatpally", "Begumpet", "Secunderabad", "LB Nagar",
      "Dilsukhnagar", "Warangal",
    ],
  },
  Bangalore: {
    address: "Contour Cosmetic Clinic, 2nd Floor, Lakshmidevi Complex, 80 Ft Road, BTM Layout, Bengaluru – 560076",
    mapUrl: "https://maps.google.com/?q=Contour+Cosmetic+Clinic+BTM+Layout+Bangalore",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "BTM Layout / Silk Board",
    areas: [
      "BTM Layout", "Koramangala", "Jayanagar", "JP Nagar", "Marathahalli",
      "Whitefield", "Electronic City", "HSR Layout", "Indiranagar", "MG Road",
      "Yelahanka", "Bannerghatta Road",
    ],
  },
  // Legacy spelling alias
  Banglore: {
    address: "Contour Cosmetic Clinic, 2nd Floor, Lakshmidevi Complex, 80 Ft Road, BTM Layout, Bengaluru – 560076",
    mapUrl: "https://maps.google.com/?q=Contour+Cosmetic+Clinic+BTM+Layout+Bangalore",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "BTM Layout / Silk Board",
    areas: [
      "BTM Layout", "Koramangala", "Jayanagar", "JP Nagar", "Marathahalli",
      "Whitefield", "Electronic City", "HSR Layout", "Indiranagar", "MG Road",
      "Yelahanka", "Bannerghatta Road",
    ],
  },
  Chennai: {
    address: "No.1, 3rd Floor, SS Avenue 43, Rajiv Gandhi Salai, Padur, Chennai – 603103",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Padur+Chennai",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Padur / Old Mahabalipuram Road",
    areas: [
      "Padur", "Sholinganallur", "Perungudi", "Velachery", "Anna Nagar",
      "T Nagar", "Adyar", "Chromepet", "Tambaram", "Porur",
      "Ambattur", "Avadi",
    ],
  },
  Pune: {
    address: "Baner, Pune – 411045",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Baner+Pune",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Baner / Balewadi",
    areas: [
      "Baner", "Balewadi", "Wakad", "Hinjewadi", "Kothrud",
      "Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Hadapsar", "Kharadi",
      "Pimpri", "Chinchwad",
    ],
  },
  Kolkata: {
    address: "Salt Lake, Kolkata – 700091",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Salt+Lake+Kolkata",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Salt Lake / Karunamoyee Metro Station",
    areas: [
      "Salt Lake", "New Town", "Rajarhat", "Park Street", "Ballygunge",
      "Gariahat", "Behala", "Howrah", "Dum Dum", "Barrackpore",
      "Barasat", "Durgapur",
    ],
  },
  Ahmedabad: {
    address: "SG Highway, Ahmedabad – 380054",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+SG+Highway+Ahmedabad",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Ahmedabad BRTS / SG Highway",
    areas: [
      "SG Highway", "Navrangpura", "Satellite", "Vastrapur", "Bodakdev",
      "Thaltej", "Prahlad Nagar", "Anand Nagar", "Maninagar", "Naroda",
      "Chandkheda", "Gandhinagar",
    ],
  },
  Lucknow: {
    address: "Gomti Nagar, Lucknow – 226010",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Gomti+Nagar+Lucknow",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Gomti Nagar / Hazratganj",
    areas: [
      "Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Rajajipuram",
      "Alambagh", "Mahanagar", "Vibhuti Khand", "Chinhat", "Faizabad Road",
      "Kanpur Road", "Sultanpur Road",
    ],
  },
  Jammu: {
    address: "Hall 207 2A, South Block, Bahu Plaza, Jammu – 180012",
    mapUrl: "https://maps.google.com/?q=Emphoria+Skin+Hair+Clinic+Bahu+Plaza+Jammu",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 6:00 PM",
    metro: "Bahu Plaza / Residency Road",
    areas: [
      "Bahu Plaza", "Gandhi Nagar", "Residency Road", "Trikuta Nagar", "Bakshi Nagar",
      "Channi Himmat", "Udhampur", "Kathua", "Samba", "Pathankot Road",
      "Akhnoor", "Nagrota",
    ],
  },
  Patna: {
    address: "Boring Road, Patna – 800001",
    mapUrl: "https://maps.google.com/?q=Ryan+Clinic+Boring+Road+Patna",
    phone: "+91-9217958539",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "Boring Road / Bailey Road",
    areas: [
      "Boring Road", "Bailey Road", "Patna Sahib", "Kankarbagh", "Rajendra Nagar",
      "Ashok Rajpath", "Frazer Road", "Exhibition Road", "Bankipur", "Danapur",
      "Digha", "Hajipur",
    ],
  },
};

export default function AreasWeServe({ city = "Delhi", branch = "Delhi", branchData }) {
  const data = branchData || BRANCHES[branch] || BRANCHES.Delhi;
  const otherBranches = Object.keys(BRANCHES).filter((b) => b !== branch);

  return (
    <section className="py-20 bg-white">
      <div className="containerFull px-4 md:px-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Coverage Area
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
          Hair Transplant Across{" "}
          <span className="text-[#D32F2F]">{city} & Beyond</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end my-10">
          <div>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              Ryan Clinic's {branch} branch welcomes patients from across the
              region. Wherever you are, our team makes your hair transplant
              journey simple — from free scalp analysis to 18-month follow-up.
            </p>
          </div>
          <div>
            <div
              className="rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
                  Pan-India Presence
                </p>
                <p className="text-sm font-semibold text-white">
                  Also in{" "}
                  {otherBranches.map((b, i) => (
                    <span key={b}>
                      <a
                        href={`/hair-transplant-in-${b.toLowerCase()}/`}
                        className="text-white/75 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        {b}
                      </a>
                      {i < otherBranches.length - 1 ? " & " : ""}
                    </span>
                  ))}
                </p>
              </div>
              <a
                href="/hair-transplant-in-india/"
                className="inline-flex items-center gap-2 text-[12px] font-semibold py-2 px-4 rounded-xl shrink-0 transition-opacity hover:opacity-90 bg-white/10 text-white border border-white/20"
              >
                All Locations →
              </a>
            </div>
          </div>

          {/* Pan-India strip */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* ── Left + Centre: Areas grid ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-[#D32F2F]">
                <svg
                  className="w-4 h-4 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Areas Served — {branch}
                </span>
              </div>

              {/* Area chips */}
              <div className="p-4 md:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {data.areas.map((area, i) => (
                  <div
                    key={area}
                    className={`flex items-center gap-2 px-3 py-5 rounded-lg border transition-colors ${
                      i % 5 === 0
                        ? "bg-red-50 border-red-100 text-[#D32F2F]"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-[#D32F2F]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${i % 5 === 0 ? "bg-[#D32F2F]" : "bg-gray-300"}`}
                    />
                    <span className="text-xs font-medium truncate">{area}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 flex items-start gap-2 border-t border-gray-100 bg-gray-50">
                <svg
                  className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Don't see your area? Call us — we welcome patients from
                  anywhere across India and NRI patients worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Clinic info ── */}
          <div className="flex flex-col gap-4">
            {/* Info card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5 px-5 py-4 bg-[#D32F2F]">
                <svg
                  className="w-4 h-4 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21l1.5-4.5m0 0A9 9 0 1119.5 6.75 9 9 0 012.25 16.5l1.5 4.5z"
                  />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {branch} Clinic
                </span>
              </div>

              <div className="divide-y divide-gray-50">
                {[
                  {
                    label: "Address",
                    value: data.address,
                    link: data.mapUrl,
                    linkText: "View on Map →",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Phone",
                    value: data.phone,
                    link: `tel:${data.phone}`,
                    linkText: "Call Now",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Hours",
                    value: data.hours,
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: "Metro",
                    value: data.metro,
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 px-5 py-4 mt-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-700 leading-snug">
                        {item.value}
                      </p>
                      {item.link && (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.link.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          className="text-xs font-semibold text-[#D32F2F] mt-1 inline-block hover:underline"
                        >
                          {item.linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
