import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface MiscState {
  search: string;
  cartCount: number;
}

const initialState: MiscState = {
  search: "",
  cartCount: 0,
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = miscSlice.actions;

//
export const selectSearch = (state: RootState) => state.misc.search;
//

export default miscSlice.reducer;
