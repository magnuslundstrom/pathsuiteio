const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Path = require('../../models/Path')

router.get('/api/users', auth, async (req, res) => {
  try {
    users = await User.find({ company: req.user.company._id, isAdmin: false })
      .select('jobTitle firstName lastName image')
      .populate('paths', 'title')
      .exec()
    const newUsers = []
    users.forEach((user) => {
      const image = user.image.toString('base64')
      const paths = user.paths
      const newUser = { ...user._doc, paths, image }
      newUsers.push(newUser)
    })
    res.send(newUsers)
  } catch (e) {}
})

router.post('/api/find-user', auth, async (req, res) => {
  const find = req.body.find
  const reg = new RegExp('^' + find, 'i')
  const user = await User.find({ firstName: reg, isAdmin: req.query.isAdmin }).select(
    'firstName lastName'
  )
  res.send(user)
})

module.exports = router
