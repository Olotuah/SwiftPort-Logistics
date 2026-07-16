// src/components/Home/Footer.jsx
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold font-inter text-yellow-400 mb-4">
            SwiftPort Logistics
          </h3>
          <p className="text-sm text-gray-400 font-manrope">
            Reliable courier and logistics solutions delivering to your door —
            locally and internationally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400">
                Home
              </a>
            </li>
            <li>
              <a href="/track" className="hover:text-yellow-400">
                Track Package
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-yellow-400">
                Projects
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@SwiftPort.org
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +61 800 555 0199
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Perth, Australia
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} SwiftPort Logistics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
