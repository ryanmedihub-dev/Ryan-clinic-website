import { notFound } from "next/navigation";
import DoctorsPageClient from "./DoctorsPageClient";
import PageBanner from "@/components/layouts/pageBanner";
import { doctors } from "@/lib/doctorsData";

// Cache this page for 1 hour via ISR — prevents repeated server renders on every request
export const revalidate = 3600;

// Pre-generate all doctor pages at build time — makes them fully static (○)
// so they're never server-rendered on demand
export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  }));
}

// Helper to find doctor by slug
function getDoctorBySlug(slug) {
  return doctors.find(
    (d) =>
      d.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: "Doctor Not Found | Ryan Clinic",
      description: "The requested doctor profile could not be found.",
    };
  }

  const locationText = doctor.location ? ` in ${doctor.location}` : "";
  return {
    title: `${doctor.name} — Hair Transplant Doctor${locationText} | Ryan Clinic`,
    description: `${doctor.name} is a Turkey-certified hair transplant surgeon${locationText} at Ryan Clinic. ${doctor.experience} experience, ${doctor.procedures} procedures. Book a free consultation.`,
    alternates: {
      canonical: `https://www.clinicryan.com/doctors/${slug}`,
    },
    openGraph: {
      title: `${doctor.name} — Hair Transplant Surgeon`,
      description: `${doctor.name} is a Turkey-certified hair transplant specialist. Book your free scalp analysis at Ryan Clinic.`,
      url: `https://www.clinicryan.com/doctors/${slug}`,
      siteName: "Ryan Clinic",
      type: "profile",
      images: [
        {
          url: `https://www.clinicryan.com${doctor.image}`,
          alt: `${doctor.name} — Hair Transplant Surgeon`,
        },
      ],
    },
  };
}

// ─── Data Constants ──────────────────────────────────────────────────────────
const GOOD_DOCTOR_TRAITS = [
  {
    title: "Proper medical qualifications and registration",
    desc: "Verifiable credentials — MBBS and relevant postgraduate training or fellowship, with a medical-council registration number you can check.",
  },
  {
    title: "Real, focused experience in hair restoration",
    desc: "Years in practice and case volume specifically in hair transplantation, with cases similar to yours.",
  },
  {
    title: "An aesthetic eye",
    desc: "Hairline design is as much art as surgery — the best doctors understand facial proportions, natural growth patterns, and age-appropriate design.",
  },
  {
    title: "Hands-on involvement",
    desc: "The doctor performs the surgery personally, including extraction and implantation — not just a brief appearance at consultation.",
  },
  {
    title: "Honesty",
    desc: "A willingness to tell you the truth about expectations, maintenance, and candidacy — including saying no when surgery isn't right for you.",
  },
  {
    title: "A real portfolio",
    desc: "Before-and-afters of their own patients (not stock photos), plus genuine verified reviews from real cases.",
  },
];

const CREDENTIALS_LIST = [
  "A recognised medical degree (MBBS) and relevant postgraduate training or fellowship in a field related to hair restoration (dermatology, plastic/cosmetic surgery, or dedicated hair-transplant training).",
  "Registration with the relevant medical council, with a registration number you can check.",
  "Specific hair-transplant training or certification in the techniques they perform (FUE, Sapphire FUE, THI).",
  "Documented experience — years in practice and case volume in hair restoration.",
  "Ideally, memberships in recognised professional bodies.",
];

const VERIFY_STEPS = [
  {
    step: "01",
    heading: "Ask for full credentials",
    detail: "Request the doctor's full name, qualifications, and medical-council registration number.",
  },
  {
    step: "02",
    heading: "Check the medical council register",
    detail: "Verify the registration number on the relevant state or national medical council register.",
  },
  {
    step: "03",
    heading: "Request case evidence",
    detail: "Ask how many hair transplant cases they have personally performed, and to see those before-and-afters.",
  },
  {
    step: "04",
    heading: "Confirm surgical involvement",
    detail: "Ask explicitly whether the doctor performs extraction and implantation themselves, or delegates these to technicians.",
  },
  {
    step: "05",
    heading: "Read genuine reviews",
    detail: "Check Google and independent review platforms for recent, verified patient feedback — not testimonials on the clinic's own website.",
  },
];

const COMPARISON_ROWS = [
  ["Consultation & diagnosis", "Doctor", "Often a salesperson or counsellor"],
  ["Hairline design", "Doctor", "Variable — often delegated"],
  ["Graft extraction", "Doctor", "Often technicians"],
  ["Recipient-site creation", "Doctor", "Often technicians"],
  ["Implantation", "Doctor", "Often technicians"],
  ["Follow-up care", "Doctor", "Often ends at discharge"],
];

