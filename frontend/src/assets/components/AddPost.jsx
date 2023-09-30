import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Accent3Button } from './button'
import '../styles/addPost.css'
import { useCreatePostMutation } from '../../slices/postApiSlice'
import { toast } from 'react-toastify'

const AddPost = ({ refetch }) => {
  const [content, setContent] = useState('')

  const [createPost, isLoading] = useCreatePostMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const post = {
      content
    }
    
    const result = await createPost(post)
    if(result.error) {
      toast.error(result.error)
    } else {
      toast.success('Posted Successfully')
      refetch()
      setContent('')
    }
  }

  return (
    <div className='add-container add-post-container'>
      <form onSubmit={handleSubmit} className='add-post-form'>
        <label htmlFor='post' className='post-label'>Post</label>
        <textarea placeholder='Say Something' id='post' onChange={(e) => setContent(e.target.value)} value={content} className='post-input' ></textarea>
        <Accent3Button type='submit'>Post</Accent3Button>
      </form>
    </div>
  )
}

export default AddPost