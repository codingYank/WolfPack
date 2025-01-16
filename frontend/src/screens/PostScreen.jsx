import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../slices/postApiSlice'
import { Accent1Button, Accent3Button } from '../assets/components/button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { theme } from '../assets/theme';
import { Link } from 'react-router-dom'
import '../assets/styles/post.css'
import Post from '../assets/components/Post';
import AddComment from '../assets/components/AddComment';
import { useSelector } from 'react-redux';

const PostScreen = () => {
  const { id: postId } = useParams()

  const { userInfo } = useSelector((state) => state.auth)

  const {data: post, isLoading, refetch, error} = useGetPostByIdQuery(postId)

  return (
    <>
    {isLoading ? (<h1>Loading</h1>) : error ? (<div>{error?.data?.message || error.error}</div>) : (
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
        <div style={{overflowY: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Post post={post} refetch={refetch} />
          {post.comments.map(comment => (
            <Post post={comment} key={comment._id} refetch={refetch} />
          ))}
        </div>
        {userInfo && userInfo.emailVerified ? (
          <AddComment refetch={refetch} />
        ) : (
          null
        )} 
      </div>
    )}
    </>
  )
}

export default PostScreen