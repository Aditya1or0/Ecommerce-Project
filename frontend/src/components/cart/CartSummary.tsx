import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  totalAmount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/order");
  };
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
    >
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
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <motion.button
        onClick={() => handleCheckout()}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Proceed to Checkout
      </motion.button>
    </motion.div>
  );
};

export default CartSummary;
