import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <aside>
      <nav>
        <Link to='/'>Feed</Link>
        <Link to='/search'>Search</Link>
      </nav>
    </aside>
  )
}

export default Navbar