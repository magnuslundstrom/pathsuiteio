const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { MONGODB_URI } = require('./config/keys')
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const signUp = require('./routes/auth/signUp')
const login = require('./routes/auth/login')
const createCompany = require('./routes/auth/createCompany')
const tunnel = require('./routes/auth/tunnel')
const createPath = require('./routes/dashboard/createPath')
const fetchPaths = require('./routes/dashboard/fetchPaths')
const createUser = require('./routes/dashboard/createUser')
const fetchUsers = require('./routes/dashboard/fetchUsers')
const patchUser = require('./routes/dashboard/patchUser')

const allRoutes = [
  signUp,
  login,
  createCompany,
  tunnel,
  createPath,
  fetchPaths,
  createUser,
  fetchUsers,
  patchUser,
]
allRoutes.forEach((route) => app.use(route))

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static('client/build'))

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })
  app.use('*', express.static(path.join(__dirname, 'client', 'build')))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Vi kører!')
})
