import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { theme } from '../assets/theme'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { loginSchema } from '../assets/validation/authUser'

const LoginScreen = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect')  || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      let email = userName
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      userName,
      password
    },
    onSubmit,
    validationSchema: loginSchema
  })

  return (
    <FormContainer>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
      >
        <h1 >Log In</h1>
        <PrimaryTextField 
          id='userName'
          label="Email or Handle"  
          value={formik.values.password} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}  
        />
        <PrimaryTextField 
          id="password" 
          label="Password" 
          type='password' 
          value={formik.values.password} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} 
        />
        <Accent3Button type='submit' disabled={isLoading}>Sign In</Accent3Button>
        <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: theme.palette.secondary.main }}>Don't have an account?</Link>
      </Box>
    </FormContainer>
  )
}

export default LoginScreen