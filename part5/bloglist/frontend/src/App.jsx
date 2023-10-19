import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setSuccessMsg(`Welcome, ${user.name}`)
      setTimeout(() => {
        setSuccessMsg(null)
    }, 5000)
    } catch (exception) {
      if (exception.response) {
        setErrorMsg(exception.response.data.error)
      } else {
        setErrorMsg('Other exception: ', exception.message)
        setTimeout(() => {
          setErrorMsg(null)
      }, 5000)
      }
    }
  }
  const handleLogout = async () => {
    
    setSuccessMsg(`Have a nice day, ${user.name}`)
      setTimeout(() => {
        setSuccessMsg(null)
    }, 5000)
    setUser(null) 
    window.localStorage.removeItem('loggedBlogAppUser')
    
    
  } 

    return (
      <div>
        {!user ? (
          <div>
            <h2>Login</h2>
            <Notifications 
              errorMsg = {errorMsg}
              successMsg={successMsg}/>
            <LoginForm
              user= {user}
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword} 
            />
          </div>
        ) : (
        <div className='blogsPage'>
          <div>
            <h2>Blogs</h2>
            <Notifications 
              errorMsg = {errorMsg}
              successMsg = {successMsg}
            />
            <p>{user.username} logged in || <button onClick={handleLogout}>Logout</button></p>
            <CreateForm 
              user={user}
              blogs={blogs}
              setBlogs={setBlogs}
              setErrorMsg={setErrorMsg}
              setSuccessMsg={setSuccessMsg}/>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>    
        </div>
        )}
      </div>
    )
}
  export default App