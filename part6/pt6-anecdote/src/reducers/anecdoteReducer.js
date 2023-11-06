import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteItem(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes ? anecdoteToVote.votes + 1 : 1
      }
      return state.map( a => a.id !== id ? a : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (obj) => {
  return async dispatch => {
    const newObj = { ...obj, votes: obj.votes ? obj.votes + 1 : 1 }
    const updatedAnecdote = await anecdoteService.updateItem(newObj)
    dispatch(voteItem(updatedAnecdote))
  }
}


export const { setAnecdotes, appendAnecdote, voteItem } = anecdoteSlice.actions
export default anecdoteSlice.reducer