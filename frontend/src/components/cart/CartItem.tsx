import { motion } from "framer-motion";

interface CartItemProps {
  item: {
    id: number;
    quantity: number;
    Product: {
      id: number;
      title: string;
      price: number;
      image: string;
    };
  };
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <motion.img
        src={item.Product.image}
        alt={item.Product.title}
        className="w-24 h-24 object-cover rounded"
        whileHover={{ scale: 1.1 }}
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-800">
          {item.Product.title}
        </h3>
        <p className="text-cyan-600 font-medium">
          ₹{item.Product.price.toFixed(2)}
        </p>

        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1, color: "#e53e3e" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(item.id)}
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
