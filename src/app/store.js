import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
