const express = require('express')
const path = require('path')
const crypto = require('crypto')
const parseHeaders = require('parse-headers')

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'handshake.html'))
})

app.listen(3000)

const net = require('net')

const server = net.createServer()

server.on('connection', (socket) => {
  socket.on('data', (data) => {
    const str = data.toString()

    const headers = parseHeaders(str)

    const sha1 = crypto.createHash('sha1')
    sha1.update(headers['Sec-WebSocket-Key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    const acceptKey = sha1.digest('base64')
    let response = `HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${acceptKey}
    \r\n\r\n`
    console.log('response: ', response)
    socket.write(response)
  })
})

server.listen(8080)
