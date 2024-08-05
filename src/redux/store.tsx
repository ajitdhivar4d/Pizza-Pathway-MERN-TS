import { configureStore } from "@reduxjs/toolkit";
import { miscSlice } from "./reducers/misc";
import { authSlice } from "./reducers/auth";
import { cartSlice } from "./reducers/cart";

export const store = configureStore({
  reducer: {
    [miscSlice.name]: miscSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
