import { Paper } from '@mui/material'
import React from 'react'
import { Accent1Button, Accent3Button } from './button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { theme } from '../theme';
import { Link } from 'react-router-dom'
import '../styles/post.css'

const Post = ({post, varient}) => {
  return (
    <Paper variant={varient} elevation={0} className='post' sx={{ backgroundColor: theme.palette.primary.main, borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px'}}>
      <div className='post-heading'>
        <Link to={`user/${post.user._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
          <div className='profile-info-container'>
            <img src={post.user.profilePicture} alt='profile'></img>
            <div className='profile-info'>
              <h2>{post.user.name}</h2>
              <h3>{post.user.handle}</h3>
            </div>
          </div>
        </Link>
        {/* Add condition to check if post is by signed in user */}
        {post.user._id ? (
          <Accent1Button>Edit</Accent1Button>
        ) : (
         null
        )}
      </div>
      <Link to={`post/${post._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <p>{post.content}</p>
      </Link>
      <div className='post-icons'>
        <Link to={`post/${post._id}`}>
          <ChatBubbleOutlineIcon sx={{ color: theme.palette.secondary.main}} />
        </Link>
          {post.user._id === 0 ? (
            <LoopIcon sx={{ color: theme.palette.accent1.main}} />
            ) : (
              <LoopIcon sx={{ color: theme.palette.secondary.main}} />
            ) 
          }
          
          {post.user === 0 ? (
            <FavoriteIcon sx={{ color: theme.palette.accent2.main}} />
            ) : (
            <FavoriteBorderIcon sx={{ color: theme.palette.secondary.main}} />) 
          }
      </div>
    </Paper>
  )
}

export default Post