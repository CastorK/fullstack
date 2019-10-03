const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'TestBlog1',
        author: 'TestAuthor1',
        url: 'testblog1.com',
        likes: 1
    },
    {
        title: 'TestBlog2',
        author: 'TestAuthor2',
        url: 'testblog2.com',
        likes: 2
    },
    {
        title: 'TestBlog3',
        author: 'TestAuthor3',
        url: 'testblog3.com',
        likes: 3
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogToBeSaved = new Blog(initialBlogs[0])
    await blogToBeSaved.save()
    blogToBeSaved = new Blog(initialBlogs[1])
    await blogToBeSaved.save()
    blogToBeSaved = new Blog(initialBlogs[2])
    await blogToBeSaved.save()
})

test('There are 3 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('Identifier is called id, not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('Adding blogs is done correctly', async () => {
    const blogToBeSaved = {
        title: 'TestBlog4',
        author: 'TestAuthor4',
        url: 'testblog4.com',
        likes: 4
    }
    await api.post('/api/blogs').send(blogToBeSaved).expect(201)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length+1)
    expect(response.body[3]).toMatchObject(blogToBeSaved)
})

test('New blog without likes defined defaults to 0 likes', async () => {
    const blogToBeSaved = {
        title: 'TestBlog4',
        author: 'TestAuthor4',
        url: 'testblog4.com'
    }
    await api.post('/api/blogs').send(blogToBeSaved)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length+1)
    expect(response.body[3].likes).toBe(0)
})

test('New blog without title fails', async () => {
    const blogToBeSaved = {
        author: 'TestAuthor4',
        url: 'testblog4.com',
        likes: 0
    }
    await api.post('/api/blogs').send(blogToBeSaved).expect(400)
})

test('New blog without author fails', async () => {
    const blogToBeSaved = {
        author: 'TestAuthor4',
        title: 'TestBlog4',
        likes: 0
    }
    await api.post('/api/blogs').send(blogToBeSaved).expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})