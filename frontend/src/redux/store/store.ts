import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../productSlice";
import cartReducer from "../cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
