"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { api } from "../axios/util";
import { motion } from "framer-motion";

// Component imports
import SearchBar from "../components/products/SearchBar";
import FilterButtons from "../components/products/FilterButtons";
import { lazy, Suspense } from "react";

const ProductGrid = lazy(() => import("../components/products/ProductGrid"));
const Pagination = lazy(() => import("../components/products/Pagination"));
// import NoResults from "../components/products/NoResults";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [_, setIsSearching] = useState(false);

  // Debounce search input
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
        const categoryMap: Record<string, string> = {
          men: "men's clothing",
          women: "women's clothing",
          jewelry: "jewelery",
          others: "others",
        };

        const category = selectedFilter ? categoryMap[selectedFilter] : "";

        const response = await api.get("/search", {
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
    setSelectedFilter((prev) => (prev === filter ? "" : filter));
    setCurrentPage(1);
  };

  const paginate = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6 },
        },
      }}
    >
      <motion.h1
        className="text-3xl font-bold mb-8 flex text-gray-700 items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our{" "}
        <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Products
        </span>
      </motion.h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FilterButtons
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
        setSelectedFilter={setSelectedFilter}
      />

      {/* {products.length > 0 ? (
        <>
          <ProductGrid products={products} />
        </>
      ) : (
        <NoResults />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )} */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </Suspense>
    </motion.div>
  );
};

export default Products;
