import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newObj) =>
    axios.post(baseUrl, newObj).then(res => res.data)

export const voteAnecdote = (anecdote) => 
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
