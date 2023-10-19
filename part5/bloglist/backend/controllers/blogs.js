const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog) {
        res.json(blog)
    } else {
        res.status(400).json({error: `id ${req.params.id} not found`})
    }
})


blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body
    const userId = req.user
    const user = await User.findById(userId)
    console.log('user:', user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user
    if(!user) {
        return res.status(400).json({error: 'invalid token'})
    }
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
        return res.status(400).json({error: `Blog not found with id: ${req.params.id}`})
    }
    const blogUser = blog.user.toString()
    if (blogUser === user.id) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        res.status(400).json({error: 'only the creator can delete the blog'})
    }
    
    
})

blogsRouter.put('/:id', async (req, res) => {
    const blogLikes = req.body.likes
    const newBlog = {
        ...req.body, likes: blogLikes
    }

    await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    res.status(201).json(newBlog)
})

module.exports = blogsRouter