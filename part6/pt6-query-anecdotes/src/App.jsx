import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './requests'
import { useDispatchValue } from './components/NotificationContext'

const App = () => {
  const notificationDispatch = useDispatchValue()
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'VOTED', votedAnecdote })
      setTimeout(() =>
        notificationDispatch({ type: 'CLEAR' }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ anecdote })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>Loading data from server...</div>
  }
  if (result.error) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data



  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
