// components/About/HeadingSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

const Heading: React.FC = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-16 text-center md:text-left"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="font-bold text-gray-800 text-4xl sm:text-5xl mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        About{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Us
        </span>
      </motion.h1>

      <div className="md:flex md:items-center md:gap-8">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img
            src={assets.about}
            alt="About Shopify"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Welcome to{" "}
            <span className="text-cyan-600 font-semibold">Shopify</span>, your
            ultimate eCommerce companion. Our platform is thoughtfully designed
            to empower businesses of all sizes. Whether you're selling physical
            products, offering services, or sharing digital goods,{" "}
            <span className="text-cyan-600 font-semibold">Shopify</span> equips
            you with an intuitive interface, secure payment solutions, and a
            suite of customizable features.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            At <span className="text-cyan-600 font-semibold">Shopify</span>,
            we're more than just an eCommerce platform—we're your partners in
            growth. From first-time entrepreneurs to seasoned business owners,
            we are here to help you expand your reach, increase your sales, and
            create a seamless shopping experience your customers will love.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Heading;
