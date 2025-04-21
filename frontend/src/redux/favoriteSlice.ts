// favoriteSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../axios/favorite";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetch",
  async (userId: number) => {
    const response = await api.get(`?userId=${userId}`);
    return response.data;
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorites/toggle",
  async ({ userId, productId, isFavorite }: any) => {
    if (isFavorite) {
      await api.delete(`/${productId}?userId=${userId}`);
    } else {
      await api.post(`/`, { userId, productId });
    }
    return { productId, isFavorite: !isFavorite };
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [] as number[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.items = action.payload.map((fav: any) => fav.product.id);
    });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const { productId, isFavorite } = action.payload;
      if (isFavorite) {
        state.items.push(productId);
      } else {
        state.items = state.items.filter((id) => id !== productId);
      }
    });
  },
});

export default favoriteSlice.reducer;
