import Image from "next/image";
import { Button } from "@/components/ui/button";
import AboutImg from "../../../../public/uploads/about-one.jpg";

export default function aboutSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="w-full bg-white containerFull px-4 md:px-6">
        <div className="flex md:flex-col flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-2/5 h-fit sm:h-80 md:h-96 lg:h-160">
            <Image
              src={AboutImg}
              alt="Turkey Team Process"
              width={570}
              height={450}
              className="rounded-xl object-cover drop-shadow-lg w-full h-full"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-4 mt-0 lg:mt-8">
              Ryan Clinic: Leading Hair Transplant Specialists From Turkey –
              World‑Class Turkey's Technique Hair Transplant Services
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-4">
              At Ryan Clinic, we are proud to be among Turkey's top hair
              transplant specialists, offering world‑class hair restoration
              services. Our expert team specializes in Turkey's Technique, using
              cutting‑edge techniques to achieve natural, long‑lasting results.
              Whether you're dealing with hair thinning, baldness, or desire a
              fuller hairline, we provide tailored solutions that restore not
              just your hair, but your confidence.
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-4">
              What sets Ryan Clinic apart is our use of the original Choi Pen, a
              precision tool exclusive to our clinic in Turkey, offering
              superior results compared to standard methods available in India.
              This advanced tool enables a more precise hair transplant with
              minimal discomfort and a faster recovery time. Our Turkey's
              Technique hair transplant method ensures a seamless, efficient
              procedure that delivers natural‑looking outcomes with high‑quality
              results.
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              From the initial consultation to post‑procedure care, we
              prioritize your comfort and desired outcome. Join Ryan Clinic for
              a life‑changing hair transplant experience, led by some of the
              best hair transplant doctors in Turkey, to join the many satisfied
              clients who have achieved their hair restoration goals with our
              expert services.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base">
              <a href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi">
                Book Your Appointment
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
