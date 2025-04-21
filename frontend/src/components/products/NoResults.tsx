import React from "react";
import { motion } from "framer-motion";

const NoResults: React.FC = () => (
  <motion.div
    className="text-center py-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <p className="text-xl text-gray-600">
      No products found matching your search.
    </p>
  </motion.div>
);

export default NoResults;
