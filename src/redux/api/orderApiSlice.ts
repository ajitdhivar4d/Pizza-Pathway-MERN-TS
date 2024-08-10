import api from "./api";

export interface Option {
  type: string;
  price: number;
}

export interface Items {
  categoryName: string;
  name: string;
  img: string;
  option: Option;
  description: string;
  amount: number;
  quantity: number;
}

export interface OrderApiRequest {
  date: Date;
  orderData: Items[];
}

const orderApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation<void, OrderApiRequest>({
      query: (data) => ({
        url: "order/addorder",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrder: build.query<any, void>({
      query: () => "order/myOrderData",
      providesTags: ["Order"],
    }),
  }),
});

export const { useAddOrderMutation, useGetAllOrderQuery } = orderApiSlice;
