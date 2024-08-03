import { createSlice } from "@reduxjs/toolkit";

export interface miscProps {
  search: string;
}

const initialState: miscProps = {
  search: "",
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = miscSlice.actions;

export default miscSlice.reducer;
