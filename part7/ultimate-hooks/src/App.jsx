import { useField, useResource } from './hooks'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} reset=''/>
        <button>Create</button>
      </form>
      <div>
        <h3>List of Notes</h3>
        {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name <input {...name} reset='' /> <br/>
        Number <input {...number} reset='' />
        <button>create</button>
      </form>
      <div>
        <h3>List of Persons</h3>
        {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
      
    </div>
  )
}

export default App