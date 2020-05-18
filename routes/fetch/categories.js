const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

module.exports = (router) => {
  router.get('/api/get-categories', auth, async (req, res) => {
    try {
      const paths = await Path.find({ company: req.user.company._id })
      const categories = [...new Set(paths.map((path) => path.category))]
      res.send(categories)
    } catch (e) {
      res.send(e)
    }
  })
}
