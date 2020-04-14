const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Path = require('../../models/Path')

router.get('/api/users', auth, async (req, res) => {
  try {
    users = await User.find({ company: req.user.company._id })
      .select('jobTitle firstName lastName')
      .populate('paths', 'title')
      .exec()
    console.log(users)
    res.send(users)
  } catch (e) {}
})

module.exports = router
