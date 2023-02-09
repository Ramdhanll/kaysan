import supertest from 'supertest'
import createServer from '../api/helpers/server'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import Users from '../api/models/userModel'
import IUser from '../interfaces/IUser'
import bcrypt from 'bcrypt'
import { SALT } from '../config/jwt'
import { generateToken } from '../api/helpers/jwt'

const app = createServer()

const userPayload: IUser = {
   name: 'testing',
   email: 'testing@gmail.com',
   password: bcrypt.hashSync('password', SALT),
   gender: 'L',
}

const userPayloadCreate: IUser = {
   name: 'testing',
   email: 'testing123@gmail.com',
   password: 'password',
   gender: 'L',
}

describe('user', () => {
   beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create()

      await mongoose.connect(mongoServer.getUri())
   })

   afterAll(async () => {
      await mongoose.disconnect()
      await mongoose.connection.close()
   })

   describe('get user route', () => {
      describe('getting the user does not exist', () => {
         it('should return a 404', async () => {
            const userId = '123123'

            await supertest(app).get(`/api/users/${userId}`).expect(404)
         })
      })

      describe('getting all user with logged in', () => {
         it('should return a 200 status and users', async () => {
            const token = generateToken(userPayload)
            const { statusCode } = await supertest(app)
               .get('/api/users')
               .set('Cookie', [`token=${token}`])

            expect(statusCode).toBe(200)
         })
      })

      describe('getting the user without logged in', () => {
         it('should return a 200 status and user', async () => {
            const user = new Users(userPayload)
            const createdUser = await user.save()

            const { statusCode, body } = await supertest(app).get(
               `/api/users/${createdUser._id}`
            )

            expect(statusCode).toBe(200)
            expect(body.user._id).toBe(createdUser._id?.toString())
         })
      })
   })

   describe('create user route', () => {
      it('should return a 201 status and user', async () => {
         const { statusCode, body } = await supertest(app)
            .post('/api/users')
            .send(userPayloadCreate)

         expect(statusCode).toBe(201)
         expect(body.user.name).toEqual(userPayloadCreate.name)
      })
   })
})
