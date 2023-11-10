import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../reducers/usersReducer'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
    const { userId } = useParams()
    console.log('userid: ', userId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo(userId))
    },[]) 


    const userInfo = useSelector(state => state.users)
    console.log('user info no painel de user', userInfo)
    const userBlogs = userInfo.blogs
    console.log('userblogs: ', userBlogs)

  return (
    <div>
        <h2>{userInfo.name}</h2>
        <ListGroup>
            {userBlogs
            ? (
                userBlogs.map(b => 
                    <ListGroup.Item key={b.id}>
                        <Link to={`/blogs/${b.id}`}>{b.title}</Link>
                    </ListGroup.Item>)
            ) : (
                ''
            )}
        </ListGroup>
    </div>
  )
}

export default User