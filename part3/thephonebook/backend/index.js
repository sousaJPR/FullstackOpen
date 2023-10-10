const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// ----------------------------- OBJECTS
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// ----------------------------- MIDDLEWARES
// Morgan token to collect body content from request
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// ----------------------------- ROUTES

// Get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Get unique persons 
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (!person) {
        res.status(400).json({error: `No person found with id: ${id}`})
    } else {
        res.json(person)
    }
    
})



app.post('/api/persons', (req, res) => {
    const body = req.body
    const duplicate = persons.find(person => person.name === body.name)
    if (!body.name) {
        return res.status(400).json({error: 'name missing'})
    } else if (!body.number) {
        return res.status(400).json({error: 'number missing'})
    } else if(duplicate) {
        return res.status(400).json({error: 'name already exists'})
    }
    const person = {
        id: randomId(),
        name: body.name,
        number: body.number
    }
    

    persons = persons.concat(person)
    res.json(person)
})


// Delete Person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()

})


// Info page
app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people
    <br />
    ${Date()}`)
})


// ----------------------------- FUNCTIONS
// Add new person
const randomId = () => {
    return Math.floor(Math.random() * (10000 - 1) + 1)
}


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)