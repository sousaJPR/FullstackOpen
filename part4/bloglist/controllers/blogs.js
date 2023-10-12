const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            if(blog) {
                res.json(blog)
            } else {
                res.status(404).json({error: `id '${req.params.id}' not found`})
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter