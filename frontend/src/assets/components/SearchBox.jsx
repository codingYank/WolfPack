import React, { useState } from 'react'
import { PrimaryTextField } from './textField'
import { Accent3Button } from './button'
import { useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [ keyword, setKeyword ] = useState(urlKeyword || '')

  const onSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}/users`)
    } else {
      navigate('/search')
    }
  }
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '30px' }}>
      <PrimaryTextField 
        label='Search'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Accent3Button type='submit'><SearchIcon /></Accent3Button>
    </form>
  )
}

export default SearchBox