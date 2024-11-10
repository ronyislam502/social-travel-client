import { baseApi } from "@/src/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: (users) => ({
        url: "/users",
        method: "GET",
        body: users,
      }),
      providesTags: ["user"],
    }),
    subscribe: builder.mutation({
      query: (info) => ({
        url: `/bookings`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useUpdateUserMutation, useSubscribeMutation } = userApi;
