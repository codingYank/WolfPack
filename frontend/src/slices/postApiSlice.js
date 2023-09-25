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
        url: `${POSTS_URL}/myposts`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyFeed: builder.query({
      query: () => ({
        url: `${POSTS_URL}/feed`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getPostsByUserId: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/user/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/like/${id}`,
        method: "POST",
      }),
    }),
    unLikePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/unlike/${id}`,
        method: "POST",
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useGetMyFeedQuery,
  useCreatePostMutation,
  useGetPostsByUserIdQuery,
  useLikePostMutation,
  useUnLikePostMutation,
} = postsApiSlice
