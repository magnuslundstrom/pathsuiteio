const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const setCookie = require('../../utils/setCookie')

const User = require('../../models/User')

router.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('email password')
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password)

      if (match) {
        setCookie(res, user._id)
        return res.send({ success: 'User was successfully logged in!' })
      }
    }
    return res.status(406).send({ loginError: "We don't know this account. Please try again." })
  } catch (e) {
    return res
      .status(406)
      .send({ errors: { login: { message: 'Something went wrong, try again!' } } })
  }
})

router.get('/api/app-did-mount', async (req, res) => {
  try {
    const user = await User.findById(req.cookies.user)
    if (user) {
      setCookie(res, user._id)
      res.send({ success: 'Redirect to tunnel' })
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(401).send()
  }
})

module.exports = router
