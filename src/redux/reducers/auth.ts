import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}
export interface AuthState {
  userInfo: UserProfile | null;
}

const storedUserInfo = localStorage.getItem("userInfo");

const userInfo: UserProfile | null = storedUserInfo
  ? (JSON.parse(storedUserInfo) as UserProfile)
  : null;

const initialState: AuthState = {
  userInfo,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserProfile>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
