import React, { useState } from 'react'
import { PrimaryTextField } from './textField'
import { Accent3Button } from './button'

const SearchBox = ({setUsers, searchUser, isLoading}) => {
  const [query, setQuery] = useState('')


  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await searchUser({query: query}).unwrap()
    setUsers(res)
    // console.log(res)
  }
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '30px' }}>
      <PrimaryTextField 
        label='Search'
        onChange={(e) => setQuery(e.target.value)}
      />
      <Accent3Button type='submit'>Search</Accent3Button>
    </form>
  )
}

export default SearchBox