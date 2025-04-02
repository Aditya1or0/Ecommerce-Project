"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { api } from "../axios/util";
import { motion } from "framer-motion";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [productsPerPage] = useState<number>(8);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [_, setIsSearching] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const debouncedSearch = useCallback(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [debouncedSearch]);

  const fetchData = async () => {
    try {
      if (debouncedQuery || selectedFilter) {
        setIsSearching(true);
        const category = selectedFilter
          ? {
              men: "men's clothing",
              women: "women's clothing",
              jewelry: "jewelery",
              others: "others",
            }[selectedFilter]
          : "";

        const response = await api.get(`/search`, {
          params: {
            q: debouncedQuery,
            category,
            page: currentPage,
            limit: productsPerPage,
          },
        });

        dispatch(setProducts(response.data.data));
        setTotalProducts(response.data.total);
        setTotalPages(Math.ceil(response.data.total / productsPerPage));
      } else {
        setIsSearching(false);
        const response = await api.get("/paginated", {
          params: {
            page: currentPage,
            limit: productsPerPage,
          },
        });

        dispatch(setProducts(response.data.data));
        setTotalProducts(response.data.total);
        setTotalPages(Math.ceil(response.data.total / productsPerPage));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedQuery, selectedFilter]);

  const handleFilterChange = (filter: string) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonAnimation = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.h1
        className="text-3xl font-bold mb-8 flex text-gray-700 items-center justify-center"
        variants={fadeIn}
      >
        Our{" "}
        <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Products
        </span>
      </motion.h1>

      <motion.div className="mb-6 max-w-md mx-auto relative" variants={fadeIn}>
        <motion.input
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-4 items-center py-4 px-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-semibold text-lg w-full sm:w-auto">
          Filter by:
        </span>
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          onClick={() => {
            setSelectedFilter("");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium ${
            !selectedFilter ? "bg-sky-600 text-white" : "hover:bg-sky-100"
          }`}
        >
          All
        </motion.button>
        {["men", "women", "jewelry", "others"].map((filter) => (
          <motion.button
            key={filter}
            whileHover="hover"
            whileTap="tap"
            variants={buttonAnimation}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-lg border border-gray-300 font-medium ${
              selectedFilter === filter
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-100"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {products.length > 0 ? (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {products.map((product: any, index: number) => (
              <motion.div
                key={product.id || index}
                variants={itemAnimation}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
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
            <span className="text-cyan-600 font-bold"> {totalProducts}</span>{" "}
            Total products
          </motion.div>
        </>
      ) : (
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
      )}

      {totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <nav className="flex items-center">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <motion.button
                  key={number}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonAnimation}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === number
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </motion.button>
              )
            )}

            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </nav>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;
