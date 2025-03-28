import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Load cart from localStorage 
const loadCartFromLocalStorage = (): CartItem[] => {
  const cartData = localStorage.getItem('cart');
  if (cartData) {
    return JSON.parse(cartData);
  }
  return [];
};


const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
   
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
     
      localStorage.removeItem('cart');
    },
    updateCartQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += quantity;
        if (item.quantity <= 0) item.quantity = 1; 
      }
     
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
