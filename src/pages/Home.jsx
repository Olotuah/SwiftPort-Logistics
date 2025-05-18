// pages/Home.jsx
import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import CallToAction from '../components/Home/CallToAction';
import Footer from '../components/Home/Footer';

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
