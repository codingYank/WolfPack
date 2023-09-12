import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSignedInUserQuery } from '../slices/usersApiSlice'
import { useGetMyPostsQuery } from '../slices/postApiSlice'

const ProfileScreen = () => {

  const {data: user, isLoading, error} = useGetSignedInUserQuery()
  const {data: posts, isLoading: postsLoading, error: postError} = useGetMyPostsQuery()

  console.log(posts)

  return (
    <>
    {isLoading ? (
      <div>Loading</div>
        ) : error ? (
        <div>
          { error?.user?.message || error.error }
        </div>
      ) : (
        <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={user.profilePicture} alt='profile' style={{height: '250px', width: '250px', borderRadius: '999999px'}}></img>
            <div>
              <h1>
                {user.name}
              </h1>
              <h3>
                {user.handle}
              </h3>
              <p>
                {user.description}
              </p>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div>
              Following {user.following.length}
            </div>
            <div>
              Followers {user.followers.length}
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}

export default ProfileScreen