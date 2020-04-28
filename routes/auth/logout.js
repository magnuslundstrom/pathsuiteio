const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to logout the user. Sets new cookie with instant expire date
  router.get('/api/logout', auth, (req, res) => {
    res.cookie('user', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    res.send({ success: 'User logged out' })
  })
}
