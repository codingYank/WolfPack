import React, { useState } from 'react'
import FormContainer from '../assets/components/FormContainer'
import { useFormik } from 'formik'
import { PrimaryTextField } from '../assets/components/textField'
import { Box } from '@mui/material'
import { Accent3Button } from '../assets/components/button'

const VerficationScreen = () => {
  const [verficationCode, setVerficationCode] = useState('')

  const onSubmit = (e) => {
    console.log(e)
  }

  const formik = useFormik({
    initialValues: {
      verficationCode
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
        <PrimaryTextField 
          id='verficationCode'
          label="Verfication Code"  
          value={formik.values.verficationCode} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.verficationCode && Boolean(formik.errors.verficationCode)}
          helperText={formik.touched.verficationCode && formik.errors.verficationCode}  
        />
        <Accent3Button type='submit'>Sign In</Accent3Button>
      </Box>
    </FormContainer>
  )
}

export default VerficationScreen