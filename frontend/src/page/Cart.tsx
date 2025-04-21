// src/pages/Cart.tsx
import React from "react";
import { motion } from "framer-motion";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCartMessage from "../components/cart/EmptyCartMessage";
import LoadingSpinner from "../components/dashboard/LoadingSpinner";
import { useCart } from "../hooks/useCart";

const Cart: React.FC = () => {
  const {
    cartItems,
    loading,
    totalAmount,
    handleClearCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  } = useCart();

  if (loading) return <LoadingSpinner />;
  if (!cartItems.length) return <EmptyCartMessage />;

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemList
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
          />
        </div>
        <div className="lg:col-span-1">
          <CartSummary totalAmount={totalAmount} />
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
