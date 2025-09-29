import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-3">Dessert Shop</h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            Serving happiness with every bite! Freshly baked cakes, pastries,
            and desserts made with love and premium ingredients.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-stone-300 text-sm">
            <li className="hover:text-white transition">Home</li>
            <li className="hover:text-white transition">About Us</li>
            <li className="hover:text-white transition">Menu</li>
            <li className="hover:text-white transition">Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-amber-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-amber-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-amber-500 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-700 mt-8 pt-4 text-center text-stone-400 text-sm">
        © {new Date().getFullYear()} Dessert Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
