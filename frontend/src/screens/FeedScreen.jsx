import React from 'react'
import { useGetMyFeedQuery, useGetPostsQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'
import { useSelector } from 'react-redux'
import AddPost from '../assets/components/AddPost'


const FeedScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const { data: posts, isLoading, error } = useGetMyFeedQuery()

  // const { data: posts, isLoading, error } = useGetPostsQuery()
  // const {data: feed, isLoading: feedLoading, error: feedError} = useGetMyFeedQuery()

  // console.log(feed)

  return (
    <>
    <AddPost />
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