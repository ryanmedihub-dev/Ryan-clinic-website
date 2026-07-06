import Image from "next/image";
import ChooseImg from "../../../../public/uploads/one.jpg"

import {
  Phone,
  CalendarDays,
  ClipboardCheck,
  Layers3,
  Scissors,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Contact Us",
    description:
      "Reach out to us via phone at (+919911111247) or email at (Clinicryanofficial@gmail.com) to schedule a consultation.",
    icon: Phone,
  },
  {
    id: 2,
    title: "Consultation",
    description:
      "Book an appointment for an initial consultation with our expert team. This is your opportunity to discuss your concerns, goals, and expectations.",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Evaluation",
    description:
      "During your consultation, our specialists will conduct a thorough evaluation of your skin or hair condition to recommend the best treatment plan.",
    icon: ClipboardCheck,
  },
  {
    id: 4,
    title: "Treatment Plan",
    description:
      "Based on the evaluation, we will customize a treatment plan tailored to your specific needs and desired outcomes.",
    icon: Layers3,
  },
  {
    id: 5,
    title: "Procedure",
    description:
      "Once you decide to proceed, our skilled medical team will perform the procedure with precision and care in our state‑of‑the‑art facility.",
    icon: Scissors,
  },
  {
    id: 6,
    title: "Follow‑Up",
    description:
      "Post‑procedure, we will provide detailed instructions for aftercare and schedule follow‑up appointments to monitor your progress.",
    icon: CheckCircle2,
  },
  {
    id: 7,
    title: "Feedback and Support",
    description:
      "We value your feedback and are here to support you throughout your journey to achieve optimal results.",
    icon: MessageCircle,
  },
];

export default function ChooseSection() {
  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="containerFull mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <h2 className="small_heading font-bold underline mb-2 text-gray-900 text-lg md:text-xl">
            How It Works
          </h2>
          <p className="text-gray-700 font-semibold mb-6 text-base md:text-lg">
            Our Clinic is a leading clinic in India, specializing in hair
            transplants and skin treatments. Renowned for our world‑class care,
            consistent results, aesthetic precision, and natural outcomes, we
            are especially recognized for our expert Turkish specialists. Our
            reputation extends beyond India, attracting clients from around the
            globe.
          </p>
          <div className="w-full">
            <Image
              src={ChooseImg}
              alt="Clinic Procedure"
              width={800}
              height={500}
              className="rounded-xl object-cover shadow-lg w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-auto lg:h-156 pt-4 overflow-auto lg:overflow-scroll sidebarsection">
          <div className="lg:border-l border-gray-700 lg:pl-6 xl:pl-8 pt-4 flex flex-col gap-6 md:gap-8">
            {steps.map(({ id, title, description, icon: Icon }) => (
              <div key={id} className="pl-0 lg:pl-0">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="min-w-7.5 md:min-w-10.5 h-7.5 md:h-10.5 flex items-center justify-center rounded-full border-2 shrink-0" style={{ borderColor: "var(--primary-red)", background: "rgba(227,10,23,0.06)" }}>
                    <Icon className="w-3 h-3 md:w-5 md:h-5" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl md:text-2xl my-1" style={{ color: "var(--text-primary)" }}>
                      {title}
                    </h3>
                    <p className="text-gray-700 font-semibold text-sm md:text-base">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}