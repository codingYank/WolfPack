import React, { useState } from 'react'
import SearchBox from '../assets/components/SearchBox'
import { useSearchUserMutation } from '../slices/usersApiSlice'
import User from '../assets/components/User'

const SearchScreen = () => {
   const [users, setUsers] = useState([])

   const [searchUser, {isLoading}] = useSearchUserMutation()

  console.log(users)
  return (
    <div>
      <SearchBox setUsers={setUsers} searchUser={searchUser} isLoading={isLoading}/>
      {users.map((user) => (
        <User user={user} key={user._id}/>
      ))}
    </div>
  )
}

export default SearchScreen