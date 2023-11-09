import React, { useState } from 'react'
import Box from '@mui/material/Box'
import {Accent3Button} from '../assets/components/button'
import FormContainer from '../assets/components/FormContainer'
import { PrimaryTextField } from '../assets/components/textField'
import { useFormik } from 'formik'
import { useReqPasswordResetMutation } from '../slices/usersApiSlice'
import { reqPasswordResetSchema } from '../assets/validation/updateUser'
import { toast } from 'react-toastify'

const ReqResetPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const onSubmit = (e) => {
    console.log(e)
    try {
      reqPasswordReset(e)
      toast.success('Email sent')
    } catch(err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const [reqPasswordReset, {isLoading}] = useReqPasswordResetMutation()

  const formik = useFormik({
    initialValues: {
      email
    },
    onSubmit,
    validationSchema: reqPasswordResetSchema
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
          id='email'
          label="Email"  
          value={formik.values.email} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}  
        />
        <Accent3Button type='submit' disabled={isLoading}>Send</Accent3Button>
      </Box>
    </FormContainer>
  )
}

export default ReqResetPasswordScreen