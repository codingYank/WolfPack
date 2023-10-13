import React, { useState } from 'react'
import { PrimaryTextField } from './textField'
import { Accent3Button } from './button'

const SearchBox = ({setUsers, searchUser, userLoading, setPosts, searchPosts, postLoading}) => {
  const [query, setQuery] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault()
    const userRes = await searchUser({query}).unwrap()
    setUsers(userRes)
    const postRes = await searchPosts({query}).unwrap()
    setPosts(postRes)
  }
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '30px' }}>
      <PrimaryTextField 
        label='Search'
        onChange={(e) => setQuery(e.target.value)}
      />
      <Accent3Button type='submit' disabled={userLoading || postLoading}>Search</Accent3Button>
    </form>
  )
}

export default SearchBox