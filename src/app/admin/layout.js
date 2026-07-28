"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  NotebookText,
  ShieldPlus,
  FilePlus,
  Eye,
  Users,
  NotebookTabs,
  Component,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  X,
  Image,
  Scissors,
  Activity,
  DollarSign,
  Stethoscope,
} from "lucide-react";


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Ryan Clinic Admin</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Ryan Clinic Admin Dashboard" />
        <link rel="icon" href="/uploads/r-logo.png" />
      </head>

      <body suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/admin" || pathname === "/admin/") {
      setActiveTab("Dashboard");
    } else if (pathname.startsWith("/admin/pages")) {
      setActiveTab("Pages");
    } else if (pathname.startsWith("/admin/services")) {
      setActiveTab("Services");
    } else if (pathname.startsWith("/admin/customer")) {
      setActiveTab("Customer");
    } else if (pathname.startsWith("/admin/component")) {
      setActiveTab("Components");
    } else if (pathname.startsWith("/admin/gallery")) {
      setActiveTab("Gallery");
    } else if (pathname.startsWith("/admin/surgery")) {
      setActiveTab("Surgery");
    } else if (pathname.startsWith("/admin/hair-fall")) {
      setActiveTab("Hair Fall Treatment");
    } else if (pathname.startsWith("/admin/doctors")) {
      setActiveTab("Doctors");
    } else if (pathname.startsWith("/admin/tracker")) {
      setActiveTab("Tracker");
    } else if (pathname.startsWith("/admin/cost")) {
      setActiveTab("Cost");
    } else if (pathname.startsWith("/admin/surgeon")) {
      setActiveTab("Surgeon");
    } else if (pathname.startsWith("/admin/help")) {
      setActiveTab("Help");
    } else if (pathname.startsWith("/admin/blogs/create")) {
      setActiveTab("Create Blog");
    } else if (pathname.startsWith("/admin/blogs/view")) {
      setActiveTab("View Blogs");
    } else if (pathname.startsWith("/admin/blogs")) {
      setActiveTab("Blogs");
    }
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/" },
    { name: "Pages", icon: NotebookText, href: "/admin/pages" },
    { name: "Doctors", icon: Users, href: "/admin/doctors" },
    { name: "Services", icon: ShieldPlus, href: "/admin/services" },
    { name: "Customer", icon: Users, href: "/admin/customer" },
    { name: "Components", icon: Component, href: "/admin/component" },
    {
      name: "Blogs",
      icon: NotebookTabs,
      children: [
        { name: "Create Blog", icon: FilePlus, href: "/admin/blogs/create" },
        { name: "View Blogs", icon: Eye, href: "/admin/blogs/view" },
      ],
    },
    { name: "Gallery", icon: Image, href: "/admin/gallery" },
    { name: "Surgery", icon: Scissors, href: "/admin/surgery" },
    { name: "Hair Fall Treatment", icon: Stethoscope, href: "/admin/hair-fall" },
    { name: "Cost", icon: DollarSign, href: "/admin/cost" },
    { name: "Surgeon", icon: Stethoscope, href: "/admin/surgeon" },
    { name: "Tracker", icon: Activity, href: "/admin/tracker" },
  ];

  const MenuItem = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div className="group relative">
        <div
          className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left rounded-lg transition-all duration-200 cursor-pointer ${isActive === item.name
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          <Link
            href={item.href || "#"}
            onClick={() => onClick(item.name)}
            className="flex items-center gap-3 flex-1"
          >
            <Icon size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
          {hasChildren && (
            <ChevronDown
              size={16}
              className="transition-transform duration-200 group-hover:rotate-180"
            />
          )}
        </div>
        {/* Hover dropdown submenu */}
        {hasChildren && (
          <div className="hidden group-hover:block ml-4 mt-1 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;

              return (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={() => onClick(child.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive === child.name
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:underline pb-2 hover:text-gray-900"
                    }`}
                >
                  {ChildIcon && <ChildIcon size={16} />}{" "}
                  {/* Only show icon if exists */}
                  <span>{child.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:transform-none ${isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-12"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Ryan Clinic
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto min-h-0 p-3 space-y-1">
            {menuItems.map((item) => (
              <MenuItem
                key={item.name}
                item={item}
                isActive={activeTab}
                onClick={setActiveTab}
              />
            ))}

            {/* Help */}
            <MenuItem
              item={{ name: "Help", icon: HelpCircle, href: "/admin/help" }}
              isActive={activeTab}
              onClick={setActiveTab}
            />
          </nav>

          {/* Visit Site Button */}
          <div className="p-4 border-t border-gray-200">
            <a
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ExternalLink size={18} />
              <span className="font-medium">Visit site</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
