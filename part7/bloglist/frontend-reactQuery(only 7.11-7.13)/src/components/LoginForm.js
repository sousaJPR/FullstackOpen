import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationDispatch } from '../context/NotificationContext'
import { useLogin } from '../context/LoginContext'

const LoginForm = () => {
  const notify = useNotificationDispatch()
  const loginInfo = useLogin()
  const user = loginInfo.loginState.user
  const { login, logout } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      login(user)
      notify(`Welcome, ${user.username}`, 'success')
      setUsername('')
      setPassword('')
    } catch (error) {
      notify(`Login failed: ${error.response.data.error}`, 'error')
      setUsername('')
      setPassword('')
    }
    
  }

  const handleLogout = async () => {
    notify(`Have a nice day, ${user.name}`, 'success')
    window.localStorage.removeItem('loggedBlogAppUser')
    logout() 
  }

  let loginHtml

  if (user) {
    loginHtml = (
      <div>
        <h2>Profile</h2>
        <p>{user.name} logged in</p>
        <button id='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
    )
  } else {
    loginHtml = (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        Username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          required
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          required
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-btn' type="submit">Login</button>
    </form>
    )  
}
  return loginHtml
}

export default LoginForm