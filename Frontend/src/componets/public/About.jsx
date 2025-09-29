import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-20">
      {/* Heading Section */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>

      {/* Story Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-green-600">Foodie's Paradise</span>, 
          where taste meets tradition. Since 2010, we’ve been serving freshly prepared 
          meals inspired by authentic recipes, using only the finest ingredients.  
        </p>
      </motion.div>

      {/* Images Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {[
          "/images/about1.jpg", 
          "/images/about2.jpg", 
          "/images/about3.jpg", 
        ].map((img, index) => (
          <motion.div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <img src={img} alt="Restaurant" className="w-full h-64 object-cover" />
          </motion.div>
        ))}
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {[
          { title: "Fresh Ingredients", desc: "We believe in quality. Every dish is crafted with locally sourced, farm-fresh ingredients." },
          { title: "Authentic Taste", desc: "Our chefs bring flavors that remind you of home and explore world cuisines." },
          { title: "Customer First", desc: "Your satisfaction is our top priority, making every dining experience memorable." },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold text-green-600 mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
