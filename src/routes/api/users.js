import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

/** GET /api/users > Retrieve all users */
api.get('/', (_, response) => {
  const prisma = new PrismaClient()

  response.json({ data: { users: prisma.user.findMany() } })
})

/** CREATE /api/user/:id/create > Create one user */
api.post('/user/:id/create', (request, response) => {
  const prisma = new PrismaClient() 
  const { email } = request.body
  const result = prisma.post.create({
    data: {... request.body},
  })
  response.json(result)
})


/** NEW CREATE */
// api.post('user/:id/create', (request, response) => {
//   const prisma = new PrismaClient()

//   user = { id: 1, email: 'test@test.com'}
//   const createUser = prisma.user.create({ data: user })
//   response.json(createUser)
// })



/** GET /api/user/:id > Retrieve one user */
api.get('/user/:id', (request, response) => {
  const prisma = new PrismaClient()
  const { id } = request.params
  const user = prisma.user.findOne({
    where: { id: Number(id) }
  })
  response.json(user)
})




/** DELETE /api/user/:id/delete > Delete one user */
api.delete('/user/:id/delete', (request, response) => {
  const { id } = request.params
  const user = prisma.user.delete({
    where: { id: Number(id) },
  })
  response.json(user)
})


export default api
