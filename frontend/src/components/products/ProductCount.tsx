import React from "react";
import { motion } from "framer-motion";

interface ProductCountProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  currentPage,
  productsPerPage,
  totalProducts,
}) => {
  return (
    <motion.div
      className="text-center text-gray-600 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Showing{" "}
      <span className="text-cyan-600 font-bold">
        {(currentPage - 1) * productsPerPage + 1}
      </span>{" "}
      to {Math.min(currentPage * productsPerPage, totalProducts)} of{" "}
      <span className="text-cyan-600 font-bold">{totalProducts}</span> Total
      products
    </motion.div>
  );
};

export default ProductCount;
