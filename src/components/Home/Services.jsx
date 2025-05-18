// src/components/Home/Services.jsx
import React from 'react';
import { Truck, Plane, Ship, PackageCheck } from 'lucide-react';

const services = [
  {
    icon: <Truck className="w-10 h-10 text-yellow-500" />,
    title: "Express Local Delivery",
    description: "Swift and safe delivery across all cities with guaranteed same-day options."
  },
  {
    icon: <Plane className="w-10 h-10 text-blue-500" />,
    title: "International Air Freight",
    description: "Worldwide parcel shipping via premium air cargo services."
  },
  {
    icon: <Ship className="w-10 h-10 text-green-600" />,
    title: "Sea Cargo & Logistics",
    description: "Affordable large-volume cargo transport by sea to over 40 countries."
  },
  {
    icon: <PackageCheck className="w-10 h-10 text-purple-600" />,
    title: "Secure Package Handling",
    description: "Every item handled with care — insured, tracked, and protected from damage."
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
