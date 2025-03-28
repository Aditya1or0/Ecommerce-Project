import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { values } from "../assets/assets"; // Assuming values contains a currency symbol like "$"
import { api } from "../axios/util";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/productSlice"; // Import the action to update Redux store

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  ratingCount: number;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const BestProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProductsState] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
    setFilteredProducts(products.filter((product) => product.rating.rate > 4));
  }, [products]); // Re-run the filter logic when 'products' state changes

  return (
    <>
      <h1 className="text-center mt-10 mb-4 font-bold text-gray-700 text-3xl">
        Best <span className="text-cyan-600 ">Products</span>
      </h1>
      <p className="text-center text-gray-600 text-md">
        Our Best Products that have rating above 4
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
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
                      {product.rating.rate}
                    </span>
                    Total Reviews: {product.ratingCount}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </>
  );
};

export default BestProduct;
