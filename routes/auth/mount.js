const User = require('../../models/User')
const setCookie = require('../../utilFns/setCookie')

module.exports = (router) => {
  // @@ Used when app mounts to check if req.cookies.user exists
  router.get('/api/mount', async (req, res) => {
    try {
      const user = await User.findById(req.cookies.user)
      if (user) {
        setCookie(res, user._id)
        res.send({ success: 'Redirect to tunnel' })
      } else {
        throw new Error({ message: 'User was not logged in' })
      }
    } catch (e) {
      res.status(401).send()
    }
  })
}
