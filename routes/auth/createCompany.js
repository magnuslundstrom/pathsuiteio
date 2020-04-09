const express = require('express')
const router = express.Router()

router.post('/api/create-company', (req, res) => {
  try {
    console.log(req.body)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
