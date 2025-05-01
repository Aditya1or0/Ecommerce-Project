import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../productSlice";
import cartReducer from "../cartSlice";
import authReducer from "../authSlice";
import favoriteReducer from "../favoriteSlice";
import adminReducer from "../adminSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    favorites: favoriteReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
