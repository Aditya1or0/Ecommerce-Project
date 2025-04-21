import { AnimatePresence } from "framer-motion";
import CartItem from "./CartItem";

interface CartItemListProps {
  cartItems: any[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  onRemove,
  onUpdateQuantity,
  onClearCart,
}) => {
  return (
    <div>
      <AnimatePresence>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      </AnimatePresence>
      <button
        onClick={onClearCart}
        className="mt-6 text-red-600 hover:text-red-800 font-medium"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartItemList;
