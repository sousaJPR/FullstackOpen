import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import noteService from './services/notes'
import Footer from "./components/Footer"

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMsg(`The Note "${note.content}" was already removed from the server.`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

  }


  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div className="app">
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div className="btn-show-div" >
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>
      <form className="submit-form" onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          className="new-note-textbox"
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}


export default App