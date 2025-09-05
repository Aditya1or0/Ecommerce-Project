import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateProductDto, Product } from "../types/product";

interface AdminState {
  products: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdminState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

export const createProduct = createAsyncThunk<
  Product,
  CreateProductDto,
  { rejectValue: string }
>("admin/createProduct", async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/products`,
      productData
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create product"
    );
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload); // Store the new product
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetProductState } = adminSlice.actions;
export default adminSlice.reducer;
