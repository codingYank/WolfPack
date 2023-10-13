import React, { useEffect, useState } from 'react'
import SearchBox from '../assets/components/SearchBox'
import { useSearchUserMutation } from '../slices/usersApiSlice'
import User from '../assets/components/User'
import Post from '../assets/components/Post'
import { theme } from '../assets/theme'
import { useSearchPostsQuery } from '../slices/postApiSlice'
import { useParams } from 'react-router-dom'


const SearchScreen = () => {
  const keyword = useParams()
   const [users, setUsers] = useState([])
  //  const [posts, setPosts] = useState([])

   const [view, setView] = useState('users')

   const [searchUser, {isLoading: userLoading}] = useSearchUserMutation()

   const [posts, {isLoading: postsLoading}, {error: postError}] = useSearchPostsQuery({keyword})


  console.log(users)
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
          <button className='search-tab' onClick={() => setView('users')}>Users</button>
          <button className='search-tab' onClick={() => setView('posts')}>Posts</button>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {view === 'users' ? (
            <>
              {users.map((user) => (
                <User user={user} key={user._id}/>
              ))}
            </>
          ) : (
            <>
              {posts.map((post) => (
                <Post post={post} key={post._id} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchScreen