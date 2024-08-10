import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Option {
  type: string;
  price: number;
}

export interface CartItem {
  name: string;
  categoryName: string;
  img: string;
  option: Option;
  quantity: number;
  description: string;
  amount: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cartItems") || "[]") as CartItem[],
};

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem("cartItems", JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { name, categoryName, img, option, quantity, amount, description } =
        action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.name === name && item.option.type === option.type,
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
        state.items[existingItemIndex].amount += amount;
        state.items[existingItemIndex].categoryName = categoryName;
        state.items[existingItemIndex].description = description;
        state.items[existingItemIndex].img = img;
      } else {
        state.items.push(action.payload);
      }

      saveToLocalStorage(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      saveToLocalStorage(state); // Save to local storage
    },
    clearItemState: (state) => {
      state.items = [];
    },

    updateQuantityInc: (
      state,
      action: PayloadAction<{ name: string; option: Option; quantity: number }>,
    ) => {
      const { name, option } = action.payload;
      const item = state.items.find(
        (item) => item.name === name && item.option.type === option.type,
      );
      if (item) {
        item.quantity += 1;
        saveToLocalStorage(state);
      }
    },
    updateQuantityDec: (
      state,
      action: PayloadAction<{ name: string; option: Option; quantity: number }>,
    ) => {
      const { name, option, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.name === name && item.option.type === option.type,
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

export const {
  addItem,
  removeItem,
  updateQuantityInc,
  updateQuantityDec,
  clearItemState,
} = cartSlice.actions;

export const selectItems = (state: RootState): CartItem[] => state.cart.items;

export default cartSlice.reducer;
