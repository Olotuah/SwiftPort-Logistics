// src/components/Home/Features.jsx
import React from 'react';
import { ShieldCheck, TimerReset, Globe2, BadgeCheck } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "100% Secure",
    description: "Every shipment is protected and insured with top-grade logistics handling."
  },
  {
    icon: <TimerReset className="w-8 h-8 text-blue-500" />,
    title: "On-Time Delivery",
    description: "Our average delivery success rate is over 98% on time, worldwide."
  },
  {
    icon: <Globe2 className="w-8 h-8 text-yellow-500" />,
    title: "Global Reach",
    description: "We operate in over 40 countries with real-time tracking support."
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-purple-500" />,
    title: "Verified Trust",
    description: "Backed by thousands of satisfied clients and verified service records."
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Clients Trust Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
