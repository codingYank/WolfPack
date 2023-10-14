import React, { useEffect, useState } from 'react'
import SearchBox from '../assets/components/SearchBox'
import User from '../assets/components/User'
import Post from '../assets/components/Post'
import { theme } from '../assets/theme'
import { useSearchPostsQuery } from '../slices/postApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchUsersQuery } from '../slices/usersApiSlice'


const SearchScreen = () => {
  const {keyword, page} = useParams()
  console.log(keyword)
  const navigate = useNavigate()

   const [view, setView] = useState('users')

  //  const [searchUser, {isLoading: userLoading}] = useSearchUserMutation()
  const {data: users, isLoading: usersLoading, refetch: refetchUsers, error: usersError} = useSearchUsersQuery({keyword})

   const {data: posts, isLoading: postsLoading, refetch: refetchPosts, error: postError} = useSearchPostsQuery({keyword})

   useEffect(() => {
    refetchPosts(keyword)
    refetchUsers(keyword)
   }, [refetchPosts, refetchUsers, keyword])

  console.log(users)

  const showUsers = () => {
    navigate(`/search/${keyword}/users`)
    console.log(keyword)
  }

  const showPosts = () => {
    navigate(`/search/${keyword}/posts`)
  }
  
  return (
    <>
      <SearchBox 
        // setUsers={setUsers} 
        // searchUser={searchUser} 
        // userLoading={userLoading}
        // setPosts={setPosts}
        // searchPosts={searchPosts}
        // postLoading={postLoading}
      />
      <div>
        <div style={{borderBottom: `1px solid ${theme.palette.secondary.main}`, marginBottom: '15px'}}>
          <button className='search-tab' onClick={showUsers}>Users</button>
          <button className='search-tab' onClick={showPosts}>Posts</button>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {usersLoading || postsLoading ? (
            <h3>Loading</h3>
            ) : page === 'users' ? (
            <>
              {users.map((user) => (
                <User user={user} key={user._id}/>
              ))}
            </>
          ) : page === 'posts' ? (
            <>
              {posts.map((post) => (
                <Post post={post} key={post._id} />
              ))}
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </>
  )
}

export default SearchScreen