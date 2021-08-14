const testRouter = require('express').Router()
const Blog = require('../modules/Blog')
const User = require('../modules/User')


testRouter.post('/reset', async (req,res,next)=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})


module.exports = testRouter