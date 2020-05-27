const auth = require('../../middleware/auth')
const User = require('../../models/User')

module.exports = (router) => {
  // Updates wether or not its the first time user visits
  router.get('/api/welcome', auth, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { isFirstTime: false })
    res.send('Success!')
  })
}
