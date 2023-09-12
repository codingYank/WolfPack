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
    getSignedInUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useLoginMutation, useGetSignedInUserQuery } = usersApiSlice
