import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { cartSlice } from "./reducers/cart";
import { miscSlice } from "./reducers/misc";
import api from "./api/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
