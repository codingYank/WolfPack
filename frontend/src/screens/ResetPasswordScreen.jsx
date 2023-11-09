import React, { useState } from 'react'
import Box from '@mui/material/Box'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { useFormik } from 'formik'
import { passwordResetSchema } from '../assets/validation/updateUser'
import { useResetPasswordMutation } from '../slices/usersApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassowrd] = useState('')

  const { id, code } = useParams()

  const navigate = useNavigate()

  const [resetPassword, {isLoading}] = useResetPasswordMutation()

  const onSubmit = (e) => {
    let data = {
      password: e.password,
      confirmPassword: e.confirmPassword,
      id,
      code
    }
    console.log(data)
    try {
      resetPassword(data)
      navigate('/login')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      password,
      confirmPassword
    },
    onSubmit,
    validationSchema: passwordResetSchema
  })

  return (
    <FormContainer>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
      >
        <h1 >Reset Password</h1>
        <PrimaryTextField 
          id='password'
          label="password"  
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
        <Accent3Button type='submit' disabled={isLoading}>Submit</Accent3Button>
      </Box>
    </FormContainer>
  )
}

export default ResetPasswordScreen