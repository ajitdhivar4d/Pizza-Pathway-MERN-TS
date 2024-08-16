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
  quantity: number;
}

export interface OrderApiRequest {
  date: string;
  orderData: Items[];
}

//
interface OrderApiResponse {
  success: boolean;
  message: string;
}

const orderApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation<OrderApiResponse, OrderApiRequest>({
      query: (data) => ({
        url: "order/addorder",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrder: build.query<any, void>({
      query: () => "order/myorderdata",
    }),
  }),
});

export const { useAddOrderMutation, useGetAllOrderQuery } = orderApiSlice;
