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
    return res.status(406).send({ errors: { login: { message: 'User was not found' } } })
  } catch (e) {
    return res
      .status(406)
      .send({ errors: { login: { message: 'Something went wrong, try again!' } } })
  }
})

module.exports = router
