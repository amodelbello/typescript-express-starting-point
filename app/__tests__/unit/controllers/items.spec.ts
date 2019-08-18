import request from 'supertest'
import ExpressServer from '../../../app'

import { id as itemId, item as testItem } from '../../__fixtures__/items'

const server = new ExpressServer(4003)
const { app } = server

beforeEach(async () => {
  await server.run(true)
})

afterEach(async () => {
  console.log('items.spec.ts server stop')
  await server.stop()
})

describe('Items', () => {
  it('GET /items`', async () => {
    await request(app)
      .get('/items')
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('GET /items/:id`', async () => {
    await request(app)
      .get(`/items/${itemId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('POST /items`', async () => {
    await request(app)
      .post('/items')
      .send({ name: testItem.name, description: testItem.description })
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('PUT /items/:id`', async () => {
    await request(app)
      .put(`/items/${itemId}`)
      .send(testItem)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })

  it('DELETE /items/:id`', async () => {
    await request(app)
      .delete(`/items/${itemId}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchSnapshot()
      })
  })
})
