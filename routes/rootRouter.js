const express = require('express')
const router = express.Router()

// USED to connect all routes in one file

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
const deleteRoutes = [require('./delete/user'), require('./delete/path')]

// @@ FETCH ROUTES
const fetchRoutes = [
  require('./fetch/allUsers'),
  require('./fetch/employees'),
  require('./fetch/searchUser'),
  require('./fetch/user'),
  require('./fetch/paths'),
  require('./fetch/subtaskNotifications'),
  require('./fetch/pathNotifications'),
  require('./fetch/singleEditPath'),
  require('./fetch/categories'),
  require('./fetch/accountInformation'),
]

// @@ PATCH ROUTES
const patchRoutes = [
  require('./patch/user'),
  require('./patch/paths'),
  require('./patch/welcome'),
  require('./patch/accountInformation'),
]

// @@ EMAIL ROUTES
const emailRoutes = [require('./email/inviteUser')]

// @@ ROOT ROUTER
const routes = [
  ...authRoutes,
  ...createRoutes,
  ...deleteRoutes,
  ...fetchRoutes,
  ...patchRoutes,
  ...emailRoutes,
]
routes.forEach((route) => route(router))

module.exports = router
