import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFollowUserMutation, useGetUserByIdQuery, useUnfollowUserMutation } from '../slices/usersApiSlice'
import { useGetPostsByUserIdQuery } from '../slices/postApiSlice'
import Post from '../assets/components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { Accent3Button } from '../assets/components/button'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { theme } from '../assets/theme'
import UpdateUserScreen from './UpdateUserScreen'
import UploadProfilePictureScreen from './UploadProfilePictureScreen'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import '../assets/styles/userScreen.css'


const UserScreen = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const { id: userId } = useParams()

  const { userInfo } = useSelector((state) => state.auth)

  const {data: user, isLoading: userLoading, refetch, error: userError} = useGetUserByIdQuery(userId)

  const {data: posts, isLoading: postsLoading, error: postError} = useGetPostsByUserIdQuery(userId)

  const [followUser, isLoading] = useFollowUserMutation()

  const [unfollowUser, {isLoading: unfollowLoading}] = useUnfollowUserMutation()


  const dispatch = useDispatch()

  const handleEdit = () => {
    setShowEdit(true)
  }

  const handleUpload = () => {
    setShowUpload(true)
  }

  const handleUnfollow = async (id) => {
    try {
      const result = await unfollowUser(id).unwrap()
      console.log(result)
      dispatch(setCredentials({...result}))
      refetch()
      // toast.success('Unfollowed Successfully')
    } catch (err) {
      toast.error(err?.data?.massage || err.error)
    }
  }

  const handleFollow = async (id) => {
    try {
      const result = await followUser(id).unwrap()
      dispatch(setCredentials(result))
      refetch()
      // toast.success('Followed Successfully')
    } catch (err) {
      toast.error(err?.data?.massage || err.error)
    }
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
    {showEdit ? (
      <UpdateUserScreen show={showEdit} setShow={setShowEdit} user={user} refetch={refetch} />
    ) : null}
    {showUpload ? (
      <UploadProfilePictureScreen show={showUpload} setShow={setShowUpload} refetch={refetch} />
    ) : null}
    {userLoading || postsLoading ? (
      <div>Loading</div>
        ) : userError || postError ? (
        <div>
          { userError?.user?.message || userError.error || postError?.posts?.message || postError.error }
        </div>
      ) : (
        <div>
          <div className='user-heading-container'>
            <div className='user-heading-top'>
              <div className='user-profile-image'>
                <img src={user.profilePicture} alt='profile'></img>
                {userInfo ? userId === userInfo._id ? (
                  <Accent3Button onClick={handleUpload}><PhotoCameraIcon /></Accent3Button>
                ) : (null) : (null)}
              </div>
              {userInfo ? userId === userInfo._id ? (
                <Accent3Button type='button' onClick={handleEdit}>Edit Profile</Accent3Button>
              ) : userInfo.following.includes(userId) ? (
                <Accent3Button type='button' onClick={() => handleUnfollow(userId)}>Following</Accent3Button>
              ) : (
                <Accent3Button type='button' onClick={() => handleFollow(userId)}>Follow</Accent3Button>
              ) : (null)}
            </div>
            <div className='user-details'>
              <h1>
                {user.name}
              </h1>
              <h3>
                {user.handle}
              </h3>
              <p>
                {user.description}
              </p>
            </div>
            
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '15px'}}>
            <Link to='following' style={{color: theme.palette.secondary.main, textDecoration: 'none'}}>
              Following {user.following.length}
            </Link>
            <Link to='followers' style={{color: theme.palette.secondary.main, textDecoration: 'none'}}>
              Followers {user.followers.length}
            </Link>
          </div>
          <div className='profile-posts'>
            {posts.map((post) => (
              <Post post={post} key={post._id} varient='outlined' />
            ))}
          </div>
        </div>
      )
    }
    </>
  )
}

export default UserScreen