import Blog from './Blog'
import blogServices from '../services/blogs'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useNotificationDispatch } from '../context/NotificationContext'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

const BlogForm = ({ user }) => {
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  // get all blogs from server and sort them by likes
  const results = useQuery({
    queryKey: ['blogs'],
    queryFn: blogServices.getAll
  })
  const blogs = results.data
  const sortByLikes = (a, b) => b.likes - a.likes

  // mutations (create, update, remove)
  const newBlogMutation = useMutation({
    mutationFn: blogServices.createBlog,
    onSuccess: (blog) => {
      console.log('blog', blog)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.invalidateQueries(['blogs'])
      notify(`Blog ${blog.title} created`, 'success')
    },
    onError: (error) => {
      console.log('erro do newblogmutation:', error)
      notify('Error creating the blog', 'error')
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogServices.updateBlog,
    onSuccess: (blog) => {
      queryClient.invalidateQueries(['blogs'])
      notify(`You liked ${blog.title} by ${blog.author}`, 'success')
    },
    onError: (error) => {
      notify('Error liking the blog', 'error')
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogServices.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      notify('Blog removed', 'success')
    }
  })

  const createBlog = (e, title, author, url) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user
    }
    newBlogMutation.mutate(blogObject)
  }

  const handleLike = async (blog) => {
    const updatedBlog =
      { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog)
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div>
      <div>
        <Togglable buttonLabel='New Blog'>
          <CreateBlog createBlog={createBlog} />
        </Togglable>
      </div>
      <div>
        <h2>List</h2>
        {blogs && blogs.sort(sortByLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleRemove={handleRemove}
            handleLike={handleLike}
            user={user} />
        )}
      </div>
    </div>
  )
}

export default BlogForm