// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="grid grid-cols-1 gap-6">
        <input type="text" placeholder="Your Name" className="border p-3 rounded" />
        <input type="email" placeholder="Your Email" className="border p-3 rounded" />
        <textarea placeholder="Your Message" className="border p-3 rounded h-32"></textarea>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded">
          Send Message
        </button>
      </form>
      <div className="mt-10 text-sm text-gray-600">
        <p><strong>Email:</strong> support@SwiftPortLogistics.com</p>
        <p><strong>Phone:</strong> +61 800 555 0199</p>
        <p><strong>Office:</strong> Perth, Australia</p>
      </div>
    </div>
  );
};

export default Contact;
