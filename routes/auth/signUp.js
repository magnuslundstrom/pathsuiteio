const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Company = require('../../models/Company')
const setCookie = require('../../utils/setCookie')

router.post('/api/sign-up', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  })
  const company = new Company({
    companyName: req.body.companyName,
    companyEmail: req.body.companyEmail,
    users: user._id,
  })
  user.company = company._id
  try {
    await user.save()
    await company.save()
    setCookie(res, user._id)
    res.redirect('/tunnel')
  } catch (e) {
    await user.delete()
    await company.delete()
    res.status(406).send(e)
  }
})

module.exports = router
