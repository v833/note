const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

app.get('/submit', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'submit.html'))
})

app.post('/file', fileUpload(), (req, res) => {
  console.log(req.files)
  req.files.file.mv(path.resolve(__dirname, 'upload.png'))
  res.status(201).send('ok')
})

app.listen(3000)
