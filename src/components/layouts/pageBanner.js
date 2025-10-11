"use client";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function pageBanner({title , description , url}) {
  return (
    <div className="md:relative flex flex-col lg:flex-row md:items-center overflow-hidden h-fit md:min-h-[600px] bannerBackground">
      <div className="relative z-10 w-full lg:w-1/2  md:h-fit px-4 md:px-12 lg:px-20 py-8 md:py-16">
        <h1 className="text-3xl underline md:text-6xl font-extrabold text-gray-800 mb-2 md:mb-4">
          {title}
        </h1>
        <p className="small_heading  font-semibold text-black leading-relaxed mb-4 md:mb-6">
          {description}
        </p>

        <a
          href="https://api.whatsapp.com/send?phone=+919911111247&text=Hi, I visited your website. Please guide me with the best treatment."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs md:text-lg md:px-5 px-3 md:py-3 py-2   border border-gray-400 rounded-md bg-white shadow-md hover:shadow-lg transition"
        >
          <FaWhatsapp className="mr-2 text-green-500 text-lg md:text-xl" />
          Chat With Us On WhatsApp
        </a>
      </div>

      <div className="md:w-full md:lg:w-1/2 h-24 overflow-hidden md:relative bannerImg ">
        <Image
          src={url} // Put this image in your public folder
          alt="Ryan Clinic"
          width={800}
          height={600}
          className="w-full h-full object-cover relative z-10"
          priority
        />
      </div>
    </div>
  );
}
