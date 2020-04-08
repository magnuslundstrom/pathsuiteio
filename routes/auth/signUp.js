const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const setCookie = require('../../utils/setCookie')
const errorHandler = require('../../utils/errorHandler')

router.post('/api/sign-up', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  })

  try {
    await user.save()
    setCookie(res, user._id)
    res.send({ success: 'User was successfully created' })
  } catch (e) {
    const newErrors = errorHandler(e)
    res.status(406).send(newErrors)
  }
})

// await company.save()
// const company = new Company({
//   companyName: req.body.companyName,
//   companyEmail: req.body.companyEmail,
//   users: user._id,
// })
// user.company = company._id
// await user.delete()
// await company.delete()

module.exports = router
