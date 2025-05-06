import React from 'react'
import { Paper } from '@mui/material'


const PostContent = () => {
  return (
    <Paper variant={varient} elevation={0} className='post' sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px', boxShadow: `0 0px 4px 0px ${theme.palette.secondary.main}`}}>
      
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
          <Accent2Button onClick={() => onDelete(post._id)}><DeleteIcon /></Accent2Button>
        ) : (
          null
        )}
      </div>
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
        <p>{post.content}</p>
      </Link>
      <div>
      <Paper variant={varient} elevation={0} className='post quoted-post' sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '10px', borderRadius: '10px', boxShadow: `0 0px 4px 0 ${theme.palette.secondary.main}`}}>
      {post.quoting.parent ? (
        <Link to={`/post/${post.quoting.parent._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
          <h6 style={{margin: 0, marginBottom: '5px'}}>Replying to {post.quoting.parent.user.handle}</h6>
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
                <h3>{post.user.handle}</h3>
              </div>
            </div>
          </Link>
          
        </div>
        <Link to={`/post/${post.quoting._id}`} style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
          <p>{post.quoting.content}</p>
        </Link>
      </Paper>
      </div>
      <div className='post-icons'>
        <Link to={`/post/${post._id}`} className='post-button' style={{textDecoration: 'none'}}>
          <ChatBubbleOutlineIcon sx={{ color: theme.palette.secondary.main}} />
          <span style={{color: theme.palette.secondary.main}}>{post.comments.length}</span>
        </Link>
        <button className='post-button' disabled={repostLoading} onClick={() => setShowOptionModal(true)}>
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

export default PostContent