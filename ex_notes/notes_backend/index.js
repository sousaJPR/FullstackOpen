require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')



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
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}



app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)


// GET NOTES

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if(note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

// CREATE NOTES

app.post('/api/notes', (request, response, next) => {
    const body = request.body

    if (body.content === undefined) {
        return res.status(400).json ({ error: 'content missing'})
    }

    const note = new Note ({
        content: body.content,
        important: body.important || false
    })
    note.save()
        .then(savedNote => {
            response.json(savedNote)
    })
    .catch(error => next(error))
})

// Update note

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findByIdAndUpdate(
        request.params.id, 
        { content, important}, 
        { new: true, runValidators: true, context: 'query'})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

// DELETE

app.delete('/api/notes/:id', (request, response, next) => {
    /* const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end() */
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)