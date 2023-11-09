import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../reducers/usersReducer'
import { getBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

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
        <ul>
            {userBlogs
            ? (
                userBlogs.map(b => 
                    <li key={b.id}>
                        {b.title}
                    </li>)
            ) : (
                ''
            )}
        </ul>
    </div>
  )
}

export default User