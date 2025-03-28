import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateCartQuantity,
} from "../redux/CartSlice";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(updateCartQuantity({ id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(updateCartQuantity({ id, quantity: -1 }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-xl py-20">
        <p>Your cart is empty.</p>
        <Link to="/products" className="text-cyan-600 font-bold">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-[100px] h-[100px] object-cover"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-md text-gray-600">₹{item.price}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="bg-red-800 text-white py-1 px-4 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleClearCart}
          className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400"
        >
          Clear Cart
        </button>
        <div className="font-semibold text-lg">
          Total: ₹
          {cartItems
            .reduce(
              (total: any, item: { price: any; quantity: any }) =>
                total + item.price * item.quantity,
              0
            )
            .toFixed(2)}
        </div>
        <Link
          to="/checkout"
          className="bg-cyan-600 text-white py-2 px-6 rounded hover:bg-cyan-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
