const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Path = require('../../models/Path')

router.get('/api/users', auth, async (req, res) => {
  try {
    users = await User.find({ company: req.user.company._id, isAdmin: false })
      .select('jobTitle firstName lastName')
      .populate('paths', 'title')
      .exec()
    res.send(users)
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
