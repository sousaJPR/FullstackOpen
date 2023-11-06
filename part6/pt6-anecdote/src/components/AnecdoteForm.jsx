import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const newItem = async (event) => {
        event.preventDefault()
        const content = event.target.item.value
        event.target.item.value = ''
        dispatch(createNew(content))
        dispatch(setNotification('Note created!', 3))
    }

    return (
        <div>
            <form onSubmit={newItem}>
                <h2>Create New</h2>
                <input name="item" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote