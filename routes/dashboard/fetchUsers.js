const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')

// @@ Used to fetch employees on /employees
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

// @@ Used to find users on search when creating paths
router.post('/api/find-user', auth, async (req, res) => {
  const find = req.body.find
  const reg = new RegExp('^' + find, 'i')
  const user = await User.find({
    firstName: reg,
    isAdmin: req.query.isAdmin,
    company: req.user.company._id,
  }).select('firstName lastName')
  res.send(user)
})

// @@ Used to fetch user data when clicking into a user profile
router.post('/api/user', async (req, res) => {
  const user = await User.findById(req.query.id)
    .select('-password')
    .populate({
      path: 'paths',
      populate: {
        path: 'responsible user',
      },
    })
    .exec()
  const image = user.image.toString('base64')
  const paths = user.paths
  const actualUser = {
    ...user._doc,
    paths,
    image,
  }
  res.send(actualUser)
})

// @@ Used to fetch ALL users connected to the account "/account-users"
router.get('/api/all-users', auth, async (req, res) => {
  const users = await User.find({ company: req.user.company._id }).select('firstName lastName email jobTitle isAdmin')
  res.send(users)
})

module.exports = router
