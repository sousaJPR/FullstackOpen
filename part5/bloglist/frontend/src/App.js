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
      blogs.sort((a, b) => b.likes - a.likes)
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
  /*
  const handleLogout = async () => {

    setSuccessMsg(`Have a nice day, ${user.name}`)
    setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')


  }
  const addBlog = async (blogObject) => {
    try {
      console.log('começar')
      const returnedBlog = await blogService.createBlog(blogObject)
      console.log('guardado')
      setSuccessMsg(`New blog "${blogObject.title}" by ${blogObject.author} created!`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
      console.log('estado atualizado')
    } catch (error) {
      setErrorMsg('Error creating a new note')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }
  // Forms
  
  )
  const createForm = () => (
    <Togglable buttonLabel='New Blog'>
      <CreateForm
        createBlog={addBlog} />
    </Togglable>
  )

  // Blogs List and Functions


  const handleLike = async (blog) => {
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const updateBlog =
      { ...blog, likes: newLikes }
    console.log('updateblog: ', updateBlog)
    try {
      const updatedBlog = await blogService.likeAdd(updateBlog)
      console.log('blog depois:', updatedBlog)
      setBlogs(blogs.map((blog) => blog.id === updateBlog.id ? updateBlog : blog))
    } catch (error) {
      console.log('Erro no handleLike', error.message)
    }
  }
  const handleDelete = async (blog) => {
    const deleteBlog = window.confirm(`Delete blog "${blog.title} by ${blog.author}?`)
    try {
      if (deleteBlog) {
        await blogService.deleteBlog(blog.id)
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
      }
    } catch (error) {
      console.log('erro no catch de delete', error.message)
    }
  }
  const toggleBlogVisibility = (blogId) => {
    setBlogVisibility((prevVisibility) => ({
      ...prevVisibility,
      [blogId]: !prevVisibility[blogId]
    }))
  }
  const blogList = () => {
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            isVisible={blogVisibility[blog.id]}
            toggleVisibility={() => toggleBlogVisibility(blog.id)}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
      </div>

    )

  }
  
 */

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