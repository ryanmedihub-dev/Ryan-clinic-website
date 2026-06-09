import { Playfair_Display, DM_Sans } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata = {
  title: "Dr. Pranendra Singh — Hair Transplant Surgeon in Delhi | Ryan Clinic",
  description:
    "Dr. Pranendra Singh is Delhi's leading Turkey-certified hair transplant surgeon at Ryan Clinic. 12+ years, 10,000+ procedures, 90%+ graft survival. Book a free consultation.",
  alternates: {
    canonical: "https://www.clinicryan.com/about/dr-pranendra-singh",
  },
  openGraph: {
    title: "Dr. Pranendra Singh — Hair Transplant Surgeon in Delhi",
    description:
      "Meet Dr. Pranendra Singh — Delhi's top Turkey-certified Sapphire FUE surgeon. 12+ years experience. Book your free scalp analysis at Ryan Clinic.",
    url: "https://www.clinicryan.com/about/dr-pranendra-singh",
    siteName: "Ryan Clinic",
    type: "profile",
    images: [
      {
        url: "https://www.clinicryan.com/uploads/doctor-pranendra.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Pranendra Singh — Hair Transplant Surgeon, Ryan Clinic Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Pranendra Singh — Hair Transplant Surgeon in Delhi",
    description:
      "Turkey-certified Sapphire FUE surgeon. 12+ years, 10,000+ procedures. Ryan Clinic, Delhi.",
    images: ["https://www.clinicryan.com/uploads/doctor-pranendra.jpg"],
  },
};

const FAQS = [
  {
    q: "Who is Dr. Pranendra Singh?",
    a: "Dr. Pranendra Singh is a Turkey-certified hair transplant surgeon and the lead doctor at Ryan Clinic, Delhi. With over 12 years of experience and more than 10,000 successful hair transplant procedures, he specialises in Sapphire FUE, DHT, beard transplants, and eyebrow restoration.",
  },
  {
    q: "Is Dr. Pranendra Singh a qualified surgeon?",
    a: "Yes. Dr. Pranendra Singh holds an MBBS degree and an MD in Dermatology, and has received advanced training and certification in Sapphire FUE and the original Choi Pen technique in Turkey. He is also an active member of the International Society of Hair Restoration Surgery (ISHRS).",
  },
  {
    q: "Does Dr. Pranendra Singh perform the entire surgery himself?",
    a: "Yes — every surgical step is performed by Dr. Singh personally. Extraction, channel creation, and graft implantation are all carried out by the doctor, not technicians. This is the single most important factor in graft survival and hairline quality.",
  },
  {
    q: "What is Dr. Pranendra Singh's graft survival rate?",
    a: "Dr. Pranendra Singh achieves a 90%+ graft survival rate using the original Choi Pen and a precision graft-preservation protocol. This is significantly higher than the Indian industry average of roughly 60–70%, which typically results from technician-led surgery.",
  },
  {
    q: "Where is Dr. Pranendra Singh's clinic located?",
    a: "Ryan Clinic is located at CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034. The clinic is open Monday to Saturday, 9 AM – 7 PM.",
  },
  {
    q: "How do I book a consultation with Dr. Pranendra Singh?",
    a: "You can book a free scalp analysis by calling or WhatsApp messaging +91 92179 58539. Consultations include a personalised graft count estimate and a full transparent cost breakdown — no obligation.",
  },
  {
    q: "What hair transplant techniques does Dr. Pranendra Singh use?",
    a: "Dr. Singh specialises in Sapphire FUE (with the original Choi Pen), DHT (Direct Hair Transplantation), beard and moustache transplants, eyebrow restoration, crown and vertex reconstruction, and PRP therapy for hair growth.",
  },
  {
    q: "Is a consultation with Dr. Pranendra Singh free?",
    a: "Yes. Ryan Clinic offers a completely free initial scalp analysis and consultation. There is no charge and no obligation. You receive a personalised treatment plan and transparent cost estimate before making any decision.",
  },
];

const EXPERTISE = [
  {
    title: "Sapphire FUE Hair Transplant",
    desc: "Gold-standard technique with sapphire-tipped blades for precise, minimal-trauma channel creation — the same method used at Turkey's leading clinics.",
  },
  {
    title: "DHT (Direct Hair Transplantation)",
    desc: "Grafts implanted immediately with the original Choi Pen — no intermediate storage, maximum graft survival, denser and more natural results.",
  },
  {
    title: "Beard & Moustache Transplant",
    desc: "Natural density restoration for patchy beards, thin coverage, or full-beard design — placing each follicle at the correct angle for natural growth.",
  },
  {
    title: "Eyebrow Transplant",
    desc: "Precise follicle-by-follicle implantation to rebuild thinning or absent eyebrows, following natural growth direction for undetectable results.",
  },
  {
    title: "Crown & Vertex Restoration",
    desc: "Specialised technique for diffuse crown thinning — the most technically demanding area of the scalp, requiring precise density planning.",
  },
  {
    title: "PRP Therapy",
    desc: "Platelet-Rich Plasma treatments to strengthen existing hair follicles and accelerate post-transplant growth and recovery.",
  },
];

const WHY_POINTS = [
  "Every surgical step performed by Dr. Singh — never delegated to technicians",
  "90%+ graft survival using the original Choi Pen (Turkey technique)",
  "12+ years of clinical experience — 10,000+ procedures completed",
  "Turkey-certified Sapphire FUE, available only at Ryan Clinic in India",
  "Free 18-month post-procedure follow-up consultations",
  "WhatsApp support team available 7 days a week",
  "Sterile, NABH-compliant operating theatre with single-use instruments",
  "Transparent pricing confirmed before you commit — 0% EMI available",
];

const REVIEWS = [
  {
    name: "Rahul M.",
    location: "Delhi",
    text: "Dr. Pranendra Singh is exceptional. He performed my Sapphire FUE in April and the results at 8 months are incredible — the hairline looks completely natural. The entire team at Ryan Clinic made the experience seamless and stress-free.",
  },
  {
    name: "Arjun K.",
    location: "Gurgaon",
    text: "I researched dozens of clinics before choosing Ryan Clinic. What convinced me was learning that Dr. Singh himself does the entire surgery — not technicians. Six months in, thick new growth. Couldn't be happier.",
  },
  {
    name: "Vivek S.",
    location: "Dubai (NRI)",
    text: "I flew in from Dubai specifically for Dr. Singh. Turkey-quality results at Indian prices — and a doctor who actually does the work. The WhatsApp follow-up support has been outstanding.",
  },
  {
    name: "Priya R.",
    location: "South Delhi",
    text: "Had my eyebrow transplant done by Dr. Singh. The precision is unmatched — every graft placed at the correct angle. The results are so natural that no one can tell. Absolutely transformed my appearance.",
  },
];

const CREDENTIALS = [
  { label: "MBBS", detail: "Bachelor of Medicine & Surgery" },
  { label: "MD", detail: "Dermatology & Venereology" },
  { label: "Turkey Certification", detail: "Sapphire FUE — Advanced Training, Istanbul" },
  { label: "Choi Pen", detail: "Original Choi Pen Certified Practitioner" },
  { label: "ISHRS Member", detail: "International Society of Hair Restoration Surgery" },
  { label: "12+ Years", detail: "Active Clinical Practice" },
];

export default function DrPranendraSinghPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.clinicryan.com/about/dr-pranendra-singh#person",
        name: "Dr. Pranendra Singh",
        jobTitle: "Hair Transplant Surgeon",
        description:
          "Turkey-certified hair transplant surgeon specialising in Sapphire FUE, DHT, and beard transplant. Lead surgeon at Ryan Clinic, Pitampura, New Delhi.",
        image: "https://www.clinicryan.com/uploads/doctor-pranendra.jpg",
        url: "https://www.clinicryan.com/about/dr-pranendra-singh",
        telephone: "+919217958539",
        worksFor: {
          "@type": "MedicalOrganization",
          name: "Ryan Clinic",
          url: "https://www.clinicryan.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "CD 163, Block CD, Dakshini Pitampura",
            addressLocality: "New Delhi",
            addressRegion: "Delhi",
            postalCode: "110034",
            addressCountry: "IN",
          },
        },
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD (Dermatology & Venereology)" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Turkey Sapphire FUE Certification" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Original Choi Pen Certified Practitioner" },
          { "@type": "EducationalOccupationalCredential", credentialCategory: "membership", name: "ISHRS Member" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className={dmSans.className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0808 0%, #5c1010 45%, #D32F2F 100%)",
        }}
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative containerFull px-4 md:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left — text */}
            <div className="flex-1 text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[2.5px] text-white/70 font-medium">
                  Lead Surgeon · Ryan Clinic Delhi
                </span>
              </div>

              <h1
                className={`${playfair.className} text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.1] mb-4`}
              >
                Dr. Pranendra Singh
                <span className="block text-[clamp(1.2rem,2.5vw,1.6rem)] font-normal italic text-white/70 mt-1">
                  Hair Transplant Surgeon, Delhi
                </span>
              </h1>

              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-8 max-w-xl">
                India&apos;s leading Turkey-certified hair transplant surgeon. Every procedure is
                performed personally by Dr. Singh — using the original Choi Pen and Sapphire FUE
                technique — delivering 90%+ graft survival and natural, permanent results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { num: "12+", label: "Years Experience" },
                  { num: "10,000+", label: "Procedures" },
                  { num: "90%+", label: "Graft Survival" },
                  { num: "4.9★", label: "Google Rating" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center rounded-xl py-3 px-2"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <p className={`${playfair.className} text-2xl font-bold text-white`}>{s.num}</p>
                    <p className="text-[10px] text-white/50 mt-0.5 tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20Dr.%20Pranendra%20Singh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white text-[#D32F2F] font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.535 5.845L.057 23.177c-.083.308.201.592.509.509l5.332-1.478A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.786 9.786 0 01-5.012-1.376l-.36-.213-3.728 1.034 1.056-3.632-.233-.372A9.778 9.778 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                  </svg>
                  Book Free Consultation
                </a>
                <a
                  href="tel:+919217958539"
                  className="inline-flex items-center gap-2.5 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +91 92179 58539
                </a>
              </div>
            </div>

            {/* Right — doctor image card */}
            <div className="w-full lg:w-80 xl:w-96 shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/uploads/about.jpg"
                  alt="Dr. Pranendra Singh — Hair Transplant Surgeon, Ryan Clinic Delhi"
                  fill
                  className="object-cover object-top"
                  unoptimized
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }}
                />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs font-medium">Accepting New Patients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="containerFull px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#D32F2F]" />
              <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">About the Surgeon</span>
            </div>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight`}>
              Delhi&apos;s Most Trusted
              <em className="text-[#D32F2F] not-italic"> Hair Transplant Surgeon</em>
            </h2>
            <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
              <p>
                Dr. Pranendra Singh is the lead hair transplant surgeon at Ryan Clinic, Pitampura, New Delhi. With
                over 12 years of clinical experience and more than 10,000 successful hair transplant procedures,
                Dr. Singh has established himself as one of India&apos;s most trusted hair restoration specialists.
              </p>
              <p>
                After completing his MBBS and MD in Dermatology, Dr. Singh pursued advanced surgical training in
                Istanbul, Turkey — home to the world&apos;s most advanced hair transplant techniques. He became one of
                the first surgeons in India to be certified in the original Sapphire FUE technique and the authentic
                Choi Pen implantation method, bringing true Turkey-quality results to Indian patients at a fraction
                of the cost of travelling abroad.
              </p>
              <p>
                What distinguishes Dr. Pranendra Singh most fundamentally is his personal commitment to performing
                every surgical step himself. In an industry where it is common practice for technicians — not doctors
                — to carry out extraction and implantation, Dr. Singh insists that a certified surgeon must be at the
                operating table throughout. This philosophy directly produces his clinic&apos;s industry-leading 90%+
                graft survival rate.
              </p>
              <p>
                Dr. Singh has treated patients from across India as well as NRI patients travelling from the UK,
                Dubai, USA, Canada, and Australia. His work has been featured in media coverage on hair restoration
                trends in India, and he has been chosen by Bollywood actors, social media influencers, and business
                professionals who require results that stand up to the closest scrutiny.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUALIFICATIONS ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#fff5ec]">
        <div className="containerFull px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Credentials</span>
          </div>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight`}>
            Qualifications & Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CREDENTIALS.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(211,47,47,0.08)" }}
                >
                  <svg className="w-5 h-5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className={`${playfair.className} font-bold text-gray-900 text-lg leading-tight`}>{c.label}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERTISE ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="containerFull px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Specialisations</span>
          </div>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight`}>
            Areas of Expertise
          </h2>
          <p className="text-gray-500 text-sm md:text-[15px] mb-10 max-w-2xl">
            Dr. Singh brings Turkey-level precision to every procedure — each technique mastered through
            advanced training and thousands of clinical cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERTISE.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl p-6 border border-gray-100 hover:border-[#D32F2F]/20 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-[#D32F2F] font-bold text-sm"
                  style={{ background: "rgba(211,47,47,0.07)" }}
                >
                  0{i + 1}
                </div>
                <h3 className={`${playfair.className} font-bold text-gray-900 text-lg mb-2`}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOCTOR-LED APPROACH ──────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #1a0808 0%, #6b1212 50%, #D32F2F 100%)" }}
      >
        <div className="containerFull px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-white/40" />
                <span className="text-white/60 text-[11px] font-semibold tracking-[0.22em] uppercase">Our Standard</span>
              </div>
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-6 leading-tight`}>
                The Doctor-Led
                <span className="block italic font-normal text-white/70">Difference</span>
              </h2>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-6">
                In most Indian hair transplant clinics, the doctor is present only for the initial consultation.
                The surgery itself — including the critical steps of graft extraction and implantation — is
                performed by paramedical technicians who are not licensed surgeons.
              </p>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-8">
                This is the single largest driver of poor outcomes in India: low graft survival, unnatural
                hairlines, and asymmetric density. It is also completely legal, which is why patients must
                specifically ask — and verify — before booking.
              </p>
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <p className={`${playfair.className} text-xl font-bold text-white mb-1`}>
                  &ldquo;A hair transplant is a surgical procedure. It should always be performed by a surgeon.&rdquo;
                </p>
                <p className="text-white/50 text-sm mt-2">— Dr. Pranendra Singh, Lead Surgeon, Ryan Clinic</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { heading: "Extraction", detail: "Dr. Singh personally harvests every graft from the donor area — ensuring consistent quality, correct angles, and minimal follicle trauma." },
                { heading: "Channel Creation", detail: "Using sapphire-tipped blades, Dr. Singh creates each recipient channel at the precise depth, angle, and direction for natural hair growth." },
                { heading: "Implantation", detail: "With the original Choi Pen, every graft is placed individually by Dr. Singh — not loaded and fired by an untrained hand." },
                { heading: "Post-Op Care", detail: "Dr. Singh personally reviews your healing at 7 days, 1 month, 3 months, and 6 months post-procedure, and is reachable via WhatsApp throughout your 18-month follow-up." },
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 flex gap-4 items-start"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-[#D32F2F]"
                    style={{ background: "rgba(255,255,255,0.9)" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{step.heading}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="containerFull px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Patient Results</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 leading-tight`}>
              Before & After Results
            </h2>
            <a
              href="https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%27d%20like%20to%20see%20more%20before%20%26%20after%20results%20for%20Dr.%20Pranendra%20Singh"
              target="_blank"
              rel="noreferrer"
              className="text-[#D32F2F] text-sm font-semibold hover:underline shrink-0"
            >
              Request more results →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: "2,200 Grafts — Hairline Restoration", months: "12 months post-op" },
              { label: "3,000 Grafts — Crown + Frontal Area", months: "14 months post-op" },
              { label: "1,800 Grafts — Beard Transplant", months: "9 months post-op" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <div className="grid grid-cols-2 bg-gray-100" style={{ height: 200 }}>
                  <div className="relative border-r border-gray-200 flex items-center justify-center bg-gray-50">
                    <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">Before</span>
                    <div className="absolute top-2 left-2 bg-gray-700 text-white text-[9px] px-2 py-0.5 rounded font-medium">BEFORE</div>
                  </div>
                  <div className="relative flex items-center justify-center bg-gray-50">
                    <span className="text-gray-300 text-xs font-medium tracking-wide uppercase">After</span>
                    <div className="absolute top-2 right-2 bg-[#D32F2F] text-white text-[9px] px-2 py-0.5 rounded font-medium">AFTER</div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.months}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-xs mt-6 text-center">
            Individual results may vary. All results shown are real patients treated at Ryan Clinic by Dr. Pranendra Singh.
          </p>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="containerFull px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#D32F2F]" />
                <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Why Ryan Clinic</span>
              </div>
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight`}>
                8 Reasons Patients
                <span className="block text-[#D32F2F]">Choose Dr. Singh</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
                Beyond credentials and technique, what matters is the standard of care you receive from
                your first consultation to your final follow-up.
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20Dr.%20Pranendra%20Singh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
              >
                Book Free Scalp Analysis
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="space-y-3">
              {WHY_POINTS.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(211,47,47,0.1)" }}
                  >
                    <svg className="w-3 h-3 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-sm md:text-[15px] leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#fff5ec]">
        <div className="containerFull px-4 md:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Patient Reviews</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 leading-tight`}>
              What Patients Say
            </h2>
            <div className="flex items-center gap-2 md:mb-1">
              <span className="text-yellow-400 text-lg font-bold">4.9★</span>
              <span className="text-gray-400 text-sm">on Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "#D32F2F" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.location}</p>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / CLINIC ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="containerFull px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#D32F2F]" />
                <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">Visit Us</span>
              </div>
              <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight`}>
                Book a Consultation
                <span className="block text-[#D32F2F]">with Dr. Singh</span>
              </h2>

              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                Your initial consultation is completely free. Dr. Singh will personally assess your scalp,
                discuss your goals, confirm your graft count, and provide a transparent cost estimate —
                with no obligation to proceed.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: "Clinic Address",
                    value: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: "Phone / WhatsApp",
                    value: "+91 92179 58539",
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 text-[#D32F2F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: "Working Hours",
                    value: "Monday – Saturday · 9:00 AM – 7:00 PM",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(211,47,47,0.07)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-gray-800 text-sm md:text-[15px] font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20Dr.%20Pranendra%20Singh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
                >
                  WhatsApp Consultation
                </a>
                <a
                  href="tel:+919217958539"
                  className="inline-flex items-center gap-2.5 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
                >
                  Call +91 92179 58539
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 420 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.452773988!2d77.1366!3d28.7041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzE0LjgiTiA3N8KwMDgnMTEuOCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ryan Clinic — CD 163, Dakshini Pitampura, New Delhi"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="containerFull px-4 md:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#D32F2F]" />
              <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">FAQ</span>
            </div>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight`}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-[15px] leading-snug">
                      {faq.q}
                    </h3>
                    <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shrink-0 group-open:bg-[#D32F2F] group-open:border-[#D32F2F] transition-colors">
                      <svg
                        className="w-3.5 h-3.5 text-gray-500 group-open:text-white transition-all group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ───────────────────────────────────── */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="containerFull px-4 md:px-8">
          <p className="text-gray-400 text-xs leading-relaxed max-w-4xl">
            <strong className="text-gray-500">Medical Disclaimer:</strong> The information on this page is provided for
            general informational purposes only and does not constitute medical advice. Results vary between individuals.
            Always consult a qualified medical professional before undergoing any surgical procedure. Ryan Clinic
            services are subject to in-person consultation and clinical assessment.
          </p>
        </div>
      </section>
    </div>
  );
}
