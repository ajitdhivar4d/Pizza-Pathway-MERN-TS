import api from "./api";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export interface UserApiResponse {
  success: boolean;
  user?: UserProfile;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

const userApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<UserApiResponse, RegisterRequest>({
      query: (data) => ({
        url: `user/newuser`,
        method: "POST",
        body: data,
      }),
    }),
    login: build.mutation<UserApiResponse, LoginRequest>({
      query: (data) => ({
        url: `user/loginuser`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = userApiSlice;
