import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (userInfo) => ({
        url: "/posts",
        method: "GET",
        body: userInfo,
      }),
      providesTags: ["post"],
    }),
    createPost: builder.mutation({
      query: (userInfo) => ({
        url: "/posts/create-post",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: (args) => ({
        url: `/posts/update/${args.id}`,
        method: "Patch",
        body: args.data,
      }),
      invalidatesTags: ["post"],
    }),
    getPopularPosts: builder.query({
      query: (userInfo) => ({
        url: "/posts/popular-post",
        method: "GET",
        body: userInfo,
      }),
      providesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (args) => ({
        url: `/posts/delete/${args.id}`,
        method: "DELETE",
        body: args.data,
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPopularPostsQuery,
} = postApi;
