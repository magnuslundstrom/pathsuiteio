const moment = require('moment')
const Path = require('../../models/Path')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // Used on /paths on admin side

  router.get('/api/paths', auth, async (req, res) => {
    // req.query (/?user=...)
    // req.query (/?path=...)
    console.log(req.query)
    let search
    if (req.query) search = { ...req.query, company: req.user.company._id }
    if (!req.query) search = { company: req.user.company._id }
    const paths = await Path.find({ ...search })
      .populate('user', 'firstName lastName jobTitle image')
      .populate('responsible', 'firstName lastName')
      .exec()
    const actualPaths = []
    paths.forEach((path, index) => {
      const startDate = moment(path.startDate).format('MMM Do YYYY')
      const endDate = moment(path.endDate).format('MMM Do YYYY')
      const image = path.user.image.toString('base64')
      const newPath = { ...path._doc, user: { ...path._doc.user._doc, image }, startDate, endDate }
      actualPaths.unshift(newPath)
    })
    res.send(actualPaths)
  })

  // Used on /paths on employee side -- REALLY ? -- REMAKE
  router.get('/api/own-paths', auth, async (req, res) => {
    const paths = await Path.find({ user: req.user._id })
      .populate('user', 'firstName lastName jobTitle image')
      .populate('responsible', 'firstName lastName jobTitle')
      .exec()

    const actualPaths = []
    paths.forEach((path) => {
      const image = path.user.image.toString('base64')
      const newPath = { ...path._doc, user: { ...path._doc.user._doc, image } }
      actualPaths.push(newPath)
    })
    res.send(actualPaths)
  })
}
