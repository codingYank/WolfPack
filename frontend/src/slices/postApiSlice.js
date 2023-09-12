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
    getPostById: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/userposts`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetPostsQuery, useGetPostByIdQuery, useGetMyPostsQuery } =
  postsApiSlice
