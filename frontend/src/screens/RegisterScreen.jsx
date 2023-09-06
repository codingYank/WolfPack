import React, { useState } from 'react'
import Box from '@mui/material/Box'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { Link } from 'react-router-dom'
import { theme } from '../assets/theme'


const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return(
    <FormContainer>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
      >
        <h1>Sign Up</h1>
        <PrimaryTextField id='name' label="Name"  onChange={(e) => setName(e.target.value)} />
        <PrimaryTextField id='email' label="Email" type='email'  onChange={(e) => setEmail(e.target.value)} />
        <PrimaryTextField id='handle' label="Handle"  onChange={(e) => setHandle(e.target.value)} />
        <PrimaryTextField id='password' label="Password" type='password'  onChange={(e) => setPassword(e.target.value)} />
        <PrimaryTextField id='confirmPassword' label="Confirm Password" type='password'  onChange={(e) => setConfirmPassword(e.target.value)} />
        <Accent3Button type='submit'>Register</Accent3Button>
        <Link to={'/login'} style={{ color: theme.palette.secondary.main }}>Already have an account?</Link>
      </Box>
    </FormContainer>
  )
}

export default RegisterScreen