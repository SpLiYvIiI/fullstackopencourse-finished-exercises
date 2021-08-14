const supertest = require('supertest')
const User = require('../modules/User')
const usersHelper = require('../utils/users_api_helper')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

beforeEach(async ()=>{
    await User.deleteMany({})
    let first = new User(usersHelper.allUsers[0])
    await first.save()
    let second = new User(usersHelper.allUsers[1])
    await second.save()
})

describe('adding users to db', ()=>{
    test('test error for invalid password' , async()=>{
        const newuser = {
            username : "babaioglari",
            name : "vincxa",
            password : "ss"
        }
        const resp = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        expect(resp.body.error).toBe('password must contain at least 3 character')
    })
    test('test error for invalid username', async()=>{
        const newuser = {
            username : "s",
            name : "vincxa",
            password : "xuis"
        }
        const resp = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        const expectederrormessage = "User validation failed: username: Path `username` (`s`) is shorter than the minimum allowed length (3)."
        expect(resp.body.message).toBe(expectederrormessage)
    })
})

afterAll(() => {
    mongoose.connection.close()
}) 


