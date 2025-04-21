"use client";

import { ReactNode, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { fetchFavorites } from "../../redux/favoriteSlice";
import { addToCartAsync } from "../../redux/cartSlice";
import { api } from "../../axios/favorite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/favoriteSlice";
import { jwtDecode } from "jwt-decode";
import { AppDispatch } from "../../redux/store/store";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface FavoriteItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
}

interface JwtPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "icon";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// Custom Button component to replace shadcn Button
const CustomButton = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
}: CustomButtonProps) => {
  const baseClasses =
    "font-medium rounded focus:outline-none transition-colors";

  const variantClasses: Record<ButtonVariant, string> = {
    default:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    default: "px-4 py-2",
    icon: "p-2",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
interface CustomScrollAreaProps {
  children: ReactNode;
  className?: string;
  height?: string | number;
}

// Custom ScrollArea component to replace shadcn ScrollArea
const CustomScrollArea = ({
  children,
  className = "",
}: CustomScrollAreaProps) => {
  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ scrollbarWidth: "thin" }}
    >
      {children}
    </div>
  );
};

export default function FavoritesList() {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Get userId from JWT token
  const getUserId = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub; // Get user ID from sub claim
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (!userId || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch the user's favorites
        await dispatch(fetchFavorites(userId));

        // Fetch the detailed product information for each favorite
        const response = await api.get(`?userId=${userId}`);
        setFavoriteProducts(response.data);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
        toast.error("Failed to load favorite products");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [dispatch, userId, token]);

  const handleRemoveFavorite = async (productId: number) => {
    if (!userId) return;

    try {
      await dispatch(toggleFavorite({ userId, productId, isFavorite: true }));
      // Remove from local state
      setFavoriteProducts(
        favoriteProducts.filter((item) => item.product.id !== productId)
      );
      toast.success("Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!token || !userId) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCartAsync({
          userId,
          productId,
          quantity: 1,
        })
      );
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading favorites...</span>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Heart className="w-16 h-16 mb-4 text-gray-300" />
        <p className="text-lg">No favorite products yet</p>
        <p className="text-sm mt-2">Products you like will appear here</p>
        <CustomButton className="mt-6" onClick={() => navigate("/")}>
          Browse Products
        </CustomButton>
      </div>
    );
  }

  return (
    <CustomScrollArea className="pr-4">
      <div className="grid grid-cols-1 gap-4">
        {favoriteProducts.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div
              className="w-16 h-16 flex-shrink-0 cursor-pointer"
              onClick={() => handleProductClick(item.product.id)}
            >
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div
              className="flex-grow cursor-pointer"
              onClick={() => handleProductClick(item.product.id)}
            >
              <h3 className="font-medium text-gray-800 line-clamp-1">
                {item.product.title}
              </h3>
              <p className="text-cyan-600 font-bold">₹{item.product.price}</p>
            </div>

            <div className="flex gap-2">
              <CustomButton
                variant="outline"
                size="icon"
                className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 border-gray-200"
                onClick={() => handleRemoveFavorite(item.product.id)}
              >
                <Heart className="h-4 w-4 fill-current" />
                <span className="sr-only">Remove from favorites</span>
              </CustomButton>

              <CustomButton
                variant="outline"
                size="icon"
                className="rounded-full text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 border-gray-200"
                onClick={() => handleAddToCart(item.product.id)}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </CustomScrollArea>
  );
}
