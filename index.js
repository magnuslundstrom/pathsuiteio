const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { MONGODB_URI } = require('./config/keys')
mongoose.set('useCreateIndex', true)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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

app.use(signUp)
app.use(login)
app.use(createCompany)
app.use(tunnel)
app.use(createPath)
app.use(fetchPaths)
app.use(createUser)
app.use(fetchUsers)
app.use(patchUser)

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static('client/build'))
  app.use(express.static('files'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

function sameFrequency(strOne) {
  // good luck. Add any arguments you deem necessary.

  const strOnee = toString(strOne)
  const objOne = {}

  for (var i = 0; i < strOnee.length; i++) {
    objOne[strOnee[i]] ? (strOnee[strOne[i]] += 1) : (objOne[strOnee[i]] = 1)
  }
  console.log(objOne)
  for (const el in objOne) {
    if (objOne[el] > 1) {
      return false
    }
  }
  return true
}

sameFrequency(111)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Vi kører!')
})
