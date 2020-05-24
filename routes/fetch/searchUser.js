const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to find users on search when creating paths
  router.post('/api/find-user', auth, async (req, res) => {
    if (req.body.find.length > 0) {
      const find = req.body.find
      const reg = new RegExp('^' + find, 'i')
      const user = await User.find({
        firstName: reg,
        isAdmin: req.query.isAdmin,
        company: req.user.company._id,
      }).select('firstName lastName isAdmin')
      res.send(user)
      console.log(user, 'ekwqoeqw')
    }
  })
}
