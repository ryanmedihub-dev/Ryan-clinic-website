"use client";

import { useState } from "react";
import Image from "next/image";
import PageBanner from "@/components/layouts/pageBanner";

import ImageOne from '../../../../../public/uploads/images/image1.jpg'
import ImageTwo from '../../../../../public/uploads/images/image2.jpg'
import ImageThree from '../../../../../public/uploads/images/image3.jpg'
import ImageFour from '../../../../../public/uploads/images/image4.jpg'
import ImageFive from '../../../../../public/uploads/images/image5.jpg'
import ImageSix from '../../../../../public/uploads/images/image6.jpg'
import ImageSeven from '../../../../../public/uploads/images/image7.jpg'
import ImageEight from '../../../../../public/uploads/images/image8.jpg'
import ImageNine from '../../../../../public/uploads/images/image9.jpg'
import ImageTen from '../../../../../public/uploads/images/image10.jpg'
import ImageEleven from '../../../../../public/uploads/images/image11.jpg'
import ImageTwelve from '../../../../../public/uploads/images/image12.jpg'
import ImageThirteen from '../../../../../public/uploads/images/image13.jpg'
import ImageFourteen from '../../../../../public/uploads/images/image14.jpg'
import ImageFifteen from '../../../../../public/uploads/images/image15.jpg'
import ImageSixteen from '../../../../../public/uploads/images/image16.jpg'
import ImageSeventeen from '../../../../../public/uploads/images/image17.jpg'
import ImageEighteen from '../../../../../public/uploads/images/image18.jpg'
import ImageNineteen from '../../../../../public/uploads/images/image19.jpg'
import ImageTwenty from '../../../../../public/uploads/images/image20.jpg'
import ImageTwentyOne from '../../../../../public/uploads/images/image21.jpg'
import ImageTwentyTwo from '../../../../../public/uploads/images/image22.jpg'
import ImageTwentyThree from '../../../../../public/uploads/images/image23.jpg'
import ImageTwentyFour from '../../../../../public/uploads/images/image24.jpg'
import ImageTwentyFive from '../../../../../public/uploads/images/image25.jpg'
import ImageTwentySix from '../../../../../public/uploads/images/image26.jpg'
import ImageTwentySeven from '../../../../../public/uploads/images/image27.jpg'
import ImageTwentyEight from '../../../../../public/uploads/images/image28.jpg'
import ImageTwentyNine from '../../../../../public/uploads/images/image29.jpg'
import ImageThirty from '../../../../../public/uploads/images/image30.jpg'
import GalleryBanner from "../../../../../public/uploads/gallery.jpg";

const images = [
  { src: ImageOne, category: "Delhi" },
  { src: ImageTwo, category: "Delhi" },
  { src: ImageThree, category: "Delhi" },
  { src: ImageFour, category: "Delhi" },
  { src: ImageFive, category: "Delhi" },
  { src: ImageSix, category: "Delhi" },
  { src: ImageSeven, category: "Delhi" },
  { src: ImageEight, category: "Delhi" },
  { src: ImageNine, category: "Delhi" },
  { src: ImageTen, category: "Delhi" },
  { src: ImageEleven, category: "Mumbai" },
  { src: ImageTwelve, category: "Mumbai" },
  { src: ImageThirteen, category: "Mumbai" },
  { src: ImageFourteen, category: "Mumbai" },
  { src: ImageFifteen, category: "Mumbai" },
  { src: ImageSixteen, category: "Mumbai" },
  { src: ImageSeventeen, category: "Mumbai" },
  { src: ImageEighteen, category: "Mumbai" },
  { src: ImageNineteen, category: "Mumbai" },
  { src: ImageTwenty, category: "Mumbai" },
  { src: ImageTwentyOne, category: "Hyderabad" },
  { src: ImageTwentyTwo, category: "Hyderabad" },
  { src: ImageTwentyThree, category: "Hyderabad" },
  { src: ImageTwentyFour, category: "Hyderabad" },
  { src: ImageTwentyFive, category: "Hyderabad" },
  { src: ImageTwentySix, category: "Hyderabad" },
  { src: ImageTwentySeven, category: "Hyderabad" },
  { src: ImageTwentyEight, category: "Hyderabad" },
  { src: ImageTwentyNine, category: "Hyderabad" },
  { src: ImageThirty, category: "Hyderabad" },
];

const categories = ["All", "Delhi", "Mumbai", "Hyderabad"];

export default function GalleryPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div>
      <PageBanner
        title="Our Gallery"
        description="Regain your confidence with world-class Turkey's Technique hair restoration at Turkey's top-rated Ryan Clinic!"
        bgImage={GalleryBanner}
      />

      <section className="container mx-auto px-4 pb-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 underline">
          Our Gallery
        </h1>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg border-[1px]"
            >
              <Image
                src={img.src}
                alt={`Hair transplant result — Ryan Clinic ${img.category}`}
                width={500}
                height={300}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500 shadow-new"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
