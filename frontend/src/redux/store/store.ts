import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../productSlice";
import cartReducer from "../cartSlice";
import authReducer from "../authSlice";
import favoriteReducer from "../favoriteSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
