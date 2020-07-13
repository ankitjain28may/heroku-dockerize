const request = require('supertest')
const app = require('../index')

describe('Endpoints', () => {
  it('Making get request /', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Hello World!')
  })

  it('Making get request /ping', async () => {
    const res = await request(app)
      .get('/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('PONG')
  })

  it('Making Post request /dummy/1', async () => {
    const res = await request(app)
      .delete('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Cannot delete')
  })

  it('Making get request /dummy/1', async () => {
    const res = await request(app)
      .get('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('There is no key with id: 1')
  })

  it('Making Post request /dummy/1', async () => {
    const res = await request(app)
      .post('/dummy/1')
      .send({
        ID: 1,
        title: 'test is cool'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Successful')
  })

  it('Making Post request /dummy/1', async () => {
    const res = await request(app)
      .delete('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Deleted Successfully!')
  })
})
