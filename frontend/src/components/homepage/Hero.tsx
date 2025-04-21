import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center my-20 px-4 max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-bold text-gray-700 text-3xl md:text-4xl lg:text-5xl"
        variants={itemVariants}
      >
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
          ShopiFy
        </span>{" "}
      </motion.h1>

      <motion.p
        className="my-4 font-semibold text-lg md:text-xl"
        variants={itemVariants}
      >
        Your One-Stop Shop for Everything You Need, Anytime, Anywhere.
      </motion.p>

      <motion.p className="text-gray-600 text-md" variants={itemVariants}>
        Shopify is your ultimate eCommerce platform, designed to help you build,
        manage, and grow your online business with ease. Whether you're selling
        products, services, or digital goods, Shopify provides all the tools you
        need to create a seamless shopping experience for your customers.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
