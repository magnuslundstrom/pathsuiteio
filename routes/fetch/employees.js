const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to fetch ALL users connected to the account
  router.get('/api/users', auth, async (req, res) => {
    try {
      users = await User.find({ company: req.user.company._id, isAdmin: false })
        .select('jobTitle firstName lastName image')
        .populate('paths', 'title')
        .exec()
      const newUsers = []
      users.forEach((user) => {
        const image = user.image.toString('base64')
        const paths = user.paths
        const newUser = { ...user._doc, paths, image }
        newUsers.push(newUser)
      })
      res.send(newUsers)
    } catch (e) {}
  })
}
