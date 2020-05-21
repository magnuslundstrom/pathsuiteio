const moment = require('moment')
const auth = require('../../middleware/auth')
const SubtaskNotification = require('../../models/notifications/SubtaskNotification')
const completedWeek = require('../../utilFns/completedWeek')
const completedYear = require('../../utilFns/completedYear')

// GET /tasks?limits=10&skip=10 -- remember to parseInt() since querystrings are STRINGS

// get subtasks completed last week
module.exports = (router) => {
  router.get('/api/subtasks-completed', auth, async (req, res) => {
    const period = req.query.when
    const query = {
      company: req.user.company._id,
    }
    if (req.query.user) query.user = req.query.user
    const companySubtaskNotifications = await SubtaskNotification.find({
      ...query,
    })
    let numbers
    if (period.includes('week')) numbers = completedWeek(companySubtaskNotifications, period)
    if (period.includes('year')) numbers = completedYear(companySubtaskNotifications, period)
    res.send(numbers)
  })

  // Get the notifications in sidebar
  router.get('/api/subtask-notifications', auth, async (req, res) => {
    console.log(req.query.skip, req.query.limit)
    const query = {
      company: req.user.company._id,
    }
    if (req.query.user) query.user = req.query.user
    try {
      const companySubtaskNotifications = await SubtaskNotification.find({
        ...query,
      })
        .select('date description user')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .populate('user', 'firstName lastName image')
        .exec()
      const newSubtasks = []
      companySubtaskNotifications.forEach((noti) => {
        const image = noti.user._doc.image.toString('base64')
        const date = moment(noti.date).format('MMM Do')
        const notification = { ...noti._doc, user: { ...noti._doc.user._doc, image }, date }
        newSubtasks.unshift(notification)
      })
      res.send(newSubtasks)
    } catch (e) {
      res.status(401).send(e)
    }
  })
}
