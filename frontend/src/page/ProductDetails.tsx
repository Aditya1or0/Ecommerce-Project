import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../axios/util";
import { addToCartAsync } from "../redux/cartSlice";
import { RootState, AppDispatch } from "../redux/store/store";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NewsLetterBox from "../components/NewsLetterBox";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
        toast.error("Failed to fetch product details");
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (product) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = Number(decoded.sub);

        await dispatch(
          addToCartAsync({
            userId,
            productId: product.id,
            quantity: 1,
          })
        ).unwrap();

        toast.success("Product added to cart!");
        navigate("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product to cart");
      }
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // optional fallback
  }, []);

  if (!product) {
    return (
      <div className="text-3xl flex justify-center items-center h-screen text-cyan-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="gap-3 my-20">
      <div className="flex flex-col md:flex-row justify-around">
        <div>
          <img
            className="w-[200px] sm:w-[250px] object-cover mx-auto md:mx-0"
            src={product.image || "/placeholder.svg"}
            alt={product.title}
          />
        </div>

        <div className="flex flex-col max-w-2xl">
          <h1 className="text-3xl font-bold ml-10 mt-10 mb-4">
            {product.title}
          </h1>
          <p className="m-4 ml-10 text-md">{product.description}</p>
          <p className="text-xl font-bold ml-10">
            <span className="text-gray-700">Price: </span>₹{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-cyan-500 text-white rounded w-1/3 sm:w-1/4 md:w-1/3 ml-10 mt-4 hover:bg-cyan-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-20 hidden sm:block">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default ProductDetails;
