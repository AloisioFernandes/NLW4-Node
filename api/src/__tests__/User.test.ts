import request from 'supertest'
import { app } from '../app'

describe('Users', () => {
  request(app).post('/users') // testando criação de usuários
  .send({
    email: 'user@example.com',
    name: 'User Example'
  })
})