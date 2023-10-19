const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
	logger.info('Method', req.method)
	logger.info('Path', req.path)
	logger.info('Body', req.body)
	logger.info('---')
	next()
}

const errorHandler = (error, req, res, next) => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({error: 'malformatted id'})
	} else if (error.name === 'ValidationError') {
		return res.status(400).send({error: 'username already exists'})
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: error.message})
	}
	next(error)
}
const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		const token = authorization.replace('Bearer ', '')
		return token
	}
	return null
}

const tokenExtractor = (req, res, next) => {
	req.token = getTokenFrom(req)    
}

const userExtractor = async (req, res, next) => {
	const token = getTokenFrom(req)
	if(token) {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!decodedToken) {
			return res.status(400).json({error: 'invalid token'})
		}
	req.user = await User.findById(decodedToken.id)
	}
	next()
}

module.exports = {requestLogger, errorHandler, tokenExtractor, userExtractor }