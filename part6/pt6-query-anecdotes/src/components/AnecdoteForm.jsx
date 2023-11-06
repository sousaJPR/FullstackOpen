import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useDispatchValue } from "./NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useDispatchValue()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 4) {
      return null
    } else {
      newAnecdoteMutation.mutate({ content: content, votes: 0 })
      notificationDispatch({ type: 'CREATED', content })
      setTimeout(() =>
        notificationDispatch({ type: 'CLEAR' }), 5000)
    }

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
