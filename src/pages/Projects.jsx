import React from "react";
import {
  Package,
  Globe,
  Truck,
  Hospital,
  TrendingUp,
} from "lucide-react";

const milestones = [
  {
    icon: <Package size={30} />,
    title: "3,000+ Express Deliveries",
    text: "Successfully delivered over 3,000 packages across West Africa within 48 hours.",
  },
  {
    icon: <Globe size={30} />,
    title: "1,500+ International Shipments",
    text: "Handled global freight operations with safe and timely delivery.",
  },
  {
    icon: <TrendingUp size={30} />,
    title: "20+ eCommerce Partnerships",
    text: "Supporting online businesses with reliable fulfilment and last-mile delivery.",
  },
  {
    icon: <Hospital size={30} />,
    title: "Medical Logistics",
    text: "Managed urgent deliveries for hospitals requiring secure medical transportation.",
  },
  {
    icon: <Truck size={30} />,
    title: "Growing Every Day",
    text: "Continuously expanding our logistics network and customer satisfaction.",
  },
];

export default function Projects() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-[#0F4C81] via-[#155E75] to-[#2563EB] text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-extrabold">

            Our Achievements

          </h1>

          <p className="text-blue-100 max-w-3xl mx-auto mt-6 text-lg leading-8">

            Every successful shipment reflects our commitment to reliability,
            innovation and customer satisfaction.

          </p>

        </div>

      </section>

      {/* Cards */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {milestones.map((item, index) => (

            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg border border-slate-100 p-8 hover:-translate-y-3 hover:shadow-2xl transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">

                {item.icon}

              </div>

              <span className="inline-block text-xs uppercase tracking-widest text-blue-600 font-semibold mb-3">

                Milestone {index + 1}

              </span>

              <h2 className="text-2xl font-bold text-slate-800 mb-4">

                {item.title}

              </h2>

              <p className="text-slate-600 leading-8">

                {item.text}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Bottom Section */}

      <section className="pb-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#2563EB] text-white p-12 text-center shadow-2xl">

            <h2 className="text-4xl font-bold mb-5">

              More Milestones Ahead

            </h2>

            <p className="text-blue-100 leading-8 max-w-3xl mx-auto">

              SwiftPort Logistics continues to expand its global delivery
              network, improve customer experience and embrace technology to
              provide smarter logistics solutions for businesses and
              individuals worldwide.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}