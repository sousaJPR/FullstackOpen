const Note = require('../models/note')
const User = require('../models/users')

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true
	}
]

const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon' })
	await note.save()
	await note.remove()

	return note._id.toString()
}

const notesInDb = async () => {
	const notes = await Note.find({})
	return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = { nonExistingId, notesInDb, initialNotes, usersInDb }