const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to send req.user to redux store
  router.get('/api/tunnel', auth, (req, res) => {
    if (req.user) {
      res.send(req.user)
    } else {
      res.status(401).send()
    }
  })
}
