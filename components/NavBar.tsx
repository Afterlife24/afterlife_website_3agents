"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "About Us", path: "/about" },
];

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex absolute top-0 left-0 w-full z-50 p-6 justify-between items-center">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-6 h-6 rounded object-cover"
          />
          <span className="text-gray-800 font-bold tracking-tight">
            Afterlife
          </span>
        </Link>
        <div className="flex gap-8 text-sm font-medium text-gray-600 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className="group relative h-[1.2em] overflow-hidden"
              >
                <div className={`flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[1.2em] ${isActive ? "-translate-y-[1.2em]" : ""}`}>
                  <span className="flex items-center h-[1.2em]">{item.name}</span>
                  <span className="flex items-center h-[1.2em] text-black font-bold">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden relative z-50 p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg">
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-5 h-5 rounded object-cover"
          />
          <span className="text-gray-800 font-bold tracking-tight text-sm">
            Afterlife
          </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg"
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-1">
            <div className={`w-5 h-0.5 bg-gray-800 transition-transform ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-800 transition-opacity ${showMobileMenu ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-gray-800 transition-transform ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute top-20 right-4 z-50 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4 w-48 animate-slide-down">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block w-full text-left px-4 py-3 text-gray-700 hover:bg-black/5 rounded-xl transition-colors ${pathname === item.path ? "font-bold bg-black/5" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
