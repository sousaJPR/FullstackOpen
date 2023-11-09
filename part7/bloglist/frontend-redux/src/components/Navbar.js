import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link style={{ padding: 15}} to='/'>Blog List</Link>
      <Link style={{ padding: 15}} to='/createblog'>Create Blog</Link>
      <Link style={{ padding: 15}} to='/users'>Users</Link>
    </div>
  )
}

export default Navbar