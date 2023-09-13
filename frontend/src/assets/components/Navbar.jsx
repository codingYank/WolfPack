import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import logo from '../../assets/images/logo.jpg'
import '../styles/navbar.css'
import { Accent1Button, Accent2Button, Accent3Button } from './button'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlice'
import { useLogoutMutation } from '../../slices/usersApiSlice';

const Navbar = () => {

  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

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
        {userInfo ? (<Accent2Button onClick={logoutHandler}>Log Out</Accent2Button>) : null}
      </nav>
    </aside>
  )
}

export default Navbar