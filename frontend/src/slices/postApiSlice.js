import { POSTS_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetPostsQuery } = postsApiSlice
