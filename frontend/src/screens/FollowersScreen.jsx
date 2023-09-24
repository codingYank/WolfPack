import React from 'react'
import { useGetUserFollowersByIdQuery } from '../slices/usersApiSlice'
import { useParams } from 'react-router-dom'
import User from '../assets/components/User'

const FollowersScreen = () => {
  const { id: userId } = useParams()

  const {data, isLoading, error} = useGetUserFollowersByIdQuery(userId)

  return (
    <>
    {isLoading ? (
      <h1>Loading</h1>
    ) : error ? (
      <div>{error?.data?.message || error.error}</div>
      ) : (
      <>
        <h1>Followers</h1>
        {data.map(user => (
        <User user={user} key={user._id} />
      ))}
      </>
    )}
    </>
  )
}

export default FollowersScreen