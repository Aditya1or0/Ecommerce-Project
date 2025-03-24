import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../productSlice';
import cartReducer from '../CartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, // add cart reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
