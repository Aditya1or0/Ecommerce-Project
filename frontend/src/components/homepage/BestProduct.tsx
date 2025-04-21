import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { values } from "../../assets/assets";
import { api } from "../../axios/util";
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/productSlice";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  ratingCount: number;
  ratingRate: number;
}

const BestProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProductsState] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const displayedProducts = filteredProducts.slice(0, 4);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/");
        setProductsState(response.data);
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Filter products based on rating above 4 after products are fetched
  useEffect(() => {
    setFilteredProducts(products.filter((product) => product.ratingRate > 4));
  }, [products]);

  // Animation variants for smooth fade-in and staggered item display
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <h1 className="text-center mt-10 mb-4 font-bold text-gray-700 text-3xl">
        Best{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Products
        </span>
      </h1>
      <p className="text-center text-gray-600 text-md">
        Our Best Products that have rating above 4
      </p>

      {/* Use motion.div for the grid container to animate items */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <Link to={`/products/${product.id}`}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white-100/70">
                  <img
                    className="w-full h-48 object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {product.title.length > 25
                        ? product.title.slice(0, 17) + ".."
                        : product.title}
                    </div>
                    <p className="text-gray-700 text-base font-bold">
                      {values.symbol}
                      {product.price}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">Rating:</span>
                      <span className="font-bold mr-2">
                        {product.ratingRate}
                      </span>
                      Total Reviews: {product.ratingCount}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No Products</p>
        )}
      </motion.div>
    </>
  );
};

export default BestProduct;
