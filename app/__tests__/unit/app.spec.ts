import request from 'supertest'
import ExpressServer from '../../app'

const server = new ExpressServer(4002)
const { app } = server

beforeEach(async () => {
  await server.run(true)
})

afterEach(async () => {
  await server.stop()
})

describe('App', () => {
  it('Runs from `bin/run.ts`', async () => {
    const serverScript = await require('../../bin/run').server
    await request(serverScript.app)
      .get('/')
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
    await serverScript.stop()
  })

  it('Sends a request to /`', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('Sends a request to /error`', async () => {
    await request(app)
      .get('/error')
      .expect(500)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })
})
