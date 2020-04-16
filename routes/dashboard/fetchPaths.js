const express = require('express')
const router = express.Router()
const Path = require('../../models/Path')

const auth = require('../../middleware/auth')

router.get('/api/get-paths', auth, async (req, res) => {
  const paths = await Path.find({ company: req.user.company._id })
    .populate('createdBy', 'firstName lastName _id')
    .populate('user', 'firstName lastName jobTitle image')
    .populate('responsible', 'firstName lastName jobTitle')
    .exec()
  console.log(paths)
  res.send(paths)
})

module.exports = router
