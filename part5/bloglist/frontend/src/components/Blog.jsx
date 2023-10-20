import Togglable from './Togglable'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const { id, title, author, url, likes, user: blogUser } = blog
  const [visibility, setVisibility] = useState(false)
  const hiden = { display: visibility ? 'none' : '' }
  const shown = { display: visibility ? '' : 'none' }



  const toggleVisibility = () => {
    setVisibility(!visibility)
  }
  const handleLike = async () => {
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
  const handleDelete = async () => {
    const blogId = blog.id
    const deleteBlog = window.confirm(`Delete blog "${blog.title} by ${blog.author}?`)
    try{
      if (deleteBlog) {
        await blogService.deleteBlog(id)
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
      }
    } catch(error) {
      console.log('erro no catch de delete', error.message)
    }
  }

  return (
    <div className="blog-container">
      <div>
        <p>{title} - {author} <button onClick={toggleVisibility}>{visibility ? 'hide' : 'view'}</button></p>
      </div>
      <div style={shown} className="blog-details">
        <p>Title: {title}</p>
        <p>Url: <a href={url}>{url}</a></p>
        <p>Likes: {likes} <button onClick={handleLike}>Like</button></p>
        <p>Author: {author}</p>
        {user.username === blogUser.username && (
          <button onClick={handleDelete}>Delete</button>
        )}



      </div>
    </div>
  )

}

export default Blog