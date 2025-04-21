import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axios/cart";

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

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: number) => {
    const response = await api.get(`/${userId}`);
    return response.data;
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) => {
    const response = await api.post("/add", { userId, productId, quantity });
    // Fetch the updated cart item with product details
    const updatedCart = await api.get(`/${userId}`);
    const addedItem = updatedCart.data.find(
      (item: CartItem) => item.id === response.data.id
    );
    return addedItem;
  }
);

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, quantity }: { cartId: number; quantity: number }) => {
    const response = await api.put(`/update/${cartId}`, { quantity });
    return { cartId, quantity: response.data.quantity };
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (cartId: number) => {
    await api.delete(`/remove/${cartId}`);
    return cartId;
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async (userId: number) => {
    await api.delete(`/clear/${userId}`);
    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (existingItemIndex !== -1) {
            state.items[existingItemIndex] = action.payload;
          } else {
            state.items.push(action.payload);
          }
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })
      .addCase(updateCartQuantityAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        const { cartId, quantity } = action.payload;
        const item = state.items.find((item) => item.id === cartId);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateCartQuantityAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update quantity";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
