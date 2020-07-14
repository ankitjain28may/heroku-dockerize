const request = require('supertest')
const app = require('../index')
jest.mock('redis', () => {
  const redis = require('redis-mock')
  return redis
})

describe('Endpoints', () => {
  it('Making get request /', async (done) => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Hello World!')
    done()
  })

  it('Making get request /ping', async (done) => {
    const res = await request(app)
      .get('/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('PONG')
    done()
  })

  it('Making Post request /dummy/1', async (done) => {
    const res = await request(app)
      .delete('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Cannot delete')
    done()
  })

  it('Making get request /dummy/1', async (done) => {
    const res = await request(app)
      .get('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('There is no key with id: 1')
    done()
  })

  it('Making Post request /dummy/1', async (done) => {
    const res = await request(app)
      .post('/dummy/1')
      .send({
        ID: 1,
        title: 'test is cool'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Successful')
    done()
  })

  it('Making get request /dummy/1', async (done) => {
    const res = await request(app)
      .get('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.ID).toEqual(1)
    expect(res.body.title).toEqual('test is cool')
    done()
  })

  it('Making Post request /dummy/1', async (done) => {
    const res = await request(app)
      .delete('/dummy/1')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('Deleted Successfully!')
    done()
  })
})
