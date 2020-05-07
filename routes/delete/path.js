const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

module.exports = (router) => {
  router.get('/api/delete-path', auth, async (req, res) => {
    console.log(req.query.id)
    await Path.findByIdAndDelete(req.query.id)
    res.send({ message: 'Successfully deleted!' })
  })
}
