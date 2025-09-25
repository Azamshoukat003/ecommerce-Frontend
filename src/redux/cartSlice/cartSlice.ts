// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

/** Cart item shape */
export interface CartItem {
  id: string;
  name: string;
  price: number; // numeric price (no $)
  image?: string | null;
  quantity: number;
  // add any other small fields you want (variant, sku, etc.)
}

interface CartState {
  items: CartItem[];
}

const LOCALSTORAGE_KEY = "myapp_cart_v1";

const loadFromLocal = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

const saveToLocal = (items: CartItem[]) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota errors
  }
};

const initialState: CartState = {
  items: loadFromLocal(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const payload = action.payload;
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.quantity += payload.quantity;
      } else {
        state.items.push({ ...payload });
      }
      saveToLocal(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveToLocal(state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocal(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

/** Selectors */
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, it) => acc + it.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((acc, it) => acc + it.price * it.quantity, 0);
