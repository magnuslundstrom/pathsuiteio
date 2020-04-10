const express = require('express')
const router = express.Router()
const Path = require('../../models/Path')

router.post('/api/create-path', async (req, res) => {
  const path = new Path(req.body)
  const savedPath = await path.save()
  const paths = await Path.findById(savedPath._id).populate('createdBy')
  console.log(paths.createdBy)
})

module.exports = router
