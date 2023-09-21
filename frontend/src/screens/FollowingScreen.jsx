import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserFollowingByIdQuery } from '../slices/usersApiSlice'
import User from '../assets/components/User'

const FollowingScreen = () => {
  const { id: userId } = useParams()

  const {data, isLoading, error} = useGetUserFollowingByIdQuery(userId)

  console.log(data)


  return (
    <>
    {isLoading ? (
      <h1>Loading</h1>
    ) : (
      <>
        {data.map(user => (
        <User user={user} key={user._id} />
      ))}
      </>
    )}
    </>
  )
}

export default FollowingScreen