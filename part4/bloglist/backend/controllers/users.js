const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, likes: 1})
    if (users.length > 1) {
        res.json(users)
    } else {
        res.status(400).json({error: 'no users found'})
    }
    
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body
    if (!username || !name || !password) {
        return res.status(400).json({error: 'username, name and password required'})
    }
    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({ error: 'username and password must have at least 3 characters'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})


module.exports = usersRouter