import React from "react";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaCopy,
} from "react-icons/fa";

const ShereProduct = () => {
  // 👇 yaha define karo (component level pe)
  const productUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(productUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <div className="absolute mt-2 right-0 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
        <div className="flex flex-col gap-3 my-4">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=Check this product: ${productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800"
          >
            <FaFacebook /> Facebook
          </a>

          {/* Twitter (X) */}
          <a
            href={`https://twitter.com/intent/tweet?url=${productUrl}&text=Check this product!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600"
          >
            <FaTwitter /> Twitter
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${productUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            <FaLinkedin /> LinkedIn
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${productUrl}&text=Check this product!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-sky-400 text-white rounded-lg shadow-md hover:bg-sky-500"
          >
            <FaTelegram /> Telegram
          </a>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900"
          >
            <FaCopy /> Copy Link
          </button>
        </div>
      </div>
    </>
  );
};

export default ShereProduct;
