"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "../pages/contactForm";
import { getAllServices } from "@/lib/serviceData";

const Logo = "/uploads/logo-2.png";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);
  const [transplantPages, setTransplantPages] = useState([]);
  const [treatmentPages, setTreatmentPages] = useState([]);
  const [branchPages, setBranchPages] = useState([]);

  useEffect(() => {
    getAllServices().then((services) => {
      const toNav = (s) => ({
        name: s.metadata.pageName,
        href: `/${s.metadata.pageurl}`,
      });
      setTransplantPages(services.filter((s) => s.metadata?.pageType === "transplant").map(toNav));
      setTreatmentPages(services.filter((s) => s.metadata?.pageType === "treatment").map(toNav));
      setBranchPages(services.filter((s) => s.metadata?.pageType === "branch").map(toNav));
    });
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    {
      name: "Hair Transplant",
      href: "/fue-hair-transplant",
      hasDropdown: true,
      key: "hairTransplant",
      dropdownItems: transplantPages,
    },
    {
      name: "Treatments",
      href: "#",
      hasDropdown: true,
      key: "treatments",
      dropdownItems: treatmentPages,
    },
    ...(branchPages.length > 0
      ? [
          {
            name: "Branches",
            href: "#",
            hasDropdown: true,
            key: "branches",
            dropdownItems: branchPages,
          },
        ]
      : []),
    { name: "Gallery", href: "/gallery/images" },
    { name: "Contact us", href: "/contact" },
  ];

  const handleMouseEnter = (key) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  useEffect(() => {
    if (!showPopup || !formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
    import("canvas-confetti").then(({ default: confetti }) => {
      const fire = (ratio, opts) =>
        confetti({ ...opts, particleCount: Math.floor(200 * ratio), disableForReducedMotion: true });
      fire(0.25, { spread: 26, startVelocity: 55, origin });
      fire(0.2, { spread: 60, origin });
      fire(0.35, { spread: 100, decay: 0.91, origin });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, origin });
      fire(0.1, { spread: 120, startVelocity: 45, origin });
    });
  }, [showPopup]);

  return (
    <>
      <header className="w-full bg-primary text-white sticky top-0 z-50">
        <div className="w-full mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              alt="Ryan Clinic"
              width={160}
              height={160}
              className="w-28 md:w-40 h-auto object-contain"
              unoptimized
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center xl:gap-4 2xl:gap-12">
            <nav>
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li
                    className="font-semibold relative group"
                    key={item.key || item.name}
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.hasDropdown ? (
                      <div className="relative">
                        <button className="flex items-center px-4 py-2">
                          {item.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div
                          className={`absolute top-9 left-0 z-50 w-60 bg-primary rounded-sm shadow-lg transition-all duration-200 ease-in-out ${
                            openDropdown === item.key
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible translate-y-1"
                          }`}
                        >
                          <ul className="py-1">
                            {item.dropdownItems.map((dropdownItem) => (
                              <li key={dropdownItem.href}>
                                <Link
                                  href={dropdownItem.href}
                                  className="block px-4 py-2 text-md font-semibold text-white hover:bg-gray-700"
                                >
                                  {dropdownItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <Link href={item.href} className="block px-4 py-2 hover:text-amber-300">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                asChild
                className="md:h-9 h-8 bg-white text-black hover:bg-black hover:text-white"
              >
                <Link href="tel:+919217958539">
                  <Phone className="h-4 w-4" />
                  <span>Call us</span>
                </Link>
              </Button>
              <Button
                onClick={() => setShowPopup(true)}
                className="md:h-9 h-8 bg-white text-black hover:bg-black hover:text-white"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden 2xl:block">Book appointment</span>
              </Button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-109 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-primary text-white shadow-lg p-6 z-110 overflow-y-auto lg:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-4 text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <Link href="/" className="block mb-8">
          <Image
            src={Logo}
            alt="Ryan Clinic"
            width={140}
            height={80}
            className="object-contain"
            unoptimized
          />
        </Link>

        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.key || item.name}>
                {item.hasDropdown ? (
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-semibold hover:text-amber-300">
                      {item.name}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <li key={dropdownItem.href}>
                          <Link
                            href={dropdownItem.href}
                            className="block py-1 hover:text-amber-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className="block font-semibold hover:text-amber-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild className="bg-white text-black hover:bg-black hover:text-white">
            <Link href="tel:+919217958539">
              <Phone className="h-4 w-4" />
              <span>Call us</span>
            </Link>
          </Button>
          <Button
            onClick={() => {
              setShowPopup(true);
              setMobileMenuOpen(false);
            }}
            className="bg-white text-black hover:bg-black hover:text-white"
          >
            <Calendar className="h-4 w-4" />
            <span>Book appointment</span>
          </Button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div
            ref={formRef}
            className="rounded-lg w-full max-w-md p-6 relative animate-zoomIn"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 rounded-full p-2 bg-white hover:bg-red-100 text-black z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
