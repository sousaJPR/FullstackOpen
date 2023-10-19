import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    console.log('Login successful:', response.data)
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error; // Re-throw the error to be caught in the calling function
  }
}

export default { login }