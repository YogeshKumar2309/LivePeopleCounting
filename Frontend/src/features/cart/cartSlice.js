import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch(`${API_BASE}/api/user/private/getCart`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
});

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    const res = await fetch(`${API_BASE}/api/user/private/updateCartQuantity`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    thunkAPI.dispatch(fetchCart());

    return { productId, quantity };
  }
);

//delete cart
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCart",
  async ({ productId }, thunkAPI) => {
    const res = await fetch(`${API_BASE}/api/user/private/deleteCart`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok)
      throw new Error(data.message || "Error occurs while delete Cart Item!");

    thunkAPI.dispatch(fetchCart());

    return productId;
  }
);

//update Cart Active or not
export const updateCartActiveAsync = createAsyncThunk(
  "cart/updateCartActive",
  async ({ productId, isActive }) => {
    const res = await fetch(`${API_BASE}/api/user/private/updateCartActive`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, isActive }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return { productId, isActive };
  }
);

// ------------------ CONFIRM ORDER ------------------
export const confirmOrderAsync = createAsyncThunk(
  "cart/confirmOrder",
  async (_, thunkAPI) => {
    const res = await fetch(`${API_BASE}/api/user/private/confirmOrder`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  }
);

// ------------------ SLICE ------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    orderDetails: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cartItems;
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartActiveAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (index !== -1) {
          state.items[index].isActive = action.payload.isActive;
        }
      })
      //confirm order
      .addCase(confirmOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload;
        state.items = [];
      })
      .addCase(confirmOrderAsync.rejected, (state,action) => {
        state.status = "failed",
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
