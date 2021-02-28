const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/Blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controller/Users')
const loginRouter = require('./controller/Login')
require('express-async-errors')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.extractToken)

app.use('/api/blogs', blogsRouter)
app.use('/api/login',loginRouter)
app.use('/api/users',usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/Testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app