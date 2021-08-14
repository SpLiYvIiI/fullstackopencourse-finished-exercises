const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../modules/User')


usersRouter.get('/',async(request,response,next) =>{
    const users = await User.find({}).populate('blogs',{title : 1, author : 1,url : 1})
    response.json(users)
})
usersRouter.post('/',async (request,response,next) =>{
    const body = request.body;
    if(!body.password || body.password.length < 3){
        response.status(400).send({error : 'password must contain at least 3 character'})
    }
    else{
    try{
    const saltround = 10
    const passwordHash = await bcrypt.hash(body.password,saltround)
    const user = new User({
        username : body.username,
        name : body.name,
        passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
    }
    catch(error){
        next(error)
    }
    }
})


module.exports = usersRouter