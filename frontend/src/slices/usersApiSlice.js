import { UPLOAD_URL, USERS_URL } from "../constants"
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
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
    reqPasswordReset: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/requestPasswordReset`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
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
    searchUsers: builder.query({
      query: ({ keyword }) => ({
        url: `${USERS_URL}/search`,
        params: {
          keyword,
        },
      }),
      providesTags: ["User"],
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
    getUserFollowingById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}/following`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserFollowersById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}/followers`,
      }),
      keepUnusedDataFor: 5,
    }),
    uploadProfilePicture: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useGetSignedInUserQuery,
  useLogoutMutation,
  useRegisterMutation,
  useReqPasswordResetMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserFollowingByIdQuery,
  useGetUserFollowersByIdQuery,
  useSearchUsersQuery,
  useVerifyEmailMutation,
  useUploadProfilePictureMutation,
} = usersApiSlice
