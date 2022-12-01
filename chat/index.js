const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('static'))
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.listen(3000)

const io = require('socket.io')(8080)

const users = new Map()

function broadcast(type, message, sender) {
  for (const socket of users.keys()) {
    socket.send({ type, message, sender })
  }
}

io.on('connect', (socket) => {
  socket.on('message', (data) => {
    switch (data.type) {
      case 'LOGIN':
        users.set(socket, { name: data.name })
        broadcast('LOGIN', `${data.name} joined the chat`)
        break
      case 'CHAT':
        const user = users.get(socket)
        broadcast('CHAT', data.message, user.name)
        break
    }
  })
})
