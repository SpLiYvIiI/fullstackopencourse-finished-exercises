const blogsRouter = require('express').Router()
const Blog = require('../modules/Blog')
const User = require('../modules/User')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({}).populate('user',{username : 1,name : 1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response,next) => {
  const body = request.body
  if(body.title === '' || body.url === '') response.status(401).send({error : 'something went wrong'})
  else{
  try{
    if(!request.token){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decoded = jwt.verify(request.token,process.env.SECRET)
    if(!decoded){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  const user = await User.findById(decoded.id)
  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes,
    user : user.id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  const ret = await Blog.findById(result._id).populate('user',{username : 1,name : 1})
  response.status(200).json(ret)
  }
  catch(error){
    next(error)
  }
  }
})
blogsRouter.delete('/:id',async(request,response,next) =>{
  try{
  if(!request.token){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const decoded = jwt.verify(request.token,process.env.SECRET)
  if(!decoded){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== decoded.id.toString()){
    return response.status(401).json({ error: 'token is invalid' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  const user = await User.findById(decoded.id)
  user.blogs = user.blogs.filter(id => id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
  }
  catch(error){
    next(error)
  }
})

blogsRouter.put('/:id',async (request,response,next)=>{
    try{
      const b = request.body
      const newBlog = {
        title: b.title, 
        author: b.author, 
        url: b.url, 
        likes: b.likes,
        user : b.user.id
      }
        const res = await Blog.findByIdAndUpdate(request.params.id,newBlog,{ new:true }).populate('user',{username : 1,name : 1})
        response.status(200).json(res)
    }
    catch(error){
      next(error)
    }
})

blogsRouter.post('/:id/comments',async (request,response,next)=>{
  console.log('ascascas')
  try{
    const b = request.body
    console.log(b)
    if(!b.comment || !b.id) response.status(401).json({error : 'something went wrong'})
    const blog = await Blog.findById(b.id)
    blog.comments = blog.comments.concat(b.comment)
    await blog.save()
    response.status(204).end()
  }
  catch(error){
    next(error)
  }
})

module.exports = blogsRouter