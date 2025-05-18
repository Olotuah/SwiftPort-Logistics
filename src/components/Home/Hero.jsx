// src/components/Home/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Trusted Global Shipping & Courier Service
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 drop-shadow">
          Delivering packages swiftly, safely, and securely across borders.
        </p>
        <a
          href="/track"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl transition shadow-md"
        >
          Track Your Package
        </a>
      </div>
    </section>
  );
};

export default Hero;
