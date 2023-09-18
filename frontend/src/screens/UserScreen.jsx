import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../slices/usersApiSlice'
import { useGetPostsByUserIdQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'

const UserScreen = () => {
  const { id: userId } = useParams()

  const {data: user, isLoading: userLoading, error: userError} = useGetUserByIdQuery(userId)

  const {data: posts, isLoading: postsLoading, error: postError} = useGetPostsByUserIdQuery(userId)

  console.log(posts)
  return (
    <>
    {userLoading || postsLoading ? (
      <div>Loading</div>
        ) : userError || postError ? (
        <div>
          { userError?.user?.message || userError.error || postError?.posts?.message || postError.error }
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

export default UserScreen