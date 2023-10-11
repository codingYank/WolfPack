import { useEffect, useState } from 'react'
import { Accent3Button } from '../assets/components/button'
import { PrimaryTextField } from '../assets/components/textField'
import { ErrorMessage, useFormik } from 'formik'
import '../assets/styles/modal.css'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { updateUserSchema } from '../assets/validation/updateUser'

const UpdateUserScreen = ({show, setShow, user, refetch}) => {
  const [name, setName] = useState(user.name)
  const [handle, setHandle] = useState(user.handle)
  const [description, setDescription] = useState(user.description)

  const [updateUser, {isLoading}] = useUpdateUserMutation()

  const dispatch = useDispatch()

  const onCancel = () => {
    setShow(false)
  }

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const updatedUser = await updateUser(data).unwrap()
      dispatch(setCredentials({...updatedUser}))
      refetch()
      setShow(false)
    } catch(err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name,
      handle,
      description
    },
    onSubmit,
    validationSchema: updateUserSchema
  })

  if (show) {
    return (
      <div className='modal-screen'>
        <div className='modal-content'>
          <form className='update-user-form' onSubmit={formik.handleSubmit}>
            <PrimaryTextField 
              label='Name' 
              name='name' 
              value={formik.values.name} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <PrimaryTextField 
              label='Handle'
              name='handle' 
              value={formik.values.handle} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.handle && Boolean(formik.errors.handle)}
              helperText={formik.touched.handle && formik.errors.handle}
             />
            <PrimaryTextField 
              label='Description' 
              name='description' 
              value={formik.values.description} 
              onChange={formik.handleChange}/>
            <div className='update-user-btns'>
              <Accent3Button onClick={onCancel}>Cancel</Accent3Button>
              <Accent3Button type='submit' disabled={isLoading}>Save</Accent3Button>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UpdateUserScreen