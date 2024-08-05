import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  user: null | any;
  loader: boolean;
}

const initialState: AuthState = {
  user: null,
  loader: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export const { userExists, userNotExists } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
