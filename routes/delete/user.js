const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Path = require('../../models/Path')
const PathNotification = require('../../models/Path')
const GoalNotification = require('../../models/Path')

module.exports = (router) => {
  // @@ Used to remove access from a user - deletes user and associated paths
  router.post('/api/delete-user', auth, async (req, res) => {
    await User.findByIdAndDelete(req.body.userId)
    await Path.deleteMany({ user: req.body.userId })
    await PathNotification.deleteMany({ user: req.body.userId })
    await GoalNotification.deleteMany({ user: req.body.userId })
    res.send('success')
  })
}
