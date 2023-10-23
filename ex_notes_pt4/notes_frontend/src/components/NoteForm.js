import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form className="submit-form" onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="new-note-textbox"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm