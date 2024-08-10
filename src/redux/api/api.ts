import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["User", "Food", "Order"],
  endpoints: () => ({}),
});

export default api;
