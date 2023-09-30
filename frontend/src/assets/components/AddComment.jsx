import React, { useState } from 'react'
import { Accent3Button } from './button'
import '../styles/addPost.css'
import { toast } from 'react-toastify'
import { useCreateCommentMutation } from '../../slices/postApiSlice'
import { useParams } from 'react-router-dom'


const AddComment = ({refetch}) => {
  const { id: postId } = useParams()

  const [content, setContent] = useState('')

  const [createComment, isLoading] = useCreateCommentMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const post = {
      _id: postId,
      content
    }
    
    const result = await createComment(post)
    if(result.error) {
      toast.error(result.error)
    } else {
      toast.success('Posted Successfully')
      refetch()
      setContent('')
    }
  }

  return (
    <div className='add-post-container'>
      <form onSubmit={handleSubmit} className='add-post-form'>
        <label htmlFor='post' className='post-label'>Post</label>
        <textarea placeholder='Say Something' id='post' onChange={(e) => setContent(e.target.value)} value={content} className='post-input' ></textarea>
        <Accent3Button type='submit'>Post</Accent3Button>
      </form>
    </div>
  )
}

export default AddComment