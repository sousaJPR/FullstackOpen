import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ notifyWith, user, setUser, username, setUsername, password, setPassword }) => {

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`Welcome, ${user.username}`)
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
      setTimeout(() => { }, 2000)
    }
  }

  const handleLogout = async () => {

    notifyWith(`Have a nice day, ${user.name}`, 'success')
    setTimeout(() => {}, 5000)
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  let loginHtml

  if (user) {
    loginHtml = (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  } else {
    loginHtml = (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
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
          type="password"
          value={password}
          name="Password"
          required
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    )  
}
  return loginHtml
}

LoginForm.propTypes = {
  notifyWith: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}
export default LoginForm