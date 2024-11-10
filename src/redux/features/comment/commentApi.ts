import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (comment) => ({
        url: "/comments/create-comment",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["comment"],
    }),
    getAllCommentsPost: builder.query({
      query: (comment) => ({
        url: "/comments",
        method: "GET",
        body: comment,
      }),
      providesTags: ["comment"],
    }),
    updateComment: builder.mutation({
      query: (args) => ({
        url: `/comments/update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation({
      query: (args) => ({
        url: `/comments/delete/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentsPostQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
