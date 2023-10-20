import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMsg('Wrong credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }
  const handleLogout = async (e) => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
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
  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    try {
      const returnedNote = await noteService.create(noteObject)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    } catch (error) {
      setErrorMsg('Error creating a new note')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  // Forms
  const loginForm = () => (
    <div className="login-div">
      {!user &&
          <Togglable buttonLabel="Login">
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </Togglable>}
      {user &&
        <div>
          <p>Welcome <strong>{user.name}</strong></p>
          <button onClick={handleLogout} className="red-button">Logout</button>
        </div>
      }
    </div>
  )
  const notesList = () => (
    <>
      <div className="btn-show-div" >
        <button className="blue-button" onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <div>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
            />
          )}
        </ul>
      </div>
    </>
  )
  const notesForm = () => (
    <div className="create-div">
      {user &&
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              createNote={addNote} />
          </Togglable>
      }
    </div>
  )


  return (
    <div className="app">
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {loginForm()}
      {notesList()}
      {notesForm()}
      <Footer />
    </div>
  )
}


export default App