const DOCTOR_STAGES = [
  {
    num: "01",
    heading: "Consultation & free scalp analysis",
    desc: "The doctor examines your donor density and pattern, discusses your goals and history, and gives an honest plan, technique recommendation, graft count, and transparent cost.",
  },
  {
    num: "02",
    heading: "Hairline design",
    desc: "The doctor maps a natural, age-appropriate hairline to your facial proportions — a step that cannot be delegated and determines the lifelong aesthetic of your result.",
  },
  {
    num: "03",
    heading: "The surgery",
    desc: "The doctor personally performs extraction, recipient-site creation (channel creation), and implantation under local anaesthesia, in a sterile operating theatre.",
  },
  {
    num: "04",
    heading: "Follow-up",
    desc: "The doctor monitors healing and growth through your 12–18 month growth cycle, with milestone checks and direct contact for any concerns.",
  },
];

const QUESTIONS_TO_ASK = [
  "Will you personally perform my extraction and implantation, or will technicians?",
  "What are your qualifications and medical-council registration number?",
  "How many hair transplant cases like mine have you done — can I see them?",
  "Which technique do you recommend for me, and why?",
  "Am I a good candidate, or should I consider medical therapy first?",
  "What result is realistic for my donor supply, and will I need maintenance or a future session?",
  "What's the total per-graft cost, and what does aftercare include?",
];

const GREAT_DOCTOR_TRAITS = [
  {
    title: "Honest candidacy",
    desc: "Recommends surgery only when it's genuinely right — and says so clearly when it isn't.",
  },
  {
    title: "Conservative, natural design",
    desc: "Plans for your future hair loss, not just today. An aggressive, overdone hairline always looks wrong later.",
  },
  {
    title: "Realistic expectations",
    desc: "No \"guaranteed\" impossible density. Honest about what your donor supply can realistically achieve.",
  },
  {
    title: "Personal involvement",
    desc: "Performs the surgery personally rather than delegating critical steps to technicians.",
  },
  {
    title: "Transparent pricing and aftercare",
    desc: "No surprises at billing — complete cost confirmed upfront, with a structured follow-up plan.",
  },
];

const RED_FLAGS = [
  "No named, credentialed doctor anywhere on the website.",
  "Vagueness about who actually operates (doctor vs. technicians).",
  "Unverifiable or exaggerated credentials.",
  "Guaranteed results or pressure to book or pay immediately.",
  "No real before-and-afters of the doctor's own patients.",
  "Inconsistent claims across the website and advertisements.",
];

const PROCEDURES = [
  { name: "FUE & Sapphire FUE" },
  { name: "THI / Hairline Design" },
  { name: "Beard & Moustache Transplant" },
  { name: "Eyebrow Transplant" },
  { name: "Hair Transplant for Women" },
  { name: "PRP Therapy" },
  { name: "Medical Management of Hair Loss" },
];

const NEARBY_AREAS = [
  "Rohini",
  "Shalimar Bagh",
  "Ashok Vihar",
  "Model Town",
  "Punjabi Bagh",
  "Paschim Vihar",
  "Karol Bagh",
  "Janakpuri",
  "Dwarka",
  "Noida",
  "Gurgaon",
  "Faridabad",
];

const FAQS = [
  {
    q: "How do I choose the best hair transplant doctor?",
    a: "Verify that a qualified doctor personally performs the whole surgery, check their credentials and medical-council registration, review real before-and-afters of their own patients and genuine reviews, and judge how honestly they discuss candidacy and expectations.",
  },
  {
    q: "What qualifications should a hair transplant doctor have?",
    a: "A recognised medical degree (MBBS), relevant postgraduate training or fellowship, registration with the medical council, specific hair-transplant training in the techniques they use, and documented hair-restoration experience.",
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────
export default async function DoctorPage({ params }) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  // Map qualifications and certifications to doctorCredentials structure
  const doctorCredentials = [
    ...(doctor.qualifications || []).map((q) => ({ label: q.degree, detail: q.institute })),
    ...(doctor.certifications || []).slice(0, 3).map((c) => ({ label: "Certified", detail: c })),
  ];

  return (
    <>
      <PageBanner
        breadcrumb={`Doctors / ${doctor.name}`}
        title={doctor.name}
        description={`${doctor.designation} at Ryan Clinic. Specialist in ${doctor.specializations?.slice(0, 3).join(", ")}.`}
        bgImage="/uploads/1752667815707-fue-banner_ro9ae6.webp"
        alt={`${doctor.name} — Ryan Clinic`}
      />
      <DoctorsPageClient
        data={{
          goodDoctorTraits: GOOD_DOCTOR_TRAITS,
          credentialsList: CREDENTIALS_LIST,
          verifySteps: VERIFY_STEPS,
          comparisonRows: COMPARISON_ROWS,
          doctorCredentials,
          doctorStages: DOCTOR_STAGES,
          questionsToAsk: QUESTIONS_TO_ASK,
          greatDoctorTraits: GREAT_DOCTOR_TRAITS,
          redFlags: RED_FLAGS,
          procedures: PROCEDURES,
          nearbyAreas: NEARBY_AREAS,
          faqs: FAQS,
          doctor,
        }}
      />
    </>
  );
}