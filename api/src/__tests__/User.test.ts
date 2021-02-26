import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../database'
// foi definido no package.json um comando para remover o banco de dados de teste após relizar o comando "test", "posttest"
describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  }) // deleta tabelas do banco de dados

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({ // testando criação de usuários
      email: 'user@example.com',
      name: 'User Example'
    })

    expect(response.status).toBe(201)
  })

  it('Should not be able to create a user with existing email', async () => {
    const response = await request(app).post('/users').send({ // testando criação de usuários
      email: 'user@example.com',
      name: 'User Example'
    })

    expect(response.status).toBe(400)
  })
})