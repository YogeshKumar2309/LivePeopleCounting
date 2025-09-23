import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import likedReducer from "../features/liked/likedSlice.js";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    liked: likedReducer,
  },
  devTools: true,
});
