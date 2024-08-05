import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartItem {
  name: string;
  quantity: number;
  option: string;
  amount: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]"),
};

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem("cartItems", JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { name, quantity, option, amount } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.name === name && item.option === option,
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
        state.items[existingItemIndex].amount += amount;
      } else {
        state.items.push(action.payload);
      }

      saveToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      saveToLocalStorage(state); // Save to local storage
    },

    updateQuantityInc: (
      state,
      action: PayloadAction<{ name: string; option: string; quantity: number }>,
    ) => {
      const { name, option, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.name === name && item.option === option,
      );
      if (item) {
        item.quantity += 1;
        saveToLocalStorage(state); // Save to local storage
      }
    },
    updateQuantityDec: (
      state,
      action: PayloadAction<{ name: string; option: string; quantity: number }>,
    ) => {
      const { name, option, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.name === name && item.option === option,
      );
      if (item && quantity > 1) {
        item.quantity -= 1;
        saveToLocalStorage(state); // Save to local storage
      } else {
        state.items = state.items.filter((item) => item.name !== name);
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantityInc, updateQuantityDec } =
  cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
