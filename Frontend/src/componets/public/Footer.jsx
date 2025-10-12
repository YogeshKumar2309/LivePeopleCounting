import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaUser,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-3">Y-Desserts</h2>
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
          <div className="space-y-2 text-stone-300 text-sm flex flex-col capitalize">
            <Link
              to={"/"}
              className="hover:text-yellow-700 hover:font-semibold  transition"
            >
              Home
            </Link>
            <Link
              to={"/user/cart"}
              className="hover:text-yellow-700 hover:font-semibold transition"
            >
              cart
            </Link>
            <Link
              to={"/products"}
              className="hover:text-yellow-700 hover:font-semibold  transition"
            >
              poroducts
            </Link>
            <Link
              to={"/user/profile/orderDetails"}
              className="hover:text-yellow-700 hover:font-semibold  transition"
            >
              MyOrders
            </Link>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/yogeshwebdev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-rose-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://github.com/YogeshKumar2309"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-stone-500 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.youtube.com/@engineering2391"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-700 hover:bg-red-500 transition"
            >
              <FaYoutubeSquare />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-700 mt-8 pt-4 text-center text-stone-400 text-sm">
        © {new Date().getFullYear()} Y-Desserts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
