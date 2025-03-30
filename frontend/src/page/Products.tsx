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
  const [, setTotalProducts] = useState<number>(0);
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

  const fetchTotalProducts = async () => {
    try {
      const response = await api.get("/");
      setTotalProducts(response.data.length);
      setTotalPages(Math.ceil(response.data.length / productsPerPage));
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
  }, [productsPerPage]);

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
          : null;

        const response = await api.get(`/search`, {
          params: {
            q: debouncedQuery,
            category,
          },
        });

        dispatch(setProducts(response.data));
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      } else {
        setIsSearching(false);
        const response = await api.get("/paginated", {
          params: {
            page: currentPage,
            limit: productsPerPage,
          },
        });

        dispatch(setProducts(response.data));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedQuery, selectedFilter, dispatch]);

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

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 items-center py-4 px-6 mb-6">
        <span className="font-semibold text-lg w-full sm:w-auto">
          Filter by:
        </span>
        {["men", "women", "jewelry", "others"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-lg border border-gray-300 font-medium ${
              selectedFilter === filter
                ? "bg-sky-600 text-white"
                : "hover:bg-sky-100"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedFilter("");
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-red-100 text-gray-700"
        >
          All
        </button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any, index: number) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No products found matching your search.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

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

            <button
              onClick={() => paginate(currentPage + 1)}
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
