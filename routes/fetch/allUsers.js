const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to fetch ALL users connected to the account
  router.get('/api/all-users', auth, async (req, res) => {
    const users = await User.find({ company: req.user.company._id }).select(
      'firstName lastName email jobTitle isAdmin'
    )
    res.send(users)
  })
}
