import React from 'react'
import { useSelector } from 'react-redux'
import { useGetSignedInUserQuery } from '../slices/usersApiSlice'
import { useGetMyPostsQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'

const ProfileScreen = () => {

  const {data: user, isLoading, error} = useGetSignedInUserQuery()
  const {data: posts, isLoading: postsLoading, error: postError} = useGetMyPostsQuery()

  console.log(posts)

  return (
    <>
    {isLoading || postsLoading ? (
      <div>Loading</div>
        ) : error || postError ? (
        <div>
          { error?.user?.message || error.error || postError?.posts?.message || postError.error }
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
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      )
    }
    </>
  )
}

export default ProfileScreen