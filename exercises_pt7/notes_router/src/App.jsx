import { useState } from "react"
import { useMatch, Routes, Route, Link, useParams, useNavigate, Navigate } from "react-router-dom"

const Home = () => {
  return (
    <div>
    <h2>Notes APP</h2>
    <p>Homepage</p>
  </div>
  )
}

const Note = ({ note }) => {
  console.log('note', note)
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )

}
const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul>
    </div>
  )
}

const Login = (props) => {
  const navigate = useNavigate()
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('root')
    navigate('/')
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type="password"/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

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
  const login = (user) => {
    setUser(user)
  }
  const match = useMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <Link style={{ padding: 5 }} to='/'>Home</Link>
        <Link style={{ padding: 5 }} to='/notes'>Notes</Link>
        <Link style={{ padding: 5 }} to='/users'>Users</Link>
        {user
        ? <em>{user} logged in</em>
        : <Link style={{ padding: 5}} to='/login'>Login</Link>
        }
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path="/login" element={<Login onLogin={login}/>} />
      </Routes>

      <div>
        <br />
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </div>
  )
}

export default App