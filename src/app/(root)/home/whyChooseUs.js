"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import Years from "@/../public/assets/calendar.png";
import Patients from "@/../public/assets/patient.png";
import Procedure from "@/../public/assets/procedure.png";
import Country from "@/../public/assets/country.png";
import Branch from "@/../public/assets/branches.png";
// -------------------- Animated Number --------------------
function AnimatedNumber({ end, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// -------------------- Main Component --------------------
export default function WhyChooseRyanClinic() {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (mobile or desktop)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      setStartCount(true);
    }
  }, [inView]);

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // -------------------- Stats Data --------------------
  const stats = [
    {
      image:
        Years,
      end: 12,
      label: "Years",
      suffix: "+",
    },
    {
      image:
        Patients,
      end: 66,
      label: "Delighted Patients",
      suffix: "K+",
    },
    {
      image:
        Branch,
      end: 12,
      label: "Branches",
      suffix: "+",
    },
    {
      image:
        Country,
      end: 4,
      label: "Countries",
      suffix: "+",
    },
    {
      image:
        Procedure,
      end: 100,
      label: "Procedures Everyday",
      suffix: "+",
    },
  ];

  // -------------------- Choose Data --------------------
  const chooseData = [
    {
      name: "Completely Safe",
      discription:
        "Our hair transplant procedures are performed in a sterile environment, ensuring the highest safety standards.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614668/hair_cqzsax.png",
    },
    {
      name: "Natural-Looking Results",
      discription:
        "Our precise control over graft depth, direction, and placement angle guarantees a completely natural appearance.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614685/shield_b3ueha.png",
    },
    {
      name: "Pain-Free Hair Transplant",
      discription:
        "Using tiny, disposable instruments with a diameter of 1mm or less, we ensure a comfortable, pain-free experience during graft extraction and placement.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614685/techniq_rj2sy8.png",
    },
    {
      name: "High Graft Survival Rate",
      discription:
        "With a graft survival rate exceeding 90%, our success rate far surpasses the industry average of 50%, as confirmed by independent research.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/pen_bsegei.png",
    },
    {
      name: "Hair Transplant Surgeons",
      discription:
        "At our clinic, all hair transplant procedures are performed exclusively by highly skilled and certified medical doctors and their team.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/boy_lrhm0u.png",
    },
    {
      name: "Permanent Hair Growth",
      discription:
        "We exclusively select healthy hair follicles for implantation, ensuring long-term, lasting hair growth free from dormant hair in the telogen phase.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/people_ngty1b.png",
    },
    {
      name: "Our Presence",
      discription:
        "With a global presence, we are renowned for trusted hair restoration solutions that restore confidence and deliver natural results.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/map-icon_ufrpdg.png",
    },
    {
      name: "Medical Team",
      discription:
        "Our expert medical team is dedicated to providing the highest standard of care, ensuring safe, effective, and natural hair restoration results.",
      image:
        "https://res.cloudinary.com/dha2ecdnn/image/upload/v1744614669/medical-team_bchhcu.png",
    },
  ];

  return (
    <section className="bg-[#4b768e] text-white">
      <div className="containerFull">
        <div className="mt-4 mx-auto">
          <div className="whyChooseGrid">
            {/* -------- Left Section -------- */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Why Choose Ryan Clinic?
              </h2>
              <p className="mb-4 text-lg leading-relaxed">
                At Ryan Clinic, we are your trusted destination for premium hair
                transplant services, offering expert treatments in Turkey
                Specialist Technique, PRP, FUE, and beard transplant. Our
                renowned Turkish specialists, backed by a dedicated research
                advisory board, ensure that we deliver the most effective and
                innovative solutions for hair restoration. With state-of-the-art
                facilities and a focus on cutting-edge techniques, we provide
                natural and lasting results. Whether you’re seeking Turkey
                Specialist Technique for precise, non-invasive hair restoration,
                PRP (Platelet-Rich Plasma) therapy for scalp rejuvenation, or
                FUE (Follicular Unit Extraction) for a minimally invasive hair
                transplant, our clinic guarantees exceptional outcomes.
              </p>

              <Button className="mb-10 text p-3 px-4">
                <a href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi, I visited your website. Please guide me with the best treatment.">
                  Learn More About Ryan Transplants
                </a>
              </Button>
            </div>

            {/* -------- Right Section (Dropdown Cards) -------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit mt-4">
              {chooseData.map((item, index) => {
                const isOpen = isMobile
                  ? openIndex === index // Mobile: click
                  : hoveredIndex === index; // Desktop: hover

                return (
                  <div
                    key={index}
                    className="choosecard border border-white rounded-lg p-3 px-4 min-h-16 my-1 cursor-pointer"
                    onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                    onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                    onClick={() => isMobile && handleClick(index)}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <h3 className="title font-bold gap-3 flex items-center">
                        <span>
                          <Image
                            src={item.image}
                            width={40}
                            height={40}
                            alt={item.name}
                          />
                        </span>
                        {item?.name}
                      </h3>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Dropdown Text */}
                    <p
                      className={`text-sm transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen
                          ? "max-h-32 opacity-100 pt-2"
                          : "max-h-0 opacity-0 pt-0"
                      }`}
                    >
                      {item.discription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------- Stats Section -------- */}
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-[95%] mx-auto  rounded-2xl p-6 text-[#4B768E]"
          >
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center bg-gray-50 p-7 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={55}
                  height={55}
                  className="w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] md:w-fit md:h-fit my-4 "
                />
                <p className="font-bold text-black text-xl sm:text-2xl md:text-2xl my-1">
                  <AnimatedNumber
                    end={item.end}
                    suffix={item.suffix}
                    start={startCount}
                  />
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
