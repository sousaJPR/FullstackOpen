import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {
        setLoading(false)
      })
  }, [])

  const userList = useSelector((state) => state.users);
  console.log('userlist:', userList)



  // waiting for userList data
  if (loading) return <p>Loading...</p>

  return (
    <div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
            <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {userList
              ? (userList.map(user =>
              (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              ))) : (
                ''
              )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
  

export default Users