// src/components/Home/Testimonials.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    name: "Sophie Martinez",
    title: "eCommerce Business Owner",
    feedback:
      "Their local delivery speed is unmatched. Every order to my customers arrives safely and on time. I trust them completely.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Daniel Kim",
    title: "Logistics Manager, AgroSupplies Ltd",
    feedback:
      "Their global shipping service is top-class. Real-time updates, easy admin tools, and dedicated support make them our #1 choice.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Thompson",
    title: "International Shopper",
    feedback:
      "I shipped items overseas and they arrived intact and within 5 days. Reliable and affordable. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Luca Moretti",
    title: "Founder, Moretti Tech",
    feedback:
      "We handle high-value tech components, and their packaging and speed are flawless. We've never had a delivery issue.",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    name: "Hannah Becker",
    title: "Freelance Designer",
    feedback:
      "As someone constantly shipping art prints to clients globally, their precision and transparency are a breath of fresh air.",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Alex Carter",
    title: "Head of Procurement, NovaRetail",
    feedback:
      "Exceptional cross-border delivery management. Their dashboard makes bulk shipment tracking surprisingly simple.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-md max-w-xl mx-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-sm text-yellow-600 mb-2">{item.title}</p>
                <p className="text-gray-600 italic">"{item.feedback}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
