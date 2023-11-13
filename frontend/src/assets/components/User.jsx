import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../theme'
import '../styles/user.css'

const User = ({user}) => {
  return (
    <Link to={`/user/${user._id}`} style={{color: theme.palette.secondary.main, textDecoration: 'none'}}>
      <div className='user-card'>
        <img src={user.profilePicture} alt='Profile'></img>
        <div className='user-card-heading'>
          <h3>{user.name}</h3>
          <p>@{user.handle}</p>
        </div>
      </div>
    </Link>
  )
}

export default User