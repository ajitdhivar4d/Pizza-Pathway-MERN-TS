import { ApiResponse } from "../../types/type";
import api from "./api";

const foodApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    allProducts: build.query<ApiResponse, void>({
      query: () => "food/data",
      providesTags: ["Food"],
    }),
  }),
});

export const { useAllProductsQuery } = foodApiSlice;
