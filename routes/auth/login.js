const bcrypt = require('bcrypt')
const User = require('../../models/User')
const setCookie = require('../../utilFns/setCookie')

module.exports = (router) => {
  // @@ Used when user logs in -> finds user, sets cookie, sends success/error
  router.post('/api/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).select('email password')
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
          setCookie(res, user._id)
          return res.send({ success: 'User was successfully logged in!' })
        }
      }
      return res.status(406).send({ loginError: "We don't know this account. Please try again." })
    } catch (e) {
      return res
        .status(406)
        .send({ errors: { login: { message: 'Something went wrong, try again!' } } })
    }
  })
}
