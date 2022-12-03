const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)

const app2 = express()

app2.get('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send('app2')
})

app2.options('/api', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.send('app22')
})

app2.listen(3001)
