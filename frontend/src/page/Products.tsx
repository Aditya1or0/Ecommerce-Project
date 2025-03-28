"use client";

import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { api } from "../axios/util";

const Products: React.FC = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: any) => state.products.products);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [productsPerPage] = useState<number>(8);

  const fetchData = async () => {
    try {
      const response = await api.get("/");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleFilterChange = (filter: string) => {
    // If clicking the same filter, toggle it off
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
    // Reset to first page when changing filters
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Debounce the search query
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  //debouncing logic

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

  // Filter products and debouncing
  // Filter products by both search query and category
  const filteredProducts = products.filter((product: any) => {
    // Search filter
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase());

    // Category filter
    let matchesCategory = true;
    if (selectedFilter) {
      // Map UI filter names to API category names
      const categoryMap: Record<string, string> = {
        men: "men's clothing",
        women: "women's clothing",
        jewelry: "jewelery",
        others: "others",
      };

      matchesCategory = product.category === categoryMap[selectedFilter];
    }

    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center justify-center">
        Our <span className="ml-2 text-cyan-600">Products</span>
      </h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {/*Filter*/}

      <div className="flex flex-wrap gap-4 items-center py-4 px-6 mb-6">
        {/* Filter Title */}
        <span className="font-semibold text-lg w-full sm:w-auto">
          Filter by:
        </span>

        {/* Filter Buttons */}
        <button
          onClick={() => handleFilterChange("men")}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium 
      ${
        selectedFilter === "men" ? "bg-sky-600 text-white" : "hover:bg-sky-100"
      }`}
        >
          Men
        </button>

        <button
          onClick={() => handleFilterChange("women")}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium 
      ${
        selectedFilter === "women"
          ? "bg-sky-600 text-white"
          : "hover:bg-sky-100"
      }`}
        >
          Women
        </button>

        <button
          onClick={() => handleFilterChange("jewelry")}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium 
      ${
        selectedFilter === "jewelry"
          ? "bg-sky-600 text-white"
          : "hover:bg-sky-100"
      }`}
        >
          Jewelry
        </button>
        <button
          onClick={() => handleFilterChange("others")}
          className={`px-4 py-2 rounded-lg border border-gray-300 font-medium 
      ${
        selectedFilter === "others"
          ? "bg-sky-600 text-white"
          : "hover:bg-sky-100"
      }`}
        >
          Others
        </button>

        <button
          onClick={() => {
            setSelectedFilter("");
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-red-100 text-gray-700"
        >
          Clear Filters
        </button>
      </div>

      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product: any, index: number) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No products found matching your search.
          </p>
        </div>
      )}

      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      currentPage === number
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                paginate(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;
