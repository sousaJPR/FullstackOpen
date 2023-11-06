import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addVote } from "../reducers/anecdoteReducer"


const Anecdote = ({ item, handleClick }) => {
    return (
        <div>
            <div>
                {item.content}
            </div>
            <div>
                has {item.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>

    )
}
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => { 
        const sortedAnecdotes = [...state.anecdotes]
        const filter = state.filter
        sortedAnecdotes.sort((a, b) => b.votes - a.votes)
        if (filter) {
            return sortedAnecdotes.filter(anecdote => {
                if (anecdote.content) {
                    return anecdote.content.toLowerCase().includes(filter.toLowerCase())}
                })
            }
        return sortedAnecdotes
    })

    const handleClick = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`Voted on "${anecdote.content}"`, 3))
    }

    return (
        <div>
            {anecdotes.map (anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    item={anecdote}
                    handleClick={() => handleClick(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList