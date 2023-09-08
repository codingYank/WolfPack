import React from 'react'
import { useGetPostsQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'

const FeedScreen = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery()

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div>
            {posts.map((post) => (
              <Post key={post._id} post={post} varient='outlined' />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default FeedScreen