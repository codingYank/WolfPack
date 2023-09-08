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

const PostScreen = () => {
  const { id: postId } = useParams()

  const {data: post, isLoading, error} = useGetPostByIdQuery(postId)

  return (
    <>
    {isLoading ? (<h1>Loading</h1>) : error ? (<div>{error?.data?.message || error.error}</div>) : (
      <>
        <Post post={post} />
        {post.comments.map(comment => (
          <Post post={comment} key={comment._id} />
        ))}
      </>
    )}
    </>
  )
}

export default PostScreen