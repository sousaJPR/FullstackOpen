import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? 'important' : 'not important' }</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({ filter, notes }) => {
        switch(filter) {
            case 'ALL':
                return notes
            case 'IMPORTANT': 
                return notes.filter(note => note.important)
            case 'NONIMPORTANT':
                return notes.filter(note => !note.important)
        }
    })

    return (
        <ul>
            {notes && notes.map(note =>
                <Note 
                    key={note.id}
                    note={note}
                    handleClick={() => dispatch(toggleImportanceOf(note.id))}/>
            )}
        </ul>
    )
}

export default Notes
