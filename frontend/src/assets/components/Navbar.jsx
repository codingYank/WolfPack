import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import '../styles/navbar.css'
import { Accent3Button } from './button'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <aside className='nav-sidebar'>
      <nav className='nav'>
        <Link to='/myprofile'>
          <div className='nav-profile'>
            <img src={logo} alt='profile' style={{borderRadius: '99999px', width: '100px'}}></img>
            <h3>Name</h3>
            <h4>Handle</h4>
          </div>
        </Link>
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