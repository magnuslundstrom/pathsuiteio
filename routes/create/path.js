const moment = require('moment')
const Path = require('../../models/Path')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to create a new path
  router.post('/api/create-path', auth, async (req, res) => {
    try {
      const path = new Path({
        ...req.body,
        company: req.user.company._id,
      })
      await path.save()
      res.send('Success!')
    } catch (e) {
      res.send(e)
    }
  })
}
