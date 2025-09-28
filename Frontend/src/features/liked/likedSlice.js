const API_BASE = import.meta.env.VITE_API_BASE;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Fetch favorites
export const fetchFavorites = createAsyncThunk(
  "liked/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/getAllFavorites`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch favorites");
      return data.favorites.map((item) => item.productId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Toggle favorite
export const toggleFavoriteAsync = createAsyncThunk(
  "liked/toggleFavoriteAsync",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/private/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update favorite");

      toast.success(
        data.message === "Add to favorite"
          ? "Product added to favorites ❤️"
          : "Product removed from favorites ♡"
      );

      return { productId, action: data.message };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch desserts
export const fetchDesserts = createAsyncThunk(
  "liked/fetchDesserts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/getHomeProduct`);
      const data = await res.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// NEW: Fetch single product details
export const fetchProductDetails = createAsyncThunk(
  "liked/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/getProductDetails?productId=${productId}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch product details");
      return data.products[0]; // assuming API returns array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const likedSlice = createSlice({
  name: "liked",
  initialState: {
    likedProducts: [],
    desserts: [],
    productDetails: null, // added for single product
    loadingDesserts: false,
    loadingFavorites: false,
    loadingProductDetails: false, // optional loader
  },
  reducers: {
    addLike: (state, action) => {
      if (!state.likedProducts.includes(action.payload)) {
        state.likedProducts.push(action.payload);
      }
    },
    removeLike: (state, action) => {
      state.likedProducts = state.likedProducts.filter(
        (id) => id !== action.payload
      );
    },
    toggleFavorite: (state, action) => {
      if (state.likedProducts.includes(action.payload)) {
        state.likedProducts = state.likedProducts.filter(
          (id) => id !== action.payload
        );
      } else {
        state.likedProducts.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.likedProducts = action.payload;
      })
      .addCase(fetchDesserts.fulfilled, (state, action) => {
        state.desserts = action.payload;
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        if (action.payload.action === "Add to favorite") {
          state.likedProducts.push(action.payload.productId);
        } else {
          state.likedProducts = state.likedProducts.filter(
            (id) => id !== action.payload.productId
          );
        }
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loadingProductDetails = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.loadingProductDetails = false;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loadingProductDetails = false;
      });
  },
});

export const { addLike, removeLike, toggleFavorite } = likedSlice.actions;
export default likedSlice.reducer;
