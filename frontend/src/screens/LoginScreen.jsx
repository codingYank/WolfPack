import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { theme } from '../assets/theme'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userName)
    // console.log(password)
  }

  return (
    <FormContainer>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
      >
        <h1 >Log In</h1>
        <PrimaryTextField id='userName' label="Email or Handle"  onChange={(e) => setUserName(e.target.value)} />
        <PrimaryTextField id="password" label="Password" type='password' onChange={(e) => setPassword(e.target.value)} />
        <Accent3Button type='submit'>Sign In</Accent3Button>
        <Link to={'/register'} style={{ color: theme.palette.secondary.main }}>Don't have an account?</Link>
      </Box>
    </FormContainer>
  )
}

export default LoginScreen