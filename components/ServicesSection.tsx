"use client";

import React from "react";
import { MessageCircle, Mic, Monitor, ArrowRight, Check } from "lucide-react";

const SERVICES = [
  {
    id: "whatsapp",
    title: "WhatsApp Automation",
    description:
      "End-to-end sales and support on the world's most popular messaging app.",
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    color: "bg-green-500",
    gradient: "from-green-400 to-emerald-600",
    features: [
      "Instant Lead Qualification",
      "24/7 Customer Support",
      "Automated Scheduling",
      "Broadcast Campaigns",
    ],
  },
  {
    id: "voice",
    title: "Voice Intelligence",
    description:
      "Human-like voice agents that handle inbound and outbound calls with zero latency.",
    icon: <Mic className="w-8 h-8 text-white" />,
    color: "bg-purple-500",
    gradient: "from-purple-400 to-pink-600",
    features: [
      "Natural Conversation Flow",
      "Accent Recognition",
      "Interrupt Handling",
      "CRM Integration",
    ],
  },
  {
    id: "web",
    title: "Web Assistance",
    description:
      "Context-aware AI that guides visitors and resolves queries directly on your site.",
    icon: <Monitor className="w-8 h-8 text-white" />,
    color: "bg-blue-500",
    gradient: "from-blue-400 to-cyan-600",
    features: [
      "Page-Aware Context",
      "Visual Product Guiding",
      "Instant Form Filling",
      "Seamless Handover",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored for every channel of your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/60 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-700 mb-8 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-600 font-medium"
                  >
                    <div
                      className={`mt-0.5 p-0.5 rounded-full bg-gradient-to-r ${service.gradient} opacity-80`}
                    >
                      <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
