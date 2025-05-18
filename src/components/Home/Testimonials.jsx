// src/components/Home/Testimonials.jsx
import React from 'react';

const testimonials = [
  {
    name: "Adaobi Chukwu",
    title: "eCommerce Business Owner",
    feedback:
      "Their local delivery speed is unmatched. Every order to my customers arrives safely and on time. I trust them completely.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Adeyemi",
    title: "Logistics Manager, AgroSupplies Ltd",
    feedback:
      "Their global shipping service is top-class. Real-time updates, easy admin tools, and dedicated support make them our #1 choice.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Esther Oduwole",
    title: "International Shopper",
    feedback:
      "I shipped items from the UK to Nigeria and they arrived intact and within 5 days. Reliable and affordable. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-yellow-600 mb-2">{item.title}</p>
              <p className="text-sm text-gray-600 italic">"{item.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
