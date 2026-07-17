import React from "react";
import {
  Globe,
  ShieldCheck,
  Truck,
  Clock3,
  Target,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "50+",
    subtitle: "Countries Served",
  },
  {
    title: "25K+",
    subtitle: "Successful Deliveries",
  },
  {
    title: "99.8%",
    subtitle: "Delivery Success",
  },
  {
    title: "24/7",
    subtitle: "Customer Support",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#0F4C81] via-[#155E75] to-[#2563EB] text-white">

        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-24 -left-24"></div>

        <div className="absolute w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl bottom-0 right-0"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

          <span className="bg-white/15 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            Global Logistics Partner
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-6">
            About SwiftPort Logistics
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-blue-100 leading-8">
            Delivering trusted courier, freight and logistics solutions with
            cutting-edge technology, real-time tracking and customer-first
            service across the globe.
          </p>

        </div>

      </section>

      {/* Story */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Who We Are
            </h2>

            <p className="text-slate-600 leading-8 mb-6">
              SwiftPort Logistics is a next-generation logistics company
              committed to connecting businesses and individuals with reliable,
              secure and efficient delivery services worldwide.
            </p>

            <p className="text-slate-600 leading-8">
              From international freight forwarding and express courier services
              to e-commerce fulfilment and supply chain solutions, we combine
              innovation, transparency and operational excellence to ensure
              every shipment arrives safely and on time.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <FeatureCard
              icon={<Truck size={30} />}
              title="Fast Delivery"
              text="Reliable domestic and international shipping."
            />

            <FeatureCard
              icon={<ShieldCheck size={30} />}
              title="Secure Handling"
              text="Every shipment is carefully monitored and protected."
            />

            <FeatureCard
              icon={<Clock3 size={30} />}
              title="24/7 Tracking"
              text="Track every shipment in real time."
            />

            <FeatureCard
              icon={<Globe size={30} />}
              title="Global Reach"
              text="Connecting businesses across continents."
            />

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

            <Target className="text-blue-600 mb-5" size={38} />

            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-slate-600 leading-8">
              To simplify logistics through speed, innovation and exceptional
              customer service while delivering every package safely and
              efficiently.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

            <Eye className="text-cyan-600 mb-5" size={38} />

            <h3 className="text-2xl font-bold mb-4">
              Our Vision
            </h3>

            <p className="text-slate-600 leading-8">
              To become one of the world's most trusted logistics companies by
              combining technology, transparency and world-class delivery
              solutions.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            {stats.map((item) => (

              <div
                key={item.title}
                className="rounded-2xl shadow-lg border bg-gradient-to-br from-white to-slate-50 p-8 text-center hover:-translate-y-2 transition"
              >

                <h2 className="text-4xl font-extrabold text-blue-700">

                  {item.title}

                </h2>

                <p className="text-slate-500 mt-3">

                  {item.subtitle}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:-translate-y-2 transition">

      <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 mb-5">

        {icon}

      </div>

      <h3 className="font-bold text-lg mb-2">

        {title}

      </h3>

      <p className="text-slate-500 text-sm leading-7">

        {text}

      </p>

    </div>
  );
}