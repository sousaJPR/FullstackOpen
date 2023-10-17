const logger = require('./logger')
const jwt = require('jsonwebtoken')

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

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
		console.log(token)
		jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
			if (err) {
				return res.status(400).json({error: 'invalid token'})
			}
			req.decodedToken = decodedToken
			next()
		})
    } else {
		return null
	}
    
}

const userExtractor = (req, res, next) => {
	const decodedToken = req.decodedToken
	if(!decodedToken.id) {
		return res.status(400).json({error: 'invalid token'})
	}
	req.user = decodedToken.id
	next()
}

module.exports = {requestLogger, errorHandler, tokenExtractor, userExtractor }