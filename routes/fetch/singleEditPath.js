const Path = require('../../models/Path')
const auth = require('../../middleware/auth')
module.exports = (router) => {
  router.get('/api/single-edit-path', auth, async (req, res) => {
    const path = await Path.findById(req.query.id)
      .populate('user', 'firstName lastName')
      .populate('responsible', 'firstName lastName')
      .exec()
    res.send(path)
  })
}
