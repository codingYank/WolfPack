import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Accent3Button } from './button'

const AddPost = () => {
  const [post, setPost] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(post)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='post'>Post</label>
        <textarea placeholder='Say Something' id='post' onChange={(e) => setPost(e.target.value)}></textarea>
        <Accent3Button type='submit'>Post</Accent3Button>
      </form>
    </div>
  )
}

export default AddPost