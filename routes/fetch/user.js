const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to fetch user data when clicking into a user profile
  router.get('/api/user', auth, async (req, res) => {
    console.log(req.query)
    const user = await User.findById(req.query.id).select('firstName lastName jobTitle image')
    const image = user.image.toString('base64')
    const actualUser = {
      ...user._doc,
      image,
    }
    res.send(actualUser)
  })
}
