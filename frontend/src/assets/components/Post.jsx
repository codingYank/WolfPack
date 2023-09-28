import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Accent1Button, Accent3Button } from './button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { theme } from '../theme';
import { Link } from 'react-router-dom'
import '../styles/post.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLikePostMutation, useRepostMutation, useUnLikePostMutation } from '../../slices/postApiSlice';
import { setCredentials } from '../../slices/authSlice';

const Post = ({post, varient}) => {
  console.log(post, post.reposts.length)
  const { userInfo } = useSelector((state) => state.auth)
  const [likePost, isLoading] = useLikePostMutation()
  const [unLikePost, {isLoading: unLikeLoading}] = useUnLikePostMutation()
  const [repost, {isLoading: repostLoading}] = useRepostMutation()

  const [isLiked, setIsLiked] = useState()
  const [likes, setLikes] = useState(post.likes.length)

  const [isReposted, setIsReposted] = useState()
  const [reposts, setReposts] = useState(post.reposts.length)

  useEffect(() => {
    setIsLiked(post.likes.includes(userInfo._id))
    setIsReposted(post.reposts.includes(userInfo._id))
  }, [setIsLiked, userInfo])


  const dispatch = useDispatch()

  const onLike = async (id) => {
    if(!isLiked) {
      setLikes(likes + 1)
    } else {
      setLikes(likes - 1)
    }   
    setIsLiked(!isLiked)
    if(!isLiked) {
      const result = await likePost(id)
      // dispatch(setCredentials(result.data))      
    } else {
      const result = await unLikePost(id)
      // dispatch(setCredentials(result.data))
    }
  }

  const onRepost = async (id) => {
    if(!isReposted) {
      setReposts(reposts + 1)
    } else {
      setReposts(reposts - 1)
    }
    setIsReposted(!isReposted)
    if(!isReposted) {
      await repost(id)
    }
  }

  return (
    <Paper variant={varient} elevation={0} className='post' sx={{ backgroundColor: theme.palette.primary.main, borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px'}}>
      <div className='post-heading'>
        <Link to={`/user/${post.user._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
          <div className='profile-info-container'>
            <img src={post.user.profilePicture} alt='profile'></img>
            <div className='profile-info'>
              <h2>{post.user.name}</h2>
              <h3>{post.user.handle}</h3>
            </div>
          </div>
        </Link>
        {/* Add condition to check if post is by signed in user */}
        {post.user._id === userInfo?._id ? (
          <Accent1Button>Edit</Accent1Button>
        ) : (
         null
        )}
      </div>
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <p>{post.content}</p>
      </Link>
      <div className='post-icons'>
        <Link to={`/post/${post._id}`} className='post-button' style={{textDecoration: 'none'}}>
          <ChatBubbleOutlineIcon sx={{ color: theme.palette.secondary.main}} />
          <span style={{color: theme.palette.secondary.main}}>{post.comments.length}</span>
        </Link>
        <button className='post-button' disabled={repostLoading} onClick={() => onRepost(post._id)}>
          {isReposted ? (
            <>
              <LoopIcon sx={{ color: theme.palette.accent1.main}} />
              <span style={{color: theme.palette.accent1.main}}>{reposts}</span>
            </>
            ) : (
              <>
                <LoopIcon sx={{ color: theme.palette.secondary.main}} />
                <span style={{color: theme.palette.secondary.main}}>{reposts}</span>
              </>
            ) 
          }
        </button>
          
        <button className='post-button' disabled={isLoading && unLikeLoading} onClick={() => onLike(post._id)}>
          {(isLiked) ? (
            <>
              <FavoriteIcon sx={{ color: theme.palette.accent2.main}} />
              <span style={{color: theme.palette.secondary.accent2}}>{likes}</span>
            </>
            ) : (
              <>
              <FavoriteBorderIcon sx={{ color: theme.palette.secondary.main}} />
              <span style={{color: theme.palette.secondary.main}}>{likes}</span>
              </>
            )
          }
        </button>
      </div>
    </Paper>
  )
}

export default Post