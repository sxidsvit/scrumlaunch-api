const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express() // start the http server 
// const app = require("https-localhost")() // start the https  server 

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/post', require('./routes/post.routes'))
app.use('/api/comment', require('./routes/comment.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server error: ', e.message)
    process.exit(1)
  }
}

start()
