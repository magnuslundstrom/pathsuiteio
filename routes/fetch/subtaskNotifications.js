const moment = require('moment')
const auth = require('../../middleware/auth')
const SubtaskNotification = require('../../models/notifications/SubtaskNotification')
const completedWeek = require('../../utilFns/completedWeek')
const completedYear = require('../../utilFns/completedYear')

// get subtasks completed last week
module.exports = (router) => {
  // Used to get data to the chart
  router.get('/api/subtasks-completed', auth, async (req, res) => {
    const period = req.query.when
    const query = {
      company: req.user.company._id,
    }
    // finds the paths connected to company and if !isAdmin user id also included
    if (req.query.user) query.user = req.query.user
    const companySubtaskNotifications = await SubtaskNotification.find({
      ...query,
    })
    let numbers
    // completedweek/year returns an array with the data
    if (period.includes('week')) numbers = completedWeek(companySubtaskNotifications, period)
    if (period.includes('year')) numbers = completedYear(companySubtaskNotifications, period)
    res.send(numbers)
  })

  // Get the notifications in sidebar
  router.get('/api/subtask-notifications', auth, async (req, res) => {
    const query = {
      company: req.user.company._id,
    }
    if (req.query.user) query.user = req.query.user
    try {
      // parseInt to turn the querySTRING to a number
      const companySubtaskNotifications = await SubtaskNotification.find({
        ...query,
      })
        .select('date description user')
        .sort('-date')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .populate('user', 'firstName lastName image')
        .exec()
      const newSubtasks = []
      companySubtaskNotifications.forEach((noti) => {
        const image = noti.user._doc.image.toString('base64')
        const date = moment(noti.date).format('MMM Do')
        const notification = { ...noti._doc, user: { ...noti._doc.user._doc, image }, date }
        newSubtasks.push(notification)
      })
      res.send(newSubtasks)
    } catch (e) {
      res.status(401).send(e)
    }
  })
}
