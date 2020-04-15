const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.post('/api/create-user', auth, async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    jobTitle: req.body.jobTitle,
    company: req.user.company._id,
    isAdmin: req.body.isAdmin,
  })
  await user.save()
  res.send('User successfully created')
})

module.exports = router
