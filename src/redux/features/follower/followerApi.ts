import { baseApi } from "../../api/baseApi";

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (follow) => ({
        url: "/follow",
        method: "POST",
        body: follow,
      }),
      invalidatesTags: ["follower"],
    }),
    getFollowers: builder.query({
      query: (followers) => ({
        url: "/followers",
        method: "GET",
        body: followers,
      }),
      providesTags: ["follower"],
    }),
    getFollowings: builder.query({
      query: (followings) => ({
        url: "/followings",
        method: "GET",
        body: followings,
      }),
      providesTags: ["follower"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useGetFollowingsQuery,
  useGetFollowersQuery,
} = followerApi;
