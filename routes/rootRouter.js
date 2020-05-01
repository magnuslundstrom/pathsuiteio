const express = require('express')
const router = express.Router()

// @@ AUTH ROUTES
const authRoutes = [
  require('./auth/login'),
  require('./auth/logout'),
  require('./auth/mount'),
  require('./auth/tunnel'),
]

// @@ CREATE ROUTES
const createRoutes = [
  require('./create/company'),
  require('./create/path'),
  require('./create/user'),
]

// @@ DELETE ROUTES
const deleteRoutes = [require('./delete/user')]

// @@ FETCH ROUTES
const fetchRoutes = [
  require('./fetch/allUsers'),
  require('./fetch/employees'),
  require('./fetch/searchUser'),
  require('./fetch/user'),
  require('./fetch/paths'),
]

// @@ PATCH ROUTES
const patchRoutes = [require('./patch/user'), require('./patch/paths'), require('./patch/welcome')]

const routes = [...authRoutes, ...createRoutes, ...deleteRoutes, ...fetchRoutes, ...patchRoutes]
routes.forEach((route) => route(router))

module.exports = router
