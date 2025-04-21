// src/hooks/useCart.ts
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearCartAsync,
  updateCartQuantityAsync,
  removeFromCartAsync,
} from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store/store";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const handleRemoveFromCart = async (cartId: number) => {
    try {
      await dispatch(removeFromCartAsync(cartId)).unwrap();
      toast.success("Product removed from cart!");
    } catch {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleClearCart = async () => {
    if (!userId) return;
    try {
      await dispatch(clearCartAsync(userId)).unwrap();
      toast.success("Cart cleared!");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const handleUpdateQuantity = async (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(
        updateCartQuantityAsync({ cartId, quantity: newQuantity })
      ).unwrap();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );

  return {
    cartItems,
    loading,
    totalAmount,
    handleRemoveFromCart,
    handleClearCart,
    handleUpdateQuantity,
  };
};
