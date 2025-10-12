import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE;

const Contact = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [sendMsgLoading, setSendMsgLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = async (data) => {
    setSendMsgLoading(true);
    if (!isAuthenticated) {
      toast.error("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/user/private/contactMsg`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            "Something went wrong! Please try again sometimes!"
        );
      }
      toast.success("Message sent successfully");
      setSendMsgLoading(false);
      reset();
    } catch (error) {
      setSendMsgLoading(false);
      toast.error(error.message);
    }
  };

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
            Y-Desserts
          </h2>
          <p className="text-gray-600 mb-4">
            We’d love to hear from you! Whether you have a question, feedback,
            or just want to say hi, feel free to reach out.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              📍 <span className="font-medium">Address:</span> Near Sector 63
              Metro Station, Noida, Uttar Pradesh 201307
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span> +91 98765 43210
            </p>
            <p>
              📧 <span className="font-medium">Email:</span>{" "}
              contact@ydesserts.com
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6">
            Send a Message
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              placeholder="Your Message"
              rows="4"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 bg-red-100 p-2 rounded-lg">
                {errors.message.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
            >
              {sendMsgLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Google Map (optional) */}
      <div className="mt-12 max-w-6xl mx-auto">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.188154935432!2d77.37543527451748!3d28.62887068494444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c8af2e5483%3A0x2a993c6c25df1d1b!2sSector%2063%20Metro%20Station!5e0!3m2!1sen!2sin!4v1734040500012!5m2!1sen!2sin"
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
