"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { values } from "../../assets/assets";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hook";
import { toggleFavorite } from "../../redux/favoriteSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface API {
  id: number;
  title: string;
  price: number;
  image: string;
}
interface ProductCardProps {
  product: API;
}

interface JwtPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to add items to favorites");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.sub; // Get user ID from sub claim

      dispatch(toggleFavorite({ userId, productId: product.id, isFavorite }));
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  const truncatedTitle =
    product.title.length > 25
      ? product.title.slice(0, 17) + ".."
      : product.title;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white-100/70 mb-6">
      <div key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img
            className="w-full h-48 object-contain"
            src={product.image || "/placeholder.svg"}
            alt={product.title}
          />
        </Link>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 ">{truncatedTitle}</div>
          <div className="flex justify-between">
            <p className="text-gray-700 text-base font-bold">
              {values.symbol}
              {product.price}
            </p>
            <button onClick={handleToggleFavorite}>
              {isFavorite ? (
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              ) : (
                <Heart className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
