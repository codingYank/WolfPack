import React from 'react'
import SearchBox from '../assets/components/SearchBox'
import User from '../assets/components/User'
import Post from '../assets/components/Post'
import { theme } from '../assets/theme'
import { useSearchPostsQuery } from '../slices/postApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchUsersQuery } from '../slices/usersApiSlice'


const SearchScreen = () => {
  const {keyword, page} = useParams()
  
  const navigate = useNavigate()

  const {data: users, isLoading: usersLoading, error: usersError} = useSearchUsersQuery({keyword})

   const {data: posts, isLoading: postsLoading, error: postError} = useSearchPostsQuery({keyword})


  const showUsers = () => {
    navigate(`/search/${keyword}/users`)
    console.log(keyword)
  }

  const showPosts = () => {
    navigate(`/search/${keyword}/posts`)
  }
  
  return (
    <>
      <SearchBox />
      {keyword ? (
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
      ) : (
        null
      )}
    </>
  )
}

export default SearchScreen