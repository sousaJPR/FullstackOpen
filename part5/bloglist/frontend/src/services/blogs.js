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
  console.log('route de post')
  const response = await axios.post(baseUrl, newBlog, config)
  console.log('criado')
  return response.data
}

const likeAdd = async (updateBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('likeAdd')
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('deleteBlog service')
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, createBlog, likeAdd, deleteBlog }