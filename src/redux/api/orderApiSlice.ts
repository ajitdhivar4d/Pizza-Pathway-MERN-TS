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
  orderDate: string;
  orderData: Items[];
}
interface AddOrderApiResponse {
  success: boolean;
  message: string;
}

//
interface Order {
  orderDate: string;
  items: Items[];
}

interface OrderData {
  email: string;
  orderData: Order[];
}

interface GetAllOrderApiResponse {
  success: boolean;
  orderData: OrderData;
}

const orderApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation<AddOrderApiResponse, OrderApiRequest>({
      query: (data) => ({
        url: "order/addorder",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrder: build.query<GetAllOrderApiResponse, void>({
      query: () => "order/myorderdata",
    }),
  }),
});

export const { useAddOrderMutation, useGetAllOrderQuery } = orderApiSlice;
