import React, { useState } from 'react'
import FormContainer from '../assets/components/FormContainer'
import { useFormik } from 'formik'
import { PrimaryTextField } from '../assets/components/textField'
import { Box } from '@mui/material'
import { Accent3Button } from '../assets/components/button'
import { useVerifyEmailMutation } from '../slices/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useNavigate, useParams } from 'react-router-dom'

const VerificationScreen = () => {
  const [verificationCode, setVerficationCode] = useState('')
  const { id } = useParams()

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    const data = {
      verificationCode: e.verificationCode,
      id
    }
    const result = await verifyEmail(data).unwrap()
    dispatch(setCredentials(result))
    navigate('/')
  }

  const formik = useFormik({
    initialValues: {
      verificationCode
    },
    onSubmit,
    // validationSchema: loginSchema
  })
  return (
    <FormContainer>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}
        style={{textAlign: 'center'}}
      >
        <label htmlFor='verificationCode'>Enter the code sent to your email</label>
        <PrimaryTextField 
          id='verificationCode'
          label="Verification Code"  
          value={formik.values.verificationCode} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.verificationCode && Boolean(formik.errors.verificationCode)}
          helperText={formik.touched.verificationCode && formik.errors.verificationCode}  
        />
        <Accent3Button type='submit'>Sign In</Accent3Button>
      </Box>
    </FormContainer>
  )
}

export default VerificationScreen