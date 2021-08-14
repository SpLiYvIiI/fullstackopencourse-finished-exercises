const supertest = require('supertest')
const Blog = require('../modules/Blog')
const User = require('../modules/User')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const bloghelper = require('../utils/blogs_api_helper')
const usersHelper = require('../utils/users_api_helper')


beforeEach(async()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    let first0 = new User(usersHelper.allUsers[0])
    await first0.save()
    let second0 = new User(usersHelper.allUsers[1])
    await second0.save()
    let first = new Blog(bloghelper.initialBlogs[0])
    await first.save()
    let second = new Blog(bloghelper.initialBlogs[1])
    await second.save()
})


describe('fetching blogs from db', ()=>{
    test('check if blogs are returned as json', async () => {
        await api
       .get('/api/blogs')
       .expect(200)
       .expect('Content-Type', /application\/json/)
   })
 
 test('check if all blogs are returned', async ()=>{
     const response = await api.get('/api/blogs')
     expect(response.body).toHaveLength(bloghelper.initialBlogs.length)
 })
 
 test('check if id is unique identifier', async()=>{
     const resp = await api.get('/api/blogs')
     resp.body.forEach(x => expect(x.id).toBeDefined)
 })
})

describe('addition of new blog in db' , ()=>{
    test('check if valid blog can be added', async ()=>{
        const userToLogin = {
            username : "dodola",
            password : "atuka347772"
        }
        const resp = await api
        .post('/api/login')
        .send(userToLogin).expect(200)
        .expect('Content-Type', /application\/json/)
        const token = resp.body.token
        const newBlog = {
            title: 'Type wars', 
            author: 'Robert C. Martin', 
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
            likes: 2
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .set({Authorization : "bearer " + token})
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const currBlogs = await bloghelper.allblogs()
        const onlyTitle = currBlogs.map(blog=>blog.title)
        expect(currBlogs).toHaveLength(bloghelper.initialBlogs.length+1)
        expect(onlyTitle).toContain(newBlog.title)
    })
    
    test('check default value for likes',async ()=>{
        const userToLogin = {
            username : "dodola",
            password : "atuka347772"
        }
        const resp = await api
        .post('/api/login')
        .send(userToLogin).expect(200)
        .expect('Content-Type', /application\/json/)
        const token = resp.body.token
        const newBlog ={
        title: 'First class tests', 
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
        }
        await api
        .post('/api/blogs')
        .set({Authorization : "bearer " + token})
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const allBlogs = await bloghelper.allblogs()
        const addedBlog = allBlogs.find(blog => blog.title === newBlog.title) 
        expect(addedBlog.likes).toBeDefined()
        expect(addedBlog.likes).toBe(0)
    })
    
})
describe('deletion of blog from db',()=>{
    test('delete single node by id',async ()=>{
        const userToLogin = {
            username : "dodola",
            password : "atuka347772"
        }
        const resp = await api
        .post('/api/login')
        .send(userToLogin).expect(200)
        .expect('Content-Type', /application\/json/)
        const token = resp.body.token
        const newBlog ={
        title: 'First class tests', 
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
        }
        await api
        .post('/api/blogs')
        .set({Authorization : "bearer " + token})
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const currDb =await bloghelper.allblogs()
        const blogtoDel = currDb[currDb.length-1] 
        await api
        .delete(`/api/blogs/${blogtoDel.id}`)
        .set({Authorization : "bearer " + token})
        .expect(204)

        const afterdelDb = await bloghelper.allblogs()

        expect(afterdelDb).toHaveLength(currDb.length-1)

        const onlyIds = afterdelDb.map(blog => blog.id)

        expect(onlyIds).not.toContain(blogtoDel.id)
    })
})


afterAll(() => {
    mongoose.connection.close()
}) 