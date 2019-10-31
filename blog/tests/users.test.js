const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const initialUsers = [
    {
        name: "User1",
        username: "user1",
        password: "password1"
    },
    {
        name: "User2",
        username: "user2",
        password: "password2"
    },{
        name: "User3",
        username: "user4",
        password: "password4"
    }
]
beforeEach(async () => {
    await User.deleteMany({})
    let userToBeSaved = new User(initialUsers[0])
    await userToBeSaved.save()
    userToBeSaved = new User(initialUsers[1])
    await userToBeSaved.save()
    userToBeSaved = new User(initialUsers[2])
    await userToBeSaved.save()
})

describe('Creating ', () => {
    test('user with valid info works', async () => {
        const userToBeSaved = {
            name: "NewUser",
            username: "newuser",
            password: "newpassword"
        }
        await api.post('/api/users').send(userToBeSaved).expect(201)
        const response = await api.get('/api/users')
        expect(response.body.length).toBe(initialUsers.length + 1)
    })

    test('user with too short password fails', async () => {
        const userToBeSaved = {
            name: "NewUser",
            username: "newuser",
            password: "12"
        }
        await api.post('/api/users').send(userToBeSaved).expect(400)
    })

    test('user with too short username fails', async () => {
        const userToBeSaved = {
            name: "NewUser",
            username: "12",
            password: "newpassword"
        }
        await api.post('/api/users').send(userToBeSaved).expect(400)
    })

    test('user with no username fails', async () => {
        const userToBeSaved = {
            name: "NewUser",
            password: "newpassword"
        }
        await api.post('/api/users').send(userToBeSaved).expect(400)
    })

    test('user with no password fails', async () => {
        const userToBeSaved = {
            name: "NewUser",
            username: "newuser"
        }
        await api.post('/api/users').send(userToBeSaved).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})