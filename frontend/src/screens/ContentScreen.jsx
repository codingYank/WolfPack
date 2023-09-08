import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FeedScreen from './FeedScreen'
import Navbar from '../assets/components/Navbar'
import SearchScreen from './SearchScreen'
import UserScreen from './UserScreen'
import PostScreen from './PostScreen'

const ContentScreen = () => {
  return (
    <div style={{display: 'flex'}}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <Routes>
          <Route path='/' element={<FeedScreen />} />
          <Route path='/search' element={<SearchScreen />} />
          <Route path='/user/:id' element={<UserScreen />} />
          <Route path='/post/:id' element={<PostScreen />} />
        </Routes>
      </div>
    </div>
  )
}

export default ContentScreen