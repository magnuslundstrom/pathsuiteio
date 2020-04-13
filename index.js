const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { MONGODB_URI } = require('./config/keys')
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())
app.use(cookieParser())

const signUp = require('./routes/auth/signUp')
const login = require('./routes/auth/login')
const createCompany = require('./routes/auth/createCompany')
const tunnel = require('./routes/auth/tunnel')
const createPath = require('./routes/dashboard/createPath')
const fetchPaths = require('./routes/dashboard/fetchPaths')

app.use(createCompany)
app.use(signUp)
app.use(login)
app.use(tunnel)
app.use(createPath)
app.use(fetchPaths)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Vi kører!')
})
