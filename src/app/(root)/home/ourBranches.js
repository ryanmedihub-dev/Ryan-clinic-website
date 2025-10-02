"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import DelhiImg from "../../../../public/uploads/Delhi.jpg";
import MumbaiImg from "../../../../public/uploads/Mumbai.jpg";
import HyderabadImg from "../../../../public/uploads/Hyderabad.jpg";

const locations = [
  { name: "Delhi", image: DelhiImg, link: "/hair-transplant-in-Delhi" },
  { name: "Mumbai", image: MumbaiImg, link: "/hair-transplant-in-mumbai" },
  { name: "Hyderabad", image: HyderabadImg, link: "/hair-transplant-in-Hyderabad" },
];

export default function OurBranches() {
  return (
    <section
      style={{
        background:
          "linear-gradient(rgb(0 0 0 / 78%), rgb(0 0 0 / 78%)), url(https://res.cloudinary.com/dha2ecdnn/image/upload/v1740393396/background_lvar2m.webp)",
      }}
      className="relative bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left Text Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 underline decoration-blue-500 decoration-2 underline-offset-4">
              Our Branches
            </h2>
            <p className="text-gray-200 mb-6 md:mb-6 leading-relaxed text-base md:text-lg">
              Ryan Healthcare is one of the leaders in offering hair transplant
              services because it has many branches that are well-staffed to
              undertake various procedures. FUE and Turkey Specialist Technique procedures are performed
              at clinics with modern equipment and skilled surgeons at a
              relatively low cost. The needs of the patient take priority, and
              we ensure that each one of them walks away with results that are
              as close to nature as possible.
              <br />
              <br />
              The best clinics for the restoration of hair are just a branch
              away, so visit us now.
            </p>
            <Button
              variant="Primary"
              className="w-full sm:w-fit px-6 py-2 text-base md:text-md  bg-white"
            >
              <a className="font-semibold" href="https://api.whatsapp.com/send?phone=+918882356930&text=Hi, I visited your website. Please guide me with the best treatment.">
                                          

                Visit Branch
              </a>
            </Button>
          </div>

          {/* Right Swiper Slider */}
          <div className="order-1 lg:order-2">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".branch-swiper-button-next",
                prevEl: ".branch-swiper-button-prev",
              }}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 1.5, spaceBetween: 16 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 2, spaceBetween: 24 },
              }}
              className="rounded-lg relative"
            >
              {locations.map((item, index) => (
                <SwiperSlide key={index} className="relative">
                  <a href={item.link}>
                    <div className="branch-slide relative h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg group">
                      {/* Branch Image */}
                      <Image
                        src={item.image}
                        alt={`${item.name} Branch`}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Branch Label */}
                      <div className="absolute right-0 bottom-0 w-40 h-12  rounded-tl-md bg-black bg-opacity-80 flex items-center justify-center">
                        <h3 className="text-white font-bold text-lg md:text-xl">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="flex justify-center mt-6 md:mt-8 space-x-4">
              <div className="branch-swiper-button-prev cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-black hover:bg-opacity-30 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              <div className="branch-swiper-button-next cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 text-black hover:bg-opacity-30 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra styling */}
      <style jsx global>{`
        .branch-slide {
          transition: transform 0.3s ease;
        }
        .branch-slide:hover {
          transform: translateY(-4px);
        }
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
