import Blog from './Blog'
import blogServices from '../services/blogs'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'

const BlogForm = ({ blogs, setBlogs, notifyWith, user }) => {

  const addBlog = (e, title, author, url) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }
    blogServices.createBlog(blogObject).then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog)))

    notifyWith('New Blog created!', 'success')
  }

  const createBlog = () => (
    <Togglable buttonLabel='New Blog'>
      <CreateBlog addBlog={addBlog} />
    </Togglable>
  )

  const handleLike = async (blog) => {
    const newLikes = blog.likes ? blog.likes + 1 : 1
    const updateBlog =
      { ...blog, likes: newLikes }
    console.log('updateblog: ', updateBlog)
    try {
      const updatedBlog = await blogServices.updateBlog(blog.id, updateBlog)
      console.log('blog depois:', updatedBlog)
      notifyWith(`You liked ${blog.title} by ${blog.author}`)
      setBlogs(blogs.map((blog) => blog.id === updateBlog.id ? updateBlog : blog))
    } catch (error) {
      console.log('Erro no handleLike', error.message)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      await blogServices.removeBlog(blog.id)
    
      let blogs = await blogServices.getAll()
      
      setBlogs(blogs)
    }
  }
  
  
  
  return (
    <div>
      <div>
        {createBlog()}
      </div>
      <div>
        <h2>List</h2>
        {blogs  &&  blogs.map(blog => 
          <Blog 
            key={blog.id}
            blog={blog}
            handleRemove={handleRemove}
            handleLike={handleLike} 
            user={user}/>
        )}
      </div>
    </div>
  )
}

export default BlogForm