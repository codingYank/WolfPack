import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '../assets/theme'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { registerUserSchema } from '../assets/validation/authUser'


const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

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
    try {
      const res = await register({ name: e.name, email: e.email, handle: e.handle, password: e.password, confirmPassword: e.confirmPassword}).unwrap()
      dispatch(setCredentials({...res}))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name,
      handle,
      email,
      password,
      confirmPassword
    },
    onSubmit,
    validationSchema: registerUserSchema
  })

  return(
    <FormContainer>
      <Box
        component='form'
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
        onSubmit={formik.handleSubmit}
      >
        <h1>Sign Up</h1>
        <PrimaryTextField 
          id='name' 
          label="Name"  
          value={formik.values.name} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name} 
        />
        <PrimaryTextField 
          id='email' 
          label="Email" 
          type='email'  
          value={formik.values.email} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email} 
        />
        <PrimaryTextField 
          id='handle' 
          label="Handle"  
          value={formik.values.handle} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.handle && Boolean(formik.errors.handle)}
          helperText={formik.touched.handle && formik.errors.handle} 
        />
        <PrimaryTextField 
          id='password' 
          label="Password" 
          type='password'  
          value={formik.values.password} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} 
        />
        <PrimaryTextField 
          id='confirmPassword' 
          label="Confirm Password" 
          type='password'  
          value={formik.values.confirmPassword} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} 
        />
        <Accent3Button type='submit' disabled={isLoading}>Register</Accent3Button>
        <Link to={'/login'} style={{ color: theme.palette.secondary.main }}>Sign into existing account</Link>
      </Box>
    </FormContainer>
  )
}

export default RegisterScreen