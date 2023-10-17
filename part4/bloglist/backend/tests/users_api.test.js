const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('user tests', () => {

    test('create invalid user', async () => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart)
        const newUser = {
            username: "",
            name: "Joao",
            password: "pa"
        }
        console.log(newUser)
        const response = await api
                            .post('/api/users')
                            .send(newUser)
                            .expect(400)
        
        const usersAtEnd = await helper.usersInDb()
        console.log(usersAtEnd)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})
