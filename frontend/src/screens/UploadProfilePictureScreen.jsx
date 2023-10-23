import React from 'react'
import { useUpdateUserMutation, useUploadProfilePictureMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { Accent3Button } from '../assets/components/button'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

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
      if (res.status === 200) {
        try {
          const result = await updateUser({profilePicture: res.image}).unwrap()
          dispatch(setCredentials({...result}))
          refetch()
          toast.success(res.message)
        } catch (err) {
          toast.error(err?.data?.message || err.error)
        }
      }
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
          <form>
            <label htmlFor="image">Choose Profile Picture</label>
            <input type='file' id='image' onChange={uploadFileHandler}></input>
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