// components/ExperiencePage/ExperiencePage.tsx
import React from "react";
import { motion } from "framer-motion";
import { Undo2, UserCheck, Award } from "lucide-react";

const Experience: React.FC = () => {
  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="py-16 max-w-6xl mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-semibold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Experience
        </span>
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        With years of industry experience, we deliver the best products and
        services to our valued customers worldwide.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <motion.div
          className="bg-white/30 rounded-xl shadow-lg p-8 text-center"
          variants={statVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -10 }}
        >
          <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Undo2 className="text-blue-500 w-8 h-8" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">12k+</h3>
          <p className="text-gray-600">Successful Deliveries and Returns</p>
        </motion.div>

        <motion.div
          className="bg-white/30 rounded-xl shadow-lg p-8 text-center"
          variants={statVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -10 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <UserCheck className="text-green-500 w-8 h-8" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">2k+</h3>
          <p className="text-gray-600">Regular Customers</p>
        </motion.div>

        <motion.div
          className="bg-white/30 rounded-xl shadow-lg p-8 text-center"
          variants={statVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -10 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Award className="text-yellow-500 w-8 h-8" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-2">10+</h3>
          <p className="text-gray-600">Years in Business</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;
