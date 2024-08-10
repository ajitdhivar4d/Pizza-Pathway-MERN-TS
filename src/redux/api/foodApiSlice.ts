import api from "./api";

export interface Option {
  type: string;
  price: number;
}

export interface FoodItemDocument {
  categoryName: string;
  name: string;
  img: string;
  options: Option[];
  description: string;
}

export interface FoodApiResponse {
  FoodItems: FoodItemDocument[];
}

const foodApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    allProducts: build.query<FoodApiResponse, void>({
      query: () => "food/data",
      providesTags: ["Food"],
    }),
  }),
});

export const { useAllProductsQuery } = foodApiSlice;
