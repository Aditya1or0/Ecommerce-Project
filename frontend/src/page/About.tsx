import React from "react";
import NewsLetterBox from "../components/NewsLetterBox";
import Service from "../components/Service";
import Experience from "../components/Experience";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center text-center my-20 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="m-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1
          className="font-bold text-gray-700 text-4xl sm:text-4xl mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          About{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
            Us
          </span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Welcome to{" "}
          <span className="text-cyan-600 font-semibold">Shopify</span>, your
          ultimate eCommerce companion. Our platform is thoughtfully designed to
          empower businesses of all sizes. Whether you're selling physical
          products, offering services, or sharing digital goods,{" "}
          <span className="text-cyan-600 font-semibold">Shopify</span>
          equips you with an intuitive interface, secure payment solutions, and
          a suite of customizable features to transform your online storefront
          into a thriving business.
        </motion.p>
        <motion.p
          className="text-lg text-gray-600 max-w-4xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          At <span className="text-cyan-600 font-semibold">Shopify</span>, we’re
          more than just an eCommerce platform—we’re your partners in growth.
          From first-time entrepreneurs to seasoned business owners, we are here
          to help you expand your reach, increase your sales, and create a
          seamless shopping experience your customers will love. The power of
          eCommerce is in your hands—let’s build something remarkable together.
        </motion.p>
      </motion.div>
      <Service />
      <Experience />
      <NewsLetterBox />
    </motion.div>
  );
};

export default About;
