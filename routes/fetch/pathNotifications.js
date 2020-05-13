const moment = require('moment')
const auth = require('../../middleware/auth')
const PathNotification = require('../../models/notifications/PathNotification')
const completedWeek = require('../../utilFns/completedWeek')
const completedYear = require('../../utilFns/completedYear')

// GET /tasks?limits=10&skip=10 -- remember to parseInt() since querystrings are STRINGS

module.exports = (router) => {
  router.get('/api/paths-completed', auth, async (req, res) => {
    const period = req.query.when
    const companyPathNotifications = await PathNotification.find({
      company: req.user.company._id,
    })
    let numbers
    if (period.includes('week')) numbers = completedWeek(companyPathNotifications, period)
    if (period.includes('year')) numbers = completedYear(companyPathNotifications, period)
    res.send(numbers)
  })

  // Get the notifications in sidebar
  router.get('/api/path-notifications', auth, async (req, res) => {
    try {
      const companyPathNotifications = await PathNotification.find({
        company: req.user.company._id,
      })
        .select('date description user')
        .populate('user', 'firstName lastName image')
        .exec()
      const newPaths = []
      companyPathNotifications.forEach((noti) => {
        const image = noti.user._doc.image.toString('base64')
        const date = moment(noti.date).format('MMM Do')
        const notification = { ...noti._doc, user: { ...noti._doc.user._doc, image }, date }
        newPaths.unshift(notification)
      })
      res.send(newPaths)
    } catch (e) {
      console.log(e)
    }
  })
}
