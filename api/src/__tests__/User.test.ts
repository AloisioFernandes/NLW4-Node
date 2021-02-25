//executar teste com yarn teste -i
import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'
// foi definido no package.json um comando para remover o banco de dados de teste após relizar o comando "test", "posttest"
describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

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