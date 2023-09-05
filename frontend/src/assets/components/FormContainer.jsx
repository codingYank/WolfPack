import React from 'react'
import { theme } from '../theme'

const FormContainer = ({ children }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <div style={{border: `1px solid ${theme.palette.accent3.main}`, padding: '40px', borderRadius: '15px'}}>
        {children}
      </div>
    </div>
  )
}

export default FormContainer