// src/components/Home/CallToAction.jsx
import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-yellow-500 text-white py-12 text-center">
      <h2 className="text-3xl font-bold font-manrope mb-4">
        Ready to Ship With Us?
      </h2>
      <p className="mb-6 font-manrope text-lg">
        Track or request delivery in just a few clicks.
      </p>
      <a
        href="/track"
        className="bg-white text-yellow-600 px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-yellow-100"
      >
        Track Package
      </a>
    </section>
  );
};

export default CallToAction;
