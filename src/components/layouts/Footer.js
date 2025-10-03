import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from '../../../public/uploads/logo-2.png'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 space-y-10 md:space-y-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
          {/* Left Side - About Clinic */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Image
                src={Logo}
                alt="Ryan Clinic"
                width={300}
                height={300}
                className="w-32 md:w-80  h-auto object-contain"
                unoptimized
              />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 leading-relaxed">
              Ryan Clinic is one of the most trusted and reputable hair
              transplant centers in Delhi, known for delivering exceptional hair
              restoration solutions. Whether you're facing hair loss due to
              genetics, illness, or other reasons, we specialize in personalized
              treatments tailored to your specific needs.
            </p>
          </div>

          {/* Right Side - Callback Form */}
          <div className="bg-zinc-800 rounded-md p-6 sm:p-8 md:p-10">
            <form className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold underline text-center mb-4">
                Request a Callback
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Phone Number*"
                  className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="locations"
              >
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              <button
                type="submit"
                className="w-full bg-slate-300 text-black cursor-pointer font-semibold py-2 rounded hover:bg-gray-200 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t bg-black border-gray-700 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-sm text-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h5 className="font-bold text-white text-xl md:text-2xl">
              Google Customer Reviews
            </h5>
            <h5 className="mt-2 text-lg md:text-xl">
              ★★★★★ ( Based on over 1000+ reviews )
            </h5>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 text-white">
            <div className="flex text-xl gap-2 items-center">
              <FaYoutube className="text-red-500" />
              <a href="https://www.youtube.com/@RyanTranplant" className="underline text-base md:text-lg font-medium hover:text-red-400 transition">
                @ryantranplant
              </a>
            </div>
            <div className="flex text-xl gap-2 items-center">
              <FaInstagram className="text-pink-500" />
              <a href="https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D" className="underline text-base md:text-lg font-medium hover:text-pink-400 transition">
                ryan_clinic
              </a>
            </div>
            <div className="flex text-xl gap-2 items-center">
              <FaFacebookF className="text-blue-500" />
              <a href="https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D" className="underline text-base md:text-lg font-medium hover:text-blue-400 transition">
                RyanClinic3210
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 space-y-8 md:space-y-10">
        <h4 className="font-bold text-xl md:text-2xl text-center md:text-left">Our Services</h4>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left border-y border-gray-600 py-8 md:py-10">
          <ul className="md:border-r md:border-gray-600 md:pr-4 lg:pr-6">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/hairline-transplant">Turkey Specialist Technique In India</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/beard-transplant">Beard transplant</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/fue-hair-transplant">FUE Hair Transplant</Link>
            </li>
          </ul>
          <ul className="md:border-r md:border-gray-600 md:px-4 lg:px-6">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/hairline-transplant">Hairline Transplant</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/female-hair-transplant">Female Hair Transplant</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/eyebrow-transplant">Eyebrow Transplant</Link>
            </li>
          </ul>
          <ul className="md:col-span-2 lg:col-span-1 md:mt-6 lg:mt-0 md:pl-4">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/prp-treatment">PRP Treatment</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/chemical-skin-peels">Chemical Skin Peels</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/chemical-skin-peels">Alopecia Treatment</Link>
            </li>
          </ul>
        </div>

        <h4 className="font-bold text-xl md:text-2xl text-center md:text-left">More about us</h4>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left border-y border-gray-600 py-8 md:py-10">
          <ul className="md:border-r md:border-gray-600 md:pr-4">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/contact">Home</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/about">About</Link>
            </li>
          </ul>
          <ul className="md:border-r md:border-gray-600 md:px-4">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/chemical-skin-peels">Our Gallery</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/chemical-skin-peels">Our Videos</Link>
            </li>
          </ul>
          <ul className="md:border-r md:border-gray-600 md:px-4">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/contact">Our Jobs</Link>
            </li>
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
          <ul className="md:mt-6 lg:mt-0 md:pl-4">
            <li className="text-base md:text-lg my-3 md:pl-6 hover:text-blue-300 transition">
              <Link href="/contact">Follow us</Link>
            </li>
            <li className="text-base flex gap-4 my-3 md:pl-6">
              <a href="https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D" className="hover:text-blue-500 transition"><FaFacebookF /></a>
              <a href="https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="https://www.youtube.com/@RyanTranplant" className="hover:text-red-500 transition"><FaYoutube /></a>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-4 md:my-6 text-left">
          {/* Delhi Branch */}
          <div>
            <h4 className="font-bold text-lg md:text-xl text-white underline mb-2">
              Delhi Branch
            </h4>
            <p className="text-sm md:text-base">CD 163, Block CD, Dakshini Pitampura,</p>
            <p className="text-sm md:text-base">Pitampura, Delhi, 110034</p>
          </div>

          {/* Mumbai Branch */}
          <div>
            <h4 className="font-bold text-lg md:text-xl text-white underline mb-2">
              Mumbai Branch
            </h4>
            <p className="text-sm md:text-base">
              Office No.1 & 2,1st floor, Owala Naka, OM SAI PLAZA, w)-400615,
              Kasarvadavali, Thane West, Thane, Mumbai, Maharashtra 400615
            </p>
          </div>

          {/* Hyderabad Branch */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-lg md:text-xl text-white underline mb-2">
              Hyderabad Branch
            </h4>
            <p className="text-sm md:text-base">
              2nd Floor, 8-2, 316/A/6/A, Road No. 14, above SBI bank, beside
              Asha hospital, GS Nagar, Nandi Nagar, Banjara Hills, Hyderabad,
              Telangana 500034
            </p>
          </div>
        </div>
      </div>
      <div className="border-t bg-black border-gray-700 py-6 md:py-7 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-sm text-gray-300">
        <h5 className="text-center text-base md:text-lg">
          © 2025 – All Rights Reserved to RYAN CLINIC
        </h5>
      </div>
    </footer>
  );
}