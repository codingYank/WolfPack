import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

const AuthScreen = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Routes>
    </>
  )
}

export default AuthScreen