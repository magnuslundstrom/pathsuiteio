const auth = require('../../middleware/auth')
const User = require('../../models/User')

module.exports = (router) => {
  router.get('/api/welcome', auth, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { isFirstTime: false })
    res.send('Success!')
  })
}
