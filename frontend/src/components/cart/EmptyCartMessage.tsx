import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCartMessage: React.FC = () => {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
    </motion.div>
  );
};

export default EmptyCartMessage;
