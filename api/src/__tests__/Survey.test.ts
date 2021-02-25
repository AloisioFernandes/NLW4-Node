//executar teste com yarn teste -i
import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'
// foi definido no package.json um comando para remover o banco de dados de teste após relizar o comando "test", "posttest"
describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({ // testando criação de pesquisas
      title: 'Title Example',
      description: 'Description Example'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('Should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Title Example2',
      description: 'Description Example2'
    })

    const response = await request(app).get('/surveys')

    expect(response.body.length).toBe(2)
  })
})