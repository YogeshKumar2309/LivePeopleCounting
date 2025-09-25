import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all desserts
export const fetchAllDesserts = createAsyncThunk(
  "product/fetchDesserts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/user/getAllProduct");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loadingDesserts: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDesserts.pending, (state) => {
        state.loadingDesserts = true;
        state.error = null;
      })
      .addCase(fetchAllDesserts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingDesserts = false; 
        state.desserts = action.payload;
      })
      .addCase(fetchAllDesserts.rejected, (state, action) => {
        state.loadingDesserts = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;
