import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../assets/images/logo.jpg'
import '../styles/navbar.css'
import { Accent1Button, Accent3Button } from './button'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { userInfo } = useSelector((state) => state.auth)

  return (
    <aside className='nav-sidebar'>
      <nav className='nav'>
        
            {userInfo ? (
              <Link to='/myprofile'>
                <div className='nav-profile'>
                  <img src={userInfo.profilePicture} alt='profile' style={{borderRadius: '99999px', width: '100px', height: '100px'}}></img>
                  <h3>{userInfo.name}</h3>
                  <h4>{userInfo.handle}</h4>
                </div>
              </Link>
            ) : (
              <Accent1Button>
                <Link to='/login'>Sign In</Link>
              </Accent1Button>
            )}
        <div className='nav-links'>
          <Link to='/'><HomeIcon /> Feed</Link>
          <Link to='/search'><SearchIcon /> Search</Link>
          <Accent3Button style={{marginTop: '10px'}}>Post</Accent3Button>
        </div>
      </nav>
    </aside>
  )
}

export default Navbar