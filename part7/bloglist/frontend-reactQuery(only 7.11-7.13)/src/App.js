import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'
import { useLogin } from './context/LoginContext'

const App = () => {
  const loginInfo = useLogin()
  const user = loginInfo.loginState.user
 
  console.log('loginState', loginInfo)
  return (
    <div>
      <div>
        <Notifications />
        <LoginForm user={user} />
      </div>
      {user &&
        <div className='blogsPage'>
          <div>
            <h2>Blogs</h2>
            <BlogForm user={user} />

          </div>
        </div>
      }
    </div>
  )
}
export default App