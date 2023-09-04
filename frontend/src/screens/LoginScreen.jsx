import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {Accent3Button} from '../assets/components/button'

const LoginScreen = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userName)
    console.log(password)
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
    >
      <TextField id='userName' label="Standard" variant="standard" onChange={(e) => setUserName(e.target.value)} />
      <TextField id="password" label="Standard" variant="standard" onChange={(e) => setPassword(e.target.value)} />
      <Accent3Button >Sign In</Accent3Button>
    </Box>
  )
}

export default LoginScreen