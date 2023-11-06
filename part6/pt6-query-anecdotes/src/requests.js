import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newObj) =>
    axios.post(baseUrl, newObj).then(res => res.data)

export const voteAnecdote = (anecdote) => {
    const anecdoteToVote = anecdote.anecdote
    const id = anecdoteToVote.id
    console.log('anecdote no request: ', anecdoteToVote)
    const updatedAnecdote = {
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes 
        ? anecdoteToVote.votes + 1 
        : 1
    }
    console.log('anecdote no request: ', updatedAnecdote)
    axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return updatedAnecdote
}