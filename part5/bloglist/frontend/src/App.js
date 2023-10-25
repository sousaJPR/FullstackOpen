import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, 2000)
  }
  const loginForm = () => (
    <>
      <h2>Login</h2>
      <LoginForm
        notifyWith={notifyWith}
        user={user}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </>

  )

  return (
    <div>
      <div>
      <Notifications
              notification={notification} />
        {loginForm()}
      </div>
      {user &&
        <div className='blogsPage'>
          <div>
            <h2>Blogs</h2>
            <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} user={user} />

          </div>
        </div>
      }
    </div>
  )
}
export default App