import { USERS_URL } from "../constants"
import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getSignedInUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/follow/${id}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/unfollow/${id}`,
        method: "POST",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useGetSignedInUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApiSlice
