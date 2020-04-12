const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

router.post('/api/create-path', auth, async (req, res) => {
  const path = new Path({
    ...req.body,
    createdBy: req.user._id,
    company: req.user.company._id,
  })
  await path.save()
})

module.exports = router
