import { Paper } from '@mui/material'
import React from 'react'
import { Accent1Button, Accent3Button } from './button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { theme } from '../theme';
import '../styles/post.css'

const Post = ({ image, name, handle, myPost, content, repost, liked }) => {
  return (
    <Paper variant='outlined' sx={{ backgroundColor: theme.palette.primary.main, borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main, padding: '10px', maxWidth: '500px', borderRadius: '10px'}}>
      <div className='post-heading'>
        <div className='profile-info-container'>
          <img src={image} alt='profile'></img>
          <div className='profile-info'>
            <h2>{name}</h2>
            <h3>{handle}</h3>
          </div>
        </div>
        {myPost ? (
          <Accent1Button>Edit</Accent1Button>
        ) : (
         null
        )}
      </div>
      <p>{content}</p>
      <div className='post-icons'>
          <ChatBubbleOutlineIcon sx={{ color: theme.palette.secondary.main}} />
          {repost ? (
            <LoopIcon sx={{ color: theme.palette.accent1.main}} />
            ) : (
              <LoopIcon sx={{ color: theme.palette.secondary.main}} />
            ) 
          }
          
          {liked ? (
            <FavoriteIcon sx={{ color: theme.palette.accent2.main}} />
            ) : (
            <FavoriteBorderIcon sx={{ color: theme.palette.secondary.main}} />) 
          }
      </div>
    </Paper>
  )
}

export default Post