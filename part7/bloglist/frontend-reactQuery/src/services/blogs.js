import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const createBlog = async newBlog  => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  console.log('response:', response.data)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('deleteBlog service')
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog }