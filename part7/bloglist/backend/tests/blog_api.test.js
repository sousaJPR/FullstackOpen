const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('get and create blogs', () => {
    test ('check if returns all the blogs ', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('check if each blog have an unique id', async () => {
        const response = await api.get('/api/blogs')
        const results = response.body.map(blog => {
            return expect(blog.id).toBeDefined()
        })
    })
    
    test('check if a blog was successfully created', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const newBlog = {
            title: "Postt",
            author: "Joao",
            url: "urltest",
            likes: 30
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)  
    })
})


describe('update and delete blogs', () => {
    test('check if likes are sucessfully updated', async () => {
        const id = '652970ccb33003006cbb729d'

        const blogToUpdate = await api.get(`/api/blogs/${id}`)
        if(!blogToUpdate.body.likes) {
            blogToUpdate.body.likes = 0
        }
        // new number of likes
        const updatedLikes = 50
        blogToUpdate.body.likes = updatedLikes
        await api
            .put(`/api/blogs/${id}`, blogToUpdate)
            .send(blogToUpdate.body)
            .expect(201)

        const blogAfterUpdate = await api.get(`/api/blogs/${id}`)
        expect(blogAfterUpdate.body.likes).toBe(updatedLikes)
    })
    
    
    test('check if a blog was successfully deleted', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogIdToDelete = '652970ccb33003006cbb729d'

        await api
            .delete(`/api/blogs/${blogIdToDelete}`)
            .expect(204)
        
        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
        
        const ids = blogsAtEnd.body.map(b => b.id)
        expect(ids).not.toContain(blogIdToDelete)
    })
})
afterAll(async () => {
    mongoose.connection.close()
})