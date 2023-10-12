require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')




// ----------------------------- MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
// Morgan token to collect body content from request
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// ----------------------------- ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>')
})
    // Get all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

    // Get unique persons 
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
    
})



app.post('/api/persons', (req, res, next) => {
    const body = req.body
    /* if (!body.name) {
        console.error('Error: name required')
        return res.status(400).json({error: 'Name required'})
    } else if (!body.number) {
        console.error('Error: number required')
        return res.status(400).json({error: 'Number required'})
    } else if (body.name.length < 3) {
        console.error('Error: name must have at least 3 characteres')
        return res.status(400).json({error: 'Name must have at least 3 characteres'})
    } */
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => (next(error)))
})

    // Update Person
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person)
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

    // Delete Person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error.message)
        })

})

    // Info page
app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${Person.length} people
    <br /><br />
    ${Date()}`)
})


// ----------------------------- FUNCTIONS
const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if(error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    } else if (error.name === 'ReferenceError') {
        return res.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
