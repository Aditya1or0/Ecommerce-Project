import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice"; // Import the action
import ProductCard from "./ProductCard";
import { RootState } from "../redux/store/store";
import { api } from "../axios/util";

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

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-bold mb-20 text-center">
        Our{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
          Products
        </span>{" "}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
        {products.slice(0, 8).map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
