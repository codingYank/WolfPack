import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Accent2Button, Accent3Button } from './button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '../theme';
import { Link } from 'react-router-dom'
import '../styles/post.css'
import { useDispatch, useSelector } from 'react-redux';
import { useDeletePostMutation, useLikePostMutation, useRepostMutation, useUnLikePostMutation, useUnRepostMutation } from '../../slices/postApiSlice';
import { setCredentials } from '../../slices/authSlice';

const Post = ({post, varient, refetch}) => {
  const { userInfo } = useSelector((state) => state.auth)
  const [likePost, isLoading] = useLikePostMutation()
  const [unLikePost, {isLoading: unLikeLoading}] = useUnLikePostMutation()
  const [repost, {isLoading: repostLoading}] = useRepostMutation()
  const [unRepost, {isLoading: unRepostLoading}] = useUnRepostMutation()
  const [deletePost, {isLoading: deleteLoading}] = useDeletePostMutation()

  const [isLiked, setIsLiked] = useState()
  const [likes, setLikes] = useState()

  const [isReposted, setIsReposted] = useState()
  const [reposts, setReposts] = useState()

  useEffect(() => {
    if (post.quoting) {
      setIsLiked(post.quoting.likes.includes(userInfo?._id))
      setLikes(post.quoting.likes.length)
      setIsReposted(post.quoting.reposts.includes(userInfo?._id))
      setReposts(post.quoting.reposts.length)
    } else {
      setIsLiked(post.likes.includes(userInfo?._id))
      setLikes(post.likes.length)
      setIsReposted(post.reposts.includes(userInfo?._id))
      setReposts(post.reposts.length)
    }
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
    } else {
      await unRepost(id)
    }
  }

  const onDelete = async (id) => {
    console.log('delete', id)
    deletePost(id)
    refetch()
  }

  if (post.repostedBy) {
    return (
      <Paper variant={varient} elevation={0} className='post' sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px', boxShadow: `0 0px 4px 0 ${theme.palette.secondary.main}`}}>
        {post.quoting.parent ? (
          <Link to={`/post/${post.quoting.parent._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
            <h6 style={{margin: 0, marginBottom: '5px'}}>Replying to @{post.quoting.parent.user.handle}</h6>
          </Link>
        ) : (
          null
        )}
        <Link to={`/user/${post.repostedBy._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
          <h6 style={{margin: 0, marginBottom: '5px'}}>Reposted by {post.repostedBy.name}</h6>
        </Link>
          <div className='post-heading'>
            <Link to={`/user/${post.user._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
              <div className='profile-info-container'>
                <img src={post.user.profilePicture} alt='profile'></img>
                <div className='profile-info'>
                  <h2>{post.user.name}</h2>
                  <h3>@{post.user.handle}</h3>
                </div>
              </div>
            </Link>
            {/* Add condition to check if post is by signed in user */}
            {post.user._id === userInfo?._id ? (
              <Accent2Button onClick={() => onDelete(post._id)}><DeleteIcon /></Accent2Button>
            ) : (
            null
            )}
          </div>
          <Link to={`/post/${post.quoting._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
            <p>{post.quoting.content}</p>
          </Link>
          <div className='post-icons'>
            <Link to={`/post/${post._id}`} className='post-button' style={{textDecoration: 'none'}}>
              <ChatBubbleOutlineIcon sx={{ color: theme.palette.secondary.main}} />
              <span style={{color: theme.palette.secondary.main}}>{post.quoting.comments.length}</span>
            </Link>
            <button className='post-button' disabled={repostLoading} onClick={() => onRepost(post.quoting._id)}>
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
              
            <button className='post-button' disabled={isLoading && unLikeLoading} onClick={() => onLike(post.quoting._id)}>
              {(isLiked) ? (
                <>
                  <FavoriteIcon sx={{ color: theme.palette.accent2.main}} />
                  <span style={{color: theme.palette.accent2.main}}>{likes}</span>
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
  } else {
    return (
      <Paper variant={varient} elevation={0} className='post' sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px', boxShadow: `0 0px 4px 0px ${theme.palette.secondary.main}`}}>
        {post.parent ? (
          <Link to={`/post/${post.parent._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
            <h6 style={{margin: 0, marginBottom: '5px'}}>Replying to @{post.parent.user.handle}</h6>
          </Link>
        ) : (
          null
        )}
        <div className='post-heading'>
          <Link to={`/user/${post.user._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
            <div className='profile-info-container'>
              <img src={post.user.profilePicture} alt='profile'></img>
              <div className='profile-info'>
                <h2>{post.user.name}</h2>
                <h3>@{post.user.handle}</h3>
              </div>
            </div>
          </Link>
          {/* Add condition to check if post is by signed in user */}
          {post.user._id === userInfo?._id ? (
            <Accent2Button onClick={() => onDelete(post._id)}><DeleteIcon /></Accent2Button>
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
                <span style={{color: theme.palette.accent2.main}}>{likes}</span>
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
}

export default Post