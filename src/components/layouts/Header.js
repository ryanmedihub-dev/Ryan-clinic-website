"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Phone, Calendar, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "../pages/contactForm";

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
    fetch("/api/service/get-service", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        const services = result.data || [];
        const toNav = (s) => ({
          name: s.metadata.pageName,
          href: `/${s.metadata.pageurl}`,
          description: s.metadata.description || "",
        });
        setTransplantPages(services.filter((s) => s.metadata?.pageType === "transplant").map(toNav));
        setTreatmentPages(services.filter((s) => s.metadata?.pageType === "treatment").map(toNav));
        setBranchPages(services.filter((s) => s.metadata?.pageType === "branch").map(toNav));
      })
      .catch((err) => console.error("Header services fetch error:", err));
  }, []);

  const cardColors = [
    "bg-rose-50 hover:bg-rose-100 border-rose-100",
    "bg-slate-100 hover:bg-slate-200 border-slate-200",
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    {
      name: "Services",
      href: "#",
      hasDropdown: true,
      key: "services",
      sections: [
        { label: "Hair Transplant", items: transplantPages },
        { label: "Treatments", items: treatmentPages },
      ],
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
    { name: "Cost", href: "/hair-transplant-cost-in-delhi" },
    { name: "Gallery", href: "/hair-transplant-results-before-after-gallery" },
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
                        <button className="flex items-center px-4 py-2 whitespace-nowrap">
                          {item.name}
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdown === item.key ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {/* Dropdown Panel */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 z-50 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-200 ease-in-out ${openDropdown === item.key
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2"
                            }`}
                          style={{ width: "560px" }}
                        >
                          {item.sections ? (
                            /* Sectioned layout — Services */
                            <div
                              className="p-4 overflow-y-auto"
                              style={{ maxHeight: "70vh" }}
                            >
                              {item.sections.map((section, sIdx) => (
                                section.items.length > 0 && (
                                  <div key={section.label} className={sIdx > 0 ? "mt-5" : ""}>
                                    {/* Section label */}
                                    <div className="flex items-center gap-2 mb-3">
                                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        {section.label}
                                      </span>
                                      <div className="flex-1 h-px bg-gray-100" />
                                    </div>
                                    {/* 2-column card grid */}
                                    <div className="grid grid-cols-2 gap-2">
                                      {section.items.map((si, idx) => (
                                        <Link
                                          key={si.href}
                                          href={si.href}
                                          className={`flex flex-col justify-between p-3 rounded-lg border transition-colors duration-150 group/card ${cardColors[idx % 2]
                                            }`}
                                        >
                                          <h4 className="font-bold text-gray-800 text-sm leading-tight">
                                            {si.name}
                                          </h4>
                                          {si.description && (
                                            <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                                              {si.description}
                                            </p>
                                          )}
                                          <div className="flex justify-end mt-2">
                                            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover/card:text-gray-600 transition-colors" />
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : (
                            /* Simple card grid — Branches */
                            <div
                              className="p-4 overflow-y-auto"
                              style={{ maxHeight: "70vh" }}
                            >
                              <div
                                className={`grid gap-2 ${item.dropdownItems.length > 2 ? "grid-cols-2" : "grid-cols-1"
                                  }`}
                              >
                                {item.dropdownItems.map((di, idx) => (
                                  <Link
                                    key={di.href}
                                    href={di.href}
                                    className={`flex flex-col justify-between p-3 rounded-lg border transition-colors duration-150 group/card ${cardColors[idx % 2]
                                      }`}
                                  >
                                    <h4 className="font-bold text-gray-800 text-sm leading-tight">
                                      {di.name}
                                    </h4>
                                    {di.description && (
                                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">
                                        {di.description}
                                      </p>
                                    )}
                                    <div className="flex justify-end mt-2">
                                      <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover/card:text-gray-600 transition-colors" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
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
                <Link href="tel:+919911111247">
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
        className={`fixed top-0 left-0 w-72 h-full bg-primary text-white shadow-lg p-6 z-110 overflow-y-auto lg:hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
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
                {item.sections ? (
                  /* Sectioned mobile accordion */
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-semibold hover:text-amber-300">
                      {item.name}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </summary>
                    <div className="pl-4 mt-2 space-y-4">
                      {item.sections.map((section) => (
                        <div key={section.label}>
                          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                            {section.label}
                          </p>
                          <ul className="space-y-1">
                            {section.items.map((si) => (
                              <li key={si.href}>
                                <Link
                                  href={si.href}
                                  className="block py-1 hover:text-amber-300 text-sm"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {si.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : item.hasDropdown ? (
                  /* Simple mobile accordion */
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-semibold hover:text-amber-300">
                      {item.name}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      {item.dropdownItems.map((di) => (
                        <li key={di.href}>
                          <Link
                            href={di.href}
                            className="block py-1 hover:text-amber-300 text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {di.name}
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
            <Link href="tel:+919911111247">
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
