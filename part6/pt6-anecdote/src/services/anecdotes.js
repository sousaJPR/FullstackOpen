import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = { content: content, votes: 0}
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const updateItem = async (obj) => {
    console.log('cheguei ao service', obj)
    const id = obj.id
    const response = await axios.put(`${baseUrl}/${id}`, obj)
    console.log('response: ', response.data)
    return response.data
} 

export default { getAll, createNew, updateItem }