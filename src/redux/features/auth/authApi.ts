import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/logIn",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signUp",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLogInMutation, useSignUpMutation } = authApi;
