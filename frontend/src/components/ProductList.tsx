import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice"; // Import the action
import ProductCard from "./ProductCard";
import { RootState } from "../redux/store/store";
import { api } from "../axios/util";
import { motion } from "framer-motion";

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);

  const fetchData = async () => {
    try {
      const response = await api.get("/");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center my-20 px-4">
      <motion.h1
        className="text-3xl sm:text-4xl text-gray-700 font-bold mb-20 text-center"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        Our{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Products
        </span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.slice(0, 8).map((product, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
