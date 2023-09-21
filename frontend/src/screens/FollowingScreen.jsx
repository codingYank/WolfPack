import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserFollowingByIdQuery } from '../slices/usersApiSlice'
import User from '../assets/components/User'

const FollowingScreen = () => {
  const { id: userId } = useParams()

  const {data, isLoading, error} = useGetUserFollowingByIdQuery(userId)

  return (
    <>
    {isLoading ? (
      <h1>Loading</h1>
    ) : error ? (
      <div>{error?.data?.message || error.error}</div>
      ) : (
      <>
        <h1>Following</h1>
        {data.map(user => (
        <User user={user} key={user._id} />
      ))}
      </>
    )}
    </>
  )
}

export default FollowingScreen