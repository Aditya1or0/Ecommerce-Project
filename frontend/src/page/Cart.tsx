import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCartAsync,
  removeFromCartAsync,
  updateCartQuantityAsync,
} from "../redux/cartSlice";
import type { RootState, AppDispatch } from "../redux/store/store";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  quantity: number;
  Product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const handleRemoveFromCart = async (cartId: number) => {
    try {
      await dispatch(removeFromCartAsync(cartId)).unwrap();
      toast.success("Product removed from cart!");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleClearCart = async () => {
    if (!userId) return;
    try {
      await dispatch(clearCartAsync(userId)).unwrap();
      toast.success("Cart cleared!");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const handleUpdateQuantity = async (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(
        updateCartQuantityAsync({ cartId, quantity: newQuantity })
      ).unwrap();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Add some products to your cart and they will appear here
        </p>
        <Link
          to="/products"
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.Product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
              >
                <img
                  src={item.Product?.image || "/placeholder.svg"}
                  alt={item.Product?.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.Product?.title}
                  </h3>
                  <p className="text-cyan-600 font-medium">
                    ₹{item.Product?.price?.toFixed(2)}
                  </p>

                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="mt-6 text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toast.success("Order placed successfully!")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
