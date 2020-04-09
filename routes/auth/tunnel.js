const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

router.get('/api/tunnel', auth, (req, res) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.status(401).send()
  }
})

module.exports = router
