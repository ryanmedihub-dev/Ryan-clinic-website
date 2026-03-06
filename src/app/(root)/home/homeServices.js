// app/hair-transplant/page.jsx

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ContactForm from "@/components/pages/contactForm";
import { Button } from "@/components/ui/button";
import Service1 from "../../../../public/uploads/service-one.jpg";
import Service2 from "../../../../public/uploads/service-two.jpg";
import Service3 from "../../../../public/uploads/service-three.jpg";

// Example data for each clinic card
const clinicCards = [
  {
    image: Service1,
    title: "Natural Results Guaranteed in 10 Days",
    buttonText: "Know More About Ryan Treatment",
  },
  {
    image: Service3,
    title: "Meet Our Turkey's Top Specialists",
    buttonText: "Know More About Ryan Treatment",
  },
  {
    image: Service2,
    title: "Most Trusted Hair Clinic in India",
    buttonText: "Know More About Ryan Treatment",
  },
];

export default function HairTransplantPage() {
  return (
    <section>
      <div className="containerFull">
        <h1 className="text-xl md:text-3xl text-center mb-4 md:mb-10 font-semibold font-hind">
          Top Hair Transplant Clinics in Delhi, and Across India: Best Deals &
          Results
        </h1>

        <div className="servicesGrid">
          {/* Full Card Slider */}

          <div className="md:pr-6">
           
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
              }}
            >
              {clinicCards.map((card, index) => (
                <SwiperSlide key={index} className="md:px-2 pb-3">
                  <div className="bg-white rounded-lg shadow-new overflow-hidden">
                    <div>
                      <div className="relative w-full h-88 md:h-100">
                        <Image
                          src={card.image}
                          alt={`Clinic ${index + 1}`}
                          fill
                          className="object-cover md:px-0 px-2"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </div>
                      <h2 className="md:text-xl text-md font-semibold mt-3 text-center">
                        {card.title}
                      </h2>
                      <div className="flex justify-center mt-2">
                        <Button
                          variant="outline"
                          asChild
                          className="mb-4 text-xs py-[8px] bg-white text-black hover:bg-black hover:text-white hover:border-black"
                        >
                          <a href="https://api.whatsapp.com/send?phone=+919217974937&text=Hi, I visited your website. Please guide me with the best treatment.">
                            {card.buttonText}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Contact Form Section */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
