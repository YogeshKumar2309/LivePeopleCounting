import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            Dessert Shop
          </h2>
          <p className="text-gray-600 mb-4">
            We’d love to hear from you! Whether you have a question, feedback,
            or just want to say hi, feel free to reach out.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              📍 <span className="font-medium">Address:</span> MG Road, Bangalore,
              India
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span> +91 98765 43210
            </p>
            <p>
              📧 <span className="font-medium">Email:</span>{" "}
              contact@dessertshop.com
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6">
            Send a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Google Map (optional) */}
      <div className="mt-12 max-w-6xl mx-auto">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.825468989276!2d77.59456231430434!3d12.97159899086067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670f4c59b3b%3A0x97d0531a6e2b8e7c!2sMG%20Road%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1635673924567!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          className="rounded-2xl shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
