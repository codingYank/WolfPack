import React from 'react'
import { useUpdateUserMutation, useUploadProfilePictureMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { Accent3Button } from '../assets/components/button'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import '../assets/styles/button.css'

const UploadProfilePictureScreen = ({show, setShow, refetch}) => {

  const [uploadProfilePicture, {isloading: loadingUpload}] = useUploadProfilePictureMutation()
  const [updateUser, {isLoading}] = useUpdateUserMutation()

  const dispatch = useDispatch()


  const uploadFileHandler = async (e) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProfilePicture(formData).unwrap()
      const result = await updateUser({profilePicture: res.image}).unwrap()
      dispatch(setCredentials({...result}))
      refetch()
      toast.success(res.message)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const onClose = () => {
    setShow(false)
  }

  if (show) {
    return (
      <div className='modal-screen'>
        <div className='modal-content'>
          <h3 style={{
            marginTop: 0
          }}>Upload Profile Picture</h3>
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <label htmlFor="image" className='accent1btn'>Choose Profile Picture</label>
            <input type='file' id='image' onChange={uploadFileHandler} accept='.jpeg, .jpg, .png, .webp' style={{position: 'absolute', left: '-99999999999px'}}></input>
            <Accent3Button onClick={onClose}>Close</Accent3Button>
          </form>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UploadProfilePictureScreen