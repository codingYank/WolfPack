import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FeedScreen from './FeedScreen'
import Navbar from '../assets/components/Navbar'
import SearchScreen from './SearchScreen'

const ContentScreen = () => {
  return (
    <div style={{display: 'flex'}}>
      <Navbar />
      <Routes>
        <Route path='/' element={<FeedScreen />} />
        <Route path='/search' element={<SearchScreen />} />
      </Routes>
    </div>
  )
}

export default ContentScreen