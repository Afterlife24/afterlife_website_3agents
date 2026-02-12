"use client";

import React from "react";
import { Check } from "lucide-react";
import AmbientBackground from "../../components/AmbientBackground";
import NavBar from "../../components/NavBar";

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for small businesses getting started with AI.",
    features: [
      "1 AI Agent",
      "500 Conversations/mo",
      "Basic Analytics",
      "Email Support",
    ],
    highlight: false,
    color: "from-blue-400 to-cyan-300",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    description: "Scale your operations with advanced AI capabilities.",
    features: [
      "3 AI Agents",
      "Unlimited Conversations",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations",
    ],
    highlight: true,
    color: "from-purple-400 to-pink-300",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations.",
    features: [
      "Unlimited Agents",
      "Dedicated Account Manager",
      "SLA Guarantees",
      "On-premise Deployment",
      "Full API Access",
    ],
    highlight: false,
    color: "from-green-400 to-emerald-300",
  },
];

export default function Pricing() {
  return (
    <div className="h-screen w-full bg-[#F0F4F8] font-sans overflow-hidden relative flex flex-col">
      <AmbientBackground />
      <NavBar />

      <main className="flex-1 relative z-10 flex flex-col items-center p-4 md:p-8 pt-20 md:pt-24 overflow-y-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative p-8 rounded-3xl border transition-all duration-300
                ${
                  plan.highlight
                    ? "bg-white/60 shadow-2xl scale-105 border-purple-500/30"
                    : "bg-white/40 shadow-xl border-white/50 hover:bg-white/50"
                }
                backdrop-blur-xl flex flex-col
              `}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.color}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-500 mb-1 font-medium">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full bg-gradient-to-r ${plan.color} opacity-80`}>
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-3.5 rounded-xl font-bold transition-all shadow-lg
                  ${
                    plan.highlight
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
