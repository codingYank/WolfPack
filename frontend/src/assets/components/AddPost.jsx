import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Accent3Button } from './button'
import '../styles/addPost.css'

const AddPost = () => {
  const [post, setPost] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(post)
  }

  return (
    <div className='add-post-container'>
      <form onSubmit={handleSubmit} className='add-post-form'>
        <label htmlFor='post' className='post-label'>Post</label>
        <textarea placeholder='Say Something' id='post' onChange={(e) => setPost(e.target.value)} className='post-input' ></textarea>
        <Accent3Button type='submit'>Post</Accent3Button>
      </form>
    </div>
  )
}

export default AddPost