import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = ({ user, blogs, setBlogs, setErrorMsg, setSuccessMsg }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const createBlog = async (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: user.name,
      url: url
    }
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
  return (
    <form className="createForm" onSubmit={createBlog}>
      <h2>Create Form</h2>
      <p>
                title:  <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
                author: <input
          type="text"
          value={user.name}
          onChange={(e) => setAuthor(e.target.value)}/>
      </p>
      <p>
                url:    <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)} />
      </p>
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateForm