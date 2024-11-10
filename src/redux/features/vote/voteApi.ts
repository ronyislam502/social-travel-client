import { baseApi } from "../../api/baseApi";

const voteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upVotesPost: builder.mutation({
      query: (args) => ({
        url: `/posts/upVotes/${args.id}`,
        method: "POST",
        body: args.data,
      }),
      invalidatesTags: ["post", "vote"],
    }),
    downVotesPost: builder.mutation({
      query: (args) => ({
        url: `/posts/downVotes/${args.id}`,
        method: "POST",
        body: args.data,
      }),
      invalidatesTags: ["post", "vote"],
    }),
  }),
});

export const { useUpVotesPostMutation, useDownVotesPostMutation } = voteApi;
