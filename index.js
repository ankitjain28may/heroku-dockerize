const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
const client = redis.createClient(redisUrl)

// Redis Connection
client.on('connect', function () {
  console.log('Redis client connected')
})
// Redis Error
client.on('error', function (err) {
  console.log('Error ' + err)
})

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/commit', (req, res) => res.sendFile('./commit.txt'))
app.get('/dummy/:id', (req, res) => {
  client.get(req.params.id, (err, reply) => {
    if (err) {
      return res.send(err)
    }
    if (reply == null) {
      return res.send('There is no key with id: ' + req.params.id)
    }
    res.setHeader('Content-Type', 'application/json')
    return res.json(JSON.parse(reply))
  })
})

app.post('/dummy/:id', (req, res) => {
  client.set(req.params.id, JSON.stringify(req.body), (err, reply) => {
    if (err) {
      return res.send(err)
    }
    return res.send('Successful')
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
