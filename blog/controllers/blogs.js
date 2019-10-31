const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}).populate('user', {'username': 1, 'name': 1, 'id': 1}))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const users = await User.find({})
    const user = users[0]
    blog.user = user._id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const options = {
      new: true, 
      runValidators: true
    }
    const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, options)
    response.json(modifiedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter