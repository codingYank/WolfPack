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
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}> 
          {data.map(user => (
            <User user={user} key={user._id} />
          ))}
        </div>
      </>
    )}
    </>
  )
}

export default FollowersScreen