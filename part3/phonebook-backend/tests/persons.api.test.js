const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('ylifona',()=>{
test('test /api/persons GET',async ()=>{
    await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
})

afterAll(() => {
    mongoose.connection.close()
  })