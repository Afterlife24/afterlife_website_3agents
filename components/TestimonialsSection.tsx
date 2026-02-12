"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    content: "Afterlife's voice agent handled 5,000 calls on day one. The latency is non-existent, and our customers genuinely think they're talking to a human.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Director of Sales, OmniCorp",
    content: "The WhatsApp integration tripled our lead qualification speed. We're closing deals faster because the agent handles all the initial grunt work.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Founder, StyleStudio",
    content: "The Web Agent isn't just a chatbot; it actually navigates the site with the user. It's like having a shop assistant for every single visitor.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          What Our Clients Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-8 rounded-3xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl"
            >
              <Quote className="absolute top-6 right-6 text-purple-900/10 w-12 h-12 rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className="text-gray-800 text-lg leading-relaxed mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>

              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-purple-700 text-sm font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
