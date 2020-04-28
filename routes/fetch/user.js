const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to fetch user data when clicking into a user profile
  router.post('/api/user', auth, async (req, res) => {
    const user = await User.findById(req.query.id)
      .select('-password')
      .populate({
        path: 'paths',
        populate: {
          path: 'responsible user',
        },
      })
      .exec()

    const image = user.image.toString('base64')
    const paths = user.paths
    const actualUser = {
      ...user._doc,
      paths,
      image,
      fullName: user.fullName,
    }
    res.send(actualUser)
  })
}
