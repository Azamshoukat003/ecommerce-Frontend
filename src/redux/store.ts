import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import cartReducer from "./cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
