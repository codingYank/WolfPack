import React, { useEffect } from 'react'
import { useGetMyFeedQuery, useGetPostsQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'
import { useSelector } from 'react-redux'
import AddPost from '../assets/components/AddPost'


const FeedScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const { data: posts, isLoading, refetch, error } = useGetMyFeedQuery()

  useEffect(() => {
    refetch()
  }, [userInfo])

  return (
    <>
    <AddPost refetch={refetch} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div style={{width: '100%', alignItems: 'center', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px 0px'}}>
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