import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import likedReducer from "../features/liked/likedSlice.js";
import productsReducer from "../features/product/ProductSlice.jsx";
import cartReducer from "../features/cart/cartSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    liked: likedReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  devTools: true,
});
