import { useState } from "react"
import { useMatch, Routes, Route, Navigate } from "react-router-dom"
import Home from './components/Home'
import Notes from "./components/Notes"
import Note from './components/Note'
import Users from './components/Users'
import Login from './components/Login'
import { Alert } from "react-bootstrap"
import AppNavbar from "./components/Navbar"
import StyledLogin from "./components/StyledLogin"



const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'User 1'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'User 2'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'User 3'
    }
  ])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div className="container">
      <AppNavbar user={user}/>
        {(message
          ? <Alert variant="success">{message}</Alert>
          : null
        )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/styledlogin" element={<StyledLogin onLogin={login} />} />
      </Routes>

      <div>
        <br />
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </div>
  )
}

export default App