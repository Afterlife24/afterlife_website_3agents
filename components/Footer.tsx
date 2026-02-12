"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-white/20 backdrop-blur-xl border-t border-white/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/assets/logo.jpeg"
              alt="logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-gray-900 font-bold text-xl tracking-tight">
              Afterlife
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Building the next generation of intelligent, empathetic, and efficient AI employees for businesses worldwide.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/50 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-white/50 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-white/50 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white transition-all shadow-sm">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <Link href="/about" className="hover:text-purple-700 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-purple-700 transition-colors">Pricing</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Careers</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Terms of Service</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Cookie Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-700 transition-colors">Security</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-purple-600 shrink-0 mt-0.5" />
              <span>info@afterlife.ai</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-purple-600 shrink-0 mt-0.5" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-purple-600 shrink-0 mt-0.5" />
              <span>
                123 Innovation Blvd,<br />
                Tech City, TC 90210
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Afterlife Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-xs text-green-700 font-medium">All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
