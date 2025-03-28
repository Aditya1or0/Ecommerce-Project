import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../axios/util";
import { addToCart } from "../redux/cartSlice";
import NewsLetterBox from "../components/NewsLetterBox";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 0,
        })
      );

      navigate("/cart");
    }
  };

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
            className="px-4 py-2 bg-cyan-500 text-white rounded w-1/3 sm:w-1/4  md:w-1/3 ml-10 mt-4 hover:bg-cyan-600 transition-colors"
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
