require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')



// ------------------------------ MONGOOSE






// ------------------------------ MIDDLEWARES
const requestLogger = (req, res, next) => {
    console.log('Method', req.method)
    console.log('Path', req.path)
    console.log('Body', req.body)
    console.log('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(requestLogger)


// GET NOTES
app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id )
    if (note) {
        response.json(note)
    } else {
        response.statusMessage = 'Note not found.'
        response.status(404).end()
    }
})

// CREATE NOTES

const generateID = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}
app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json ({ error: 'content missing'})
    }

    const note = {
        id: generateID(),
        content: body.content,
        important: body.important || false
    }

    notes = notes.concat(note)
    res.json(note)
})

// DELETE

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT)
console.log(`Server running on port ${PORT}`)