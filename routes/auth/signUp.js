const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const User = require('../../models/User')
const setCookie = require('../../utils/setCookie')
const errorHandler = require('../../utils/errorHandler')

router.post('/api/sign-up', async (req, res) => {
  fs.readFile(path + '../../files/anonym-user.jpg', (err, data) => {
    sharp(data)
      .resize(250, 250)
      .png()
      .toBuffer()
      .then((newPhoto) => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
          image: newPhoto,
        })
        user.save().then((user) => {
          setCookie(res, user._id)
          res.send({ success: 'User was successfully created' })
        })
      })
  })
})
module.exports = router
